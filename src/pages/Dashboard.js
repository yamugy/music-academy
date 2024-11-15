<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { dashboardApi } from '../utils/api';
import Calendar from '../components/dashboard/Calendar';
=======
<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { dashboardApi } from '../utils/api';
import Calendar from '../components/dashboard/Calendar';
=======
import React from 'react';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import TodayClasses from '../components/dashboard/TodayClasses';
>>>>>>> 8b4305ea2df8aa5b80341974ef0a46c81c39452c
>>>>>>> af54ef1e75cb24a9242382d86a7f608a300dba09

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    recentPayments: [],
    monthlyClasses: []
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await dashboardApi.getStats();
      
      if (response.success && response.data) {
        // 날짜 데이터 정제
        const processedData = {
          ...response.data,
          monthlyClasses: response.data.monthlyClasses.map(cls => ({
            ...cls,
            studentName: cls.studentId?.name || '미정',
            classDate: cls.classDate
          }))
        };
        setStats(processedData);
      } else {
        throw new Error('데이터 형식이 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      setError(error.response?.data?.message || '데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDateClick = (date, classes) => {
    setSelectedDate(date);
    setSelectedClasses(classes);
  };

  if (loading) return <div className="text-center py-10">로딩 중...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> af54ef1e75cb24a9242382d86a7f608a300dba09
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">대시보드</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Calendar 
            classes={stats.monthlyClasses || []} 
            onDateClick={handleDateClick}
          />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">전체 학생 수</h3>
            <p className="text-2xl font-bold">{stats.totalStudents}명</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">최근 결제 내역</h2>
            <div className="divide-y">
              {stats.recentPayments.map(payment => (
                <div key={payment._id} className="py-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{payment.studentId?.name}</span>
                    <span className="text-gray-600">{Number(payment.amount).toLocaleString()}원</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(payment.paymentDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
<<<<<<< HEAD
=======
=======
    <div className="bg-dashboard">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        대시보드
      </h1>
      <div className="space-y-8">
        <DashboardOverview />
        <div className="grid grid-cols-1 gap-8">
          <TodayClasses />
>>>>>>> 8b4305ea2df8aa5b80341974ef0a46c81c39452c
>>>>>>> af54ef1e75cb24a9242382d86a7f608a300dba09
        </div>
      </div>

      {selectedDate && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            {selectedDate} 수업 목록
          </h2>
          <div className="divide-y">
            {selectedClasses.length > 0 ? (
              selectedClasses.map(lesson => (
                <div key={lesson._id} className="py-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{lesson.studentId?.name}</span>
                    <div className="text-gray-600">
                      <span>{lesson.classTime} ({lesson.duration}분)</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{lesson.subject}</div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                예정된 수업이 없습니다.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;