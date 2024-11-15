
export const StorageManager = {
  // 모든 데이터 백업
  backup: () => {
    const data = {
      students: JSON.parse(localStorage.getItem('students') || '[]'),
      classes: JSON.parse(localStorage.getItem('classes') || '[]'),
      payments: JSON.parse(localStorage.getItem('payments') || '[]'),
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `music-academy-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  // 백업 데이터 복원
  restore: async (file) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      localStorage.setItem('students', JSON.stringify(data.students));
      localStorage.setItem('classes', JSON.stringify(data.classes));
      localStorage.setItem('payments', JSON.stringify(data.payments));
      
      return true;
    } catch (error) {
      console.error('Restore failed:', error);
      return false;
    }
  },

  // 데이터 자동 저장 (5분마다)
  setupAutoSave: () => {
    const key = 'lastAutoSave';
    const data = {
      students: JSON.parse(localStorage.getItem('students') || '[]'),
      classes: JSON.parse(localStorage.getItem('classes') || '[]'),
      payments: JSON.parse(localStorage.getItem('payments') || '[]'),
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(key, JSON.stringify(data));
  }
};