const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true 
  },
  subject: { type: String, required: true },
  classDate: { type: String, required: true },
  classTime: { type: String, required: true },
  duration: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// 학생 정보를 함께 조회하는 가상 필드 추가
classSchema.virtual('student', {
  ref: 'Student',
  localField: 'studentId',
  foreignField: '_id',
  justOne: true
});

module.exports = mongoose.model('Class', classSchema);
