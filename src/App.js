import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/global.css';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import StudentRegistration from './pages/StudentRegistration';
import StudentManagement from './pages/StudentManagement';
import ClassManagement from './pages/ClassManagement';
import PaymentManagement from './pages/PaymentManagement';
import Login from './pages/Login';
import PrintView from './pages/PrintView';
import Courses from './pages/Courses';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/print/:studentId" element={<PrintView />} />
          <Route path="/courses" element={<Courses />} />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/student-registration" element={<StudentRegistration />} />
                    <Route path="/student-management" element={<StudentManagement />} />
                    <Route path="/class-management" element={<ClassManagement />} />
                    <Route path="/payment-management" element={<PaymentManagement />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;