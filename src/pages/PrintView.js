import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { studentApi, classApi, paymentApi } from '../utils/api';

const PrintView = () => {
  const { studentId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    student: null,
    classes: [],
    payments: []
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log('Attempting to fetch data for studentId:', studentId); // 디버깅 로그 추가

      if (!studentId) {
        setError('학생 ID가 유효하지 않습니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('Making API calls...'); // API 호출 시작 로그

        const [studentData, classesData, paymentsData] = await Promise.all([
          studentApi.getOne(studentId),
          classApi.getByStudentId(studentId),
          paymentApi.getByStudentId(studentId)
        ]);

        console.log('API responses:', { // API 응답 데이터 로그
          studentData,
          classesData,
          paymentsData
        });

        if (!studentData || !studentData._id) {
          throw new Error('학생 정보를 찾을 수 없습니다.');
        }

        setData({
          student: studentData,
          classes: classesData || [],
          payments: paymentsData || []
        });
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
        setError(error.message || '데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  // 로딩 상태 체크
  if (loading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  // 에러 상태 체크
  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  // 데이터 존재 여부 체크
  if (!data.student || !data.student.name) {
    return <div className="text-center py-10">학생 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto p-8 print-container">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{data.student.name} 학생 수업/결제 내역</h1>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">수업 내역</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="border p-2">날짜</th>
              <th className="border p-2">시간</th>
              <th className="border p-2">수업시간</th>
            </tr>
          </thead>
          <tbody>
            {data.classes.map(cls => (
              <tr key={cls._id}>
                <td className="border p-2">{cls.classDate}</td>
                <td className="border p-2">{cls.classTime}</td>
                <td className="border p-2">{cls.duration}분</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">결제 내역</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="border p-2">결제일</th>
              <th className="border p-2">결제월</th>
              <th className="border p-2">금액</th>
              <th className="border p-2">결제방식</th>
            </tr>
          </thead>
          <tbody>
            {data.payments.map(payment => (
              <tr key={payment._id}>
                <td className="border p-2">{payment.paymentDate}</td>
                <td className="border p-2">{payment.paymentMonth}</td>
                <td className="border p-2">{payment.amount}원</td>
                <td className="border p-2">{payment.paymentType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="mt-8 text-center no-print">
        <button 
          onClick={() => window.print()} 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          인쇄하기
        </button>
      </div>
    </div>
  );
};

export default PrintView;