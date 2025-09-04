// src/lib/icons.js
// CORREÇÃO: Trocamos 'Lung' por 'Lungs'
import { Wind, Shield, BrainCircuit, Stethoscope, HeartPulse, Waves, Droplet, Syringe } from 'lucide-react';

/**
 * Retorna um componente de ícone com base no nome da categoria.
 * @param {string} categoryName - O nome da categoria (ex: "Foco Pulmonar").
 * @returns {import('lucide-react').LucideIcon} O componente de ícone correspondente.
 */
export const getCategoryIcon = (categoryId) => {
  switch (categoryId) {
    case 1 :
      return Wind; // CORREÇÃO: Usando o nome correto do componente
    case 2:
      return Droplet;
    case 3:
      return BrainCircuit;
    case 4:
      return Shield
    case 6:
      return Waves;
    case 5:
      return HeartPulse;
    case 7:
      return Syringe
    default:
      return Stethoscope;
  }
};