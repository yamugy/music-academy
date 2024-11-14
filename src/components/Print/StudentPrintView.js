import React from 'react';

const StudentPrintView = ({ studentData }) => {
  const { student, classes, payments } = studentData;

  return (
    <div className="print-container p-8">
      <h1 className="text-2xl font-bold mb-6">학생 정보 출력</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">기본 정보</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>이름: {student.name}</div>
          <div>과목: {student.subject}</div>
          <div>연락처: {student.phone}</div>
          <div>등록일: {student.startDate}</div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">수업 이력</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">날짜</th>
              <th className="border p-2">시간</th>
              <th className="border p-2">과목</th>
              <th className="border p-2">수업시간</th>
            </tr>
          </thead>
          <tbody>
            {classes.map(cls => (
              <tr key={cls.id}>
                <td className="border p-2">{cls.classDate}</td>
                <td className="border p-2">{cls.classTime}</td>
                <td className="border p-2">{cls.subject}</td>
                <td className="border p-2">{cls.duration}분</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">결제 이력</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">결제일</th>
              <th className="border p-2">금액</th>
              <th className="border p-2">결제수단</th>
              <th className="border p-2">결제월</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td className="border p-2">{payment.paymentDate}</td>
                <td className="border p-2">{payment.amount}원</td>
                <td className="border p-2">{payment.paymentType}</td>
                <td className="border p-2">{payment.paymentMonth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default StudentPrintView;