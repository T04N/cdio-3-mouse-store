import '../ApplyForm/ApplyForm.scss';

const ApplyForm = ({ jobTitle = "Không xác định", onClose }) => {
  return (
    <div className="form-overlay">
      <div className="apply-form">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>Ứng tuyển vị trí: {jobTitle}</h3>
        <form>
          <label htmlFor="fullname">Họ tên:</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Nhập họ tên của bạn"
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Nhập địa chỉ email"
            required
          />

          <label htmlFor="phone">Số điện thoại:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Nhập số điện thoại"
            required
          />

          <label htmlFor="dob">Ngày sinh:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            required
          />

          <label>Giới tính:</label>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <label>
              <input type="radio" name="gender" value="Nam" required /> Nam
            </label>
            <label>
              <input type="radio" name="gender" value="Nữ" required /> Nữ
            </label>
            <label>
              <input type="radio" name="gender" value="Khác" required /> Khác
            </label>
          </div>

          <label htmlFor="cv">Tải CV của bạn:</label>
          <input
            type="file"
            id="cv"
            name="cv"
            accept=".pdf,.doc,.docx"
            required
          />

          <label htmlFor="note">Ghi chú:</label>
          <textarea
            id="note"
            name="note"
            placeholder="Ghi chú thêm nếu có"
          />

          <button type="submit" className="submit-btn">Gửi</button>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
