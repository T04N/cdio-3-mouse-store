import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import './Support.scss';

export default function Support() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            // Lấy dữ liệu cũ từ localStorage (nếu có)
            const existingRequests = JSON.parse(localStorage.getItem('supportRequests')) || [];

            // Thêm yêu cầu mới vào mảng
            const updatedRequests = [...existingRequests, form];

            // Lưu lại vào localStorage
            localStorage.setItem('supportRequests', JSON.stringify(updatedRequests));

            // Reset form và hiển thị thông báo
            setSuccess(true);
            setForm({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
        } catch (err) {
            setError('Đã có lỗi xảy ra khi lưu yêu cầu. Vui lòng thử lại!');
        }
    };

    return (
        <>
            <NavBar />
            <div className="support-container">
                <h1>Hỗ trợ khách hàng</h1>
                <form className="support-form" onSubmit={handleSubmit}>
                    <label>
                        Họ và tên
                        <input type="text" name="name" value={form.name} onChange={handleChange} required />
                    </label>
                    <label>
                        Email
                        <input type="email" name="email" value={form.email} onChange={handleChange} required />
                    </label>
                    <label>
                        Số điện thoại
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
                    </label>
                    <label>
                        Chủ đề hỗ trợ
                        <input type="text" name="subject" value={form.subject} onChange={handleChange} required />
                    </label>
                    <label>
                        Nội dung cần hỗ trợ
                        <textarea name="message" value={form.message} onChange={handleChange} rows={5} required />
                    </label>
                    <button type="submit">Gửi yêu cầu</button>
                    {success && (
                        <div className="support-success">✅ Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm nhất.</div>
                    )}
                    {error && <div className="support-error">❌ {error}</div>}
                </form>
            </div>
            <Footer />
        </>
    );
}
