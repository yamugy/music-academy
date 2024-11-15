
import { useEffect } from 'react';
import { StorageManager } from './utils/StorageManager';

const App = () => {
  useEffect(() => {
    // 5분마다 자동 저장
    const interval = setInterval(() => {
      StorageManager.setupAutoSave();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // ...existing code...
};

export default App;