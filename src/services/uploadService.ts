import axios from 'axios';
import { authService } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const uploadService = {
    async uploadSingle(file: File, folderName: string) {
        const formData = new FormData();
        formData.append('file', file);

        const token = authService.getToken();
        const response = await axios.post(
            `${API_URL}/upload/${folderName}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    },

    async uploadMultiple(files: File[], folderName: string) {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        const token = authService.getToken();
        const response = await axios.post(
            `${API_URL}/upload/${folderName}/multiple`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    },

    async deleteFile(folderName: string, filename: string) {
        const token = authService.getToken();
        const response = await axios.delete(
            `${API_URL}/upload/${folderName}/${filename}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        return response.data;
    }
};