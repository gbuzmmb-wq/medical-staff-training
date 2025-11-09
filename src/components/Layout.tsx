import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC = () => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Панель управления', shortName: 'Управление', href: '/dashboard', icon: '📊', roles: ['admin', 'mentor', 'trainee'] },
    { name: 'Панель администратора', shortName: 'Администрирование', href: '/admin', icon: '⚙️', roles: ['admin'] },
    { name: 'Панель наставника', shortName: 'Наставничество', href: '/mentor', icon: '👨‍🏫', roles: ['mentor', 'admin'] },
    { name: 'Система бонусов', shortName: 'Бонусы', href: '/bonus', icon: '💰', roles: ['admin', 'mentor'] },
  ];

  const filteredNavigation = navigation.filter(item =>
    item.roles.some(role => hasRole(role as any))
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar with logo and user info */}
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-white text-xl">🏥</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 leading-tight">
                    MediLearn Pro
                  </h1>
                  <p className="text-xs text-gray-500 leading-tight">Система Алины Кодзоковой</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 flex-shrink-0">
              <div className="hidden xl:block">
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({user?.role === 'admin' ? 'Администратор' : user?.role === 'mentor' ? 'Наставник' : 'Стажер'})
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 px-3 py-1.5 hover:bg-red-50 rounded-lg"
              >
                Выйти
              </button>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="hidden md:block border-t border-gray-200">
            <nav className="flex space-x-1 -mb-px">
              {filteredNavigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className={`group relative inline-flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-medical-primary border-b-2 border-medical-primary'
                      : 'text-gray-600 hover:text-medical-primary hover:border-b-2 hover:border-gray-300 border-b-2 border-transparent'
                  }`}
                >
                  <span className="mr-2 text-base">{item.icon}</span>
                  <span className="hidden lg:inline">{item.name}</span>
                  <span className="lg:hidden">{(item as any).shortName || item.name}</span>
                  {isActive(item.href) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-medical-primary"></div>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden border-t border-gray-200">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium">Меню</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {filteredNavigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-medical-primary text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                  {isActive(item.href) && (
                    <span className="ml-auto">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-medical-primary rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🏥</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">MediLearn Pro</h3>
                <p className="text-sm text-gray-600">Система Алины Кодзоковой</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              Создано с любовью и вниманием к деталям для эффективного управления обучением
              и развитием медицинских специалистов. Инновационные решения для современной медицины.
            </p>
            <div className="mt-4 flex justify-center space-x-6 text-xs text-gray-400">
              <span>🏥 Медицина</span>
              <span>📚 Обучение</span>
              <span>📊 Аналитика</span>
              <span>💡 Инновации</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

