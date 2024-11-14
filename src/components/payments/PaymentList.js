import React, { useState, useEffect } from 'react';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  useEffect(() => {
    const loadedPayments = JSON.parse(localStorage.getItem('payments') || '[]');
    setPayments(loadedPayments);
  }, []);

  const filteredPayments = payments.filter(
    payment => payment.paymentMonth === selectedMonth
  );

  const handleDelete = (id) => {
    if (window.confirm('결제 내역을 삭제하시겠습니까?')) {
      const updatedPayments = payments.filter(payment => payment.id !== id);
      localStorage.setItem('payments', JSON.stringify(updatedPayments));
      setPayments(updatedPayments);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">결제 내역</h2>
      <div className="mb-4">
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="space-y-4">
        {filteredPayments.length === 0 ? (
          <p className="text-gray-500">결제 내역이 없습니다.</p>
        ) : (
          filteredPayments.map(payment => (
            <div key={payment.id} className="border p-4 rounded">
              <div className="flex justify-between items-start">
                <div className="space-y-2 w-full">
                  <p className="font-bold text-lg">{payment.studentName}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">결제금액: </span>
                      {Number(payment.amount).toLocaleString()}원
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">결제일: </span>
                      {payment.paymentDate}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">결제방식: </span>
                      {payment.paymentTypeName || payment.paymentType}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">수강월: </span>
                      {payment.paymentMonth}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(payment.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentList;