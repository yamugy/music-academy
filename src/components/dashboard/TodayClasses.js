import React, { useState, useEffect } from 'react';
import { dashboardApi } from '../../utils/api';

const TodayClasses = () => {
  const [weeklyClasses, setWeeklyClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await dashboardApi.getStats();
        if (response.success && response.data) {
          setWeeklyClasses(response.data.weeklyClasses.map(cls => ({
            ...cls,
            studentName: cls.studentId?.name || '미정'
          })));
        }
      } catch (error) {
        console.error('Failed to fetch classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return '오늘';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return '내일';
    }
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200">
      <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center space-x-3">
        <span className="bg-gray-100 text-gray-800 p-2.5 rounded-xl">
          📚
        </span>
        <span>주간 수업 일정</span>
      </h2>
      <div className="space-y-4">
        {loading ? (
          <div className="text-gray-700 bg-gray-50/80 rounded-xl p-4 backdrop-blur-sm border border-gray-200">
            로딩 중...
          </div>
        ) : weeklyClasses.length === 0 ? (
          <div className="text-gray-700 bg-gray-50/80 rounded-xl p-4 backdrop-blur-sm border border-gray-200">
            예정된 수업이 없습니다.
          </div>
        ) : (
          weeklyClasses.map(cls => (
            <div key={cls._id} className="bg-gray-50/80 rounded-xl p-4 backdrop-blur-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{cls.studentName}</h3>
                  <p className="text-sm text-gray-700">{cls.subject}</p>
                  <p className="text-sm text-gray-600">
                    {formatDate(cls.classDate)} {cls.classTime} ({cls.duration}분)
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodayClasses;