import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import './About.scss';

export default function About() {
    return (
        <>
            <NavBar />
            <div className="about-container">
                <h1>
                    Giới thiệu về MouseStore
                </h1>
                <div className="about-hero">
                    <div className="about-hero__img">
                        <img src="https://cdn-icons-png.flaticon.com/512/2920/2920256.png" alt="MouseStore Logo" />
                    </div>
                    <div className="about-hero__desc">
                        <p>
                            MouseStore là hệ thống bán lẻ laptop, phụ kiện và thiết bị công nghệ uy tín tại Việt
                            Nam. Chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng, giá cả cạnh tranh
                            cùng dịch vụ hỗ trợ tận tâm.
                        </p>
                        <div className="about-hero__features">
                            <div>
                                <i className="fa-solid fa-laptop"></i>
                                <span>Đa dạng sản phẩm</span>
                            </div>
                            <div>
                                <i className="fa-solid fa-headset"></i>
                                <span>Tư vấn chuyên nghiệp</span>
                            </div>
                            <div>
                                <i className="fa-solid fa-shield-halved"></i>
                                <span>Bảo hành rõ ràng</span>
                            </div>
                            <div>
                                <i className="fa-solid fa-truck-fast"></i>
                                <span>Giao hàng nhanh</span>
                            </div>
                        </div>
                        <p className="about-hero__slogan">
                            MouseStore luôn nỗ lực phát triển để trở thành địa chỉ tin cậy cho mọi khách hàng yêu công
                            nghệ!
                        </p>
                    </div>
                </div>

                <div className="about-section about-mission">
                    <h2>
                        <i className="fa-solid fa-bullseye"></i> Sứ mệnh
                    </h2>
                    <p>
                        Mang đến giải pháp công nghệ hiện đại, giúp khách hàng tiếp cận sản phẩm chính hãng với dịch vụ
                        tốt nhất.
                    </p>
                </div>

                <div className="about-section about-vision">
                    <h2>
                        <i className="fa-solid fa-eye"></i> Tầm nhìn
                    </h2>
                    <p>
                        Trở thành hệ thống bán lẻ laptop và thiết bị công nghệ hàng đầu Việt Nam, luôn đổi mới và phát
                        triển vì lợi ích khách hàng.
                    </p>
                </div>

                <div className="about-section about-values">
                    <h2>
                        <i className="fa-solid fa-gem"></i> Giá trị cốt lõi
                    </h2>
                    <ul>
                        <li>Khách hàng là trung tâm</li>
                        <li>Chất lượng tạo nên uy tín</li>
                        <li>Đổi mới không ngừng</li>
                        <li>Hợp tác và phát triển bền vững</li>
                    </ul>
                </div>

                <div className="about-section about-contact">
                    <h2>
                        <i className="fa-solid fa-address-book"></i> Thông tin liên hệ
                    </h2>
                    <div className="contact-container">
                        <div className="map-container">
                            <iframe
                                title="MouseStore Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1234567890123!2d106.70000000000001!3d10.776000000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1a2b3c4d5f%3A0x123456789abcdef!2zMTIzIMSQxrDhu51uZyBDw6BuZyBOaMOgbmcsIFF14bqjbmcgMSwgVMOibiBIw6BuIEjDoCBOaOG7pywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v0000000000000"
                                width="300"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div className="contact-info">
                            <p>Địa chỉ: 123 Đường Công Nghệ, Quận 1, TP. Hồ Chí Minh</p>
                            <p>Hotline: 0123 456 789</p>
                            <p>Email: support@mousestore.vn</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
