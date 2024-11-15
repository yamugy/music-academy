import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { ko } from 'date-fns/locale';

const Calendar = ({ classes, onDateClick }) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const classsByDate = React.useMemo(() => {
    return classes.reduce((acc, cls) => {
      const date = cls.classDate;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(cls);
      return acc;
    }, {});
  }, [classes]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-center">
          {format(today, 'yyyy년 M월', { locale: ko })}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
          <div key={day} className="p-2 text-center font-medium">
            {day}
          </div>
        ))}
        {daysInMonth.map(date => {
          const dateStr = format(date, 'yyyy-MM-dd');
          const dayClasses = classsByDate[dateStr] || [];
          const isCurrentMonth = isSameMonth(date, today);
          
          return (
            <div
              key={date.toString()}
              onClick={() => onDateClick(dateStr, dayClasses)}
              className={`
                min-h-[80px] p-2 border rounded-lg cursor-pointer
                hover:bg-gray-50 transition-colors
                ${!isCurrentMonth ? 'text-gray-300' : ''}
                ${isToday(date) ? 'bg-blue-50' : ''}
                ${dayClasses.length > 0 ? 'bg-purple-50' : ''}
              `}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{format(date, 'd')}</span>
                {dayClasses.length > 0 && (
                  <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    {dayClasses.length}
                  </span>
                )}
              </div>
              {dayClasses.length > 0 && (
                <div className="mt-1 space-y-1">
                  {dayClasses.slice(0, 2).map(cls => (
                    <div key={cls._id} className="text-xs text-gray-600 truncate">
                      {cls.classTime} {cls.studentName}
                    </div>
                  ))}
                  {dayClasses.length > 2 && (
                    <div className="text-xs text-purple-600">
                      +{dayClasses.length - 2}개 더보기
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;