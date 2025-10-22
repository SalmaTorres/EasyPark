import { useState } from 'react';
import { LoginForm } from "../components/LoginForm";
import { RoleSelector } from "./RegisterPage";
import { ConductorRegistrationForm } from '../components/DriverRegistrationForm';
import { OwnerRegistrationForm } from '../components/OwnerRegistrationForm';
import { DriverHomePage } from './DriverHomePage';

type AppMode = 'login' | 'role_select' | 'register_driver' | 'register_owner' | 'home_driver';

export function LoginPage() {
  const [mode, setMode] = useState<AppMode>('login'); 

  const handleAuthSuccess = () => {
  setMode('home_driver');
  };

  const isLoginMode = mode === 'login';
  const isFullScreen = mode === 'home_driver'; 

  const renderContent = () => {
    switch (mode) {
      case 'login':
        return (
          <LoginForm 
            onRegisterClick={() => setMode('role_select')}
             // Si el botón de Iniciar Sesión NO debe funcionar,
             // no pases una prop onLoginSuccess o haz que el submit de LoginForm no haga nada.
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
             // AÑADIDO: Prop para manejar la redirección de éxito
             onRegistrationSuccess={handleAuthSuccess} 
          />
        );
      case 'register_owner': 
        return (
          <OwnerRegistrationForm 
            onBackToRoleSelect={() => setMode('role_select')}
             // Puedes añadir onRegistrationSuccess={handleAuthSuccess} si el dueño va al mismo Home
          />
        );
      case 'home_driver': // NUEVO: Caso para la pantalla de inicio del conductor
        return <DriverHomePage />;
      default:
        return null;
    }
  };

  const parentContainerClasses = isFullScreen
      ? 'h-screen p-0' // Ocupa toda la altura y quita el padding para Home
      : 'min-h-screen p-4 items-center justify-center'; // Vuelve al centrado

  const cardClasses = isFullScreen
    ? 'max-w-none w-full h-full rounded-none shadow-none space-y-0 overflow-y-hidden' // Ocupa todo, sin bordes ni sombra
    : 'max-w-2xl p-8 sm:p-10 space-y-8 overflow-y-auto max-h-full rounded-3xl shadow-2xl'; // Vuelve al estilo de tarjeta

  return (
    <div className={`relative flex w-full flex-col font-display bg-gray-50 ${parentContainerClasses}`}>
      
      <div className={`w-full bg-white transition-all duration-300 ${cardClasses}`}>
        
        {/* Encabezado: SOLO se muestra si NO es la pantalla de inicio (isFullScreen) */}
        {!isFullScreen && isLoginMode && (
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