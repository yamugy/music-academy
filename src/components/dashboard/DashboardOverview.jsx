import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const DashboardOverview = () => {
  const [classes] = useLocalStorage('classes', []);
  const [students] = useLocalStorage('students', []);

  const calculateStats = () => ({
    totalClasses: classes.length,
    subjectDistribution: students.reduce((acc, student) => {
      acc[student.subject] = (acc[student.subject] || 0) + 1;
      return acc;
    }, {})
  });

  const stats = calculateStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900">수업 현황</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalClasses}개</p>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900">과목별 분포</h3>
        <div className="mt-4 space-y-2">
          {Object.entries(stats.subjectDistribution).map(([subject, count]) => (
            <div key={subject} className="flex justify-between items-center">
              <span className="text-gray-700">{subject}</span>
              <span className="font-semibold text-gray-800">{count}명</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;