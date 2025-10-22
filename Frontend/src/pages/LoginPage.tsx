import { useState } from 'react';
import { LoginForm } from "../components/LoginForm";
import { RoleSelector } from "../components/RoleSelector";
import { ConductorRegistrationForm } from '../components/DriverRegistrationForm';
import { OwnerRegistrationForm } from '../components/OwnerRegistrationForm';

type AppMode = 'login' | 'role_select' | 'register_driver' | 'register_owner';

export function LoginPage() {
  const [mode, setMode] = useState<AppMode>('login'); 
  
  const isLoginMode = mode === 'login';

  const renderContent = () => {
    switch (mode) {
      case 'login':
        return (
          <LoginForm 
            onRegisterClick={() => setMode('role_select')}
          />
        );
      case 'role_select':
        return (
          <RoleSelector 
            onBack={() => setMode('login')}
            onSelectRole={(role) => {
              if (role === 'owner') {
                setMode('register_owner');
              } else if (role === 'driver') { 
                setMode('register_driver');
              }
            }}
          />
        );
      case 'register_driver':
        return (
          <ConductorRegistrationForm 
            onBackToRoleSelect={() => setMode('role_select')}
          />
        );
      case 'register_owner': 
        return (
          <OwnerRegistrationForm 
            onBackToRoleSelect={() => setMode('role_select')}
          />
        );
      default:
        return null;
    }
  };

  const cardMaxWidthClass = 
  mode === 'login' || mode === 'role_select'
    ? 'max-w-2xl'  
    : 'max-w-2xl';

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-gray-50 p-4 font-display overflow-y-hidden">
      
      <div className={`w-full ${cardMaxWidthClass} rounded-3xl bg-white p-8 sm:p-10 shadow-2xl space-y-8 overflow-y-auto max-h-full`}>
        
        {/* Encabezado: SOLO se muestra si estamos en modo 'login' */}
        {isLoginMode && (
          <div className="text-center space-y-1">
            <h1 className="text-gray-900 text-[28px] font-extrabold tracking-tight">
              Bienvenido a ParkEasy
            </h1>
            <p className="text-gray-500 text-base">
              Inicia sesión en tu cuenta
            </p>
          </div>
        )}

        {/* Renderiza el contenido según el modo */}
        {renderContent()}
        
      </div>
    </div>
  );
}