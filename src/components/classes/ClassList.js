import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { classApi } from '../../utils/api';

const ClassList = () => {
=======
<<<<<<< HEAD
import { classApi } from '../../utils/api';

const ClassList = ({ refreshTrigger }) => {
>>>>>>> af54ef1e75cb24a9242382d86a7f608a300dba09
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [editingClass, setEditingClass] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchClasses();
<<<<<<< HEAD
  }, [selectedDate]);
=======
  }, [selectedDate, refreshTrigger]);
>>>>>>> af54ef1e75cb24a9242382d86a7f608a300dba09

  const fetchClasses = async () => {
    setLoading(true);
    try {
      let response;
      if (selectedDate) {
        response = await classApi.getByDate(selectedDate);
      } else {
        response = await classApi.getAll();
      }

      // 학생 이름이 없는 경우 처리
      const processedClasses = response.map(classItem => ({
        ...classItem,
        studentName: classItem.studentId?.name || '미확인 학생'
      }));

      setClasses(processedClasses);
    } catch (error) {
      console.error('Failed to fetch classes:', error);
      setError('수업 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await classApi.delete(id);
        setClasses(classes.filter(cls => cls._id !== id));
        alert('수업이 삭제되었습니다.');
      } catch (error) {
        console.error('수업 삭제 실패:', error);
        alert('수업 삭제에 실패했습니다.');
      }
<<<<<<< HEAD
=======
=======

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
>>>>>>> 8b4305ea2df8aa5b80341974ef0a46c81c39452c
>>>>>>> af54ef1e75cb24a9242382d86a7f608a300dba09
    }
  };

  const handleEdit = (classItem) => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> af54ef1e75cb24a9242382d86a7f608a300dba09
    setEditingClass({
      ...classItem,
      studentId: classItem.studentId, // 학생 ID 정보 유지
      subject: classItem.subject,
      classDate: classItem.classDate,
      classTime: classItem.classTime,
      duration: classItem.duration
    });
  };

  const handleUpdate = async () => {
    if (!editingClass) return;
    
    try {
      const updatedClass = await classApi.update(editingClass._id, {
        studentId: editingClass.studentId,
        subject: editingClass.subject,
        classDate: editingClass.classDate,
        classTime: editingClass.classTime,
        duration: editingClass.duration
      });

      // 기존 데이터의 학생 정보를 유지하면서 업데이트
      const updatedClassWithStudent = {
        ...updatedClass,
        studentId: {
          ...editingClass.studentId
        }
      };

      setClasses(prevClasses => 
        prevClasses.map(cls => 
          cls._id === editingClass._id ? updatedClassWithStudent : cls
        )
      );
      setEditingClass(null);
      alert('수업이 수정되었습니다.');
    } catch (error) {
      console.error('수업 수정 실패:', error);
      alert('수업 수정에 실패했습니다.');
    }
<<<<<<< HEAD
=======
=======
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
>>>>>>> 8b4305ea2df8aa5b80341974ef0a46c81c39452c
>>>>>>> af54ef1e75cb24a9242382d86a7f608a300dba09
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> af54ef1e75cb24a9242382d86a7f608a300dba09
            <tr key={classItem._id}>
              {editingClass && editingClass._id === classItem._id ? (
                <>
                  <td className="px-6 py-4">{editingClass.studentId?.name || classItem.studentId?.name}</td>
<<<<<<< HEAD
=======
=======
            <tr key={classItem.id}>
              {editingClass && editingClass.id === classItem.id ? (
                <>
                  <td className="px-6 py-4">{getStudentName(classItem.studentId)}</td>
>>>>>>> 8b4305ea2df8aa5b80341974ef0a46c81c39452c
>>>>>>> af54ef1e75cb24a9242382d86a7f608a300dba09
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
<<<<<<< HEAD
                  <td className="px-6 py-4">{classItem.studentId?.name || '미확인 학생'}</td>
=======
<<<<<<< HEAD
                  <td className="px-6 py-4">{classItem.studentId?.name || '미확인 학생'}</td>
=======
                  <td className="px-6 py-4">{getStudentName(classItem.studentId)}</td>
>>>>>>> 8b4305ea2df8aa5b80341974ef0a46c81c39452c
>>>>>>> af54ef1e75cb24a9242382d86a7f608a300dba09
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
<<<<<<< HEAD
                      onClick={() => handleDelete(classItem._id)}
=======
<<<<<<< HEAD
                      onClick={() => handleDelete(classItem._id)}
=======
                      onClick={() => handleDelete(classItem.id)}
>>>>>>> 8b4305ea2df8aa5b80341974ef0a46c81c39452c
>>>>>>> af54ef1e75cb24a9242382d86a7f608a300dba09
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