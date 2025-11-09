import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const MentorAssignment: React.FC = () => {
  const { users, trainees, updateTrainee, updateUser } = useData();
  const [selectedTrainee, setSelectedTrainee] = useState<string>('');
  const [selectedMentor, setSelectedMentor] = useState<string>('');

  const mentors = users.filter(user => user.role === 'mentor');
  const unassignedTrainees = trainees.filter(trainee => !trainee.mentorId);
  const assignedTrainees = trainees.filter(trainee => trainee.mentorId);

  const handleAssignMentor = () => {
    if (selectedTrainee && selectedMentor) {
      updateTrainee(selectedTrainee, { mentorId: selectedMentor });
      setSelectedTrainee('');
      setSelectedMentor('');
    }
  };

  const handleUnassignMentor = (traineeId: string) => {
    if (window.confirm('Вы уверены, что хотите отменить назначение наставника?')) {
      updateTrainee(traineeId, { mentorId: '' });
    }
  };

  const getTraineeUser = (traineeId: string) => {
    return users.find(user => user.id === traineeId);
  };

  const getMentorUser = (mentorId: string) => {
    return users.find(user => user.id === mentorId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Назначение наставников
        </h2>
        <p className="text-sm text-gray-600">
          Назначьте наставников для стажеров
        </p>
      </div>

      {/* Assignment Form */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Назначить наставника
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="trainee" className="block text-sm font-medium text-gray-700 mb-2">
              Выберите стажера
            </label>
            <select
              id="trainee"
              value={selectedTrainee}
              onChange={(e) => setSelectedTrainee(e.target.value)}
              className="select-field"
            >
              <option value="">Выберите стажера</option>
              {unassignedTrainees.map(trainee => {
                const traineeUser = getTraineeUser(trainee.userId);
                return traineeUser ? (
                  <option key={trainee.userId} value={trainee.userId}>
                    {traineeUser.name} - {traineeUser.position}
                  </option>
                ) : null;
              })}
            </select>
          </div>

          <div>
            <label htmlFor="mentor" className="block text-sm font-medium text-gray-700 mb-2">
              Выберите наставника
            </label>
            <select
              id="mentor"
              value={selectedMentor}
              onChange={(e) => setSelectedMentor(e.target.value)}
              className="select-field"
            >
              <option value="">Выберите наставника</option>
              {mentors.map(mentor => (
                <option key={mentor.id} value={mentor.id}>
                  {mentor.name} - {mentor.position}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleAssignMentor}
            disabled={!selectedTrainee || !selectedMentor}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Назначить наставника
          </button>
        </div>
      </div>

      {/* Current Assignments */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Текущие назначения
        </h3>

        {assignedTrainees.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Нет назначенных наставников
          </p>
        ) : (
          <div className="space-y-4">
            {assignedTrainees.map(trainee => {
              const traineeUser = getTraineeUser(trainee.userId);
              const mentorUser = getMentorUser(trainee.mentorId);

              if (!traineeUser || !mentorUser) return null;

              return (
                <div key={trainee.userId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{traineeUser.name}</h4>
                        <p className="text-sm text-gray-600">{traineeUser.position} • {traineeUser.department}</p>
                      </div>
                      <div className="text-gray-400">→</div>
                      <div>
                        <h4 className="font-medium text-gray-900">{mentorUser.name}</h4>
                        <p className="text-sm text-gray-600">{mentorUser.position} • {mentorUser.department}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleUnassignMentor(trainee.userId)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Отменить назначение
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Mentor Workload */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Нагрузка наставников
        </h3>

        <div className="space-y-3">
          {mentors.map(mentor => {
            const mentorTrainees = trainees.filter(trainee => trainee.mentorId === mentor.id);
            return (
              <div key={mentor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{mentor.name}</h4>
                  <p className="text-sm text-gray-600">{mentor.position} • {mentor.department}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">
                    {mentorTrainees.length} стажеров
                  </div>
                  <div className={`text-sm ${
                    mentorTrainees.length > 5 ? 'text-red-600' :
                    mentorTrainees.length > 3 ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {mentorTrainees.length > 5 ? 'Высокая нагрузка' :
                     mentorTrainees.length > 3 ? 'Средняя нагрузка' :
                     'Низкая нагрузка'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MentorAssignment;

