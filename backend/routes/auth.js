const authControllers = require('../controllers/authControllers');
const middlewareController = require('../controllers/middlewareController');

const router = require('express').Router();

//register
router.post('/register', authControllers.registerUser);

//login
router.post('/login', authControllers.loginUser);

//refresh token
router.post('/refresh', authControllers.requestRefreshToken);

//logout
router.post('/logout', middlewareController.verifyToken, authControllers.userLogout);

//update user
router.put('/update/:id', authControllers.updateUser);

// [TẠM THỜI] Tạo tài khoản admin test — XÓA KHI DEPLOY
router.post('/create-test-admin', async (req, res) => {
    try {
        const User = require('../models/User');
        const existing = await User.findOne({ username: 'admin' });
        if (existing) {
            // Nếu đã có, set admin = true
            existing.admin = true;
            await existing.save();
            return res.status(200).json({ message: 'Đã set admin cho tài khoản "admin"', user: existing });
        }
        const adminUser = new User({
            fullname: 'Admin Test',
            email: 'admin@test.com',
            phone: '0000000000',
            address: 'Test',
            username: 'admin',
            password: 'admin123',
            admin: true,
        });
        await adminUser.save();
        res.status(200).json({ message: 'Tạo admin thành công!', username: 'admin', password: 'admin123' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
