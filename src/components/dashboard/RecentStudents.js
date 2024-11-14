import React from 'react';

const RecentStudents = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">최근 등록 학생</h2>
      <div className="space-y-3">
        {/* localStorage에서 최근 5명의 학생 데이터를 가져와 표시 */}
        <div className="text-gray-600">최근 등록된 학생이 없습니다.</div>
      </div>
    </div>
  );
};

export default RecentStudents;