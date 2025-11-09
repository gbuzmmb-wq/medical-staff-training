import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Неверный email или пароль');
      }
    } catch (err) {
      setError('Произошла ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-white bg-opacity-15 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-white bg-opacity-8 rounded-full animate-pulse"></div>

        {/* Floating Particles */}
        <div className="absolute top-32 right-1/4 w-6 h-6 bg-cyan-400 bg-opacity-30 rounded-full animate-float"></div>
        <div className="absolute top-60 left-1/3 w-4 h-4 bg-blue-400 bg-opacity-40 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-60 right-1/2 w-8 h-8 bg-indigo-400 bg-opacity-25 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-80 left-1/2 w-3 h-3 bg-white bg-opacity-50 rounded-full animate-float" style={{animationDelay: '3s'}}></div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-15 animate-bounce"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Main Login Card */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20 p-8 animate-fade-in">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg animate-scale-in">
                <span className="text-4xl">👩‍⚕️</span>
              </div>

              <h2 className="mt-6 text-4xl font-black text-white animate-slide-up">
                MediLearn
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 animate-glow">
                  Pro
                </span>
              </h2>

              <div className="mt-4 inline-flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-medium text-white backdrop-blur-sm animate-slide-up" style={{animationDelay: '0.2s'}}>
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                Система Алины Кодзоковой
              </div>

              <p className="mt-4 text-lg text-blue-100 leading-relaxed animate-slide-up" style={{animationDelay: '0.4s'}}>
                Профессиональная система управления развитием медицинских специалистов
              </p>
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email адрес
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                    placeholder="admin@hospital.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                    Пароль
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500 bg-opacity-20 backdrop-blur-sm border border-red-400 border-opacity-30 text-red-100 px-4 py-3 rounded-xl animate-slide-up">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none animate-scale-in"
                style={{animationDelay: '0.6s'}}
              >
                {isLoading ? '🔄 Вход...' : '🚀 Войти в систему'}
              </button>
            </form>

            {/* Test Accounts Section */}
            <div className="mt-8 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 animate-slide-up" style={{animationDelay: '0.8s'}}>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="mr-2">🔑</span>
                Тестовые аккаунты
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 cursor-pointer" onClick={() => {setEmail('admin@hospital.ru'); setPassword('password');}}>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">👑</span>
                    </div>
                    <span className="text-white font-medium">Администратор</span>
                  </div>
                  <span className="text-cyan-300 text-sm font-mono">admin@hospital.ru</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 cursor-pointer" onClick={() => {setEmail('mentor@hospital.ru'); setPassword('password');}}>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">👨‍🏫</span>
                    </div>
                    <span className="text-white font-medium">Наставник</span>
                  </div>
                  <span className="text-cyan-300 text-sm font-mono">mentor@hospital.ru</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 cursor-pointer" onClick={() => {setEmail('trainee@hospital.ru'); setPassword('password');}}>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">🎓</span>
                    </div>
                    <span className="text-white font-medium">Стажер</span>
                  </div>
                  <span className="text-cyan-300 text-sm font-mono">trainee@hospital.ru</span>
                </div>
              </div>
            </div>

            {/* Footer Info */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-4 text-sm text-blue-200">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Система активна
                </span>
                <span>•</span>
                <span>v2.0</span>
                <span>•</span>
                <span>24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

