import React, { useState } from 'react';
import { studentApi } from '../../utils/api';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    customSubject: '',  // 새로운 상태 추가
    startDate: ''
  });

  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const studentData = {
      name: formData.name,
      phone: formData.phone,
      subject: formData.subject === 'other' ? formData.customSubject : formData.subject,
      startDate: formData.startDate
    };

    try {
      setLoading(true); // 로딩 상태 추가
      const response = await studentApi.create(studentData);
      console.log('서버 응답:', response);
      
      setFormData({
        name: '',
        phone: '',
        subject: '',
        customSubject: '',
        startDate: ''
      });
      
      alert('학생이 등록되었습니다.');
    } catch (error) {
      console.error('API 에러:', error);
      let errorMessage = '학생 등록에 실패했습니다.';
      
      if (error.response?.data?.type === 'DUPLICATE_NAME') {
        errorMessage = '이미 등록된 학생 이름입니다.';
      } else if (!navigator.onLine) {
        errorMessage = '인터넷 연결을 확인해주세요.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = '서버 응답이 없습니다.';
      } else if (error.response) {
        errorMessage = `등록 실패: ${error.response.data.message || '알 수 없는 오류'}`;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
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