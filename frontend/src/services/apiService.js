// API Configuration
const getApiBaseUrl = () => {
  // eslint-disable-next-line no-undef
  if (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) {
    // eslint-disable-next-line no-undef
    return process.env.REACT_APP_API_URL;
  }
  return 'http://localhost:8000/api';
};

const API_BASE_URL = getApiBaseUrl();

class APIService {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    this.token = this.getStoredToken();
  }

  // Token Management
  getStoredToken() {
    return localStorage.getItem('authToken');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  }

  // Request Headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  // Generic Request Method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || `HTTP Error: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication Endpoints
  async signUp(userData) {
    return this.request('/auth/sign-up/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async signIn(credentials) {
    return this.request('/auth/sign-in/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async signOut() {
    try {
      await this.request('/auth/sign-out/', {
        method: 'POST',
      });
    } finally {
      this.clearToken();
    }
  }

  async verifyToken(token) {
    return this.request('/auth/verify-token/', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }

  async requestPasswordReset(email) {
    return this.request('/auth/request-password-reset/', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // User Endpoints
  async getCurrentUser() {
    return this.request('/user/me/', {
      method: 'GET',
    });
  }

  async updateUserProfile(profileData) {
    return this.request('/user/profile/update/', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Health Check
  async healthCheck() {
    return this.request('/health/', {
      method: 'POST',
    });
  }
}

export default new APIService();
