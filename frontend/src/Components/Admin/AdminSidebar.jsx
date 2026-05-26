import './AdminSidebar.scss';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/apiRequest';
import { createAxios } from '../../createInstance';
import { loginSuccess } from '../../redux/authSlice';
import logo from '../../assets/imgs/userlogo.png';

const AdminSidebar = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const location = useLocation();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleLogout = () => {
        logOut(dispatch, user?.id, user?.accessToken, axiosJWT);
    };

    const menuItems = [
        { to: '/', label: '🏠 Trang chủ' },
        { to: '/quan-li-san-pham', label: '📦 Quản lý sản phẩm' },
        { to: '/quan-li-nguoi-dung', label: '👥 Quản lý người dùng' },
        { to: '/quan-li-don-hang', label: '📋 Quản lý đơn hàng' },
    ];

    const otherItems = [
        '💬 Đánh giá bình luận',
        '📰 Tin tức',
        '💳 Thanh toán',
        '📊 Thống kê',
    ];

    return (
        <aside className="admin-sidebar">
            {/* User Info */}
            <div className="admin-sidebar__user">
                <img src={logo} alt="avatar" />
                <div className="admin-sidebar__user-info">
                    <p className="admin-sidebar__user-name">{user?.fullname}</p>
                    <span className="admin-sidebar__user-role">Quản trị viên</span>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="admin-sidebar__section-label">QUẢN LÝ</div>
            {menuItems.map((item) => (
                <Link
                    key={item.to}
                    to={item.to}
                    className={`admin-sidebar__item ${
                        location.pathname === item.to ? 'admin-sidebar__item--active' : ''
                    }`}
                >
                    {item.label}
                </Link>
            ))}

            {/* Other */}
            <div className="admin-sidebar__section-label">KHÁC</div>
            {otherItems.map((label, i) => (
                <div key={i} className="admin-sidebar__item admin-sidebar__item--disabled">
                    {label}
                </div>
            ))}

            {/* Logout */}
            <Link
                to="/"
                onClick={handleLogout}
                className="admin-sidebar__item admin-sidebar__logout"
            >
                🚪 Đăng xuất
            </Link>
        </aside>
    );
};

export default AdminSidebar;
