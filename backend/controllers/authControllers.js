const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const middlewareController = require('./middlewareController.js');

var refreshTokensArr = [];
var AccessTokensArr = [];

const authControllers = {
    //register
    registerUser: async (req, res) => {
        try {
            //create new User
            const newUser = await new User({
                fullname: req.body.fullname,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                username: req.body.username,
                password: req.body.password,
            });

            //save to database
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //token
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: '365d' },
        );
    },
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin,
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: '365d' },
        );
    },

    //Login user
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json('Tài khoản không tồn tại');
            } else {
                if (req.body.password !== user.password) {
                    return res.status(404).json('Mật khẩu không chính xác');
                } else {
                    const accessToken = authControllers.generateAccessToken(user);
                    const refreshToken = authControllers.generateRefreshToken(user);
                    AccessTokensArr.push(accessToken);
                    refreshTokensArr.push(refreshToken);

                    //lưu cookie
                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        secure: false,
                        path: '/',
                        sameSite: 'strict',
                    });

                    //trả dữ liệu về
                    const { ...others } = user._doc;
                    res.status(200).json({ ...others, accessToken });
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //logout user
    userLogout: async (req, res) => {
        res.clearCookie('refreshToken');
        refreshTokensArr = refreshTokensArr.filter((token) => token != req.cookies.refreshToken);
        res.status(200).json('Logout successfully');
    },

    //refresh token
    requestRefreshToken: async (req, res) => {
        const refreshToken = refreshTokensArr[0];

        if (!refreshToken) {
            return res.status(401).json('Bạn chưa chứng thực tài khoản');
        }
        if (!refreshTokensArr.includes(refreshToken)) {
            return res.status(403).json('Refresh token is not valid');
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                return res.status(403).json(err);
            }
            refreshTokensArr = refreshTokensArr.filter((token) => token !== refreshToken);

            const newAccessToken = authControllers.generateAccessToken(user);
            const newRefreshToken = authControllers.generateRefreshToken(user);

            refreshTokensArr.push(newRefreshToken);

            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            });

            res.status(200).json({ accessToken: newAccessToken });
        });
    },

    //update info User
    updateUser: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body.body);
            const userUpdate = await User.findById(req.params.id);
            const accessToken = AccessTokensArr[0];
            res.status(200).json({ ...userUpdate._doc, accessToken });
        } catch (error) {
            res.status(500).json('Cập nhật thông tin thất bại');
        }
    },
};

module.exports = authControllers;
