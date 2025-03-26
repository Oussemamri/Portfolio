import axios from 'axios';

// Use environment variable for API URL or default to localhost in development
const API_URL = process.env.REACT_APP_API_URL || 'https://oussemaamri.com/api';

// Contact form submission
export const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/contact`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// Get all projects
export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};