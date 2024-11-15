import React, { useState, useEffect } from 'react';
import { paymentApi } from '../../utils/api';
import PaymentEditModal from './PaymentEditModal';

const PaymentList = ({ studentId, studentName, refreshKey }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (studentId) {
      fetchPayments();
    }
  }, [studentId, refreshKey]);

  const fetchPayments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await paymentApi.getByStudentId(studentId);
      
      if (!response || !Array.isArray(response)) {
        throw new Error('결제 내역 데이터 형식이 올바르지 않습니다.');
      }

      const sortedPayments = response.sort((a, b) => 
        new Date(b.paymentDate) - new Date(a.paymentDate)
      );
      setPayments(sortedPayments);
    } catch (error) {
      console.error('결제 내역 로딩 실패:', error);
      setError(`결제 내역을 불러오는데 실패했습니다. ${error.message}`);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (payment) => {
    setEditingPayment(payment);
    setIsModalOpen(true);
  };

  const handleDelete = async (paymentId) => {
    if (!window.confirm('정말로 이 결제 내역을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const result = await paymentApi.delete(paymentId);
      if (result.success) {
        await fetchPayments(); // 목록 새로고침
        alert(result.message || '결제 내역이 삭제되었습니다.');
      }
    } catch (error) {
      console.error('결제 내역 삭제 실패:', error);
      alert(error.message || '삭제 처리 중 오류가 발생했습니다.');
    }
  };

  const handleEditComplete = async (editedPayment) => {
    try {
      const updateData = {
        amount: Number(editedPayment.amount),
        paymentDate: new Date(editedPayment.paymentDate).toISOString(),
        paymentMonth: editedPayment.paymentMonth,
        paymentType: editedPayment.paymentType,
        status: editedPayment.status || "완료",
        memo: editedPayment.memo || ""
      };

      await paymentApi.update(editedPayment._id, updateData);
      setIsModalOpen(false);
      await fetchPayments();
      alert('결제 내역이 수정되었습니다.');
    } catch (error) {
      console.error('결제 내역 수정 실패:', error);
      alert('수정에 실패했습니다: ' + error.message);
    }
  };

  if (!studentId) return null;

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        {studentName}님의 결제 내역
      </h2>
      {loading ? (
        <p className="text-center py-4">로딩 중...</p>
      ) : error ? (
        <p className="text-center py-4 text-red-500">{error}</p>
      ) : payments.length > 0 ? (
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm">결제일</th>
                <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm">수강월</th>
                <th className="px-3 md:px-4 py-2 text-right text-xs md:text-sm">금액</th>
                <th className="px-3 md:px-4 py-2 text-center text-xs md:text-sm">결제방식</th>
                <th className="px-3 md:px-4 py-2 text-center text-xs md:text-sm">관리</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment._id} className="border-b hover:bg-gray-50">
                  <td className="px-3 md:px-4 py-2 text-xs md:text-sm">
                    {new Date(payment.paymentDate).toLocaleDateString()}
                  </td>
                  <td className="px-3 md:px-4 py-2 text-xs md:text-sm">{payment.paymentMonth}</td>
                  <td className="px-3 md:px-4 py-2 text-right text-xs md:text-sm">
                    {Number(payment.amount).toLocaleString()}원
                  </td>
                  <td className="px-3 md:px-4 py-2 text-center text-xs md:text-sm">{payment.paymentType}</td>
                  <td className="px-3 md:px-4 py-2 text-center space-x-1 md:space-x-2">
                    <button
                      onClick={() => handleEdit(payment)}
                      className="inline-block px-2 py-1 text-xs md:text-sm text-blue-600 hover:text-blue-800"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(payment._id)}
                      className="inline-block px-2 py-1 text-xs md:text-sm text-red-600 hover:text-red-800"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center py-4 text-gray-500">결제 내역이 없습니다.</p>
      )}

      {isModalOpen && (
        <PaymentEditModal
          payment={editingPayment}
          onClose={() => setIsModalOpen(false)}
          onSave={handleEditComplete}
        />
      )}
    </div>
  );
};

export default PaymentList;