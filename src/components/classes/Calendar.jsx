import React from 'react';
import { Calendar as FullCalendar } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = ({ classes }) => {
  const events = classes.map(cls => ({
    id: cls._id,
    title: `${cls.student?.name || '미확인 학생'} - ${cls.subject}`,
    start: `${cls.classDate}T${cls.classTime}`,
    end: `${cls.classDate}T${calculateEndTime(cls.classTime, cls.duration)}`,
    extendedProps: {
      studentId: cls.studentId,
      duration: cls.duration
    }
  }));

  const calculateEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(':');
    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes) + Number(duration));
    return date.toTimeString().slice(0, 5);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      events={events}
      slotMinTime="09:00:00"
      slotMaxTime="22:00:00"
      allDaySlot={false}
      locale="ko"
    />
  );
};

export default Calendar;