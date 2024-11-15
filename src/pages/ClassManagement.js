import React, { useState } from 'react';
import ClassForm from '../components/classes/ClassForm';
import ClassList from '../components/classes/ClassList';

const ClassManagement = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleClassSubmitSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">수업 관리</h1>
        <p className="text-muted-foreground mt-2">수업을 등록하고 관리하세요</p>
      </div>
      
      <div className="space-y-8">
        <div className="bg-card rounded-lg shadow-sm p-6 border max-w-[50%]">
          <h2 className="text-xl font-semibold mb-4">수업 등록</h2>
          <ClassForm onSubmitSuccess={handleClassSubmitSuccess} />
        </div>

        <div className="bg-card rounded-lg shadow-sm p-6 border">
          <h2 className="text-xl font-semibold mb-4">전체 수업 목록</h2>
          <ClassList refreshTrigger={refreshKey} />
        </div>
      </div>
    </div>
  );
};

export default ClassManagement;