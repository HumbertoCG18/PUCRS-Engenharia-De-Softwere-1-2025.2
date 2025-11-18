"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import usersData from '@/data/users.json';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Simula verificação de sessão ao carregar
    const storedUser = localStorage.getItem('medseps_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Proteção de rotas: Redireciona para login se não autenticado
    const publicPaths = ['/login', '/register'];
    const isPublicPath = publicPaths.includes(pathname);

    if (!loading && !user && !isPublicPath) {
      router.push('/login');
    }
  }, [user, loading, pathname, router]);

  const login = (email, password) => {
    const foundUser = usersData.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('medseps_user', JSON.stringify(foundUser));
      router.push('/');
      return { success: true };
    }
    return { success: false, message: 'Credenciais inválidas.' };
  };

  const register = (newUser) => {
    // Simulação de registro: Adiciona ao estado local (não persistirá no JSON real)
    // Em um app real, isso seria uma chamada de API
    const userWithId = { 
        ...newUser, 
        id: `user${Date.now()}`,
        profileData: {
            level: 1,
            points: 0,
            xp: 0,
            xpToNextLevel: 500,
            streak: 0,
            badges: [],
            stats: {
                totalCases: 0,
                correctDiagnoses: 0,
                averageTime: "0:00",
                performanceByCategory: []
            }
        }
    };
    
    setUser(userWithId);
    localStorage.setItem('medseps_user', JSON.stringify(userWithId));
    router.push('/');
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medseps_user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);