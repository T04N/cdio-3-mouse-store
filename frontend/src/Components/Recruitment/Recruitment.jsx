import './Recruitment.scss';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { useState } from 'react';
import ApplyForm from '../ApplyForm/ApplyForm';


function Recruitment() {
  const [showForm, setShowForm] = useState(false);

  const positions = [
    {
      title: 'Nhân viên bán hàng',
      location: 'Hà Nội',
      type: 'Toàn thời gian',
      description: 'Tư vấn và bán các sản phẩm laptop, phụ kiện, hỗ trợ khách hàng tại cửa hàng.'
    },
    {
      title: 'Kỹ thuật viên sửa chữa',
      location: 'TP.HCM',
      type: 'Toàn thời gian',
      description: 'Kiểm tra, chẩn đoán và sửa chữa các lỗi phần cứng, phần mềm máy tính.'
    },
    {
      title: 'Chuyên viên Marketing',
      location: 'Remote',
      type: 'Bán thời gian',
      description: 'Lên kế hoạch và triển khai các chiến dịch quảng cáo trên mạng xã hội.'
    },
  ];

  return (
    <>
      <NavBar />
      <div className={`recruitment-page ${showForm ? 'blurred' : ''}`}>
        <h1 className="title">Cơ Hội Nghề Nghiệp tại Mouse Store</h1>
        <p className="intro">
          Mouse Store luôn chào đón những ứng viên năng động, sáng tạo và đam mê công nghệ. Hãy tham gia cùng chúng tôi!
        </p>

        <div className="job-list">
          {positions.map((job, index) => (
            <div className="job-card" key={index}>
              <h2>{job.title}</h2>
              <p><strong>Địa điểm:</strong> {job.location}</p>
              <p><strong>Hình thức:</strong> {job.type}</p>
              <p>{job.description}</p>
              <button className="apply-btn" onClick={() => setShowForm(true)}>Ứng tuyển ngay</button>
            </div>
          ))}
        </div>

        <div className="contact-info">
          <h3>Liên hệ</h3>
          <p>Email: <a href="mailto:tuyendung@mouse.vn">tuyendung@mouse.vn</a></p>
          <p>Hotline: 1800 1234</p>
        </div>
      </div>

      {showForm && <ApplyForm onClose={() => setShowForm(false)} />}
      <Footer />
    </>
  );
}

export default Recruitment;
