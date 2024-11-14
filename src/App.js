import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/global.css'; // global.css import 추가
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import StudentRegistration from './pages/StudentRegistration';
import StudentManagement from './pages/StudentManagement';
import ClassManagement from './pages/ClassManagement';
import PaymentManagement from './pages/PaymentManagement';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/student-registration" element={<StudentRegistration />} />
          <Route path="/student-management" element={<StudentManagement />} />
          <Route path="/class-management" element={<ClassManagement />} />
          <Route path="/payment-management" element={<PaymentManagement />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;