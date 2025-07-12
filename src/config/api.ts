// API configuration for different environments
const API_CONFIG = {
  development: {
    baseUrl: 'http://localhost:8000'
  },
  production: {
    baseUrl: import.meta.env.VITE_API_URL || 'https://your-backend-url.com'
  }
};

const isDevelopment = import.meta.env.DEV;
const config = isDevelopment ? API_CONFIG.development : API_CONFIG.production;

export const API_BASE_URL = config.baseUrl;

export const API_ENDPOINTS = {
  compare: `${API_BASE_URL}/compare`,
  health: `${API_BASE_URL}/health`
}; 