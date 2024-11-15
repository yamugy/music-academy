const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Payment = require('../models/Payment');
const Class = require('../models/Class');

router.get('/stats', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // 이번 달의 시작일과 종료일 계산
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

    // 이번 주의 시작일(일요일)과 종료일(토요일) 계산
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // 오늘의 종료 시간
    const todayEnd = new Date(today);
    todayEnd.setHours(23, 59, 59, 999);

    // 각 기간별 수업 조회 - select 문 수정
    const [totalStudents, todayClasses, weeklyClasses] = await Promise.all([
      Student.countDocuments(),
      Class.find({
        classDate: {
          $gte: today,
          $lte: todayEnd
        }
      })
        .populate('studentId', 'name')
        .select('studentId subject classDate classTime duration')
        .sort({ classTime: 1 })
        .lean(),
      Class.find({
        classDate: {
          $gte: startOfWeek,
          $lte: endOfWeek
        }
      })
        .populate('studentId', 'name')
        .select('studentId subject classDate classTime duration')
        .sort({ classDate: 1, classTime: 1 })
        .lean()
    ]);

    // 최근 결제 내역 쿼리 수정
    const recentPayments = await Payment.find()
      .populate({
        path: 'studentId',
        select: 'name',
        match: { _id: { $exists: true } } // 실제 존재하는 학생만 매칭
      })
      .select('studentId amount paymentDate')
      .sort({ paymentDate: -1 })
      .limit(5)
      .lean();

    // 존재하는 학생의 결제 내역만 필터링
    const filteredPayments = recentPayments.filter(payment => payment.studentId !== null);

    // 이번 달 전체 수업 조회 추가
    const monthlyClasses = await Class.find({
      classDate: {
        $gte: firstDayOfMonth.toISOString().split('T')[0],
        $lte: lastDayOfMonth.toISOString().split('T')[0]
      }
    })
      .populate('studentId', 'name')
      .select('studentId subject classDate classTime duration')
      .sort({ classDate: 1, classTime: 1 })
      .lean();

    const formattedMonthlyClasses = monthlyClasses.map(cls => ({
      ...cls,
      _id: cls._id.toString(),
      classDate: cls.classDate,
      studentName: cls.studentId?.name || '미정'
    }));

    // 모든 필드가 포함된 응답
    res.json({
      success: true,
      data: {
        totalStudents,
        recentPayments: filteredPayments,
        todayClasses: todayClasses.map(cls => ({
          ...cls,
          _id: cls._id.toString()
        })),
        weeklyClasses: weeklyClasses.map(cls => ({
          ...cls,
          _id: cls._id.toString()
        })),
        monthlyClasses: formattedMonthlyClasses
      }
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    res.status(500).json({ 
      success: false, 
      message: '대시보드 데이터 조회 실패' 
    });
  }
});

module.exports = router;