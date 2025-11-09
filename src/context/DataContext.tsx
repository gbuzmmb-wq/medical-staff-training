import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, Trainee, Assessment, Test, FilterOptions, DashboardStats, BonusRecord } from '../types';

interface DataState {
  users: User[];
  trainees: Trainee[];
  assessments: Assessment[];
  tests: Test[];
  bonusRecords: BonusRecord[];
  filters: FilterOptions;
  stats: DashboardStats;
}

interface DataContextType extends DataState {
  updateTrainee: (traineeId: string, updates: Partial<Trainee>) => void;
  addAssessment: (assessment: Assessment) => void;
  updateAssessment: (assessmentId: string, updates: Partial<Assessment>) => void;
  addUser: (user: User) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  setFilters: (filters: FilterOptions) => void;
  getTraineeById: (traineeId: string) => Trainee | undefined;
  getUserById: (userId: string) => User | undefined;
  getTraineesByMentor: (mentorId: string) => Trainee[];
  getAssessmentsByTrainee: (traineeId: string) => Assessment[];
  calculateStatus: (score: number) => 'critical' | 'needs_improvement' | 'good_progress' | 'completed';
  addBonusRecord: (bonusRecord: BonusRecord) => void;
  deleteBonusRecord: (bonusRecordId: string) => void;
  getBonusRecordsByUser: (userId: string) => BonusRecord[];
}

type DataAction =
  | { type: 'SET_DATA'; payload: { users: User[]; trainees: Trainee[]; assessments: Assessment[]; tests: Test[]; bonusRecords?: BonusRecord[] } }
  | { type: 'UPDATE_TRAINEE'; payload: { traineeId: string; updates: Partial<Trainee> } }
  | { type: 'ADD_ASSESSMENT'; payload: Assessment }
  | { type: 'UPDATE_ASSESSMENT'; payload: { assessmentId: string; updates: Partial<Assessment> } }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: { userId: string; updates: Partial<User> } }
  | { type: 'DELETE_USER'; payload: string }
  | { type: 'SET_FILTERS'; payload: FilterOptions }
  | { type: 'UPDATE_STATS' }
  | { type: 'ADD_BONUS_RECORD'; payload: BonusRecord }
  | { type: 'DELETE_BONUS_RECORD'; payload: string };

const initialState: DataState = {
  users: [],
  trainees: [],
  assessments: [],
  tests: [],
  bonusRecords: [],
  filters: {},
  stats: {
    totalTrainees: 0,
    criticalCount: 0,
    needsImprovementCount: 0,
    goodProgressCount: 0,
    completedCount: 0,
  },
};

const dataReducer = (state: DataState, action: DataAction): DataState => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        ...action.payload,
        bonusRecords: action.payload.bonusRecords || state.bonusRecords,
        stats: calculateStats(action.payload.trainees),
      };
    case 'UPDATE_TRAINEE':
      const updatedTrainees = state.trainees.map(trainee =>
        trainee.userId === action.payload.traineeId
          ? { ...trainee, ...action.payload.updates }
          : trainee
      );
      return {
        ...state,
        trainees: updatedTrainees,
        stats: calculateStats(updatedTrainees),
      };
    case 'ADD_ASSESSMENT':
      return {
        ...state,
        assessments: [...state.assessments, action.payload],
      };
    case 'UPDATE_ASSESSMENT':
      return {
        ...state,
        assessments: state.assessments.map(assessment =>
          assessment.id === action.payload.assessmentId
            ? { ...assessment, ...action.payload.updates }
            : assessment
        ),
      };
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.userId
            ? { ...user, ...action.payload.updates }
            : user
        ),
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        trainees: state.trainees.filter(trainee => trainee.userId !== action.payload),
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.payload,
      };
    case 'UPDATE_STATS':
      return {
        ...state,
        stats: calculateStats(state.trainees),
      };
    case 'ADD_BONUS_RECORD':
      return {
        ...state,
        bonusRecords: [...state.bonusRecords, action.payload],
      };
    case 'DELETE_BONUS_RECORD':
      return {
        ...state,
        bonusRecords: state.bonusRecords.filter(record => record.id !== action.payload),
      };
    default:
      return state;
  }
};

const calculateStats = (trainees: Trainee[]): DashboardStats => {
  const totalTrainees = trainees.length;
  const criticalCount = trainees.filter(t => t.status === 'critical').length;
  const needsImprovementCount = trainees.filter(t => t.status === 'needs_improvement').length;
  const goodProgressCount = trainees.filter(t => t.status === 'good_progress').length;
  const completedCount = trainees.filter(t => t.status === 'completed').length;

  return {
    totalTrainees,
    criticalCount,
    needsImprovementCount,
    goodProgressCount,
    completedCount,
  };
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const updateTrainee = (traineeId: string, updates: Partial<Trainee>) => {
    dispatch({ type: 'UPDATE_TRAINEE', payload: { traineeId, updates } });
  };

  const addAssessment = (assessment: Assessment) => {
    dispatch({ type: 'ADD_ASSESSMENT', payload: assessment });
  };

  const updateAssessment = (assessmentId: string, updates: Partial<Assessment>) => {
    dispatch({ type: 'UPDATE_ASSESSMENT', payload: { assessmentId, updates } });
  };

  const addUser = (user: User) => {
    dispatch({ type: 'ADD_USER', payload: user });
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: { userId, updates } });
  };

  const deleteUser = (userId: string) => {
    dispatch({ type: 'DELETE_USER', payload: userId });
  };

  const setFilters = (filters: FilterOptions) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const getTraineeById = (traineeId: string): Trainee | undefined => {
    return state.trainees.find(trainee => trainee.userId === traineeId);
  };

  const getUserById = (userId: string): User | undefined => {
    return state.users.find(user => user.id === userId);
  };

  const getTraineesByMentor = (mentorId: string): Trainee[] => {
    return state.trainees.filter(trainee => trainee.mentorId === mentorId);
  };

  const getAssessmentsByTrainee = (traineeId: string): Assessment[] => {
    return state.assessments.filter(assessment => assessment.traineeId === traineeId);
  };

  const calculateStatus = (score: number): 'critical' | 'needs_improvement' | 'good_progress' | 'completed' => {
    if (score < 300) return 'critical';
    if (score < 500) return 'needs_improvement';
    if (score < 800) return 'good_progress';
    return 'completed';
  };

  const addBonusRecord = (bonusRecord: BonusRecord) => {
    dispatch({ type: 'ADD_BONUS_RECORD', payload: bonusRecord });
  };

  const deleteBonusRecord = (bonusRecordId: string) => {
    dispatch({ type: 'DELETE_BONUS_RECORD', payload: bonusRecordId });
  };

  const getBonusRecordsByUser = (userId: string): BonusRecord[] => {
    return state.bonusRecords.filter(record => record.userId === userId);
  };

  // Load mock data on component mount
  useEffect(() => {
    const mockData = generateMockData();
    dispatch({ type: 'SET_DATA', payload: mockData });
  }, []);

  const value: DataContextType = {
    ...state,
    updateTrainee,
    addAssessment,
    updateAssessment,
    addUser,
    updateUser,
    deleteUser,
    setFilters,
    getTraineeById,
    getUserById,
    getTraineesByMentor,
    getAssessmentsByTrainee,
    calculateStatus,
    addBonusRecord,
    deleteBonusRecord,
    getBonusRecordsByUser,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// Mock data generator
const generateMockData = () => {
  const users: User[] = [
    {
      id: '1',
      name: 'Администратор Системы',
      email: 'admin@hospital.ru',
      role: 'admin',
      department: 'Администрация',
      position: 'Системный администратор',
      staffType: 'non-medical',
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Доктор Иванов Петр Сергеевич',
      email: 'mentor@hospital.ru',
      role: 'mentor',
      department: 'Кардиология',
      position: 'Ведущий кардиолог',
      staffType: 'medical',
      createdAt: new Date(),
    },
    {
      id: '3',
      name: 'Медсестра Смирнова Анна Владимировна',
      email: 'trainee@hospital.ru',
      role: 'trainee',
      department: 'Терапия',
      position: 'Медсестра',
      mentorId: '2',
      staffType: 'medical',
      createdAt: new Date(),
    },
    {
      id: '4',
      name: 'Врач Петров Михаил Александрович',
      email: 'trainee2@hospital.ru',
      role: 'trainee',
      department: 'Хирургия',
      position: 'Врач-хирург',
      mentorId: '2',
      staffType: 'medical',
      createdAt: new Date(),
    },
    {
      id: '5',
      name: 'Медсестра Козлова Елена Сергеевна',
      email: 'trainee3@hospital.ru',
      role: 'trainee',
      department: 'Педиатрия',
      position: 'Медсестра',
      mentorId: '2',
      staffType: 'medical',
      createdAt: new Date(),
    },
  ];

  const trainees: Trainee[] = [
    {
      userId: '3',
      probationStart: new Date('2024-01-01'),
      probationEnd: new Date('2024-04-01'),
      mentorId: '2',
      developmentScore: 450,
      status: 'needs_improvement',
      weeklyReports: [
        {
          id: '1',
          weekNumber: 1,
          date: new Date('2024-01-08'),
          achievements: ['Изучила основы работы с пациентами', 'Прошла базовое обучение по процедурам'],
          challenges: ['Сложности с документацией', 'Необходимо больше практики'],
          nextWeekGoals: ['Улучшить навыки документирования', 'Больше практики с пациентами'],
          mentorComments: 'Хороший прогресс, продолжайте в том же духе',
        },
      ],
    },
    {
      userId: '4',
      probationStart: new Date('2024-01-15'),
      probationEnd: new Date('2024-04-15'),
      mentorId: '2',
      developmentScore: 750,
      status: 'good_progress',
      weeklyReports: [],
    },
    {
      userId: '5',
      probationStart: new Date('2024-02-01'),
      probationEnd: new Date('2024-05-01'),
      mentorId: '2',
      developmentScore: 200,
      status: 'critical',
      weeklyReports: [],
    },
  ];

  const assessments: Assessment[] = [
    {
      id: '1',
      traineeId: '3',
      mentorId: '2',
      score: 4,
      date: new Date('2024-01-15'),
      comments: 'Хорошие базовые знания, но нужно больше практики',
      category: 'knowledge',
    },
    {
      id: '2',
      traineeId: '3',
      mentorId: '2',
      score: 3,
      date: new Date('2024-01-20'),
      comments: 'Навыки требуют улучшения',
      category: 'skills',
    },
  ];

  const tests: Test[] = [
    {
      id: '1',
      title: 'Основы медицинской этики',
      questions: [
        {
          id: '1',
          text: 'Что является основным принципом медицинской этики?',
          type: 'multiple_choice',
          options: ['Не навреди', 'Быстрое лечение', 'Экономия средств', 'Удобство персонала'],
          correctAnswer: 0,
          points: 20,
        },
      ],
      createdBy: '2',
      isTemplate: true,
      category: 'Этика',
      difficulty: 'easy',
    },
  ];

  const bonusRecords: BonusRecord[] = [];

  return { users, trainees, assessments, tests, bonusRecords };
};
