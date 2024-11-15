const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Student = require('../models/Student');

// 전체 결제 내역 조회
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('studentId', 'name')
      .sort({ paymentDate: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 학생별 결제 내역 조회
router.get('/student/:studentId', async (req, res) => {
  try {
    const payments = await Payment.find({ studentId: req.params.studentId })
      .sort({ paymentDate: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 결제 등록
router.post('/', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    const savedPayment = await payment.save();
    
    // 학생의 결제 상태 업데이트
    await Student.findByIdAndUpdate(req.body.studentId, {
      $push: { payments: savedPayment._id }
    });
    
    res.status(201).json(savedPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 결제 수정 라우트 추가
router.put('/:id', async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!updatedPayment) {
      return res.status(404).json({ message: '해당 결제 내역을 찾을 수 없습니다.' });
    }
    
    res.json(updatedPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 결제 취소
router.put('/:id/cancel', async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status: '취소' },
      { new: true }
    );
    res.json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 결제 삭제 라우트 추가
router.delete('/:id', async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
    if (!deletedPayment) {
      return res.status(404).json({ message: '해당 결제 내역을 찾을 수 없습니다.' });
    }

    // 학생의 결제 내역에서도 삭제
    await Student.findByIdAndUpdate(deletedPayment.studentId, {
      $pull: { payments: req.params.id }
    });

    res.json({ success: true, message: '결제 내역이 삭제되었습니다.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
