import { useState } from 'react';
import { LoginForm } from "../components/LoginForm";
import { RoleSelector } from "./RegisterPage";
import { ConductorRegistrationForm } from '../components/DriverRegistrationForm';
import { OwnerRegistrationForm } from '../components/OwnerRegistrationForm';
import { DriverHomePage } from './DriverHomePage';
import { OwnerHomePage } from './OwnerHomePage'; 

type AppMode = 'login' | 'role_select' | 'register_driver' | 'register_owner' | 'home_driver' | 'home_owner';
// FIX: Exportamos UserRole para que pueda ser importado por otros módulos (como DriverHomePage)
export type UserRole = 'driver' | 'owner' | null; 

export function LoginPage() {
    const [mode, setMode] = useState<AppMode>('login'); 
    const [userRole, setUserRole] = useState<UserRole>(null); 

    const handleAuthSuccess = (role: UserRole) => {
        setUserRole(role);
        if (role === 'driver') {
            setMode('home_driver');
        } else if (role === 'owner') {
            setMode('home_owner');
        }
    };
    
    const handleLogout = () => {
        setUserRole(null);
        setMode('login');
    };

    const isLoginMode = mode === 'login';
    const isFullScreen = mode.startsWith('home_'); 

    const renderContent = () => {
        switch (mode) {
            case 'login':
                return (
                    <LoginForm 
                        onRegisterClick={() => setMode('role_select')}
                        onLoginSuccess={handleAuthSuccess} 
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
                        onRegistrationSuccess={() => handleAuthSuccess('driver')} 
                    />
                );
            case 'register_owner': 
                return (
                    <OwnerRegistrationForm 
                        onBackToRoleSelect={() => setMode('role_select')}
                        onRegistrationSuccess={() => handleAuthSuccess('owner')}
                    />
                );
            case 'home_driver': 
                return <DriverHomePage role={userRole} onLogout={handleLogout} />;
            case 'home_owner': 
                return <OwnerHomePage role={userRole} onLogout={handleLogout} />;
            default:
                return null;
        }
    };

    const parentContainerClasses = isFullScreen
        ? 'h-screen p-0' 
        : 'min-h-screen p-4 items-center justify-center'; 

    const cardClasses = isFullScreen
        ? 'max-w-none w-full h-full rounded-none shadow-none space-y-0 overflow-y-hidden' 
        : 'max-w-2xl p-8 sm:p-10 space-y-8 overflow-y-auto max-h-full rounded-3xl shadow-2xl'; 

    return (
        <div className={`relative flex w-full flex-col font-display bg-gray-50 ${parentContainerClasses}`}>
            
            <div className={`w-full bg-white transition-all duration-300 ${cardClasses}`}>
                
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

                {renderContent()}
                
            </div>
        </div>
    );
}