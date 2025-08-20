const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export const apiConfig = {
    baseURL: API_BASE_URL,
    endpoints: {
        qr: `${API_BASE_URL}/api/qr`,
        users: `${API_BASE_URL}/api/users`,
        auth: `${API_BASE_URL}/api/auth`,
    }
};

export const buildUrl = (endpoint: string, path: string = '') => {
    return `${endpoint}${path}`;
};