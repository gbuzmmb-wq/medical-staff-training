import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Доступ запрещен
        </h1>
        <p className="text-gray-600 mb-6">
          У вас нет прав для доступа к этой странице
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="btn-primary"
        >
          Вернуться к панели управления
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;

