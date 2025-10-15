import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const authService = {
    async login(email: string, password: string) {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        return response.data;
    },

    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
    },

    getToken() {
        return localStorage.getItem('authToken');
    },

    isAuthenticated() {
        return localStorage.getItem('isAuthenticated') === 'true';
    }
};

export default authService;