const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Class = require('../models/Class'); // Class 모델 추가
const Payment = require('../models/Payment'); // Payment 모델 추가

// 전체 학생 조회
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 학생 추가
router.post('/', async (req, res) => {
  try {
    // 동일한 이름이 있는지 확인
    const existingStudent = await Student.findOne({ name: req.body.name });
    if (existingStudent) {
      return res.status(400).json({ 
        message: '이미 등록된 학생 이름입니다.',
        type: 'DUPLICATE_NAME' 
      });
    }

    const student = new Student(req.body);
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 단일 학생 조회 추가
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: '학생을 찾을 수 없습니다.' });
    }
    res.json(student);
  } catch (err) {
    console.error('Get student error:', err);
    res.status(500).json({ message: err.message });
  }
});

// 학생 삭제 - 관련 수업과 결제 내역 함께 삭제
router.delete('/:id', async (req, res) => {
  try {
    // 1. 학생이 존재하는지 확인
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: '학생을 찾을 수 없습니다.' });
    }

    // 2. 학생 관련 데이터 삭제
    await Promise.all([
      Class.deleteMany({ studentId: req.params.id }),
      Payment.deleteMany({ studentId: req.params.id }),
      Student.findByIdAndDelete(req.params.id)
    ]);

    res.json({ 
      success: true,
      message: '학생과 관련된 모든 데이터가 삭제되었습니다.',
      deletedStudent: student 
    });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ 
      success: false, 
      message: '삭제 중 오류가 발생했습니다.' 
    });
  }
});

// 학생 수정
router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true } // 업데이트된 문서 반환
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: '학생을 찾을 수 없습니다.' });
    }
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
