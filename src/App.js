import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
=======
=======
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
>>>>>>> 8b4305ea2df8aa5b80341974ef0a46c81c39452c
>>>>>>> af54ef1e75cb24a9242382d86a7f608a300dba09
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
import Courses from './pages/Courses';
>>>>>>> 8b4305ea2df8aa5b80341974ef0a46c81c39452c
>>>>>>> af54ef1e75cb24a9242382d86a7f608a300dba09

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/print/:studentId" element={<PrintView />} />
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
          <Route path="/courses" element={<Courses />} />
>>>>>>> 8b4305ea2df8aa5b80341974ef0a46c81c39452c
>>>>>>> af54ef1e75cb24a9242382d86a7f608a300dba09
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