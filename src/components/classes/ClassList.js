import React, { useState, useEffect } from 'react';
import { classApi } from '../../utils/api';

const ClassList = ({ refreshTrigger }) => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [editingClass, setEditingClass] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, [selectedDate, refreshTrigger]);

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
    }
  };

  const handleEdit = (classItem) => {
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
            <tr key={classItem._id}>
              {editingClass && editingClass._id === classItem._id ? (
                <>
                  <td className="px-6 py-4">{editingClass.studentId?.name || classItem.studentId?.name}</td>
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
                  <td className="px-6 py-4">{classItem.studentId?.name || '미확인 학생'}</td>
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
                      onClick={() => handleDelete(classItem._id)}
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