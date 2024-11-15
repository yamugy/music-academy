import React, { useState, useEffect } from 'react';
import { studentApi } from '../../utils/api';

const StudentSearch = ({ onSelect }) => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await studentApi.getAll();
      setStudents(response);
    } catch (error) {
      console.error('학생 목록 로딩 실패:', error);
    }
    setLoading(false);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">학생 검색</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="학생 이름으로 검색..."
        className="w-full p-2 border rounded-lg mb-4"
      />
      
      {loading ? (
        <div className="text-center py-4">로딩 중...</div>
      ) : (
        <div className="max-h-[400px] overflow-y-auto">
          {filteredStudents.map(student => (
            <div
              key={student._id}
              onClick={() => onSelect(student)}
              className="p-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors border-b"
            >
              <div className="font-medium">{student.name}</div>
              <div className="text-sm text-gray-500">{student.subject}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentSearch;