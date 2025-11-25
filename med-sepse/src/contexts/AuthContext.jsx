"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import usersData from '@/data/users.json'; // Certifique-se que este caminho está correto

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 1. Carrega usuário do storage ao iniciar
    const storedUser = localStorage.getItem('medseps_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // 2. Segurança de Rota: Executa sempre que a rota (pathname) ou o status de load mudar
    if (loading) return; // Não faz nada enquanto carrega

    const publicRoutes = ['/login', '/register'];
    const isPublicRoute = publicRoutes.includes(pathname);

    if (!user && !isPublicRoute) {
      // Se NÃO tem usuário e a rota NÃO é pública -> Bloqueia e manda pro login
      router.push('/login');
    } else if (user && isPublicRoute) {
      // (Opcional) Se JÁ tem usuário e tenta ir pro login -> Manda pra home
      router.push('/');
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medseps_user');
    router.push('/login');
  };

  // ... (função register igual)

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {/* Só mostra o app (children) se não estiver carregando 
         ISSO EVITA O "PISCAR" DA TELA PROTEGIDA ANTES DE REDIRECIONAR
      */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);