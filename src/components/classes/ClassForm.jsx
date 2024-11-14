import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../ui/button';
import Card from '../ui/card';

const ClassForm = () => {
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
          studentName: student.name,
          subject: student.subject
        });
        setSearchTerm(student.name);
      }
    }
  }, [searchParams, formData]); // searchParams를 의존성 배열에 추가

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStudent) {
      alert('학생을 선택해주세요.');
      return;
    }

    const classes = JSON.parse(localStorage.getItem('classes') || '[]');
    const newClass = {
      id: Date.now(),
      ...formData,
      studentId: selectedStudent.id,
      createdAt: new Date().toISOString()
    };
    
    classes.push(newClass);
    localStorage.setItem('classes', JSON.stringify(classes));

    // 폼 초기화
    resetForm();
    alert('수업이 등록되었습니다.');
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