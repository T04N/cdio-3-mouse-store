import './Order.scss';
import Footer from '../../Footer/Footer';
import NavBar from '../../NavBar/NavBar';
import { useSelector } from 'react-redux';
import User from '../User/User';
// import cart from '../../../../src/assets/imgs/orders.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

let currentOrders = []; //danh sách sản phẩm của người dùng hiện tại
let currentList = []; //danh sách sản phẩm theo danh mục

let PREV_CLASS_ACTIVE = 'order-navbar_all'; //class của danh mục trước đó
let CURRENT_CLASS_ACTIVE = 'order-navbar_all'; //class của danh mục hiện tại

function Order() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const orders = useSelector((state) => state.users.users?.allOrders);

    const [listOrders, setListOrders] = useState('');

    //lấy tất cả sản phẩm của người dùng hiện tại
    currentOrders = [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].listproduct[0].userId === user._id) {
            currentOrders.push(orders[i]);
        }
    }
    if (listOrders === '') {
        currentList = currentOrders;
    }

    //xử lý hiển thị list theo danh mục
    const handleShowListOrders = (e) => {
        currentList = [];
        setListOrders(e);

        PREV_CLASS_ACTIVE = e.split(' ')[1];

        //hiển thị danh mục đang được chọn
        document.querySelector(`.${CURRENT_CLASS_ACTIVE}`).classList.remove('active');
        document.querySelector(`.${PREV_CLASS_ACTIVE}`).classList.add('active');

        CURRENT_CLASS_ACTIVE = PREV_CLASS_ACTIVE;

        //Hiển thị danh sách sản phẩm cảu danh mục
        if (PREV_CLASS_ACTIVE === 'order-navbar_all') {
            currentList = currentOrders;
        } else if (PREV_CLASS_ACTIVE === 'order-navbar_payment') {
            for (let i = 0; i < currentOrders.length; i++) {
                if (!currentOrders[i].isPayment) {
                    currentList.push(currentOrders[i]);
                }
            }
        } else if (PREV_CLASS_ACTIVE === 'order-navbar_transported') {
            for (let i = 0; i < currentOrders.length; i++) {
                if (currentOrders[i].isPayment === true && currentOrders[i].istransported === false) {
                    currentList.push(currentOrders[i]);
                }
            }
        } else if (PREV_CLASS_ACTIVE === 'order-navbar_success') {
            for (let i = 0; i < currentOrders.length; i++) {
                if (
                    currentOrders[i].isPayment === true &&
                    currentOrders[i].istransported === true &&
                    currentOrders[i].isSuccess === true
                ) {
                    currentList.push(currentOrders[i]);
                }
            }
        } else if (PREV_CLASS_ACTIVE === 'order-navbar_failed') {
            for (let i = 0; i < currentOrders.length; i++) {
                if (
                    currentOrders[i].isPayment === true &&
                    currentOrders[i].istransported === true &&
                    currentOrders[i].isSuccess === false
                ) {
                    currentList.push(currentOrders[i]);
                }
            }
        }
    };

    useEffect(() => {}, [listOrders]);

    //Mua lại thì chuyển đến trang mua lại, xử lí tìm kiếm và danh mục sản phẩm trong đơn hàng 2/1/20123
    return (
        <div className="order-container">
            <NavBar />
            <div className="order-wrapper">
                <User />
                <div className="order-right">
                    <div className="order-navbar">
                        <div
                            className="order-navbar_item order-navbar_all active"
                            onClick={(e) => handleShowListOrders(e.target.className)}
                        >
                            Tất cả
                        </div>
                        <div
                            className="order-navbar_item order-navbar_payment"
                            onClick={(e) => handleShowListOrders(e.target.className)}
                        >
                            Chờ xác nhận
                        </div>
                        <div
                            className="order-navbar_item order-navbar_transported"
                            onClick={(e) => handleShowListOrders(e.target.className)}
                        >
                            Đang giao
                        </div>
                        <div
                            className="order-navbar_item order-navbar_success"
                            onClick={(e) => handleShowListOrders(e.target.className)}
                        >
                            Đã giao
                        </div>
                        <div
                            className="order-navbar_item order-navbar_failed"
                            onClick={(e) => handleShowListOrders(e.target.className)}
                        >
                            Đã Hủy
                        </div>
                    </div>
                    <div className="order-search">
                        <FontAwesomeIcon icon={faSearch} />
                        <input type="text" placeholder="Bạn có thể tìm kiếm đơn hàng theo ID hoặc tên sản phẩm" />
                    </div>
                    {currentList.map((order) => {
                        return (
                            <div className="order-item" key={order._id}>
                                <p className="order-item-header">
                                    {!order.isPayment
                                        ? 'chờ xác nhận'
                                        : !order.istransported
                                        ? 'đang giao'
                                        : order.isSuccess
                                        ? 'đã giao'
                                        : 'đã hủy'}
                                </p>
                                {order.listproduct.map((item) => {
                                    return (
                                        <div className="order-item-body" key={item._id}>
                                            <img src={item.avatar} alt="" />
                                            <div className="order-item-body-des">
                                                <p>{item.description}</p>
                                                <p>x{item.count}</p>
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
                                    );
                                })}
                                <div className="order-item-footer">
                                    <p className="order-item-footer-row-1">
                                        Thành tiền:{' '}
                                        <span>
                                            <span>
                                                {Intl.NumberFormat('de-DE', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(order.total)}
                                            </span>
                                        </span>
                                    </p>
                                    <div className="order-item-footer-row-2">
                                        <p>Quản lý bởi hệ thống Mouse Store, giao hàng sớm nhất 3 đến 5 ngày</p>
                                        <div className="order-item-footer-row-2-btn">
                                            <Link to="/">Quay về</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Order;
