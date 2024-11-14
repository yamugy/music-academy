
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const api = {
  // 강좌 관련
  getCourses: () => axios.get(`${API_BASE_URL}/courses`),
  getCourse: (id) => axios.get(`${API_BASE_URL}/courses/${id}`),
  createCourse: (data) => axios.post(`${API_BASE_URL}/courses`, data),
  updateCourse: (id, data) => axios.put(`${API_BASE_URL}/courses/${id}`, data),
  
  // 사용자 관련
  getUsers: () => axios.get(`${API_BASE_URL}/users`),
  getUser: (id) => axios.get(`${API_BASE_URL}/users/${id}`),
  createUser: (data) => axios.post(`${API_BASE_URL}/users`, data),
  updateUser: (id, data) => axios.put(`${API_BASE_URL}/users/${id}`, data)
};