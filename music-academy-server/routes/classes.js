const express = require('express');
const router = express.Router();
const Class = require('../models/Class');

// 전체 수업 조회
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find()
      .populate('studentId', 'name') // studentId 필드를 populate하여 학생 정보 가져오기
      .sort({ classDate: -1 });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 날짜별 수업 조회
router.get('/date/:date', async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    const classes = await Class.find({
      classDate: {
        $gte: date,
        $lt: nextDate
      }
    })
    .populate('studentId', 'name')
    .sort({ classTime: 1 });
    
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 특정 학생의 수업 조회
router.get('/student/:studentId', async (req, res) => {
  try {
    const classes = await Class.find({ studentId: req.params.studentId })
      .sort({ classDate: 1, classTime: 1 });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 수업 등록
router.post('/', async (req, res) => {
  try {
    // 중복 수업 체크
    const existingClass = await Class.findOne({
      classDate: req.body.classDate,
      classTime: req.body.classTime
    });

    if (existingClass) {
      return res.status(400).json({
        message: '해당 시간에 이미 예약된 수업이 있습니다.',
        type: 'DUPLICATE_TIME'
      });
    }

    const newClass = new Class(req.body);
    const savedClass = await newClass.save();
    
    // 저장 후 학생 정보를 포함하여 반환
    const populatedClass = await Class.findById(savedClass._id)
      .populate('studentId', 'name');
    
    res.status(201).json(populatedClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 수업 수정
router.put('/:id', async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClass) {
      return res.status(404).json({ message: '수업을 찾을 수 없습니다.' });
    }
    res.json(updatedClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 수업 삭제
router.delete('/:id', async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ message: '수업을 찾을 수 없습니다.' });
    }
    res.json({ message: '수업이 삭제되었습니다.', class: deletedClass });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
