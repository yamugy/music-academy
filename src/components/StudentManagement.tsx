import { useState, useEffect } from 'react';
import { useResponsive } from '../hooks/useMediaQuery';
import { Student } from '../store/types';
import { storageService } from '../services/storageService';

const StudentManagement = () => {
  const { isMobile } = useResponsive();
  const [students, setStudents] = useState<Student[]>([]);
  const [syncStatus, setSyncStatus] = useState<'success' | 'error' | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsSyncing(true);
    try {
      await storageService.fetchRemoteData();
      const loadedStudents = storageService.getStudents();
      setStudents(loadedStudents);
      setSyncStatus('success');
    } catch (error) {
      setSyncStatus('error');
    } finally {
      setIsSyncing(false);
    }
  };

  const updateStudentsList = async (newStudents: Student[]) => {
    setIsSyncing(true);
    try {
      storageService.setStudents(newStudents);
      await storageService.sync();
      setStudents(newStudents);
      setSyncStatus('success');
    } catch (error) {
      setSyncStatus('error');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAddStudent = async (newStudent: Student) => {
    const updatedStudents = [...students, { ...newStudent, id: Date.now().toString() }];
    updateStudentsList(updatedStudents);
  };

  const handleUpdateStudent = async (id: string, data: Partial<Student>) => {
    const updatedStudents = students.map(student => 
      student.id === id ? { ...student, ...data } : student
    );
    updateStudentsList(updatedStudents);
  };

  const handleDeleteStudent = async (id: string) => {
    const updatedStudents = students.filter(student => student.id !== id);
    updateStudentsList(updatedStudents);
  };

  return (
    <div className="p-4">
      {isSyncing && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          동기화 중...
        </div>
      )}
      {syncStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          데이터 저장 중 오류가 발생했습니다.
        </div>
      )}
      {isMobile ? (
        <MobileStudentList 
          students={students}
          onDelete={handleDeleteStudent}
          onUpdate={handleUpdateStudent}
        />
      ) : (
        <DesktopStudentList 
          students={students}
          onDelete={handleDeleteStudent}
          onUpdate={handleUpdateStudent}
        />
      )}
    </div>
  );
};

const MobileStudentList = ({ students, onDelete, onUpdate }) => (
  <div className="space-y-4">
    {students.map((student) => (
      <div key={student.id} className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold">{student.name}</h3>
        <p>연락처: {student.contact}</p>
        <p>악기: {student.lesson.instrument}</p>
        <p>수업 시간: {student.lesson.schedule}</p>
        <p>결제 상태: {student.paymentStatus}</p>
        <div className="mt-2 space-x-2">
          <button 
            onClick={() => onUpdate(student.id, { paymentStatus: 'paid' })}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            결제완료
          </button>
          <button 
            onClick={() => onDelete(student.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            삭제
          </button>
        </div>
      </div>
    ))}
  </div>
);

const DesktopStudentList = ({ students, onDelete, onUpdate }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead>
        <tr>
          <th>이름</th>
          <th>연락처</th>
          <th>악기</th>
          <th>수업시간</th>
          <th>결제상태</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.contact}</td>
            <td>{student.lesson.instrument}</td>
            <td>{student.lesson.schedule}</td>
            <td>{student.paymentStatus}</td>
            <td>
              <button 
                onClick={() => onUpdate(student.id, { paymentStatus: 'paid' })}
                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
              >
                결제완료
              </button>
              <button 
                onClick={() => onDelete(student.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default StudentManagement;