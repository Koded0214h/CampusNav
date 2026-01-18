import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptor for auth token if we implement login later
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getLocations = (search?: string) => {
    return api.get('locations/', { params: { search } });
};

export const getCampus = () => {
    return api.get('campuses/');
};

export const createReview = (data: any) => {
    return api.post('reviews/', data);
};

export default api;
