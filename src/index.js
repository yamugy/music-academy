import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; // global.css import 추가
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);