import { useState } from "react";
import { Input } from "./Input";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-6">
      <div className="flex flex-col gap-4"> 
        <Input
          label="Correo electrónico"
          type="email"
          icon="mail"
          placeholder="tu@correo.com"
        />

        <Input
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          icon="lock"
          placeholder="••••••••"
          trailingIcon={showPassword ? "visibility" : "visibility_off"}
          onTrailingClick={() => setShowPassword(!showPassword)}
        />
      </div>

      <div>
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-xl bg-blue-600 px-4 py-3.5 text-lg font-bold text-white shadow-xl shadow-blue-500/50 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600/60 transition duration-200"
        >
          Iniciar Sesión
        </button>
      </div>

      <div className="text-center pt-3">
        <p className="text-sm text-gray-600">
          ¿Aún no tienes una cuenta?{" "}
          <a 
            href="#"
            className="font-bold text-blue-600 hover:text-blue-500 transition duration-150"
          >
            Regístrate
          </a>
        </p>
      </div>
    </form>
  );
}