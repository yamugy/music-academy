import { useState, useEffect } from 'react';
import * as api from '../utils/api';

export const useServerData = (endpoint, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiMethods = {
    students: api.studentApi,
    classes: api.classApi,
    payments: api.paymentApi
  }[endpoint];

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiMethods.getAll();
      setData(response);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (newData) => {
    try {
      if (Array.isArray(newData)) {
        setData(newData); // 직접 상태 업데이트
        return newData;
      } else {
        const response = await apiMethods.update(newData._id, newData);
        await fetchData();
        return response;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return [data, updateData, loading, error];
};