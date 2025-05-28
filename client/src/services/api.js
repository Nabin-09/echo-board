// src/services/apiService.js

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic API request
  async request(endpoint, { method = 'GET', body = null } = {}) {
    const token = localStorage.getItem('adminToken');

    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method,
        headers,
        body,
      });

      const data = await response.json();

      return {
        ok: response.ok,
        status: response.status,
        data,
      };
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Admin login
  async adminLogin(credentials) {
    const response = await this.request('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    console.log('🔁 Login full response:', response);

    const token = response?.data?.data?.token; // <- exact structure from Postman

    if (token) {
      localStorage.setItem('adminToken', token);
      console.log('✅ Token saved to localStorage:', token);
    } else {
      console.warn('❌ Token not found in login response:', response);
    }

    return response;
  }

  // Admin logout
  adminLogout() {
    localStorage.removeItem('adminToken');
  }

  // Check auth state
  isAuthenticated() {
    return !!localStorage.getItem('adminToken');
  }

  // Feedback endpoints
  async submitFeedback(feedbackData) {
    return this.request('/feedback', {
      method: 'POST',
      body: JSON.stringify(feedbackData),
    });
  }

  async getAllFeedback() {
    return this.request('/feedback', {
      method: 'GET',
    });
  }

  async deleteFeedback(id) {
    return this.request(`/feedback/${id}`, {
      method: 'DELETE',
    });
  }

  // Optional health check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new ApiService();
