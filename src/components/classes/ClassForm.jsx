import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { studentApi, classApi } from '../../utils/api';
import Button from '../ui/button';
import Card from '../ui/card';

const ClassForm = ({ onSubmitSuccess }) => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    subject: '',
    classDate: '',
    classTime: '',
    duration: '60'
  });
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await studentApi.getAll();
        setStudents(response);
        
        // URL에서 studentId를 읽어서 자동 기입
        const studentId = searchParams.get('studentId');
        if (studentId) {
          const student = response.find(s => s._id === studentId); // id -> _id로 변경
          if (student) {
            setSelectedStudent(student);
            setFormData(prev => ({
              ...prev,
              studentName: student.name
            }));
          }
        }
      } catch (error) {
        console.error('학생 목록 로딩 실패:', error);
      }
    };
    fetchStudents();
  }, [searchParams]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setFormData({
      ...formData,
      studentName: student.name,
      subject: student.subject
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
        studentName: '',
        subject: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent) {
      alert('학생을 선택해주세요.');
      return;
    }

    try {
      const classData = {
        studentId: selectedStudent._id,
        subject: formData.subject,
        classDate: formData.classDate,
        classTime: formData.classTime,
        duration: formData.duration
      };

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> af54ef1e75cb24a9242382d86a7f608a300dba09
      await classApi.create(classData);
      alert('수업이 등록되었습니다.');
      
      setFormData({
        studentName: '',
        subject: '',
        classDate: '',
        classTime: '',
        duration: '60'
      });
      setSelectedStudent(null);
      setSearchTerm('');
      
<<<<<<< HEAD
=======
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
      
>>>>>>> af54ef1e75cb24a9242382d86a7f608a300dba09
    } catch (error) {
      console.error('수업 등록 실패:', error);
      if (error.response?.data?.type === 'DUPLICATE_TIME') {
        alert('해당 시간에 이미 예약된 수업이 있습니다.');
      } else {
        alert('수업 등록에 실패했습니다.');
      }
    }
<<<<<<< HEAD
=======
=======
    // 폼 초기화
    resetForm();
    alert('수업이 등록되었습니다.');
>>>>>>> 8b4305ea2df8aa5b80341974ef0a46c81c39452c
>>>>>>> af54ef1e75cb24a9242382d86a7f608a300dba09
  };

  const resetForm = () => {
    setFormData({
      studentName: '',
      subject: '',
      classDate: '',
      classTime: '',
      duration: '60'
    });
    setSelectedStudent(null);
    setSearchTerm('');
  };

  return (
    <Card className="p-6 bg-rose-50/50">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2 relative">
          <label className="text-sm font-medium leading-none text-purple-700">학생 검색</label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setShowResults(true)}
            className="w-full rounded-md border border-purple-200 bg-white/70 px-3 py-2 focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
            placeholder="학생 이름을 입력하세요"
            required
          />
          
          {showResults && (
            <div className="absolute z-10 w-full bg-white/90 border border-purple-100 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
              {filteredStudents.length > 0 ? (
                filteredStudents.map(student => (
                  <div
                    key={student.id}
                    className="px-4 py-2 hover:bg-purple-50 cursor-pointer"
                    onClick={() => handleStudentSelect(student)}
                  >
                    <div className="font-medium text-purple-800">{student.name}</div>
                    <div className="text-sm text-purple-600">{student.subject}</div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-purple-500">
                  {searchTerm ? "검색 결과가 없습니다" : "학생 이름을 입력하세요"}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-purple-700">과목</label>
          <input
            type="text"
            value={formData.subject}
            readOnly
            className="w-full rounded-md border border-purple-200 bg-purple-50/50 px-3 py-2"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-purple-700">수업 날짜</label>
          <input
            type="date"
            value={formData.classDate}
            onChange={(e) => setFormData({...formData, classDate: e.target.value})}
            className="w-full rounded-md border border-purple-200 bg-white/70 px-3 py-2 focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-purple-700">수업 시간</label>
          <input
            type="time"
            value={formData.classTime}
            onChange={(e) => setFormData({...formData, classTime: e.target.value})}
            className="w-full rounded-md border border-purple-200 bg-white/70 px-3 py-2 focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-purple-700">수업 시간(분)</label>
          <select
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            className="w-full rounded-md border border-purple-200 bg-white/70 px-3 py-2 focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
            required
          >
            <option value="30">30분</option>
            <option value="45">45분</option>
            <option value="60">60분</option>
            <option value="90">90분</option>
          </select>
        </div>
        
        <Button className="w-full bg-purple-400 hover:bg-purple-500 text-white transition-colors">
          수업 등록
        </Button>
      </form>
    </Card>
  );
};

export default ClassForm;