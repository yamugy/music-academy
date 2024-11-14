import React from 'react';
import ClassForm from '../components/classes/ClassForm';
import ClassSchedule from '../components/classes/ClassSchedule';

const ClassManagement = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">수업 관리</h1>
        <p className="text-muted-foreground mt-2">수업을 등록하고 관리하세요</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card rounded-lg shadow-sm p-6 border">
          <h2 className="text-xl font-semibold mb-4">수업 등록</h2>
          <ClassForm />
        </div>
        
        <div className="bg-card rounded-lg shadow-sm p-6 border">
          <h2 className="text-xl font-semibold mb-4">수업 일정</h2>
          <ClassSchedule />
        </div>
      </div>
    </div>
  );
};

export default ClassManagement;