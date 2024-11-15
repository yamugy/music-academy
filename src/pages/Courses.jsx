
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await api.getCourses();
        console.log('불러온 강좌:', data);  // 콘솔에서 확인
        setCourses(data);
      } catch (error) {
        console.error('강좌 불러오기 실패:', error);
      }
    };

    loadCourses();
  }, []);

  return (
    <div>
      <h1>강좌 목록</h1>
      {courses.map(course => (
        <div key={course.id}>
          <h2>{course.title}</h2>
          <p>강사: {course.instructor}</p>
          <p>가격: {course.price}원</p>
        </div>
      ))}
    </div>
  );
}