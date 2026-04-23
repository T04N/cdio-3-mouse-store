import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Admin from '../../Admin/Admin';
import './ListOrders.scss';
import { deleteOrder, getAllOrders, updateOrder } from '../../../redux/apiRequest';
import { createAxios } from '../../../createInstance';
import { loginSuccess } from '../../../redux/authSlice';

function ListOrders() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.login?.currentUser);
    //Lấy tất cả người dùng
    const listOrder = useSelector((state) => state.users.users?.allListOrders);

    //refresh token
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    //Hiện form chỉnh sửa
    const [orderId, setOrderId] = useState(null);
    const [total, setTotal] = useState('');
    const [dateCreate, setDateCreate] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [paymentMethods, setPaymentMethods] = useState('');
    const [orderStatus, setOrderStatus] = useState('');

    const handleShowEdit = (order) => {
        setOrderId(order._id);
        setTotal(order.total);
        setDateCreate(formatDate(order.createdAt, 0));
        setDateEnd(formatDate(order.createdAt, 3));
        setPaymentMethods(order.paymentMethods);
        setOrderStatus(
            !order.isPayment
                ? 'Chờ Xác Nhận'
                : !order.istransported
                ? 'Đang Giao'
                : order.isSuccess
                ? 'Đã Giao'
                : 'Đã Hủy',
        );

        document.querySelector('.listorder-box').style.display = 'flex';
    };

    //đóng form chỉnh sửa
    const handleClearEdit = () => {
        document.querySelector('.listorder-box').style.display = 'none';
    };

    const handleEditOrder = (order) => {
        console.log(typeof orderStatus, orderStatus);

        const orders = {
            total: total,
            createdAt: dateCreate,
            paymentMethods: paymentMethods === '1' ? 'Thanh toán khi nhận hàng' : 'Thanh toán online',
            isPayment: orderStatus === '1' ? false : true,
            istransported: orderStatus === '1' || orderStatus === '2' ? false : true,
            isSuccess: orderStatus === '3' ? true : false,
        };

        updateOrder(orderId, orders, axiosJWT, dispatch);
    };

    //delete product
    const handleDelete = (id) => {
        deleteOrder(dispatch, id, axiosJWT);
    };

    //format day
    function formatDate(date, day) {
        let formatted_date = new Date(date);
        formatted_date.setDate(formatted_date.getDate() + day);
        let formatted_date_string = formatted_date.toISOString().split('T')[0];
        return formatted_date_string;
    }

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
        if (user?.accessToken) {
            getAllOrders(dispatch, axiosJWT, user.accessToken);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="listorder-box">
                <div className="wrapper">
                    <h3>Chỉnh sửa đơn hàng</h3>
                    <section className="wrapper-body">
                        <div className="wrapper-col">
                            <div className="wrapper-item">
                                <span>Tổng tiền</span>
                                <input
                                    type="text"
                                    placeholder="Tổng tiền"
                                    value={total}
                                    onChange={(e) => setTotal(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Ngày đặt</span>
                                <input
                                    type="text"
                                    placeholder="Ngày đặt"
                                    value={dateCreate}
                                    onChange={(e) => setDateCreate(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Ngày giao</span>
                                <input
                                    type="text"
                                    placeholder="Ngày giao"
                                    value={dateEnd}
                                    onChange={(e) => setDateEnd(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Phương thức thanh toán</span>
                                <select onChange={(e) => setPaymentMethods(e.target.value)}>
                                    <option defaultValue="" disabled selected hidden>
                                        Chọn phương thức thanh toán
                                    </option>
                                    <option value="1">Thanh toán khi nhận hàng</option>
                                    <option value="2">Thanh toán online</option>
                                </select>
                            </div>
                            <div className="wrapper-item">
                                <span>Trạng thái đơn hàng</span>
                                <select onChange={(e) => setOrderStatus(e.target.value)}>
                                    <option defaultValue="" disabled selected hidden>
                                        Chọn một tùy chọn
                                    </option>
                                    <option value="1">Chờ Xác Nhận</option>
                                    <option value="2">Đang Giao</option>
                                    <option value="3">Đã Giao</option>
                                    <option value="4">Đã Hủy</option>
                                </select>
                            </div>
                        </div>
                    </section>
                    <button className="btn-edit" onClick={(e) => handleEditOrder()}>
                        Lưu
                    </button>
                    <button className="btn-delete" onClick={handleClearEdit}>
                        Hủy
                    </button>
                </div>
            </div>
            <div className="listorder-container">
                <Admin />
                <div className="listorder-header">Danh sách đơn hàng</div>
                <table>
                    <tbody>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Tổng tiền</th>
                            <th>Ngày đặt</th>
                            <th>Ngày giao</th>
                            <th>Phương thức thanh toán</th>
                            <th>Trạng thái đơn hàng</th>
                        </tr>
                        {listOrder?.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>
                                        {Intl.NumberFormat('de-DE', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(item.total)}
                                    </td>
                                    <td>{formatDate(item.createdAt, 0)}</td>
                                    <td>{formatDate(item.createdAt, 3)}</td>
                                    <td>{item.paymentMethods}</td>
                                    <td>
                                        {!item.isPayment ? (
                                            <span style={{ color: 'green' }}>Chờ Xác Nhận</span>
                                        ) : !item.istransported ? (
                                            <span style={{ color: '#e1e143' }}>Đang Giao</span>
                                        ) : item.isSuccess ? (
                                            <span style={{ color: 'blue' }}>Đã Giao</span>
                                        ) : (
                                            <span style={{ color: 'red' }}>Đã Hủy</span>
                                        )}
                                    </td>
                                    <td style={{ display: 'flex' }}>
                                        <button className="btn-edit" onClick={(e) => handleShowEdit(item)}>
                                            Chỉnh sửa
                                        </button>
                                        <button className="btn-delete" onClick={(e) => handleDelete(item._id)}>
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListOrders;
