import React, { useState, useEffect } from 'react';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [editingClass, setEditingClass] = useState(null);

  useEffect(() => {
    const loadedClasses = JSON.parse(localStorage.getItem('classes') || '[]');
    const loadedStudents = JSON.parse(localStorage.getItem('students') || '[]');
    
    // 현재 시간 이전의 수업 필터링
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0].slice(0, 5);

    const filteredClasses = loadedClasses.filter(classItem => {
      if (classItem.classDate > currentDate) {
        return true;
      }
      if (classItem.classDate === currentDate && classItem.classTime >= currentTime) {
        return true;
      }
      return false;
    });

    // 필터링된 수업만 저장
    if (filteredClasses.length !== loadedClasses.length) {
      localStorage.setItem('classes', JSON.stringify(filteredClasses));
    }

    setClasses(filteredClasses);
    setStudents(loadedStudents);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const updatedClasses = classes.filter(cls => cls.id !== id);
      localStorage.setItem('classes', JSON.stringify(updatedClasses));
      setClasses(updatedClasses);
    }
  };

  const handleEdit = (classItem) => {
    setEditingClass({ ...classItem });
  };

  const handleUpdate = () => {
    if (!editingClass) return;
    
    const updatedClasses = classes.map(cls => 
      cls.id === editingClass.id ? editingClass : cls
    );
    
    localStorage.setItem('classes', JSON.stringify(updatedClasses));
    setClasses(updatedClasses);
    setEditingClass(null);
  };

  const getStudentName = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : '미확인 학생';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white shadow-sm rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">학생</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">과목</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">날짜</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">시간</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">시간(분)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">관리</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {classes.map(classItem => (
            <tr key={classItem.id}>
              {editingClass && editingClass.id === classItem.id ? (
                <>
                  <td className="px-6 py-4">{getStudentName(classItem.studentId)}</td>
                  <td className="px-6 py-4">{classItem.subject}</td>
                  <td className="px-6 py-4">
                    <input
                      type="date"
                      value={editingClass.classDate}
                      onChange={(e) => setEditingClass({...editingClass, classDate: e.target.value})}
                      className="border rounded px-2 py-1"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="time"
                      value={editingClass.classTime}
                      onChange={(e) => setEditingClass({...editingClass, classTime: e.target.value})}
                      className="border rounded px-2 py-1"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={editingClass.duration}
                      onChange={(e) => setEditingClass({...editingClass, duration: e.target.value})}
                      className="border rounded px-2 py-1 w-20"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={handleUpdate}
                      className="text-green-600 hover:text-green-900 mr-2"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => setEditingClass(null)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      취소
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-6 py-4">{getStudentName(classItem.studentId)}</td>
                  <td className="px-6 py-4">{classItem.subject}</td>
                  <td className="px-6 py-4">{classItem.classDate}</td>
                  <td className="px-6 py-4">{classItem.classTime}</td>
                  <td className="px-6 py-4">{classItem.duration}분</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(classItem)}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(classItem.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      삭제
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassList;