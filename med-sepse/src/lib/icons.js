// src/lib/icons.js
// CORREÇÃO: Trocamos 'Lung' por 'Lungs'
import { Wind, Shield, BrainCircuit, Stethoscope, HeartPulse, Waves, Droplet, Syringe } from 'lucide-react';

/**
 * Retorna um componente de ícone com base no nome da categoria.
 * @param {string} categoryName - O nome da categoria (ex: "Foco Pulmonar").
 * @returns {import('lucide-react').LucideIcon} O componente de ícone correspondente.
 */
export const getCategoryIcon = (categoryName) => {
  switch (categoryName) {
    case 'Foco Pulmonar':
      return Wind; // CORREÇÃO: Usando o nome correto do componente
    case 'Foco Urinário':
      return Droplet;
    case 'Foco Neurológico':
      return BrainCircuit;
    case 'Foco Abdominal':
      return Shield
    case 'Foco Gastrointestinal':
      return Waves;
    case 'Foco Cutâneo':
      return HeartPulse;
    case 'Foco Corrente Sanguínea':
      return Syringe
    default:
      return Stethoscope;
  }
};