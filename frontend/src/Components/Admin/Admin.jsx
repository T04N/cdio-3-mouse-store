import './Admin.scss';
import AdminSidebar from './AdminSidebar';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllProducts, getAllOrders } from '../../redux/apiRequest';
import { createAxios } from '../../createInstance';
import { loginSuccess } from '../../redux/authSlice';

const Admin = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const allProducts = useSelector((state) => state.users.users?.allProducts);
    const allOrders = useSelector((state) => state.users.users?.allListOrders);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    useEffect(() => {
        if (user?.accessToken) {
            getAllProducts(dispatch);
            getAllOrders(dispatch, axiosJWT, user.accessToken);
        }
        // eslint-disable-next-line
    }, []);

    const totalRevenue = allOrders
        ? allOrders.reduce((sum, o) => sum + (o.total || 0), 0)
        : 0;

    const pendingOrders = allOrders?.filter((o) => !o.isPayment).length || 0;

    const stats = [
        {
            icon: '📦',
            value: allProducts?.length || 0,
            label: 'Sản phẩm',
            color: '#e3f2fd',
            textColor: '#1565c0',
        },
        {
            icon: '📋',
            value: allOrders?.length || 0,
            label: 'Đơn hàng',
            color: '#e8f5e9',
            textColor: '#2e7d32',
        },
        {
            icon: '💰',
            value: Intl.NumberFormat('vi-VN').format(totalRevenue) + '₫',
            label: 'Tổng doanh thu',
            color: '#fff3e0',
            textColor: '#e65100',
        },
        {
            icon: '🚚',
            value: pendingOrders,
            label: 'Chờ xác nhận',
            color: '#fce4ec',
            textColor: '#c62828',
        },
    ];

    const quickActions = [
        { to: '/quan-li-san-pham', icon: '📦', label: 'Quản lý sản phẩm', desc: 'Thêm, sửa, xóa sản phẩm' },
        { to: '/quan-li-nguoi-dung', icon: '👥', label: 'Quản lý người dùng', desc: 'Quản lý tài khoản' },
        { to: '/quan-li-don-hang', icon: '📋', label: 'Quản lý đơn hàng', desc: 'Xem, cập nhật đơn hàng' },
    ];

    return (
        <div className="admin-page">
            <AdminSidebar />
            <div className="admin-page__content">
                {/* Header */}
                <div className="admin-page__header">
                    <div>
                        <h1>👋 Xin chào, {user?.fullname}!</h1>
                        <p>Chào mừng đến với trang quản trị Mouse Store</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="admin-page__stats">
                    {stats.map((stat, i) => (
                        <div className="admin-stat" key={i}>
                            <div
                                className="admin-stat__icon"
                                style={{ background: stat.color }}
                            >
                                {stat.icon}
                            </div>
                            <div className="admin-stat__info">
                                <h3 style={{ color: stat.textColor }}>{stat.value}</h3>
                                <span>{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="admin-page__section">
                    <h2>⚡ Truy cập nhanh</h2>
                    <div className="admin-page__actions">
                        {quickActions.map((action) => (
                            <Link key={action.to} to={action.to} className="admin-action">
                                <span className="admin-action__icon">{action.icon}</span>
                                <div className="admin-action__text">
                                    <h4>{action.label}</h4>
                                    <p>{action.desc}</p>
                                </div>
                                <span className="admin-action__arrow">→</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Orders */}
                {allOrders && allOrders.length > 0 && (
                    <div className="admin-page__section">
                        <h2>📋 Đơn hàng gần đây</h2>
                        <div className="admin-page__table-wrap">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Mã đơn</th>
                                        <th>Tổng tiền</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allOrders.slice(0, 5).map((order) => (
                                        <tr key={order._id}>
                                            <td className="admin-table__id">
                                                {order._id.slice(-8).toUpperCase()}
                                            </td>
                                            <td className="admin-table__price">
                                                {Intl.NumberFormat('de-DE', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(order.total)}
                                            </td>
                                            <td>
                                                {!order.isPayment ? (
                                                    <span className="admin-badge admin-badge--yellow">
                                                        Chờ xác nhận
                                                    </span>
                                                ) : !order.istransported ? (
                                                    <span className="admin-badge admin-badge--blue">
                                                        Đang giao
                                                    </span>
                                                ) : order.isSuccess ? (
                                                    <span className="admin-badge admin-badge--green">
                                                        Đã giao
                                                    </span>
                                                ) : (
                                                    <span className="admin-badge admin-badge--red">
                                                        Đã hủy
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
