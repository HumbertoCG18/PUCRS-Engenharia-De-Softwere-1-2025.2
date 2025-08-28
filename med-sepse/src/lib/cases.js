import { medicalCases } from '@/data/medical-cases';

// Simula a busca de dados que no futuro viria de uma API
export function getCases() {
  return medicalCases;
}

export function getDailyCase() {
  // Por enquanto, apenas retorna o primeiro caso marcado como diário
  return medicalCases.find(c => c.isDailyCase);
}