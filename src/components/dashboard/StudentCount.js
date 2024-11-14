import React from 'react';

const StudentCount = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">전체 수강생</h2>
      <div className="text-3xl font-bold text-blue-500">
        {/* localStorage에서 전체 학생 수를 가져와 표시 */}
        0명
      </div>
    </div>
  );
};

export default StudentCount;