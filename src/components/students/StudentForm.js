import React, { useState } from 'react';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    customSubject: '',  // 새로운 상태 추가
    startDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const newStudent = {
      id: Date.now(),
      ...formData,
      // 과목이 'other'인 경우 customSubject 값을 사용
      subject: formData.subject === 'other' ? formData.customSubject : formData.subject,
      createdAt: new Date().toISOString()
    };
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));

    setFormData({
      name: '',
      phone: '',
      subject: '',
      customSubject: '',
      startDate: ''
    });
    alert('학생이 등록되었습니다.');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-lg flex flex-col items-center">
      <div className="w-1/2 min-w-[300px]">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">학생 등록</h2>
        <div className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">이름</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-4 rounded-2xl border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">연락처</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full p-4 rounded-2xl border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">과목</label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full p-4 rounded-2xl border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all appearance-none bg-white"
              required
            >
              <option value="">과목 선택</option>
              <option value="piano">피아노</option>
              <option value="violin">바이올린</option>
              <option value="guitar">기타</option>
              <option value="drum">드럼</option>
              <option value="other">그 외 악기</option>
            </select>
          </div>
          
          {formData.subject === 'other' && (
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">악기명 입력</label>
              <input
                type="text"
                value={formData.customSubject}
                onChange={(e) => setFormData({...formData, customSubject: e.target.value})}
                className="w-full p-4 rounded-2xl border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="악기명을 입력하세요"
                required
              />
            </div>
          )}

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">등록일</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              className="w-full p-4 rounded-2xl border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-2xl hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-md active:scale-95 font-medium"
          >
            등록하기
          </button>
        </div>
      </div>
    </form>
  );
};

export default StudentForm;