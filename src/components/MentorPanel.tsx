import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const MentorPanel: React.FC = () => {
  const { user } = useAuth();
  const { getTraineesByMentor, users, tests } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'assessments' | 'tests'>('overview');

  const myTrainees = getTraineesByMentor(user?.id || '');
  const traineeUsers = myTrainees.map(trainee => ({
    trainee,
    user: users.find(u => u.id === trainee.userId)
  })).filter(item => item.user);

  const tabs = [
    { id: 'overview', label: 'Обзор', icon: '📊' },
    { id: 'assessments', label: 'Оценки', icon: '📝' },
    { id: 'tests', label: 'Тесты', icon: '📋' },
  ];

  const getStatusCounts = () => {
    const counts = {
      critical: 0,
      needs_improvement: 0,
      good_progress: 0,
      completed: 0,
    };

    myTrainees.forEach(trainee => {
      counts[trainee.status]++;
    });

    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Панель наставника
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Управление стажерами и их оценками
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900">{myTrainees.length}</div>
          <div className="text-sm text-gray-600">Мои стажеры</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-red-600">{statusCounts.critical}</div>
          <div className="text-sm text-gray-600">Критично</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600">{statusCounts.needs_improvement}</div>
          <div className="text-sm text-gray-600">Требует улучшения</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">{statusCounts.good_progress + statusCounts.completed}</div>
          <div className="text-sm text-gray-600">Хороший прогресс</div>
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
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Мои стажеры
          </h2>

          {traineeUsers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Нет назначенных стажеров
              </h3>
              <p className="text-gray-600">
                Обратитесь к администратору для назначения стажеров
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {traineeUsers.map(({ trainee, user: traineeUser }) => {
                if (!traineeUser) return null;

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

                return (
                  <div
                    key={trainee.userId}
                    className="card hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    onClick={() => navigate(`/trainee/${trainee.userId}`)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {traineeUser.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {traineeUser.position}
                        </p>
                        <p className="text-xs text-gray-500">
                          {traineeUser.department}
                        </p>
                      </div>
                      <div className="text-2xl">
                        {statusInfo.icon}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusInfo.className}`}>
                        {statusInfo.label}
                      </div>

                      <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Прогресс</span>
                          <span>{Math.round(progressPercentage)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              trainee.status === 'critical' ? 'bg-red-500' :
                              trainee.status === 'needs_improvement' ? 'bg-yellow-500' :
                              trainee.status === 'good_progress' ? 'bg-green-500' :
                              'bg-blue-500'
                            }`}
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Балл развития:</span>
                        <span className="font-medium">{trainee.developmentScore}/1000</span>
                      </div>

                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Отчеты:</span>
                        <span>{trainee.weeklyReports.length} недель</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="w-full btn-primary text-sm">
                        Подробнее
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'assessments' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Оценки стажеров
            </h2>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-primary"
            >
              Добавить оценку
            </button>
          </div>

          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Оценки стажеров
            </h3>
            <p className="text-gray-600">
              Выберите стажера для просмотра и добавления оценок
            </p>
          </div>
        </div>
      )}

      {activeTab === 'tests' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Управление тестами
            </h2>
            <button
              onClick={() => navigate('/admin')}
              className="btn-primary"
            >
              Создать тест
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test) => (
              <div key={test.id} className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {test.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {test.category} • {test.questions.length} вопросов
                </p>
                <div className="flex justify-between items-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    test.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    test.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {test.difficulty === 'easy' ? 'Легкий' :
                     test.difficulty === 'medium' ? 'Средний' : 'Сложный'}
                  </span>
                  <button className="btn-secondary text-sm">
                    Использовать
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorPanel;

