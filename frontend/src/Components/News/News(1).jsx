import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import './News.scss';

const newsList = [
    {
        id: 1,
        title: 'Laptop mới 2025: Công nghệ vượt trội, giá hấp dẫn',
        date: '17/07/2025',
        description: 'Các hãng lớn đồng loạt ra mắt laptop mới với chip AI, màn hình OLED, pin lâu hơn và giá tốt hơn.',
        content:
            'Năm 2025 đánh dấu sự bùng nổ của laptop tích hợp AI, màn hình OLED sắc nét, thời lượng pin vượt trội và thiết kế siêu mỏng nhẹ. Dell, Asus, Apple, HP, Lenovo... đều có sản phẩm nổi bật, đáp ứng nhu cầu học tập, làm việc và giải trí hiện đại.',
    },
    {
        id: 2,
        title: 'So sánh Macbook M4 và Dell XPS 2025: Ai dẫn đầu?',
        date: '15/07/2025',
        description: 'Macbook M4 và Dell XPS 2025 đều mạnh mẽ, nhưng đâu là lựa chọn tốt nhất cho bạn?',
        content:
            'Macbook M4 nổi bật với chip Apple Silicon mới, hiệu năng vượt trội, pin lâu. Dell XPS 2025 lại ghi điểm với màn hình cảm ứng, thiết kế viền siêu mỏng và nhiều cổng kết nối. Tùy nhu cầu, mỗi máy đều có ưu điểm riêng.',
    },
    {
        id: 3,
        title: '5 mẹo tăng tuổi thọ pin laptop bạn nên biết',
        date: '10/07/2025',
        description: 'Sử dụng laptop đúng cách giúp pin bền lâu, tiết kiệm chi phí thay thế.',
        content:
            'Hãy sạc pin đúng cách, tránh vừa sạc vừa dùng lâu dài, cập nhật driver, vệ sinh máy định kỳ và sử dụng chế độ tiết kiệm pin khi cần thiết để kéo dài tuổi thọ pin laptop.',
    },
];

export default function News() {
    const [selected, setSelected] = useState(null);

    return (
        <>
            <NavBar />
            <div className="news-container">
                <h1>Tin tức công nghệ</h1>
                <div className="news-list">
                    {newsList.map((news) => (
                        <div
                            className={`news-item${selected === news.id ? ' active' : ''}`}
                            key={news.id}
                            onClick={() => setSelected(news.id)}
                        >
                            <div className="news-info">
                                <h2>{news.title}</h2>
                                <span className="news-date">{news.date}</span>
                                <p>{news.description}</p>
                                {selected === news.id && (
                                    <div className="news-content">
                                        <p>{news.content}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
