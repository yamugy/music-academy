
import React, { useState, useEffect } from 'react';

const EditStudentModal = ({ student, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    customSubject: '',
    startDate: ''
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        phone: student.phone,
        subject: student.subject,
        startDate: student.startDate
      });
    }
  }, [student]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(formData);
      onClose();
    } catch (error) {
      alert('학생 정보 수정에 실패했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">학생 정보 수정</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">이름</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">연락처</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">과목</label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="piano">피아노</option>
              <option value="violin">바이올린</option>
              <option value="guitar">기타</option>
              <option value="drum">드럼</option>
              <option value="other">그 외 악기</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">등록일</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              수정
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 p-2 rounded-lg hover:bg-gray-300"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;