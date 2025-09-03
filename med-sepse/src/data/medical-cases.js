export const medicalCases = [
   {
    id: 'case001',
    difficulty: 'R2',
    category: 'Foco Neurológico',
    isDailyCase: true, // <-- ADICIONE ESTA LINHA
    finalDiagnosis: 'Choque Séptico',
    presentation: 'Homem de 34 anos, sem comorbidades, é trazido ao PS por familiares com queixa de cefaleia intensa, vômitos e febre de 39°C há dois dias.',
    physicalExam: { /* ... */ },
    labResults: { /* ... */ },
    correctDiagnosis: 'Choque séptico de foco neurológico (meningite bacteriana)',
    keywords: ['meningite', 'sepse', 'choque séptico', 'neurológico', 'insuficiência renal'],
  },
  {
    id: 'case002',
    difficulty: 'R1',
    category: 'Foco Urinário',
    finalDiagnosis: 'Choque Séptico', // Hipotensão (PA 80/40) e lactato > 2
    presentation: 'Homem de 54 anos, hipertenso, é trazido ao PS com quadro de febre e rebaixamento do nível de consciência. Familiares relatam dor em flanco direito e disúria há três dias.',
    physicalExam: { /* ... */ },
    labResults: { /* ... */ },
    correctDiagnosis: 'Choque séptico de foco urinário (pielonefrite)',
    keywords: ['pielonefrite', 'sepse', 'choque séptico', 'urinário', 'insuficiência renal'],
  },
  {
    id: 'case003',
    difficulty: 'R2',
    category: 'Foco Abdominal',
    finalDiagnosis: 'Sepse', // Hipotensão responsiva a volume (PA 110/60) mas com disfunção orgânica (leucocitose, taquicardia)
    presentation: 'Homem de 45 anos com histórico de pancreatite procura o PS com dor abdominal intensa "em barra", febre de 38°C e taquicardia.',
    physicalExam: { /* ... */ },
    labResults: { /* ... */ },
    correctDiagnosis: 'Sepse de foco abdominal (pancreatite aguda)',
    keywords: ['pancreatite', 'sepse', 'abdominal', 'SIRS'],
  },
  {
    id: 'case004',
    difficulty: 'R3',
    category: 'Foco Cutâneo',
    finalDiagnosis: 'Sepse', // Paciente estável hemodinamicamente (PA 120/70) mas com disfunção orgânica (lactato > 2, febre, taquicardia)
    presentation: 'Mulher de 57 anos, diabética não controlada, apresenta febre, dor, edema e eritema em coxa esquerda. A lesão mede 20cm e tem limites mal definidos.',
    physicalExam: { /* ... */ },
    labResults: { /* ... */ },
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