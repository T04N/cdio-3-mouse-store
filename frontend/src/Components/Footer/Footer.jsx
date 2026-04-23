import { faCarSide, faLaptopHouse, faMedal, faPiggyBank, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.scss';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-list">
                <div className="footer-list-item">
                    <FontAwesomeIcon icon={faCarSide} />
                    <span>Giao hàng hoả tốc trong 90 phút</span>
                </div>
                <div className="footer-line"></div>
                <div className="footer-list-item">
                    <FontAwesomeIcon icon={faPiggyBank} />
                    <span>Thanh toán linh hoạt: tiền mặt, banking, trả góp</span>
                </div>
                <div className="footer-line"></div>
                <div className="footer-list-item">
                    <FontAwesomeIcon icon={faLaptopHouse} />
                    <span>Trải nghiệm sản phẩm tại nhà</span>
                </div>
                <div className="footer-line"></div>
                <div className="footer-list-item">
                    <FontAwesomeIcon icon={faMedal} />
                    <span>Lỗi đổi tại nhà trong 1 ngày</span>
                </div>
                <div className="footer-line"></div>
                <div className="footer-list-item">
                    <FontAwesomeIcon icon={faQuestion} />
                    <span>Hỗ trợ suốt thời gian sử dụng. Hotline: 0987 6543 210</span>
                </div>
            </div>
            <div className="footer-section">
                <div className="footer-item">
                    <h3>Giới thiệu</h3>
                    <Link to="/gioi-thieu">Giới Thiệu Về MouseStore Việt Nam</Link>
                    <Link to="/tuyen-dung">Tuyển Dụng</Link>
                    <Link to="/">Điều Khoản MouseStore</Link>
                </div>
                <div className="footer-item">
                    <h3>Liên hệ</h3>
                    <a href="https://www.facebook.com/">Liên hệ qua Facebook</a>
                    <a href="https://www.instagram.com/">Liên hệ qua Instagram</a>
                    <a href="https://www.tiktok.com/">Liên hệ qua Tiktok</a>
                </div>
                <div className="footer-item">
                    <h3>Laptop MouseStore</h3>
                    <span>Cơ sở 1: 333 Hai Bà Trưng – Hà Nội</span>
                    <span>Cơ sở 2: 666 Quang Trung – Đà Nẵng</span>
                    <span>Cơ sở 3: 999 Hàm Nghi – TPHCM</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
