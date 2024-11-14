import React, { useState, useEffect } from 'react';

const Calendar = ({ classes }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // 이전 달의 날짜들
    for (let i = 0; i < firstDay.getDay(); i++) {
      const prevDate = new Date(year, month, -i);
      days.unshift({ date: prevDate, isCurrentMonth: false });
    }
    
    // 현재 달의 날짜들
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ 
        date: new Date(year, month, i), 
        isCurrentMonth: true 
      });
    }
    
    return days;
  };

  const getClassesForDate = (date) => {
    return classes.filter(cls => {
      const classDate = new Date(cls.classDate);
      return classDate.toDateString() === date.toDateString();
    });
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
          className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
        >
          ←
        </button>
        <h2 className="text-lg font-semibold">
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </h2>
        <button
          onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
          className="p-2 hover:bg-gray-100 rounded"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
          <div key={day} className="text-center py-2 font-semibold">
            {day}
          </div>
        ))}
        
        {days.map((day, index) => {
          const dayClasses = getClassesForDate(day.date);
          return (
            <div
              key={index}
              onClick={() => {
                setSelectedDate(day.date);
                if (dayClasses.length > 0) setModalOpen(true);
              }}
              className={`
                p-2 text-center cursor-pointer hover:bg-gray-50 relative
                ${!day.isCurrentMonth ? 'text-gray-400' : ''}
                ${dayClasses.length > 0 ? 'bg-blue-50' : ''}
              `}
            >
              {day.date.getDate()}
              {dayClasses.length > 0 && (
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span>
              )}
            </div>
          );
        })}
      </div>

      {modalOpen && selectedDate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl max-w-lg w-full mx-4 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-purple-900 border-b pb-4">
              {selectedDate.toLocaleDateString('ko-KR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                weekday: 'long'
              })}
            </h3>
            <div className="space-y-4">
              {getClassesForDate(selectedDate).map((cls) => (
                <div key={cls.id} className="bg-purple-50 rounded-2xl p-5 hover:bg-purple-100 transition-colors border border-purple-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-purple-200 rounded-full p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="font-bold text-lg text-purple-900">{cls.studentName}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-purple-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                      <span>{cls.subject}</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{cls.classTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{cls.duration}분 수업</span>
                    </div>
                  </div>
                </div>
              ))}
              {getClassesForDate(selectedDate).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-lg font-medium">예정된 수업이 없습니다</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-6 w-full px-6 py-4 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 active:bg-purple-800 transition-all duration-200 shadow-md active:scale-95 font-medium"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;