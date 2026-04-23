import logoUser from '../../../assets/imgs/userlogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { updateUser } from '../../../redux/apiRequest';
import { createAxios } from '../../../createInstance';
import { loginSuccess } from '../../../redux/authSlice';
import User from '../User/User';
import './EditUser.scss';
import Footer from '../../Footer/Footer';
import NavBar from '../../NavBar/NavBar';

function EditUser() {
    const user = useSelector((state) => state.auth.login?.currentUser);

    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const [newfullname, setNewFullname] = useState(user.fullname);
    const [newEmail, setNewEmail] = useState(user.email);
    const [newPhone, setNewPhone] = useState(user.phone);
    const [newAddress, setNewAddress] = useState(user.address);
    const [newUsername, setNewUsername] = useState(user.username);
    const [newPassword, setNewPassword] = useState('**********');

    const handleShowPassword = () => {
        const line = document.querySelector('.edituser-right-info-left-item-line');
        if (newPassword === '**********') {
            line.style.display = 'block';
            setNewPassword(user.password);
        } else {
            line.style.display = 'none';
            setNewPassword('**********');
        }
    };

    //Cho phép edit thông tin
    const handleEditInfo = () => {
        const setInput = document.querySelectorAll('.edituser-right-info-left-item input');
        const buttons = document.querySelectorAll('.edituser-right-info-left-btn button');
        for (let i = 0; i < setInput.length; i++) {
            setInput[i].removeAttribute('disabled');
        }
        setNewPassword(user.password);
        buttons[0].style.opacity = '1';
        buttons[0].style.cursor = 'pointer';
        buttons[1].setAttribute('disabled', '');
        buttons[1].style.opacity = '0.6';
        buttons[1].style.cursor = 'default';
    };

    //lưu biến chỉnh sửa
    const newUser = {
        fullname: newfullname,
        email: newEmail,
        phone: newPhone,
        address: newAddress,
        username: newUsername,
        password: newPassword,
    };

    const handleUpdateUser = () => {
        if (
            newfullname === '' &&
            newEmail === '' &&
            newPhone === '' &&
            newAddress === '' &&
            newUsername === '' &&
            newPassword === ''
        ) {
            alert('Lỗi: Không được để trống thông tin');
        } else if (newfullname.length < 5) {
            alert('Lỗi: Độ tên phải từ 5 - 30 ký tự');
        } else if (newEmail.length < 10) {
            alert('Lỗi: Độ dài email từ 10 - 40 ký tự');
        } else if (newPhone.length < 10 || newPhone.length > 12) {
            alert('Lỗi: số điện thoại không hợp lệ');
        } else if (newAddress.length < 5) {
            alert('Lỗi: Độ dài địa phải từ 5 - 40 ký tự');
        } else if (newUsername < 7) {
            alert('Lỗi: Độ dài tài khoản từ 7 - 40 ký tự');
        } else if (newPassword < 7) {
            alert('Lỗi: Độ dài mật khẩu từ 7 - 40 ký tự');
        } else {
            updateUser(user?.accessToken, dispatch, user?._id, axiosJWT, newUser);
        }
    };

    return (
        <div className="edituser-container">
            <NavBar />
            <div className="edituser-wrapper">
                <User />
                <div className="edituser-right">
                    <p>
                        Hồ Sơ Của Tôi
                        <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
                    </p>
                    <div className="edituser-right-info">
                        <div className="edituser-right-info-left">
                            <div className="edituser-right-info-left-item">
                                <p>Tên đăng nhập </p>
                                <input
                                    type="text"
                                    value={newfullname}
                                    maxLength="30"
                                    onChange={(e) => setNewFullname(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="edituser-right-info-left-item">
                                <p>Email</p>
                                <input
                                    type="text"
                                    value={newEmail}
                                    maxLength="40"
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="edituser-right-info-left-item">
                                <p>Số điện thoại</p>
                                <input
                                    type="number"
                                    value={newPhone}
                                    maxLength="12"
                                    onChange={(e) => setNewPhone(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="edituser-right-info-left-item">
                                <p>Địa chỉ</p>
                                <input
                                    type="text"
                                    value={newAddress}
                                    maxLength="40"
                                    onChange={(e) => setNewAddress(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="edituser-right-info-left-item">
                                <p>Tài khoản</p>
                                <input
                                    type="text"
                                    value={newUsername}
                                    maxLength="40"
                                    disabled
                                    onChange={(e) => setNewUsername(e.target.value)}
                                />
                            </div>
                            <div className="edituser-right-info-left-item">
                                <p>Mật khẩu</p>
                                <input
                                    type="text"
                                    value={newPassword}
                                    maxLength="40"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    disabled
                                />
                                <FontAwesomeIcon icon={faEye} onClick={handleShowPassword} />
                                <div className="edituser-right-info-left-item-line" onClick={handleShowPassword}></div>
                            </div>
                            <div className="edituser-right-info-left-btn">
                                <button style={{ opacity: 0.6, cursor: 'default' }} onClick={handleUpdateUser}>
                                    Lưu
                                </button>
                                <button onClick={(e) => handleEditInfo(e.target.value)}>Chỉnh sửa</button>
                            </div>
                        </div>
                        <div className="edituser-right-info-right">
                            <img src={logoUser} alt="logo" />
                            <input type="file" id="edituser-file-input" />
                            <label htmlFor="edituser-file-input">Chọn ảnh</label>
                            <span>Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EditUser;
