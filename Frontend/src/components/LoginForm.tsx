import { useState } from "react";
import { Input } from "./Input";

const MOCK_USERS = [
    { 
        email: "conductor@parkeasy.com", 
        password: "password123", 
        role: "driver"
    },
    { 
        email: "duenio@parkeasy.com", 
        password: "password123", 
        
        role: "owner"
    },
];

// Definimos las props para el formulario
type LoginFormProps = {
    // onRegisterClick ya existía
    onRegisterClick: () => void;
    // NUEVA PROP: para manejar el éxito de la autenticación
    onLoginSuccess: (role: 'driver' | 'owner') => void; 
};


export function LoginForm({ onRegisterClick, onLoginSuccess }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 

    // Buscar el usuario con las credenciales ingresadas
    const user = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      // Éxito: Llamar a la función del padre con el rol
      onLoginSuccess(user.role as 'driver' | 'owner');
    } else {
      // Fracaso: Mostrar mensaje de error con las credenciales de prueba
      setError("Credenciales incorrectas. Pruebas: conductor@parkeasy.com / duenio@parkeasy.com (password123)");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}> 
      <div className="flex flex-col gap-5"> 
        <Input
          label="Correo electrónico"
          type="email"
          icon="mail"
          placeholder="tu@correo.com"
          value={email} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />

        <Input
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          icon="lock"
          placeholder="••••••••"
          trailingIcon={showPassword ? "visibility" : "visibility_off"}
          onTrailingClick={() => setShowPassword(!showPassword)}
          value={password} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
      </div>

      {/* Mensaje de Error (Condicional) */}
      {error && (
        <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-sm mt-4">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      {/* Botón de Iniciar Sesión */}
      <div>
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-xl bg-blue-600 px-4 py-4 text-lg font-bold text-white shadow-xl shadow-blue-600/50 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600/60 transition duration-150"
        >
          Iniciar Sesión
        </button>
      </div>

      {/* Enlace de Registro */}
      <div className="text-center pt-2">
        <p className="text-base text-text-secondary">
          ¿Aún no tienes una cuenta?{" "}
          <button
            type="button"
            onClick={onRegisterClick}
            className="font-semibold text-primary hover:text-primary/80"
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </form>
  );
}