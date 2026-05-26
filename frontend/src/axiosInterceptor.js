import axios from 'axios';

// ===== AXIOS GLOBAL INTERCEPTOR =====
// Log tất cả request & response ra console cho dễ debug

// REQUEST interceptor
axios.interceptors.request.use(
    (config) => {
        const method = config.method?.toUpperCase();
        const url = config.url;
        console.log(
            `%c📤 REQUEST  ${method} ${url}`,
            'color: #2196F3; font-weight: bold;',
        );
        if (config.params) {
            console.log('   Params:', config.params);
        }
        if (config.data) {
            console.log('   Body:', config.data);
        }
        if (config.headers?.token) {
            console.log('   Token:', config.headers.token.substring(0, 30) + '...');
        }
        return config;
    },
    (error) => {
        console.log(
            `%c❌ REQUEST ERROR`,
            'color: #f44336; font-weight: bold;',
            error.message,
        );
        return Promise.reject(error);
    },
);

// RESPONSE interceptor
axios.interceptors.response.use(
    (response) => {
        const method = response.config.method?.toUpperCase();
        const url = response.config.url;
        const status = response.status;
        console.log(
            `%c📥 RESPONSE ${status} ${method} ${url}`,
            'color: #4CAF50; font-weight: bold;',
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
                `%c❌ RESPONSE ${status} ${method} ${url}`,
                'color: #f44336; font-weight: bold;',
            );
            console.log('   Error Data:', error.response.data);
        } else {
            console.log(
                `%c❌ NETWORK ERROR`,
                'color: #f44336; font-weight: bold;',
                error.message,
            );
        }
        return Promise.reject(error);
    },
);

export default axios;
