// src/lib/cases.js
import medicalCases from '@/data/cases.json';

export function getCases() {
  return medicalCases;
}

export function getDailyCase() {
  // A lógica para o caso do dia agora pode ser baseada no ID ou na data
  const startDate = new Date('2024-01-01');
  const today = new Date();
  const diffTime = Math.abs(today - startDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const caseIndex = diffDays % medicalCases.length;
  return medicalCases[caseIndex];
}