import React from 'react';
import StudentForm from '../components/students/StudentForm';

const StudentRegistration = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">학생 등록</h1>
      <StudentForm />
    </div>
  );
};

export default StudentRegistration;