import { BonusCriteria } from '../types';

// Критерии бонусов для медицинского персонала
export const MEDICAL_STAFF_BONUS_CRITERIA: BonusCriteria[] = [
  {
    id: 0,
    description: 'Ознакомлен с должностной инструкцией',
    staffType: 'medical',
  },
  {
    id: 1,
    description: 'Ознакомлен с правилами внутреннего распорядка и трудовой дисциплиной',
    staffType: 'medical',
  },
  {
    id: 2,
    description: 'Ознакомлен с функциональными обязанностями',
    staffType: 'medical',
  },
  {
    id: 3,
    description: 'Изучил вопросы медицинской этики и деонтологии',
    staffType: 'medical',
  },
  {
    id: 4,
    description: 'Изучил нормативно-правовые акты по санитарно-противоэпидемическому режиму',
    staffType: 'medical',
  },
  {
    id: 5,
    description: 'Изучает медицинскую литературу, посещает семинары и лекции',
    staffType: 'medical',
  },
  {
    id: 6,
    description: 'Прошел инструктаж по охране труда и технике безопасности',
    staffType: 'medical',
  },
  {
    id: 7,
    description: 'Участвует в проводимых в организации конкурсах, других общественных мероприятиях (вечера отдыха, спортивные соревнования)',
    staffType: 'medical',
  },
  {
    id: 8,
    description: 'Ознакомлен со структурой учреждения, знаком с руководителями (работниками) структурных подразделений',
    staffType: 'medical',
  },
  {
    id: 9,
    description: 'Взаимодействует с другими сотрудниками при выполнении своих должностных обязанностей',
    staffType: 'medical',
  },
  {
    id: 10,
    description: 'Выполняет должностные обязанности по поручению руководителя структурного подразделения',
    staffType: 'medical',
  },
  {
    id: 11,
    description: 'Исполнителен, не нуждается в контроле',
    staffType: 'medical',
  },
  {
    id: 12,
    description: 'Своевременное выполнение работы и поручений от вышестоящих лиц',
    staffType: 'medical',
  },
  {
    id: 13,
    description: 'Проявляет инициативу в решении рабочих вопросов',
    staffType: 'medical',
  },
  {
    id: 14,
    description: 'Качественно выполняет все основные и дополнительные поручения',
    staffType: 'medical',
  },
  {
    id: 15,
    description: 'Дисциплинирован, нарушений не допускает',
    staffType: 'medical',
  },
  {
    id: 16,
    description: 'Знание компьютера на уровне продвинутого пользователя',
    staffType: 'medical',
  },
  {
    id: 17,
    description: 'Умеет наладить взаимодействие с коллегами, умеет слушать, конструктивно воспринимает замечания',
    staffType: 'medical',
  },
];

// Критерии бонусов для немедицинского персонала
export const NON_MEDICAL_STAFF_BONUS_CRITERIA: BonusCriteria[] = [
  {
    id: 0,
    description: 'Ознакомлен с должностной инструкцией',
    staffType: 'non-medical',
  },
  {
    id: 1,
    description: 'Ознакомлен с правилами внутреннего распорядка и трудовой дисциплиной',
    staffType: 'non-medical',
  },
  {
    id: 6,
    description: 'Прошел инструктаж по охране труда и технике безопасности',
    staffType: 'non-medical',
  },
  {
    id: 7,
    description: 'Участвует в проводимых в организации конкурсах, других общественных мероприятиях (вечера отдыха, спортивные соревнования)',
    staffType: 'non-medical',
  },
  {
    id: 8,
    description: 'Ознакомлен со структурой учреждения, знаком с руководителями (работниками) структурных подразделений',
    staffType: 'non-medical',
  },
  {
    id: 9,
    description: 'Взаимодействует с другими сотрудниками при выполнении своих должностных обязанностей',
    staffType: 'non-medical',
  },
  {
    id: 10,
    description: 'Выполняет должностные обязанности по поручению руководителя структурного подразделения',
    staffType: 'non-medical',
  },
  {
    id: 11,
    description: 'Исполнителен, не нуждается в контроле',
    staffType: 'non-medical',
  },
  {
    id: 12,
    description: 'Своевременное выполнение работы и поручений от вышестоящих лиц',
    staffType: 'non-medical',
  },
  {
    id: 13,
    description: 'Проявляет инициативу в решении рабочих вопросов',
    staffType: 'non-medical',
  },
  {
    id: 14,
    description: 'Качественно выполняет все основные и дополнительные поручения',
    staffType: 'non-medical',
  },
  {
    id: 15,
    description: 'Дисциплинирован, нарушений не допускает',
    staffType: 'non-medical',
  },
  {
    id: 16,
    description: 'Знание компьютера на уровне продвинутого пользователя',
    staffType: 'non-medical',
  },
  {
    id: 17,
    description: 'Умеет наладить взаимодействие с коллегами, умеет слушать, конструктивно воспринимает замечания',
    staffType: 'non-medical',
  },
];

// Получить все критерии для определенного типа персонала
export const getBonusCriteriaByStaffType = (staffType: 'medical' | 'non-medical'): BonusCriteria[] => {
  return staffType === 'medical' ? MEDICAL_STAFF_BONUS_CRITERIA : NON_MEDICAL_STAFF_BONUS_CRITERIA;
};

// Получить критерий по ID и типу персонала
export const getBonusCriteriaById = (id: number, staffType: 'medical' | 'non-medical'): BonusCriteria | undefined => {
  const criteria = getBonusCriteriaByStaffType(staffType);
  return criteria.find(c => c.id === id);
};

