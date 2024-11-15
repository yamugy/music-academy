import React, { useState } from 'react';

const PaymentEditModal = ({ payment, onClose, onSave }) => {
  const [editedPayment, setEditedPayment] = useState({
    _id: payment._id,
    studentId: payment.studentId,
    amount: payment.amount,
    paymentDate: payment.paymentDate.split('T')[0],
    paymentMonth: payment.paymentMonth,
    paymentType: payment.paymentType,
    status: payment.status || "완료",
    memo: payment.memo || ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPayment = {
        ...editedPayment,
        amount: Number(editedPayment.amount),
        paymentDate: new Date(editedPayment.paymentDate).toISOString()
      };
      await onSave(updatedPayment);
    } catch (error) {
      console.error('수정 실패:', error);
      alert('수정에 실패했습니다: ' + error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6">
          <h3 className="text-lg font-semibold mb-4">결제 내역 수정</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">결제 금액</label>
              <input
                type="number"
                value={editedPayment.amount}
                onChange={e => setEditedPayment({
                  ...editedPayment,
                  amount: e.target.value
                })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">결제일</label>
              <input
                type="date"
                value={editedPayment.paymentDate}
                onChange={e => setEditedPayment({
                  ...editedPayment,
                  paymentDate: e.target.value
                })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">수강월</label>
              <input
                type="month"
                value={editedPayment.paymentMonth}
                onChange={e => setEditedPayment({
                  ...editedPayment,
                  paymentMonth: e.target.value
                })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">결제 방식</label>
              <select
                value={editedPayment.paymentType}
                onChange={e => setEditedPayment({
                  ...editedPayment,
                  paymentType: e.target.value
                })}
                className="w-full p-2 border rounded"
                required
              >
                <option value="현금">현금</option>
                <option value="카드">카드</option>
                <option value="계좌이체">계좌이체</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2 pt-4 mt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                저장
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentEditModal;