import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';

const ClassSchedule = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const loadedClasses = JSON.parse(localStorage.getItem('classes') || '[]');
    setClasses(loadedClasses);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">수업 시간표</h2>
      <Calendar classes={classes} />
    </div>
  );
};

export default ClassSchedule;