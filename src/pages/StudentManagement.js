import React from 'react';
import StudentList from '../components/students/StudentList';

const StudentManagement = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">학생 관리</h1>
      <StudentList />
    </div>
  );
};

export default StudentManagement;