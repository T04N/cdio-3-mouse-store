import {
    faArrowLeftRotate,
    faCartShopping,
    faChevronRight,
    faHeart,
    faMedal,
    faMinus,
    faPhone,
    faPlus,
    faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../../Footer/Footer';
import NavBar from '../../NavBar/NavBar';
import './Product.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/apiRequest';
import { createAxios } from '../../../createInstance';
import { loginSuccess } from '../../../redux/authSlice';

function Product() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const currentProduct = useSelector((state) => state.users.users.currentProduct);
    const [count, setCount] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleInputNumber = (e) => {
        if (Number(e) < 1) {
            alert('Số lượng sản phẩm đặt phải lớn hơn 1');
            setCount(1);
            e.preventDefault();
        } else if (Number(e) > currentProduct.number) {
            alert(`Số lượng sản phẩm đặt phải nhỏ hơn ${currentProduct.number}`);
            setCount(currentProduct.number);
            e.preventDefault();
        }
        setCount(Number(e));
        console.log(count);
    };

    const handleCount = (value) => {
        let newcount;
        if (value === '+') {
            if (count < 99) {
                newcount = count + 1;
                setCount(newcount);
            } else {
                alert(`Số lượng sản phẩm đặt phải nhỏ hơn 99`);
            }
        } else if (value === '-') {
            if (count > 1) {
                newcount = count - 1;
                setCount(newcount);
            } else {
                alert('Số lượng sản phẩm đặt phải lớn hơn 1');
            }
        }
    };

    const handleAddcart = () => {
        if (!user) {
            navigate('/dang-nhap');
        } else {
            const newProduct = {
                productId: currentProduct.id,
                userId: user._id,
                description: currentProduct.description,
                avatar: currentProduct.avatar,
                price: currentProduct.price,
                count: count,
                productTotal: count * currentProduct.price,
            };

            if (count < 0 || count > currentProduct.number) {
                alert('Số lượng sản phẩm không hợp lệ');
            } else {
                addToCart(dispatch, navigate, newProduct, axiosJWT);
            }
        }
    };

    return (
        <div>
            <NavBar />
            <div className="product-container">
                <div className="product-header">
                    <p>
                        Trang chủ <FontAwesomeIcon icon={faChevronRight} /> Sản phẩm
                    </p>
                </div>
                <div className="product-body">
                    <div className="product-left">
                        <div className="product-left-service">
                            <h3>
                                <FontAwesomeIcon icon={faMedal} />
                                Thông tin dịch vụ
                            </h3>
                            <div className="product-left-service-description">
                                <span>
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                    Hàng đảm bảo chất lượng
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faArrowLeftRotate} />
                                    Đảm bảo 100% hàng chính hãng
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faHeart} />
                                    Dịch vụ khách hàng tốt nhất
                                </span>
                            </div>
                            <div className="product-left-service-contact">
                                <h2>
                                    <FontAwesomeIcon icon={faPhone} />
                                    0987 6543 210
                                </h2>
                                <a href="https://www.facebook.com/">Liên hê facebook</a>
                                <span>Email moursestore@gmail.com</span>
                            </div>
                        </div>
                        <div className="product-left-selling">
                            <h3>
                                <FontAwesomeIcon icon={faMedal} />
                                Sản phẩm bán chạy
                            </h3>
                            <Link className="product-left-selling-item">
                                <img
                                    src="https://banlaptopcudanang.com.vn/wp-content/uploads/2019/05/11969449_1-1-250x300.jpg"
                                    alt=""
                                />
                                <p>
                                    MacBook Air 2020 (MWTJ2/ MWTK2) Core i3/ SSD 256GB <span>17,990,000đ</span>
                                </p>
                            </Link>
                            <Link className="product-left-selling-item">
                                <img
                                    src="https://banlaptopcudanang.com.vn/wp-content/uploads/2022/11/315617856_146085201506994_6499849344841662451_n.jpg"
                                    alt=""
                                />
                                <p>
                                    Dell Gaming G15 5525 ( 2022 )/ AMD Ryzen 7-6800H/ SSD 512GB
                                    <span>25,490,000đ</span>
                                </p>
                            </Link>
                            <Link className="product-left-selling-item">
                                <img
                                    src="https://banlaptopcudanang.com.vn/wp-content/uploads/2019/07/Laptop-Dell-Precision-M4800-156-LED-Intel-Core-i7-i7-4800MQ-27-800x800-1-250x300.jpg"
                                    alt=""
                                />
                                <p>
                                    Dell Precision M4800 i7/ RAM 8GB/ SSD 128GB + HDD 500GB/ Quardo K1100M
                                    <span>10,490,000đ</span>
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div className="product-right">
                        <div className="product-right-item">
                            <img src={currentProduct.avatar} alt="" />
                            <div className="product-right-item-title">
                                <p>
                                    {currentProduct.description}
                                    <span>
                                        {Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(
                                            currentProduct.cost,
                                        )}
                                    </span>
                                    <span>
                                        {Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(
                                            currentProduct.price,
                                        )}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="product-right-description">
                            <h3>Khuyến mãi (SL có hạn)</h3>
                            <span>Tặng Gói Quà Trị Giá 2.499.000 VNĐ Bao gồm :</span>
                            <p>
                                <img alt="" />
                                <span>Voucher trị giá 2 triệu , thay màn hình miễn phí nếu năm đầu bể vỡ</span>
                            </p>
                            <p>
                                <img alt="" />
                                <span>Giảm 20% khi mua : Túi, Balo, Ram, Quạt làm mát laptop, Phần mềm Virus</span>
                            </p>
                            <p>
                                <img alt="" />
                                <span>Hỗ trợ cài đặt, bảo trì, vệ sinh máy miễn phí</span>
                            </p>
                            <p>
                                <img alt="" />
                                <span>Hỗ trợ trả góp lãi suất thấp.</span>
                            </p>
                            <p>
                                <img alt="" />
                                <span>Giảm giá trực tiếp đối với khách hàng ở xa, HSSV.</span>
                            </p>
                            <p>
                                <img alt="" />
                                <span>Dùng thử miễn phí trong 14 ngày đầu tiên.</span>
                            </p>

                            <div className="product-right-description-payment">
                                <div className="product-right-description-payment-box">
                                    <p>Số lượng</p>
                                    <div className="product-right-description-payment-box-add">
                                        <FontAwesomeIcon icon={faMinus} onClick={(e) => handleCount('-')} />
                                        <input
                                            className="input-value"
                                            type="number"
                                            value={count}
                                            onChange={(e) => handleInputNumber(e.target.value)}
                                        />
                                        <FontAwesomeIcon icon={faPlus} onClick={(e) => handleCount('+')} />
                                    </div>
                                </div>
                                <span>Số lượng có sẵn: {currentProduct.number}</span>
                                <button
                                    className="product-right-description-payment-box-btn"
                                    onClick={(e) => handleAddcart(e)}
                                >
                                    <FontAwesomeIcon icon={faCartShopping} />
                                    THÊM VÀO GIỎ HÀNG
                                </button>
                            </div>
                        </div>
                    </div>
                    <table className="product-right-detail">
                        <tbody>
                            <tr className="product-right-detail-title">
                                <th>Thông số kỹ thuật</th>
                            </tr>
                            <tr>
                                <th>CPU</th>
                                <td>{currentProduct.cpu}</td>
                            </tr>
                            <tr>
                                <th>RAM</th>
                                <td>{currentProduct.ram || '16GB DDR5 4800Mhz'}</td>
                            </tr>
                            <tr>
                                <th>Ổ cứng</th>
                                <td>{currentProduct.hardrive}</td>
                            </tr>
                            <tr>
                                <th>MUX Switch</th>
                                <td>{currentProduct.muxSwitch}</td>
                            </tr>
                            <tr>
                                <th>Màn hình</th>
                                <td>{currentProduct.creen}</td>
                            </tr>
                            <tr>
                                <th>Webcam</th>
                                <td>{currentProduct.webcam}</td>
                            </tr>
                            <tr>
                                <th>Kết nối</th>
                                <td>{currentProduct.connection}</td>
                            </tr>
                            <tr>
                                <th>Trọng lượng</th>
                                <td>{currentProduct.weight}</td>
                            </tr>
                            <tr>
                                <th>Pin</th>
                                <td>{currentProduct.pin}</td>
                            </tr>
                            <tr>
                                <th>Hệ điều hành</th>
                                <td>{currentProduct.operetingSystem}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Product;
