import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

interface PasswordProtectProps {
  children: React.ReactNode;
  onUnlock: () => void;
}

export function PasswordProtect({ children, onUnlock }: PasswordProtectProps) {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password check - in V2 this will be proper authentication
    if (password === 'asukeai2025') {
      setIsUnlocked(true);
      onUnlock();
      setError('');
    } else {
      setError('Contraseña incorrecta');
      setPassword('');
    }
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Lock className="h-12 w-12 text-gray-400" />
          </div>
          <CardTitle>Acceso Restringido</CardTitle>
          <CardDescription>
            Esta página es solo para uso interno del equipo Asukeai
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={error ? 'border-red-500' : ''}
              />
              {error && (
                <p className="text-sm text-red-500 mt-2">{error}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Ingresar
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>V1 - Acceso con contraseña</p>
            <p className="text-xs">V2 incluirá autenticación completa</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}