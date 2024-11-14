
import React, { useRef } from 'react';
import { StorageManager } from '../../utils/StorageManager';

const DataManager = () => {
  const fileInputRef = useRef(null);

  const handleRestore = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (await StorageManager.restore(file)) {
      alert('데이터가 성공적으로 복원되었습니다. 페이지를 새로고침합니다.');
      window.location.reload();
    } else {
      alert('데이터 복원에 실패했습니다.');
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div className="flex gap-4">
        <button
          onClick={() => StorageManager.backup()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          데이터 백업
        </button>
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          데이터 복원
        </button>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleRestore}
        accept=".json"
        className="hidden"
      />
    </div>
  );
};

export default DataManager;