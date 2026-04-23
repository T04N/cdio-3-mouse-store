import './User.scss';
import logoUser from '../../../assets/imgs/userlogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faClipboardList, faPen, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function User() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    return (
        <div className="user-container">
            <form className="user-update"></form>
            <div className="user-left">
                <div className="user-info">
                    <img src={logoUser} alt="logo-user" />
                    <p>
                        <span className="user-info-name">{user.fullname}</span>
                        <span className="user-info-edit">
                            <FontAwesomeIcon icon={faPen} />
                            Sửa Hồ Sơ
                        </span>
                    </p>
                </div>
                <div className="user-account">
                    <Link to="/tai-khoan/tai-khoan-cua-toi" className="user-account-item">
                        <FontAwesomeIcon icon={faUser} />
                        Tài khoản của tôi
                    </Link>
                    <Link to="/tai-khoan/don-hang" className="user-account-item">
                        <FontAwesomeIcon icon={faClipboardList} />
                        Đơn mua
                    </Link>
                    <Link to="/tai-khoan/thong-bao" className="user-account-item">
                        <FontAwesomeIcon icon={faBell} />
                        Thông báo
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default User;
