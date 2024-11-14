import React from 'react';

const PaymentStatus = () => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200">
      <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center space-x-3">
        <span className="bg-gray-100 text-gray-800 p-2.5 rounded-xl">
          💰
        </span>
        <span>이번 달 미납 현황</span>
      </h2>
      <div className="space-y-3">
        <div className="text-gray-700 bg-gray-50/80 rounded-xl p-4 backdrop-blur-sm border border-gray-200">
          미납 내역이 없습니다.
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;