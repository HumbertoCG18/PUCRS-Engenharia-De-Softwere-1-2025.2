"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, LogIn } from 'lucide-react';
import usersData from '@/data/users.json';
import Link from 'next/link';

export default function LoginPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    const result = login(selectedUser.email, password);
    if (!result.success) {
      setError(result.message);
      setPassword('');
      // Animação de "shake" poderia ser adicionada aqui
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <motion.div 
        layout 
        className="w-full max-w-md flex flex-col items-center space-y-8"
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter">MedSeps</h1>
          <p className="text-muted-foreground">Treinamento Clínico Gamificado</p>
        </div>

        <AnimatePresence mode="wait">
          {!selectedUser ? (
            <motion.div
              key="user-selection"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full flex flex-col items-center"
            >
              <div className="grid grid-cols-2 gap-8 mb-8">
                {usersData.map(user => (
                  <motion.div 
                    key={user.id} 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setSelectedUser(user); setError(''); }}
                    className="flex flex-col items-center gap-3 cursor-pointer group"
                  >
                    <Avatar className="w-24 h-24 border-4 border-transparent group-hover:border-primary/20 transition-all shadow-lg">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <span className="font-medium text-lg block">{user.name.split(' ')[0]} {user.name.split(' ')[1]}</span>
                        <span className="text-xs text-muted-foreground">{user.title}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="w-full border-t pt-6 mt-4 flex flex-col gap-3 items-center">
                <p className="text-sm text-muted-foreground">Não tem uma conta?</p>
                <Button asChild variant="outline" className="w-full max-w-xs">
                    <Link href="/register">Criar Nova Conta</Link>
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="password-input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-xs flex flex-col items-center"
            >
              <div className="flex flex-col items-center gap-4 mb-6">
                <Avatar className="w-28 h-28 shadow-xl">
                  <AvatarImage src={selectedUser.avatarUrl} alt={selectedUser.name} />
                  <AvatarFallback className="text-3xl">{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h2 className="font-semibold text-xl">{selectedUser.name}</h2>
                    <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>

              <form onSubmit={handleLogin} className="w-full space-y-4 relative">
                <div className="relative group">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite a senha"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    className={`h-12 text-center text-lg pr-12 rounded-full transition-all shadow-sm ${error ? 'border-destructive ring-destructive' : 'focus:ring-primary'}`}
                    autoFocus
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity"
                    disabled={!password}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
                {error && (
                    <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-destructive text-center font-medium"
                    >
                        {error}
                    </motion.p>
                )}
              </form>
              
              <Button variant="ghost" size="sm" onClick={() => { setSelectedUser(null); setPassword(''); }} className="mt-6 text-muted-foreground hover:text-primary">
                ← Trocar de Usuário
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}