import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const loadedStudents = JSON.parse(localStorage.getItem('students') || '[]');
    const loadedPayments = JSON.parse(localStorage.getItem('payments') || '[]');
    const loadedClasses = JSON.parse(localStorage.getItem('classes') || '[]');
    
    const enrichedStudents = loadedStudents.map(student => ({
      ...student,
      payments: loadedPayments.filter(p => p.studentName === student.name),
      classes: loadedClasses.filter(c => c.studentName === student.name)
    }));

    setStudents(enrichedStudents);
  };

  const handleDelete = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const updatedStudents = students.filter(student => student.id !== id);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      setStudents(updatedStudents);
    }
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleNavigate = (path) => {
    setShowModal(false);
    navigate(`${path}?studentId=${selectedStudent.id}`);
  };

  const handlePrint = (studentId) => {
    navigate(`/print/${studentId}`);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-4">
        <input
          type="text"
          placeholder="학생 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="w-[16.66%] px-4 py-3 text-center text-base font-semibold text-gray-600 border-b scale-120">이름</th>
              <th className="w-[16.66%] px-4 py-3 text-center text-base font-semibold text-gray-600 border-b scale-120">과목</th>
              <th className="w-[16.66%] px-4 py-3 text-center text-base font-semibold text-gray-600 border-b scale-120">수업 횟수</th>
              <th className="w-[16.66%] px-4 py-3 text-center text-base font-semibold text-gray-600 border-b scale-120">최근 결제</th>
              <th className="w-[16.66%] px-4 py-3 text-center text-base font-semibold text-gray-600 border-b scale-120">미납금</th>
              <th className="w-[16.66%] px-4 py-3 text-center text-base font-semibold text-gray-600 border-b scale-120">관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-center text-base text-gray-900">
                  <span 
                    className="font-medium text-blue-600 cursor-pointer hover:text-blue-800 scale-120"
                    onClick={() => handleStudentClick(student)}
                  >
                    {student.name}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-base text-gray-900 scale-120">{student.subject}</td>
                <td className="px-4 py-3 text-center text-base text-gray-900 scale-120">{student.classes?.length || 0}</td>
                <td className="px-4 py-3 text-center text-base text-gray-900 scale-120">
                  {student.payments?.length > 0 
                    ? new Date(student.payments[student.payments.length - 1].paymentDate).toLocaleDateString()
                    : '-'}
                </td>
                <td className="px-4 py-3 text-center text-base text-gray-900 scale-120">
                  <span className={`inline-block px-2 py-1 rounded-full font-semibold
                    ${student.payments?.length > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'}`}>
                    {student.payments?.length > 0 ? '완납' : '미납'}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-base text-gray-900">
                  <button 
                    onClick={() => handleDelete(student.id)} 
                    className="text-red-600 hover:text-red-800 px-2 scale-120"
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => handlePrint(student.id)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    프린트
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 네비게이션 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {selectedStudent.name} 학생의 정보를 확인할 페이지를 선택하세요
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => handleNavigate('/class-management')}
                className="w-full py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:bg-blue-700 transition-colors"
              >
                수업 관리
              </button>
              <button
                onClick={() => handleNavigate('/payment-management')}
                className="w-full py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 active:bg-purple-700 transition-colors"
              >
                결제 관리
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 active:bg-gray-300 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;