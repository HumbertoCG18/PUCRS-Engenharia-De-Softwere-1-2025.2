export const medicalCases = [
  {
    id: 'case001',
    patient: 'Paciente Diário - 28/08',
    difficulty: 'R1', // Residente Nível 1
    category: 'Foco Urinário',
    isDailyCase: true,
    history: 'Mulher, 68 anos, apresenta-se com febre de 38.5°C, confusão mental e disúria há 2 dias.',
    physicalExam: 'Hipotensa (85/50 mmHg), taquicárdica (120 bpm), taquipneica (24 irpm). Dor à palpação suprapúbica.',
    labResults: {
      leukocytes: '18,000/mm³',
      creatinine: '1.9 mg/dL',
      lactate: '2.5 mmol/L',
    },
    // O diagnóstico correto que o jogador deve tentar adivinhar
    correctDiagnosis: 'Sepse de foco urinário',
    // Palavras-chave para o nosso algoritmo de proximidade (a ser implementado)
    keywords: ['sepse', 'choque séptico', 'infecção urinária', 'itu', 'pielonefrite', 'disfunção renal'],
  },
  {
    id: 'case002',
    patient: 'Caso Clínico - Pneumonia',
    difficulty: 'R2',
    category: 'Foco Respiratório',
    isDailyCase: false,
    history: 'Homem, 75 anos, fumante, com tosse produtiva, febre alta e dispneia progressiva há 3 dias.',
    physicalExam: 'Saturação de O₂ 88% em ar ambiente, estertores crepitantes em base pulmonar direita.',
    labResults: {
      leukocytes: '22,000/mm³',
      lactate: '1.8 mmol/L',
      pcr: '250 mg/L',
    },
    correctDiagnosis: 'Sepse de foco pulmonar',
    keywords: ['sepse', 'pneumonia', 'pac', 'insuficiência respiratória', 'sdra'],
  },
  // Podemos adicionar mais casos aqui no futuro
];
export const rankingData = [
  { rank: 1, name: 'Dra. Aline Souza', level: 'R3', points: 4580, isUser: false },
  { rank: 2, name: 'Dr. Bruno Costa', level: 'R2', points: 4210, isUser: false },
  { rank: 3, name: 'Seu Desempenho', level: 'R2', points: 3950, isUser: true },
  { rank: 4, name: 'Dr. Carlos Lima', level: 'R3', points: 3800, isUser: false },
  { rank: 5, name: 'Dra. Diana Faria', level: 'R1', points: 3550, isUser: false },
  { rank: 6, name: 'Dr. Eduardo Martins', level: 'R1', points: 3200, isUser: false },
  { rank: 7, name: 'Dra. Fernanda Alves', level: 'R2', points: 2900, isUser: false },
];