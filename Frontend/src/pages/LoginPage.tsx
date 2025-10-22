import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-gray-50 p-4 font-display overflow-y-hidden">
      
      {/* Tarjeta (Card) del Formulario: Fondo blanco y sombra potente */}
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 sm:p-10 shadow-2xl space-y-8">
        
        {/* Encabezado sin Logo */}
        <div className="text-center space-y-1">
          <h1 className="text-gray-900 text-[28px] font-extrabold tracking-tight">
            Bienvenido a ParkEasy
          </h1>
          <p className="text-gray-500 text-base">
            Inicia sesión en tu cuenta
          </p>
        </div>

        {/* Formulario */}
        <LoginForm />
        
        {/* Divider estético */}
        <div className="relative flex items-center pt-2">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-gray-400 text-xs font-medium uppercase tracking-wider">
            O inicia sesión con
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        
      </div>
    </div>
  );
}