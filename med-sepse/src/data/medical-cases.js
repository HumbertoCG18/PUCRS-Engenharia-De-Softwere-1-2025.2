export const medicalCases = [
  {
    id: 'case001',
    difficulty: 'R2',
    isDailyCase: true,
    category: 'Foco Neurológico',
    finalDiagnosis: 'Choque Séptico',
    presentation: 'Homem de 34 anos, sem comorbidades, é trazido ao PS por familiares com queixa de cefaleia intensa, vômitos e febre de 39°C há dois dias.',
    physicalExam: {
      neurological: 'Glasgow 10 (Abertura ocular aos chamados, sons incompreensíveis, localiza dor). Rigidez nucal presente.',
      vitals: 'FC: 113bpm; PA: 80x62mmHg (PAM 68 mmHg), refratária à expansão volêmica inicial.',
      general: 'Prostrado, abertura ocular apenas aos chamados.',
    },
    labResults: {
      leukocytes: '19.500/mm³ (com desvio à esquerda)',
      creatinine: '1.7 mg/dL',
      // -> Lactato persistentemente elevado.
      lactate: '3.1 mmol/L',
      platelets: '140.000/mm³',
    },
    correctDiagnosis: 'Choque séptico de foco neurológico (meningite bacteriana)',
    keywords: ['meningite', 'sepse', 'choque séptico', 'neurológico', 'insuficiência renal'],
  },
  {
    id: 'case002',
    difficulty: 'R1',
    category: 'Foco Urinário',
    finalDiagnosis: 'Choque Séptico',
    presentation: 'Homem de 54 anos, hipertenso, é trazido ao PS com quadro de febre e rebaixamento do nível de consciência. Familiares relatam dor em flanco direito e disúria há três dias.',
    physicalExam: {
      neurological: 'Glasgow 13 (Confuso, mas obedece a comandos verbais).',
      // -> Adicionado a necessidade de vasopressor, o critério definitivo de choque.
      vitals: 'FC: 120 bpm; PA: 80/40 mmHg (PAM 53 mmHg), necessitando início de vasopressor para manter PAM > 65mmHg.',
      abdominal: 'Dor à punho-percussão em flanco direito.',
    },
    labResults: {
      leukocytes: '19.000/mm³ (com desvio à esquerda)',
      creatinine: '2.7 mg/dL',
      lactate: '4.0 mmol/L',
      platelets: '110.000/mm³',
      urineTest: 'Leucocitúria, hematúria e nitrito positivo.',
    },
    correctDiagnosis: 'Choque séptico de foco urinário (pielonefrite)',
    keywords: ['pielonefrite', 'sepse', 'choque séptico', 'urinário', 'insuficiência renal'],
  },
  {
    id: 'case003',
    difficulty: 'R2',
    category: 'Foco Abdominal',
    finalDiagnosis: 'Sepse',
    presentation: 'Homem de 45 anos com histórico de pancreatite procura o PS com dor abdominal intensa "em barra", febre de 38°C e taquicardia.',
    physicalExam: {
      // -> Adicionado contexto de que a PA se estabilizou com volume, descartando choque.
      vitals: 'FC: 110 bpm; PA: 110/60 mmHg (após 1L de cristaloide); FR: 24 ipm; T: 38°C.',
      abdominal: 'Abdome plano, ruídos hidroaéreos presentes, normotenso.',
      general: 'Paciente ansioso, sudoreico, referindo dor intensa.',
    },
    labResults: {
      leukocytes: '14.000/mm³',
      amylase: '800 U/L (elevada)',
      // -> Lactato > 2, indicando disfunção orgânica (sepse), mas sem os critérios de choque.
      lactate: '2.5 mmol/L',
      creatinine: '1.4 mg/dL',
    },
    correctDiagnosis: 'Sepse de foco abdominal (pancreatite aguda)',
    keywords: ['pancreatite', 'sepse', 'abdominal', 'SIRS'],
  },
  {
    id: 'case004',
    difficulty: 'R3',
    category: 'Foco Cutâneo',
    finalDiagnosis: 'Sepse',
    presentation: 'Mulher de 57 anos, diabética não controlada, apresenta febre, dor, edema e eritema em coxa esquerda. A lesão mede 20cm e tem limites mal definidos.',
    physicalExam: {
      // -> PA estável, sem necessidade de vasopressor.
      vitals: 'FC: 110 bpm; FR: 21 ipm; PA: 120/70 mmHg; T: 38.9°C.',
      skin: 'Área eritematosa, edemaciada, quente e dolorosa na coxa esquerda.',
      cardiovascular: 'Taquicardia sinusal, pulsos cheios.',
    },
    labResults: {
      leukocytes: '16.000/mm³',
      // -> Lactato > 2, confirmando disfunção orgânica.
      lactate: '2.8 mmol/L',
      hba1c: '9.5% (mau controle glicêmico)',
      pcr: '180 mg/L (elevado)',
    },
    correctDiagnosis: 'Sepse de foco cutâneo (celulite)',
    keywords: ['celulite', 'sepse', 'cutâneo', 'partes moles', 'diabetes'],
  },
];

// A estrutura do ranking permanece a mesma
export const rankingData = [
  { rank: 1, name: 'Dra. Aline Souza', level: 'R3', points: 4580, isUser: false },
  { rank: 2, name: 'Dr. Bruno Costa', level: 'R2', points: 4210, isUser: false },
  { rank: 3, name: 'Seu Desempenho', level: 'R2', points: 3950, isUser: true },
  { rank: 4, name: 'Dr. Carlos Lima', level: 'R3', points: 3800, isUser: false },
  { rank: 5, name: 'Dra. Diana Faria', level: 'R1', points: 3550, isUser: false },
];