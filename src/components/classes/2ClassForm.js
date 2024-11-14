import React, { useState } from 'react';

const ClassForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    subject: '',
    classDate: '',
    classTime: '',
    duration: '60'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const classes = JSON.parse(localStorage.getItem('classes') || '[]');
    const newClass = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    };
    classes.push(newClass);
    localStorage.setItem('classes', JSON.stringify(classes));

    setFormData({
      studentName: '',
      subject: '',
      classDate: '',
      classTime: '',
      duration: '60'
    });
    alert('수업이 등록되었습니다.');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">수업 등록</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">학생 이름</label>
          <input
            type="text"
            value={formData.studentName}
            onChange={(e) => setFormData({...formData, studentName: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">과목</label>
          <select
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">과목 선택</option>
            <option value="piano">피아노</option>
            <option value="violin">바이올린</option>
            <option value="guitar">기타</option>
            <option value="drum">드럼</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">수업 날짜</label>
          <input
            type="date"
            value={formData.classDate}
            onChange={(e) => setFormData({...formData, classDate: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">수업 시간</label>
          <input
            type="time"
            value={formData.classTime}
            onChange={(e) => setFormData({...formData, classTime: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">수업 시간(분)</label>
          <select
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            className="w-full p-2 border rounded"
            required
          >
            <option value="30">30분</option>
            <option value="60">60분</option>
            <option value="90">90분</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          수업 등록
        </button>
      </div>
    </form>
  );
};

export default ClassForm;