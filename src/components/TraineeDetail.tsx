import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import AssessmentForm from './AssessmentForm';
import AssessmentHistory from './AssessmentHistory';
import WeeklyReports from './WeeklyReports';

const TraineeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTraineeById, getUserById, getAssessmentsByTrainee, addAssessment } = useData();
  const { user, hasRole } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'assessments' | 'reports' | 'new-assessment'>('overview');

  const trainee = getTraineeById(id || '');
  const traineeUser = getUserById(id || '');
  const assessments = getAssessmentsByTrainee(id || '');

  if (!trainee || !traineeUser) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">❌</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Стажер не найден
        </h3>
        <p className="text-gray-600 mb-4">
          Запрашиваемый стажер не существует или у вас нет доступа к этой информации
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="btn-primary"
        >
          Вернуться к панели управления
        </button>
      </div>
    );
  }

  // Check if user has access to this trainee
  if (user?.role === 'trainee' && user.id !== id) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔒</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Доступ запрещен
        </h3>
        <p className="text-gray-600">
          У вас нет прав для просмотра информации об этом стажере
        </p>
      </div>
    );
  }

  if (user?.role === 'mentor' && trainee.mentorId !== user.id) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔒</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Доступ запрещен
        </h3>
        <p className="text-gray-600">
          Этот стажер не назначен вам как наставнику
        </p>
      </div>
    );
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'critical':
        return { label: 'Критично', className: 'status-critical', icon: '🔴' };
      case 'needs_improvement':
        return { label: 'Требует улучшения', className: 'status-needs-improvement', icon: '🟡' };
      case 'good_progress':
        return { label: 'Хороший прогресс', className: 'status-good-progress', icon: '🟢' };
      case 'completed':
        return { label: 'Завершено', className: 'status-completed', icon: '🔵' };
      default:
        return { label: 'Неизвестно', className: 'bg-gray-100 text-gray-800', icon: '⚪' };
    }
  };

  const statusInfo = getStatusInfo(trainee.status);
  const progressPercentage = Math.min((trainee.developmentScore / 1000) * 100, 100);

  // Calculate days remaining
  const now = new Date();
  const probationEnd = new Date(trainee.probationEnd);
  const daysRemaining = Math.ceil((probationEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  const mentor = getUserById(trainee.mentorId);

  const tabs = [
    { id: 'overview', label: 'Обзор', icon: '📊' },
    { id: 'assessments', label: 'Оценки', icon: '📝' },
    { id: 'reports', label: 'Отчеты', icon: '📋' },
  ];

  // Add new assessment tab for mentors and admins
  if (hasRole('mentor') || hasRole('admin')) {
    tabs.push({ id: 'new-assessment', label: 'Новая оценка', icon: '➕' });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            ← Назад
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {traineeUser.name}
            </h1>
            <p className="text-sm text-gray-600">
              {traineeUser.position} • {traineeUser.department}
            </p>
          </div>
        </div>

        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusInfo.className}`}>
            <span className="mr-2">{statusInfo.icon}</span>
            {statusInfo.label}
          </div>
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
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Личная информация
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Имя</label>
                  <p className="text-gray-900">{traineeUser.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-900">{traineeUser.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Должность</label>
                  <p className="text-gray-900">{traineeUser.position}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Отделение</label>
                  <p className="text-gray-900">{traineeUser.department}</p>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Прогресс развития
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Общий балл развития</span>
                    <span className="font-medium">{trainee.developmentScore}/1000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${
                        trainee.status === 'critical' ? 'bg-red-500' :
                        trainee.status === 'needs_improvement' ? 'bg-yellow-500' :
                        trainee.status === 'good_progress' ? 'bg-green-500' :
                        'bg-blue-500'
                      }`}
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Средняя оценка:</span>
                    <span className="ml-2 font-medium">
                      {assessments.length > 0
                        ? (assessments.reduce((sum, a) => sum + a.score, 0) / assessments.length).toFixed(1)
                        : 'Нет оценок'
                      }/5
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Всего оценок:</span>
                    <span className="ml-2 font-medium">{assessments.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Probation Period */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Испытательный период
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Начало</label>
                  <p className="text-gray-900">
                    {new Date(trainee.probationStart).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Окончание</label>
                  <p className="text-gray-900">
                    {new Date(trainee.probationEnd).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Осталось дней</label>
                  <p className={`font-medium ${daysRemaining < 30 ? 'text-red-600' : 'text-gray-900'}`}>
                    {daysRemaining > 0 ? `${daysRemaining} дней` : 'Завершен'}
                  </p>
                </div>
              </div>
            </div>

            {/* Mentor */}
            {mentor && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Наставник
                </h3>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">{mentor.name}</p>
                  <p className="text-sm text-gray-600">{mentor.position}</p>
                  <p className="text-sm text-gray-600">{mentor.department}</p>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Статистика
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Недельных отчетов:</span>
                  <span className="font-medium">{trainee.weeklyReports.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Оценок получено:</span>
                  <span className="font-medium">{assessments.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Дней в системе:</span>
                  <span className="font-medium">
                    {Math.ceil((now.getTime() - new Date(traineeUser.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'assessments' && (
        <AssessmentHistory assessments={assessments} />
      )}

      {activeTab === 'reports' && (
        <WeeklyReports reports={trainee.weeklyReports} />
      )}

      {activeTab === 'new-assessment' && (
        <AssessmentForm
          traineeId={trainee.userId}
          mentorId={user?.id || ''}
          onAssessmentAdded={() => {
            setActiveTab('assessments');
            // Refresh data would happen automatically through context
          }}
        />
      )}
    </div>
  );
};

export default TraineeDetail;

