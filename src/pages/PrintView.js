import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PrintView = () => {
  const { studentId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const classes = JSON.parse(localStorage.getItem('classes') || '[]');
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');

    const student = students.find(s => s.id === parseInt(studentId));
    const studentClasses = classes.filter(c => c.studentId === parseInt(studentId));
    const studentPayments = payments.filter(p => p.studentId === parseInt(studentId));

    setData({
      student,
      classes: studentClasses,
      payments: studentPayments
    });

    // 데이터 로드 후 자동 프린트
    setTimeout(() => {
      window.print();
    }, 1000);
  }, [studentId]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{data.student.name} 학생 정보</h1>
      
      <div className="space-y-8 print:space-y-6">
        <section className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">기본 정보</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>연락처: {data.student.phone}</div>
            <div>과목: {data.student.subject}</div>
            <div>등록일: {data.student.startDate}</div>
          </div>
        </section>

        <section className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">수업 이력</h2>
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
                <tr key={cls.id}>
                  <td className="border p-2">{cls.classDate}</td>
                  <td className="border p-2">{cls.classTime}</td>
                  <td className="border p-2">{cls.duration}분</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">결제 이력</h2>
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
                <tr key={payment.id}>
                  <td className="border p-2">{payment.paymentDate}</td>
                  <td className="border p-2">{payment.paymentMonth}</td>
                  <td className="border p-2">{payment.amount}원</td>
                  <td className="border p-2">{payment.paymentType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default PrintView;