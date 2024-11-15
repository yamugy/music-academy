import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServerData } from '../../hooks/useServerData';
import { studentApi } from '../../utils/api';
import EditStudentModal from './EditStudentModal';

const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents, loading, error] = useServerData('students');
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (studentId) => {
    if (window.confirm('정말로 이 학생을 삭제하시겠습니까? 관련된 모든 수업 데이터도 함께 삭제됩니다.')) {
      try {
        const response = await studentApi.delete(studentId);
        if (response.message) {
          // 삭제 성공 시 학생 목록에서 제거
          setStudents(students.filter(student => student._id !== studentId));
          alert(response.message);
        }
      } catch (error) {
        console.error('Delete student error:', error);
        alert(error.response?.data?.message || '학생 삭제에 실패했습니다.');
      }
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await studentApi.update(editingStudent._id, updatedData);
      const updatedStudents = students.map(student => 
        student._id === editingStudent._id ? response : student
      );
      setStudents(updatedStudents); // updateStudents를 setStudents로 변경
      setEditingStudent(null);
      alert('학생 정보가 수정되었습니다.');
    } catch (error) {
      console.error('Failed to update student:', error);
      alert('학생 정보 수정에 실패했습니다.');
    }
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleNavigate = (path) => {
    setShowModal(false);
    navigate(`${path}?studentId=${selectedStudent._id}`);
  };

  const handlePrint = (studentId) => {
    console.log('Printing for student ID:', studentId); // 디버깅용
    if (!studentId) {
      console.error('Invalid student ID');
      alert('학생 정보를 찾을 수 없습니다.');
      return;
    }
    navigate(`/print/${studentId}`);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 로딩 상태와 에러 처리 추가
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-center text-gray-600">데이터를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-center text-red-600">오류가 발생했습니다: {error}</p>
      </div>
    );
  }

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
              <th className="w-[14%] px-4 py-3 text-center text-base font-semibold text-gray-600 border-b scale-120">이름</th>
              <th className="w-[14%] px-4 py-3 text-center text-base font-semibold text-gray-600 border-b scale-120">연락처</th>
              <th className="w-[14%] px-4 py-3 text-center text-base font-semibold text-gray-600 border-b scale-120">과목</th>
              <th className="w-[14%] px-4 py-3 text-center text-base font-semibold text-gray-600 border-b scale-120">수업 횟수</th>
              <th className="w-[14%] px-4 py-3 text-center text-base font-semibold text-gray-600 border-b scale-120">최근 결제</th>
              <th className="w-[14%] px-4 py-3 text-center text-base font-semibold text-gray-600 border-b scale-120">미납금</th>
              <th className="w-[16%] px-4 py-3 text-center text-base font-semibold text-gray-600 border-b scale-120">관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-center text-base text-gray-900">
                  <span 
                    className="font-medium text-blue-600 cursor-pointer hover:text-blue-800 scale-120"
                    onClick={() => handleStudentClick(student)}
                  >
                    {student.name}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-base text-gray-900 scale-120">
                  {student.phone}
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
                  <div className="flex justify-center items-center space-x-3">
                    <button 
                      onClick={() => handleEdit(student)}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 px-3 py-1 border border-blue-600 rounded-lg hover:bg-blue-50"
                    >
                      수정
                    </button>
                    <button 
                      onClick={() => handleDelete(student._id)} 
                      className="inline-flex items-center text-red-600 hover:text-red-800 px-3 py-1 border border-red-600 rounded-lg hover:bg-red-50"
                    >
                      삭제
                    </button>
                    <button
                      onClick={() => handlePrint(student._id)}
                      className="inline-flex items-center text-green-600 hover:text-green-800 px-3 py-1 border border-green-600 rounded-lg hover:bg-green-50"
                    >
                      프린트
                    </button>
                  </div>
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

      {editingStudent && (
        <EditStudentModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default StudentList;