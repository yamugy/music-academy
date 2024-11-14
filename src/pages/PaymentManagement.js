import React from 'react';
import PaymentForm from '../components/payments/PaymentForm';
import PaymentList from '../components/payments/PaymentList';

const PaymentManagement = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">결제 관리</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentForm />
        <PaymentList />
      </div>
    </div>
  );
};

export default PaymentManagement;