import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { GitBranch } from 'lucide-react';

interface AuthPageProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (username: string, email: string, password: string) => void;
}

export function AuthPage({ onLogin, onSignup }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="mb-8 flex items-center">
        <GitBranch className="h-10 w-10 text-blue-500" />
        <h1 className="text-4xl font-bold text-gray-900 ml-2">GITAM Hub</h1>
      </div>
      
      {isLogin ? (
        <LoginForm onSubmit={onLogin} onToggleForm={() => setIsLogin(false)} />
      ) : (
        <SignupForm onSubmit={onSignup} onToggleForm={() => setIsLogin(true)} />
      )}
    </div>
  );
}