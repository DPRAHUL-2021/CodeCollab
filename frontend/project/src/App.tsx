import React, { useState } from 'react';
import { AuthPage } from './components/auth/AuthPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { User } from './types';
import { authService } from './services/auth';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (email: string, password: string) => {
    const loggedInUser = await authService.login(email, password);
    setUser(loggedInUser);
  };

  const handleSignup = async (username: string, email: string, password: string) => {
    const newUser = await authService.signup(username, email, password);
    setUser(newUser);
  };

  return user ? (
    <DashboardPage user={user} />
  ) : (
    <AuthPage onLogin={handleLogin} onSignup={handleSignup} />
  );
}

export default App;