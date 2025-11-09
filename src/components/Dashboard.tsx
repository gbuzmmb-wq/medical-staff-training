import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Trainee } from '../types';
import DashboardStats from './DashboardStats';
import FilterPanel from './FilterPanel';
import TraineeCard from './TraineeCard';

const Dashboard: React.FC = () => {
  const { trainees, users, stats, filters, setFilters } = useData();
  const { user, hasRole } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter trainees based on user role and filters
  const filteredTrainees = useMemo(() => {
    let filtered = trainees;

    // If user is a trainee, only show their own data
    if (user?.role === 'trainee') {
      filtered = trainees.filter(trainee => trainee.userId === user.id);
    }

    // If user is a mentor, only show their assigned trainees
    if (user?.role === 'mentor') {
      filtered = trainees.filter(trainee => trainee.mentorId === user.id);
    }

    // Apply filters
    if (filters.department) {
      filtered = filtered.filter((trainee: Trainee) => {
        const traineeUser = users.find((u: any) => u.id === trainee.userId);
        return traineeUser?.department === filters.department;
      });
    }

    if (filters.position) {
      filtered = filtered.filter((trainee: Trainee) => {
        const traineeUser = users.find((u: any) => u.id === trainee.userId);
        return traineeUser?.position === filters.position;
      });
    }

    if (filters.status) {
      filtered = filtered.filter((trainee: Trainee) => trainee.status === filters.status);
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter((trainee: Trainee) => {
        const traineeUser = users.find((u: any) => u.id === trainee.userId);
        return traineeUser?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               traineeUser?.position.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    return filtered;
  }, [trainees, users, filters, searchTerm, user]);

  const handleTraineeClick = (traineeId: string) => {
    navigate(`/trainee/${traineeId}`);
  };

  const getStatusCounts = () => {
    const counts = {
      critical: 0,
      needs_improvement: 0,
      good_progress: 0,
      completed: 0,
    };

    filteredTrainees.forEach((trainee: Trainee) => {
      const status = trainee.status as keyof typeof counts;
      if (status in counts) {
        counts[status]++;
      }
    });

    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-3xl shadow-2xl animate-fade-in">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-5 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-15 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-white bg-opacity-20 rounded-full animate-pulse"></div>

          {/* Floating Particles */}
          <div className="absolute top-20 right-1/4 w-4 h-4 bg-cyan-400 bg-opacity-30 rounded-full animate-float"></div>
          <div className="absolute top-40 left-1/3 w-3 h-3 bg-blue-400 bg-opacity-40 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 right-1/2 w-5 h-5 bg-indigo-400 bg-opacity-25 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-60 left-1/2 w-2 h-2 bg-white bg-opacity-50 rounded-full animate-float" style={{animationDelay: '3s'}}></div>

          {/* Gradient Orbs */}
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-15 animate-bounce"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 p-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text Content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-medium text-white backdrop-blur-sm">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                    Система Алины Кодзоковой
                  </div>

                  <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight animate-slide-up">
                    MediLearn
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 animate-glow">
                      Pro
                    </span>
                  </h1>

                  <p className="text-xl text-blue-100 leading-relaxed max-w-2xl">
                    Революционная платформа для управления обучением и развитием
                    медицинского персонала нового поколения
                  </p>
                </div>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-3">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                    🏥 Медицинское образование
                  </div>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                    📊 Умная аналитика
                  </div>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                    🎯 Персонализация
                  </div>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                    ⚡ Инновации
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-4">
                  <div className="text-center animate-slide-up">
                    <div className="text-3xl font-bold text-white">1000+</div>
                    <div className="text-blue-200 text-sm">Медицинских специалистов</div>
                  </div>
                  <div className="text-center animate-slide-up" style={{animationDelay: '0.2s'}}>
                    <div className="text-3xl font-bold text-white">95%</div>
                    <div className="text-blue-200 text-sm">Успешных выпускников</div>
                  </div>
                  <div className="text-center animate-slide-up" style={{animationDelay: '0.4s'}}>
                    <div className="text-3xl font-bold text-white">24/7</div>
                    <div className="text-blue-200 text-sm">Поддержка системы</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-6">
                  <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-scale-in">
                    🚀 Начать обучение
                  </button>
                  <button className="bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 border border-white border-opacity-30 animate-scale-in" style={{animationDelay: '0.2s'}}>
                    📊 Посмотреть статистику
                  </button>
                </div>
              </div>

              {/* Right Side - Visual Elements */}
              <div className="relative">
                <div className="relative">
                  {/* Main Card */}
                  <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20 shadow-2xl animate-scale-in animate-float">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                          <span className="text-2xl">👩‍⚕️</span>
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">Алина Кодзокова</h3>
                          <p className="text-blue-200 text-sm">Создатель системы</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-white bg-opacity-10 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white text-sm">Прогресс обучения</span>
                            <span className="text-cyan-400 font-bold">87%</span>
                          </div>
                          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full w-4/5"></div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white bg-opacity-10 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-white">156</div>
                            <div className="text-blue-200 text-xs">Активных курсов</div>
                          </div>
                          <div className="bg-white bg-opacity-10 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-white">2.4k</div>
                            <div className="text-blue-200 text-xs">Студентов</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-green-400 to-teal-500 rounded-full animate-pulse"></div>

                  {/* Interactive Hover Effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 hover:opacity-10 rounded-2xl transition-opacity duration-500"></div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 animate-glow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,589,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
          </svg>
        </div>

        {/* Additional Info Section */}
        <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4 border border-white border-opacity-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Система активна</div>
                <div className="text-blue-200 text-xs">Все сервисы работают</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold text-lg">v2.0</div>
              <div className="text-blue-200 text-xs">Последнее обновление</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Панель управления
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Обзор стажеров и их прогресса
          </p>
        </div>

        {hasRole('admin') && (
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => navigate('/admin')}
              className="btn-primary"
            >
              Управление пользователями
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      <DashboardStats stats={stats} />

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Поиск по имени или должности..."
              value={searchTerm}
              onChange={(e: any) => setSearchTerm(e.target.value)}
              className="input-field"
            />
          </div>
          <FilterPanel
            filters={filters}
            onFiltersChange={setFilters}
            users={users}
          />
        </div>
      </div>

      {/* Results summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Найдено стажеров: {filteredTrainees.length}
        </p>
        <div className="flex space-x-4 text-sm">
          <span className="text-red-600">Критично: {statusCounts.critical}</span>
          <span className="text-yellow-600">Требует улучшения: {statusCounts.needs_improvement}</span>
          <span className="text-green-600">Хороший прогресс: {statusCounts.good_progress}</span>
          <span className="text-blue-600">Завершено: {statusCounts.completed}</span>
        </div>
      </div>

      {/* Trainee Cards Grid */}
      {filteredTrainees.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Стажеры не найдены
          </h3>
          <p className="text-gray-600">
            Попробуйте изменить фильтры или поисковый запрос
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTrainees.map((trainee: Trainee) => {
            const traineeUser = users.find((u: any) => u.id === trainee.userId);
            if (!traineeUser) return null;

            return (
              <TraineeCard
                key={trainee.userId}
                trainee={trainee}
                user={traineeUser}
                onClick={() => handleTraineeClick(trainee.userId)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

