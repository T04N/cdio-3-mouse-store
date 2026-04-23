import './navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults, logOut, sendCurrentProduct } from '../../redux/apiRequest';
import { createAxios } from '../../createInstance';
import { logOutSuccess } from '../../redux/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowAltCircleRight,
    faBell,
    faCartShopping,
    faHome,
    faLaptop,
    faPeopleGroup,
    faQuestionCircle,
    faSearch,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/imgs/logo.png';
import userLogo from '../../assets/imgs/userlogo.png';
import { useState } from 'react';
import cart from '../../../src/assets/imgs/cart.png';

let listProduct = [];
let listCarts = [];
const NavBar = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const products = useSelector((state) => state.users.users?.allProducts);
    const carts = useSelector((state) => state.auth.login?.allCarts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, logOutSuccess);

    //set state
    const [valueInput, setValueInput] = useState('');

    const handleLogout = () => {
        logOut(dispatch, user?._id, user?.accessToken, axiosJWT);
    };

    //lấy danh sách giỏ hàng của user
    listCarts = [];
    for (let i = 0; i < carts?.length; i++) {
        if (carts[i].userId === user?._id) {
            listCarts.push(carts[i]);
        }
    }

    //lọc mảng tìm kiếm
    if (valueInput !== '') {
        document.querySelector('.search-glass').style.display = 'none';
        document.querySelector('.search-loading').style.display = 'block';

        listProduct = products.filter((item) => {
            return item.product.description.trim().toLowerCase().includes(valueInput.trim().toLowerCase());
        });

        setTimeout(() => {
            document.querySelector('.search-glass').style.display = 'block';
            document.querySelector('.search-loading').style.display = 'none';
        }, 1000);
    }

    //chuyển trang chi tiết sản phẩm
    const handleShowproduct = (product) => {
        if (product) {
            const id = product._id;
            sendCurrentProduct(dispatch, navigate, { ...product.product, id });
        }
    };

    const handleSearch = () => {
        const products = { listProduct, valueInput };
        getSearchResults(dispatch, navigate, products);
    };

    //Chỉ tải lại trang
    const handleReload = () => {
        navigate('/');
        window.location.reload();
    };

    return (
        <nav className="navbar-container">
            <div className="row">
                <div className="logo" onClick={(e) => handleReload()}>
                    <img src={logo} alt="logo" />
                </div>
                <div className="search">
                    <input placeholder="Nhập từ khóa tìm kiếm..." onChange={(e) => setValueInput(e.target.value)} />
                    <div className="search-icon">
                        <FontAwesomeIcon className="search-glass" icon={faSearch} onClick={(e) => handleSearch()} />
                        <FontAwesomeIcon className="search-loading" icon={faSpinner} />
                    </div>
                    <div className="search-wrapper">
                        <p>Danh sách sản được tìm kiếm</p>
                        {listProduct.length === 0 ? (
                            <span>Không tìm thấy sản phẩm nào phù hợp</span>
                        ) : (
                            listProduct.map((item) => {
                                return (
                                    <div
                                        key={item._id}
                                        className="search-wrapper-item"
                                        onClick={(e) => handleShowproduct(item)}
                                    >
                                        {item.product.description}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
                <div className="user">
                    {!user ? (
                        <>
                            <Link to="/dang-ky" className="user-item">
                                đăng ký
                            </Link>
                            <p className='thanhchan'>|</p>
                            <Link to="/dang-nhap" className="user-item">
                                đăng nhập
                            </Link>
                        </>
                    ) : (
                        <>
                            <div className="user-item">
                                <FontAwesomeIcon icon={faBell} />
                                Thông báo
                            </div>
                            <div className="user-item user-profile">
                                <img src={userLogo} alt="" />
                                <span>{user.fullname}</span>
                                <div className="user-item-box">
                                    <Link to="/tai-khoan/tai-khoan-cua-toi" className="user-profile-item">
                                        tài khoản của tôi
                                    </Link>
                                    <Link to="/tai-khoan/don-hang" className="user-profile-item">
                                        đơn mua
                                    </Link>
                                    <Link to="/" className="user-profile-item" onClick={handleLogout}>
                                        đăng xuất
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <ul className="menu">
                <div className="menu-item" onClick={handleReload}>
                    <FontAwesomeIcon icon={faHome} />
                    trang chủ
                </div>
                <Link className="menu-item" to="/gioi-thieu">
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                    giới thiệu
                </Link>
                <Link className="menu-item" to="/san-pham">
                    <FontAwesomeIcon icon={faLaptop} />
                    sản phẩm
                </Link>
                <Link className="menu-item" to="/tin-tuc">
                    <FontAwesomeIcon icon={faBell} />
                    tin tức
                </Link>
                <Link className="menu-item" to="/ho-tro">
                    <FontAwesomeIcon icon={faQuestionCircle} />
                    hỗ trợ 24/7
                </Link>
                <Link className="menu-item" to="/tuyen-dung">
                    <FontAwesomeIcon icon={faPeopleGroup} />
                    tuyển dụng
                </Link>
                <div className="menu-icon cart">
                    <Link to="/gio-hang" style={{ zIndex: 5 }}>
                        <FontAwesomeIcon icon={faCartShopping} />
                        <span className="menu-icon-number">{listCarts.length}</span>
                    </Link>
                    <div className="box"></div>
                    <div className="cart-box">
                        <h3>Sản phẩm đã thêm</h3>
                        <div className="items">
                            {!listCarts || listCarts?.length === 0 ? (
                                <div className="cart-empty">
                                    <img src={cart} alt="giỏ hàng trống" />
                                </div>
                            ) : (
                                listCarts.map((item) => {
                                    return item.userId === user?._id ? (
                                        <div className="item" key={item._id}>
                                            <img src={item.avatar} alt="" />
                                            <div className="description">
                                                <p>{item.description}</p>
                                            </div>
                                            <div className="price">
                                                <span>
                                                    {Intl.NumberFormat('de-DE', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    }).format(item.price)}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        ''
                                    );
                                })
                            )}
                        </div>
                        <div className="btn">
                            <Link to="/gio-hang">Xem giỏ hàng</Link>
                        </div>
                    </div>
                </div>
            </ul>
        </nav>
    );
};

export default NavBar;
