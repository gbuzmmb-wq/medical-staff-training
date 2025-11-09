import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import BonusManagement from './components/BonusManagement';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import Login from './components/Login';
import MentorPanel from './components/MentorPanel';
import ProtectedRoute from './components/ProtectedRoute';
import TraineeDetail from './components/TraineeDetail';
import Unauthorized from './components/Unauthorized';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import './index.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="trainee/:id"
                  element={
                    <ProtectedRoute>
                      <TraineeDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="mentor"
                  element={
                    <ProtectedRoute allowedRoles={['mentor', 'admin']}>
                      <MentorPanel />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="bonus"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'mentor']}>
                      <BonusManagement />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;

