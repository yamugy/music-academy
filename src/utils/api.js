import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 타임아웃 설정
  headers: {
    'Content-Type': 'application/json'
  }
});

// 인터셉터 개선
api.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNABORTED') {
      console.error('요청 시간이 초과되었습니다.');
    } else if (!error.response) {
      console.error('네트워크 연결에 실패했습니다.');
    } else {
      console.error('API Error:', error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

const createApiMethods = (endpoint) => ({
  getAll: async () => {
    const response = await api.get(`/${endpoint}`);
    return response.data;
  },
  getOne: async (id) => {
    const response = await api.get(`/${endpoint}/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post(`/${endpoint}`, data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/${endpoint}/${id}`, data); // data 파라미터 추가
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/${endpoint}/${id}`);
    return response.data;
  },
  getByStudentId: async (studentId) => {
    const response = await api.get(`/${endpoint}/student/${studentId}`);
    return response.data;
  }
});

export const studentApi = {
  getAll: async () => {
    const response = await api.get('/students');
    return response.data;
  },
  getOne: async (id) => {
    try {
      if (!id) {
        console.error('Invalid student ID:', id);
        throw new Error('학생 ID가 필요합니다.');
      }
      
      console.log('Fetching student with ID:', id); // 디버깅용
      const response = await api.get(`/students/${id}`);
      
      if (!response.data) {
        console.error('No data in response');
        throw new Error('학생 정보를 찾을 수 없습니다.');
      }

      console.log('Received student data:', response.data); // 디버깅용
      return response.data;
      
    } catch (error) {
      console.error('학생 정보 조회 실패:', error);
      if (error.response?.status === 404) {
        throw new Error('학생 정보를 찾을 수 없습니다.');
      }
      throw new Error(error.response?.data?.message || '학생 정보를 불러오는데 실패했습니다.');
    }
  },
  create: async (data) => {
    const response = await api.post('/students', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/students/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    try {
      const response = await api.delete(`/students/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete student error:', error);
      throw error;
    }
  },
  getByStudentId: async (studentId) => {
    const response = await api.get(`/students/student/${studentId}`);
    return response.data;
  }
};

export const classApi = createApiMethods('classes');

export const paymentApi = {
  getAll: async () => {
    const response = await api.get('/payments');
    return response.data;
  },
  getOne: async (id) => {
    const response = await api.get(`/payments/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/payments', data);
    return response.data;
  },
  update: async (id, data) => {
    try {
      console.log('Updating payment:', id, data); // 디버깅용
      const response = await api.put(`/payments/${id}`, data); // 경로 수정
      return response.data;
    } catch (error) {
      console.error('Update API error:', error);
      throw error;
    }
  },
  delete: async (id) => {
    try {
      if (!id) {
        throw new Error('삭제할 결제 내역의 ID가 유효하지 않습니다.');
      }
      const response = await api.delete(`/payments/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('해당 결제 내역을 찾을 수 없습니다.');
      }
      throw new Error(error.response?.data?.message || '삭제 처리 중 오류가 발생했습니다.');
    }
  },
  // ��생별 결제 내역 조회 메서드 추가
  getByStudentId: async (studentId) => {
    try {
      const response = await api.get(`/payments/student/${studentId}`);
      return response.data;
    } catch (error) {
      console.error('Get payments by student error:', error);
      throw error;
    }
  }
};

export const dashboardApi = {
  getStats: async () => {
    try {
      const response = await api.get('/dashboard/stats');
      // 날짜 형식 변환 처리
      const data = response.data;
      if (data.weeklyClasses) {
        data.weeklyClasses = data.weeklyClasses.map(cls => ({
          ...cls,
          classDate: new Date(cls.classDate).toISOString().split('T')[0]
        }));
      }
      return data;
    } catch (error) {
      console.error('Dashboard stats error:', error);
      throw error;
    }
  }
};