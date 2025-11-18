"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    title: '',
    hospital: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (formData.password.length < 3) {
        setError('A senha deve ter pelo menos 3 caracteres.');
        return;
    }

    // Cria o objeto de novo usuário
    const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        title: formData.title || 'Residente',
        hospital: formData.hospital || 'Hospital Geral',
        avatarUrl: '' // Poderia ser gerado aleatoriamente
    };

    register(newUser);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Criar conta</CardTitle>
          <CardDescription className="text-center">
            Junte-se ao MedSeps para começar seu treinamento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" name="name" placeholder="Dr. João Silva" required value={formData.name} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="joao@exemplo.com" required value={formData.email} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Cargo/Título</Label>
                    <Input id="title" name="title" placeholder="R1, Interno..." value={formData.title} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="hospital">Hospital</Label>
                    <Input id="hospital" name="hospital" placeholder="Nome do Hospital" value={formData.hospital} onChange={handleChange} />
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} />
            </div>

            {error && <p className="text-sm text-destructive font-medium">{error}</p>}

            <Button type="submit" className="w-full">Registrar</Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta? <Link href="/login" className="text-primary hover:underline">Fazer login</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}