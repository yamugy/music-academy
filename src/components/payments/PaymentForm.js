import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { studentApi, paymentApi } from '../../utils/api'; // API import 추가

const PaymentForm = ({ students, preSelectedStudent, onPaymentComplete, onStudentSelect }) => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    amount: '',
    paymentDate: '',
    paymentMonth: '',
    paymentType: 'cash'
  });

  const paymentTypes = {
    cash: '현금',
    card: '카드',
    transfer: '계좌이체'
  };

  useEffect(() => {
    if (preSelectedStudent) {
      setSelectedStudent(preSelectedStudent);
      setFormData(prev => ({
        ...prev,
        studentName: preSelectedStudent.name
      }));
      setSearchTerm(preSelectedStudent.name);
    }
  }, [preSelectedStudent]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setFormData({
      ...formData,
      studentName: student.name
    });
    setSearchTerm(student.name);
    setShowResults(false);
    
    // 학생 선택 시 상위 컴포넌트에 알림
    if (onStudentSelect) {
      onStudentSelect(student);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
    if (!e.target.value) {
      setSelectedStudent(null);
      setFormData({
        ...formData,
        studentName: ''
      });
      // 검색어가 비워질 때 상위 컴포넌트에 null 전달
      if (onStudentSelect) {
        onStudentSelect(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent) {
      alert('학생을 선택해주세요.');
      return;
    }

    try {
      const paymentData = {
        studentId: selectedStudent._id,
        amount: Number(formData.amount),
        paymentDate: formData.paymentDate,
        paymentMonth: formData.paymentMonth,
        paymentType: paymentTypes[formData.paymentType], // 한글 결제 방식으로 변환
        createdAt: new Date().toISOString()
      };

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> af54ef1e75cb24a9242382d86a7f608a300dba09
      console.log('Submitting payment data:', paymentData); // 제출할 데이터 확인
      const response = await paymentApi.create(paymentData);
      console.log('Payment creation response:', response); // 생성 응답 확인
      
      if (response) {
        onPaymentComplete();
        onStudentSelect(selectedStudent);
        
        setFormData(prev => ({
          ...prev,
          amount: '',
          paymentDate: '',
          paymentMonth: '',
          paymentType: 'cash'
        }));
        
        alert('결제가 등록되었습니다.');
      }
    } catch (error) {
      console.error('결제 등록 실패:', error);
      console.error('Error details:', error.response?.data); // 에러 상세 정보 확인
      alert(`결제 등록에 실패했습니다. ${error.response?.data?.message || error.message}`);
    }
<<<<<<< HEAD
=======
=======
    // 폼 초기화
    resetForm();
    alert('결제가 등록되었습니다.');
>>>>>>> 8b4305ea2df8aa5b80341974ef0a46c81c39452c
>>>>>>> af54ef1e75cb24a9242382d86a7f608a300dba09
  };

  const resetForm = () => {
    setFormData({
      studentName: '',
      amount: '',
      paymentDate: '',
      paymentMonth: '',
      paymentType: 'cash'
    });
    setSearchTerm('');
    setSelectedStudent(null);
    setShowResults(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">결제 등록</h2>
      <div className="space-y-5">
        <div className="relative">
          <label className="block mb-2 text-sm font-medium text-gray-600">학생 검색</label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setShowResults(true)}
            className="w-full p-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            placeholder="학생 이름을 입력하세요"
            required
          />
          
          {showResults && (
            <div className="absolute z-10 w-full bg-white/90 border border-purple-100 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
              {filteredStudents.length > 0 ? (
                filteredStudents.map(student => (
                  <div
                    key={student.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleStudentSelect(student)}
                  >
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.subject}</div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">
                  {searchTerm ? "검색 결과가 없습니다" : "학생 이름을 입력하세요"}
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1 text-purple-700">결제 금액</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            className="w-full p-2 border border-purple-200 rounded bg-white/70 focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-purple-700">결제일</label>
          <input
            type="date"
            value={formData.paymentDate}
            onChange={(e) => setFormData({...formData, paymentDate: e.target.value})}
            className="w-full p-2 border border-purple-200 rounded bg-white/70 focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-purple-700">수강월</label>
          <input
            type="month"
            value={formData.paymentMonth}
            onChange={(e) => setFormData({...formData, paymentMonth: e.target.value})}
            className="w-full p-2 border border-purple-200 rounded bg-white/70 focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-purple-700">결제 방식</label>
          <select
            value={formData.paymentType}
            onChange={(e) => setFormData({...formData, paymentType: e.target.value})}
            className="w-full p-2 border border-purple-200 rounded bg-white/70 focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
            required
          >
            <option value="cash">현금</option>
            <option value="card">카드</option>
            <option value="transfer">계좌이체</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-4 px-6 rounded-2xl hover:bg-blue-600 active:bg-blue-700 transition-all duration-200 shadow-sm active:scale-95"
        >
          결제 등록
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;