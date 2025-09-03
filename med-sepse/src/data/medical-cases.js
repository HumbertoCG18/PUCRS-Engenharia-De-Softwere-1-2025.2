// src/data/medical-cases.js

export const medicalCases = [
  {
    id: 'case001',
    difficulty: 'R2',
    category: 'Foco Neurológico',
    isDailyCase: true, // Este será nosso novo caso do dia
    
    // O "enunciado" inicial que o jogador vê
    presentation: 'Homem de 34 anos, sem comorbidades, é trazido ao PS por familiares com queixa de cefaleia intensa, vômitos e febre de 39°C há dois dias.',
    
    // Informações que podem ser "descobertas" nas abas do jogo
    physicalExam: {
      neurological: 'Glasgow 10 (Abertura ocular aos chamados, sons incompreensíveis, localiza dor). Rigidez nucal presente.',
      vitals: 'FC: 113bpm; PA: 80x62mmHg; FR: 18ipm; SpO2: 96% em ar ambiente.',
      general: 'Prostrado, abertura ocular apenas aos chamados.',
    },
    labResults: {
      leukocytes: '19.500/mm³ (com desvio à esquerda)',
      creatinine: '1.7 mg/dL',
      lactate: '3.1 mmol/L',
      platelets: '140.000/mm³',
      bilirubin: '1.5 mg/dL',
    },
    
    // O diagnóstico correto para o nosso algoritmo de proximidade
    correctDiagnosis: 'Choque séptico de foco neurológico (meningite bacteriana)',
    keywords: ['meningite', 'sepse', 'choque séptico', 'neurológico', 'hipertensão intracraniana', 'insuficiência renal'],
  },
  {
    id: 'case002',
    difficulty: 'R1',
    category: 'Foco Urinário',
    isDailyCase: false,
    
    presentation: 'Homem de 54 anos, hipertenso, é trazido ao PS com quadro de febre e rebaixamento do nível de consciência. Familiares relatam dor em flanco direito e disúria há três dias.',
    
    physicalExam: {
      neurological: 'Glasgow 13 (Confuso, mas obedece a comandos verbais).',
      vitals: 'FC: 120 bpm; PA: 80/40 mmHg; T: 38°C; Tempo de enchimento capilar: 5 segundos.',
      abdominal: 'Dor à punho-percussão em flanco direito.',
    },
    labResults: {
      leukocytes: '19.000/mm³ (com desvio à esquerda)',
      creatinine: '2.7 mg/dL', // Sinal claro de disfunção renal
      lactate: '36 mg/dL (equivalente a 4.0 mmol/L)', // Sinal claro de hipoperfusão
      platelets: '110.000/mm³',
      urineTest: 'Leucocitúria, hematúria e nitrito positivo.',
    },
    
    correctDiagnosis: 'Choque séptico de foco urinário (pielonefrite)',
    keywords: ['pielonefrite', 'sepse', 'choque séptico', 'urinário', 'insuficiência renal', 'disfunção circulatória'],
  },
  // Adicionaremos mais casos ricos em detalhes aqui no futuro
];


// A estrutura do ranking permanece a mesma
export const rankingData = [
  { rank: 1, name: 'Dra. Aline Souza', level: 'R3', points: 4580, isUser: false },
  { rank: 2, name: 'Dr. Bruno Costa', level: 'R2', points: 4210, isUser: false },
  { rank: 3, name: 'Seu Desempenho', level: 'R2', points: 3950, isUser: true },
  { rank: 4, name: 'Dr. Carlos Lima', level: 'R3', points: 3800, isUser: false },
  { rank: 5, name: 'Dra. Diana Faria', level: 'R1', points: 3550, isUser: false },
];