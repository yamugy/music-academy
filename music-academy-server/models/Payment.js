const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    required: true
  },
  paymentMonth: {
    type: String,
    required: true
  },
  paymentType: {
    type: String,
    enum: ['현금', '카드', '계좌이체'],
    required: true
  },
  status: {
    type: String,
    enum: ['완료', '취소'],
    default: '완료'
  },
  memo: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', paymentSchema);