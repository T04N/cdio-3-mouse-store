import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createAxios } from '../../../createInstance';
import { createNewOrder } from '../../../redux/apiRequest';
import { loginSuccess } from '../../../redux/authSlice';
import Footer from '../../Footer/Footer';
import NavBar from '../../NavBar/NavBar';
import './Payment.scss';

let price = 0; // tổng tiền giả để gán cho state total
let arrCarts = []; // danh sách tất cả sản phẩm đã tick
let listCarts = []; // danh sách tất cả sản phẩm của user hiện tại
function Payment() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const carts = useSelector((state) => state.auth.login?.allCarts); //lấy tất cả sản phẩm của tất cả users
    const [total, setTotal] = useState(price); // tổng tiền của đơn hàng chưa tính phí vận chuyển
    const [paymentMethods, setPaymentMethods] = useState('Thanh toán khi nhận hàng'); //lựa chọn phương thức thanh toán
    const [code, setCode] = useState(''); //mã giao dịch khi thanh toán bằng chuyển khoản

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosJWT = createAxios(user, dispatch, loginSuccess);

    // Đẩy sản phẩm của user vào mảng
    listCarts = [];
    for (let i = 0; i < carts.length; i++) {
        if (user._id === carts[i].userId) {
            listCarts.push(carts[i]);
        }
    }

    //Thêm/xóa sản phẩm vào danh sách thanh toán
    //ERR: khi lùi trang quay lại đang lỗi bị đảo ngược check và chưa check
    function handleAddCarts(item) {
        arrCarts.push(item);
        price += item.productTotal;
        setTotal(price);
    }

    function handleRemoveCarts(item) {
        let newArrCarts = arrCarts.filter((product) => {
            return item._id !== product._id;
        });
        arrCarts = newArrCarts;
        price -= item.productTotal;
        setTotal(price);
    }

    const handleChecked = (item) => {
        if (arrCarts.length > 0) {
            for (let i = 0; i < arrCarts.length; i++) {
                if (item._id === arrCarts[i]._id) {
                    handleRemoveCarts(item);
                    return 0;
                }
            }
            handleAddCarts(item);
        } else {
            arrCarts.push(item);
            price += item.productTotal;
            setTotal(price);
        }
    };

    //Kiểm tra phương thức thanh toán
    const handleCheckPayment = (e) => {
        if (e === 'off') {
            setPaymentMethods('Thanh toán khi nhận hàng');
            document.querySelector('.form-payment').style.display = 'none';
            document.querySelector('.options-onl').checked = false;
            document.querySelector('.options-off').setAttribute('checked', '');
        } else if (e === 'onl') {
            setPaymentMethods('Chuyển khoản');
            document.querySelector('.form-payment').style.display = 'block';
            document.querySelector('.options-off').checked = false;
            document.querySelector('.options-onl').setAttribute('checked', '');
        }
    };

    //đặt hàng
    const handleSubmit = () => {
        /* 3 giá trị tự sinh ra nữa ngoài id của giao dịch là 
            isPayment: false -> là đơn hàng chưa thanh toán (true là đơn hàng đã thanh toán)
            istransported: false -> là đơn hàng chưa được vận chuyển (true là đơn hàng đã được vận chuyển)
            isSuccess: false -> là đơn hàng bị hủy (true là đơn hàng đã giao thành công)
        */
        if (arrCarts.length === 0) {
            alert('Bạn phải chọn ít nhất 1 sản phẩm để đặt hàng!');
        } else {
            const newOrders = {
                listproduct: arrCarts,
                paymentMethods: paymentMethods,
                total: total + 30000,
                tradingCode: code,
                isPayment: false,
                istransported: false,
                isSuccess: false,
            };

            if (paymentMethods === 'Thanh toán khi nhận hàng') {
                createNewOrder(dispatch, navigate, newOrders, axiosJWT);
            } else {
                if (code === '') {
                    alert('Không được để trống mã giao dịch');
                } else {
                    createNewOrder(dispatch, navigate, newOrders, axiosJWT);
                }
            }
        }
    };

    //set checked đã check khi bắt đầu
    useEffect(() => {
        if (arrCarts.length !== 0) {
            const checks = document.querySelectorAll('.col-60>input');
            for (let i = 0; i < arrCarts.length; i++) {
                for (let j = 0; j < listCarts.length; j++) {
                    if (arrCarts[i]._id === listCarts[j]._id) checks[j].setAttribute('checked', '');
                }
            }
        }
    }, []);

    console.log(arrCarts);

    return (
        <div className="payment-container">
            <NavBar />
            <div className="payment-wrapper">
                <div className="adress">
                    <div className="title">
                        <FontAwesomeIcon icon={faLocationDot} />
                        Địa Chỉ Nhận Hàng
                    </div>
                    <div className="info">
                        <h3>{user.fullname} -</h3>
                        <h3 style={{ paddingLeft: '1rem' }}>{user.phone}</h3>
                        <p>{user.address}</p>
                        <span>Mặc định</span>
                        <Link to="/tai-khoan/tai-khoan-cua-toi">Chỉnh sửa</Link>
                    </div>
                </div>
                <div className="product">
                    <div className="title">
                        <p>Thông tin giỏ hàng</p>
                    </div>
                    <div className="wrapper">
                        <div className="item">
                            <h3 className="col-60">Sản phẩm</h3>
                            <h3 className="col-10">Đơn giá</h3>
                            <h3 className="col-10">Số lượng</h3>
                            <h3 className="col-20">Thành tiền</h3>
                        </div>
                        {!listCarts || listCarts?.lenght === 0
                            ? ''
                            : listCarts.map((item) => {
                                  return (
                                      <div className="item" key={item._id}>
                                          <div className="col-60">
                                              <input type="checkbox" onChange={(e) => handleChecked(item)} />
                                              <div className="avatar">
                                                  <img src={item.avatar} alt="" />
                                              </div>
                                              <p>{item.description}</p>
                                          </div>
                                          <div className="col-10">
                                              {Intl.NumberFormat('de-DE', {
                                                  style: 'currency',
                                                  currency: 'VND',
                                              }).format(item.price)}
                                          </div>
                                          <div className="col-10">{item.count}</div>
                                          <div className="col-20">
                                              {Intl.NumberFormat('de-DE', {
                                                  style: 'currency',
                                                  currency: 'VND',
                                              }).format(item.productTotal)}
                                          </div>
                                      </div>
                                  );
                              })}
                        <div className="total">
                            Tổng số tiền :
                            <p>
                                {Intl.NumberFormat('de-DE', {
                                    style: 'currency',
                                    currency: 'VND',
                                }).format(total)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="payment">
                    <div className="title">
                        <p>Phương thức thanh toán</p>
                        <div className="options">
                            <div className="item">
                                <input
                                    className="options-off"
                                    type="radio"
                                    defaultChecked
                                    onChange={(e) => handleCheckPayment('off')}
                                />
                                Thanh toán khi nhận hàng
                            </div>
                            <div className="item">
                                <input
                                    className="options-onl"
                                    type="radio"
                                    onChange={(e) => handleCheckPayment('onl')}
                                />
                                Chuyển khoản
                            </div>
                            <div className="form-payment">
                                <span>
                                    * Vui lòng nhập đầy đủ thông tin khi tiến hành thanh toán, sau đó nhập mã giao dịch
                                    vào ô Mã giao dịch và tiến hành đặt hàng
                                </span>
                                <div className="form-payment-des">
                                    <h3>Số tài khoản</h3>
                                    <p>: 09876543210</p>
                                </div>
                                <div className="form-payment-des">
                                    <h3>Ngân Hàng</h3>
                                    <p>: Vietcombank</p>
                                </div>
                                <div className="form-payment-des">
                                    <h3>Chủ thẻ</h3>
                                    <p>: Nguyễn Văn A</p>
                                </div>
                                <div className="form-payment-des">
                                    <h3>Số tiền</h3>
                                    <p>
                                        {`: ` +
                                            Intl.NumberFormat('de-DE', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(total)}
                                    </p>
                                </div>
                                <div className="form-payment-des">
                                    <h3>Nội dung</h3>
                                    <p>
                                        : hoten_sodienthoai_mualaptop
                                        <span>*vd: lequoccuong_0987235674_mualaptop</span>
                                    </p>
                                </div>
                                <div className="form-payment-code">
                                    <span>Mã giao dịch</span>
                                    <input
                                        type="text"
                                        placeholder="Nhập mã giao dịch"
                                        maxLength={40}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="confirm">
                            <div className="confirm-description">
                                <div className="confirm-item">
                                    <p>Tổng tiền hàng</p>
                                    <span>
                                        {Intl.NumberFormat('de-DE', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(total)}
                                    </span>
                                </div>
                                <div className="confirm-item">
                                    <p>Phí vận chuyển</p>
                                    <span>30.000 đ</span>
                                </div>
                                <div className="confirm-item">
                                    <p>Tổng thanh toán</p>
                                    <span>
                                        {Intl.NumberFormat('de-DE', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(total + 30000)}
                                    </span>
                                </div>
                                <div className="cofirm-btn">
                                    <button onClick={(e) => handleSubmit()}>Đặt hàng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Payment;
