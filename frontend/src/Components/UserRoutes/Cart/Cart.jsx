import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createAxios } from '../../../createInstance';
import { deleteCarts, addToCart } from '../../../redux/apiRequest';
import { loginSuccess } from '../../../redux/authSlice';
import Footer from '../../Footer/Footer';
import NavBar from '../../NavBar/NavBar';
import './Cart.scss';
import cart from '../../../../src/assets/imgs/cart.png';

let listCarts = [];
function Cart() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const carts = useSelector((state) => state.auth.login?.allCarts);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const axiosJWT = createAxios(user, dispatch, loginSuccess());

    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        if (!user) {
            navigate('/dang-nhap');
        }
    }, [user, navigate]);

    useEffect(() => {
        // Initialize quantities state from carts
        if (carts && carts.length > 0) {
            const initialQuantities = {};
            carts.forEach((item) => {
                if (item.userId === user?._id) {
                    initialQuantities[item._id] = item.count;
                }
            });
            setQuantities(initialQuantities);
        }
    }, [carts, user]);

    //lấy danh sách giỏ hàng của user
    listCarts = [];
    for (let i = 0; i < carts?.length; i++) {
        if (carts[i].userId === user?._id) {
            listCarts.push(carts[i]);
        }
    }

    const handleNumber = (item, value) => {
        const currentCount = quantities[item._id] ?? item.count;
        if (value === '+') {
            if (currentCount < 100) {
                const newcount = currentCount + 1;
                setQuantities((prev) => ({ ...prev, [item._id]: newcount }));
                addToCart(dispatch, null, {
                    userId: item.userId,
                    productId: item.productId,
                    description: item.description,
                    avatar: item.avatar,
                    price: item.price,
                    count: 1,
                }, axiosJWT)
                .then(() => {
                    console.log('Quantity incremented by 1');
                })
                .catch((err) => {
                    console.error(err.response?.data || 'Cập nhật số lượng thất bại');
                });
            }
        } else if (value === '-') {
            if (currentCount > 1) {
                const newcount = currentCount - 1;
                setQuantities((prev) => ({ ...prev, [item._id]: newcount }));
                addToCart(dispatch, null, {
                    userId: item.userId,
                    productId: item.productId,
                    description: item.description,
                    avatar: item.avatar,
                    price: item.price,
                    count: -1,
                }, axiosJWT)
                .then(() => {
                    console.log('Quantity decremented by 1');
                })
                .catch((err) => {
                    console.error(err.response?.data || 'Cập nhật số lượng thất bại');
                });
            } else if (currentCount === 1) {
                // Remove product from cart if quantity is 1 and minus clicked
                handleDeleteProduct(item._id).then(() => {
                    setQuantities((prev) => {
                        const newQuantities = { ...prev };
                        delete newQuantities[item._id];
                        return newQuantities;
                    });
                });
            }
        }
    };

    const handleInputChange = (item, value) => {
        let newcount = parseInt(value);
        if (isNaN(newcount) || newcount < 1) {
            newcount = 1;
        } else if (newcount > 101) {
            newcount = 100;
        }
        setQuantities((prev) => ({ ...prev, [item._id]: newcount }));
        updateQuantity(item, newcount);
    };

    const updateQuantity = (item, newcount) => {
        // Call API to update cart quantity using addToCart API
        addToCart(dispatch, null, { 
            userId: item.userId,
            productId: item.productId,
            description: item.description,
            avatar: item.avatar,
            price: item.price,
            count: newcount
        }, axiosJWT)
            .then(() => {
                console.log('Quantity updated successfully');
            })
            .catch((err) => {
                alert(err.response?.data || 'Cập nhật số lượng thất bại');
            });
    };

    //xóa sản phẩm khỏi giỏ hàng
    const handleDeleteProduct = (id) => {
        deleteCarts(dispatch, id, axiosJWT);
    };

    return (
        <div className="cart-container">
            <NavBar />
            <div className="wrapper">
                <table>
                    <tbody>
                        <tr className="header">
                            <th>Ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                        </tr>
                        {!listCarts || listCarts?.length === 0 ? (
                            <tr className="cart-empty">
                                <td>
                                    <img src={cart} alt="giỏ hàng trống" />
                                    <p>Chưa có sản phẩm nào được thêm vào giỏ hàng</p>
                                </td>
                            </tr>
                        ) : (
                            listCarts.map((item) => {
                                return item.userId === user?._id ? (
                                    <tr className="body" key={item._id}>
                                        <td>
                                            <img src={item.avatar} alt="" />
                                        </td>
                                        <td>
                                            <p>{item.description}</p>
                                        </td>
                                        <td>
                                            <span>
                                                {Intl.NumberFormat('de-DE', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(item.price)}
                                            </span>
                                        </td>
                                        <td className="quantity">
                                            <div className="minus" onClick={() => handleNumber(item, '-')}>
                                                -
                                            </div>
                                            <input
                                                type="number"
                                                value={quantities[item._id] ?? item.count}
                                                onChange={(e) => handleInputChange(item, e.target.value)}
                                                min={1}
                                                max={99}
                                            />
                                            <div className="plus" onClick={() => handleNumber(item, '+')}>
                                                +
                                            </div>
                                        </td>
                                        <td>
                                            <span>
                                                {Intl.NumberFormat('de-DE', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(item.productTotal)}
                                            </span>
                                        </td>
                                        <td>
                                            <button onClick={(e) => handleDeleteProduct(item._id)}>Xóa</button>
                                        </td>
                                    </tr>
                                ) : (
                                    ''
                                );
                            })
                        )}
                    </tbody>
                </table>
                <div className="wrapper-btn">
                    <Link to="/gio-hang/thanh-toan">Thanh toán</Link>
                </div>
                <div className="wrapper-description">Giao hàng sớm nhất từ 3 đến 5 ngày</div>
            </div>
            <Footer />
        </div>
    );
}

export default Cart;
