import axios from 'axios';
import jwt_decode from 'jwt-decode';

//refresh token
const refreshToken = async () => {
    try {
        const res = await axios.post('http://localhost:8000/v1/auth/refresh', {
            withCredentials: true, //bắt buộc xác thực
        });
        return res.data;
    } catch (error) {
        console.log('Lỗi refresh token ' + error);
    }
};

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwt_decode(user?.accessToken); //lấy token đã giải mã
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                };
                dispatch(stateSuccess(refreshUser)); //lấy thông tin mới của user
                config.headers['token'] = 'Bearer ' + data.accessToken; //thay thế headers đã có bằng headers mới với accessToken mới
            }

            // === LOG REQUEST ===
            const method = config.method?.toUpperCase();
            const url = config.url;
            console.log(
                `%c📤 [JWT] REQUEST  ${method} ${url}`,
                'color: #FF9800; font-weight: bold;',
            );
            if (config.data) {
                console.log('   Body:', config.data);
            }

            return config; //trả về thông tin mới
        },
        (error) => {
            console.log(
                `%c❌ [JWT] REQUEST ERROR`,
                'color: #f44336; font-weight: bold;',
                error.message,
            );
            return Promise.reject(error); //trả về lỗi
        },
    );

    // === LOG RESPONSE cho axiosJWT ===
    newInstance.interceptors.response.use(
        (response) => {
            const method = response.config.method?.toUpperCase();
            const url = response.config.url;
            const status = response.status;
            console.log(
                `%c📥 [JWT] RESPONSE ${status} ${method} ${url}`,
                'color: #8BC34A; font-weight: bold;',
            );
            if (response.data) {
                console.log('   Data:', response.data);
            }
            return response;
        },
        (error) => {
            if (error.response) {
                const method = error.config?.method?.toUpperCase();
                const url = error.config?.url;
                const status = error.response.status;
                console.log(
                    `%c❌ [JWT] RESPONSE ${status} ${method} ${url}`,
                    'color: #f44336; font-weight: bold;',
                );
                console.log('   Error Data:', error.response.data);
            } else {
                console.log(
                    `%c❌ [JWT] NETWORK ERROR`,
                    'color: #f44336; font-weight: bold;',
                    error.message,
                );
            }
            return Promise.reject(error);
        },
    );

    return newInstance;
};
