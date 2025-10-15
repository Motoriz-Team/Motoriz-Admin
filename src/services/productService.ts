import axios from 'axios';
import { authService } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Axios interceptor untuk menambahkan token ke setiap request
axios.interceptors.request.use(
    (config) => {
        const token = authService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const productService = {
    async getAll(filters?: { category_id?: number; search?: string; product_type_id?: number }) {
        const params = new URLSearchParams();
        if (filters?.category_id) params.append('category_id', filters.category_id.toString());
        if (filters?.search) params.append('search', filters.search);
        if (filters?.product_type_id) params.append('product_type_id', filters.product_type_id.toString());

        const response = await axios.get(`${API_URL}/products?${params}`);
        return response.data;
    },

    async getById(id: number) {
        const response = await axios.get(`${API_URL}/products/${id}`);
        return response.data;
    },

    async create(productData: any) {
        const response = await axios.post(`${API_URL}/products`, productData);
        return response.data;
    },

    async update(id: number, productData: any) {
        const response = await axios.put(`${API_URL}/products/${id}`, productData);
        return response.data;
    },

    async delete(id: number) {
        const response = await axios.delete(`${API_URL}/products/${id}`);
        return response.data;
    }
};