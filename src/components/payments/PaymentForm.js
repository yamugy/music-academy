import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentForm = () => {
  const [searchParams] = useSearchParams();
  const [students, setStudents] = useState([]);
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
    const loadedStudents = JSON.parse(localStorage.getItem('students') || '[]');
    setStudents(loadedStudents);

    // URL에서 studentId를 읽어서 자동 기입
    const studentId = searchParams.get('studentId');
    if (studentId) {
      const student = loadedStudents.find(s => s.id === Number(studentId));
      if (student) {
        setSelectedStudent(student);
        setFormData({
          ...formData,
          studentName: student.name
        });
        setSearchTerm(student.name);
      }
    }
  }, [searchParams]); // searchParams를 의존성 배열에 추가

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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStudent) {
      alert('학생을 선택해주세요.');
      return;
    }

    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    const newPayment = {
      id: Date.now(),
      ...formData,
      studentId: selectedStudent.id,
      paymentTypeName: paymentTypes[formData.paymentType], // 한글 결제방식 추가
      createdAt: new Date().toISOString()
    };
    
    payments.push(newPayment);
    localStorage.setItem('payments', JSON.stringify(payments));

    // 폼 초기화
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
    
    alert('결제가 등록되었습니다.');
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