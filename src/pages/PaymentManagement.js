import React, { useState, useEffect } from 'react';
import PaymentForm from '../components/payments/PaymentForm';
import PaymentList from '../components/payments/PaymentList';
import { studentApi } from '../utils/api';

const PaymentManagement = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await studentApi.getAll();
        setStudents(response);
      } catch (error) {
        console.error('학생 목록 로딩 실패:', error);
      }
    };
    fetchStudents();
  }, []);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    // 학생이 선택될 때마다 refreshKey 업데이트하여 PaymentList 갱신
    setRefreshKey(prev => prev + 1);
  };

  const handlePaymentComplete = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">결제 관리</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <PaymentForm 
            students={students}
            preSelectedStudent={selectedStudent} 
            onPaymentComplete={handlePaymentComplete}
            onStudentSelect={handleStudentSelect}
          />
        </div>
        <div className="transition-all duration-300 ease-in-out">
          {selectedStudent ? (
            <PaymentList 
              studentId={selectedStudent._id} 
              studentName={selectedStudent.name}
              refreshKey={refreshKey}
            />
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <p className="text-gray-600">학생을 선택하면 결제 내역이 표시됩니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;