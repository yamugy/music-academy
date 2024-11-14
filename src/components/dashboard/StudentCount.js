import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const StudentCount = () => {
  const [students] = useLocalStorage('students', []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">전체 수강생</h2>
      <div className="text-3xl font-bold text-blue-500">
        {students.length}명
      </div>
    </div>
  );
};

export default StudentCount;