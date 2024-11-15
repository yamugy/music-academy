import React, { useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const DashboardOverview = () => {
  const [classes] = useLocalStorage('classes', []);
  const [students] = useLocalStorage('students', []);

  const todayClasses = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return classes.filter(classItem => classItem.classDate === today);
  }, [classes]);

  return (
    <div className="card p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">수업 현황</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">전체 수업</p>
            <p className="text-2xl font-bold text-blue-700">{classes.length}개</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">오늘 수업</p>
            <p className="text-2xl font-bold text-green-700">{todayClasses.length}개</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-lg font-medium text-gray-700 mb-3">오늘의 수업 목록</h4>
          <div className="space-y-2">
            {todayClasses.length > 0 ? (
              todayClasses.map(classItem => {
                const student = students.find(s => s.id === classItem.studentId);
                return (
                  <div key={classItem.id} className="bg-white p-3 rounded-lg border shadow-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">{student?.name || '미확인 학생'}</p>
                        <p className="text-sm text-gray-600">{classItem.subject}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-700">{classItem.classTime}</p>
                        <p className="text-sm text-gray-500">{classItem.duration}분</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-4">오늘 예정된 수업이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;