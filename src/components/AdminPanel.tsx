import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import MentorAssignment from './MentorAssignment';
import TestManagement from './TestManagement';
import UserManagement from './UserManagement';

const AdminPanel: React.FC = () => {
  const { users, trainees } = useData();
  const [activeTab, setActiveTab] = useState<'users' | 'mentors' | 'tests'>('users');

  const tabs = [
    { id: 'users', label: 'Управление пользователями', icon: '👥' },
    { id: 'mentors', label: 'Назначение наставников', icon: '👨‍🏫' },
    { id: 'tests', label: 'Управление тестами', icon: '📝' },
  ];

  const stats = {
    totalUsers: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    mentors: users.filter(u => u.role === 'mentor').length,
    trainees: users.filter(u => u.role === 'trainee').length,
    activeTrainees: trainees.length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Панель администратора
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Управление пользователями, наставниками и тестами
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.totalUsers}</div>
          <div className="text-sm text-gray-600">Всего пользователей</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-red-600">{stats.admins}</div>
          <div className="text-sm text-gray-600">Администраторов</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.mentors}</div>
          <div className="text-sm text-gray-600">Наставников</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">{stats.trainees}</div>
          <div className="text-sm text-gray-600">Стажеров</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.activeTrainees}</div>
          <div className="text-sm text-gray-600">Активных стажеров</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-medical-primary text-medical-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'users' && <UserManagement />}
      {activeTab === 'mentors' && <MentorAssignment />}
      {activeTab === 'tests' && <TestManagement />}
    </div>
  );
};

export default AdminPanel;

