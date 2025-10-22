import { Input } from "./Input";
import { useState } from "react";

const handleConductorRegistration = () => console.log('Registrando Conductor...');

export function ConductorRegistrationForm({ onBackToRoleSelect }: { onBackToRoleSelect: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleConductorRegistration(); }}>
      {/* Botón de volver al principio del formulario */}
      <button
          type="button"
          onClick={onBackToRoleSelect}
          className="flex items-center text-sm font-semibold text-gray-500 hover:text-gray-700 transition duration-150 mb-6"
        >
          <span className="material-symbols-outlined text-xl mr-1">arrow_back</span>
          Volver
      </button>
      
      {/* Título y Subtítulo */}
      <div className="text-left space-y-1">
        <h2 className="text-gray-900 text-2xl font-extrabold tracking-tight">
          Información de la Cuenta
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        
        {/* Datos Personales */}
        <Input
          label="Nombre completo"
          icon="person"
          placeholder="Introduce tu nombre completo"
        />

        <Input
          label="Correo electrónico"
          type="email"
          icon="mail"
          placeholder="Introduce tu correo electrónico"
        />

        {/* Contraseña */}
        <Input
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          icon="lock"
          placeholder="••••••••"
          trailingIcon={showPassword ? "visibility" : "visibility_off"}
          onTrailingClick={() => setShowPassword(!showPassword)}
        />
        
        {/* Detalles del Estacionamiento */}
        <div className="text-left space-y-1 pt-4">
          <h2 className="text-gray-900 text-2xl font-extrabold tracking-tight">
            Detalles del Vehiculo
          </h2>
        </div>

        <Input
          label="Placa del vehículo"
          icon="directions_car"
          placeholder="ABC-123"
        />
        
        {/* Campo de selección para Tipo de Vehículo */}
        <label className="flex flex-col flex-1">
          <p className="text-gray-700 text-sm font-medium pb-1.5">Tipo de vehículo</p>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
              swap_horiz
            </span>
            <select
              className="form-select w-full rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 border border-transparent bg-gray-100 h-14 placeholder:text-gray-400 pl-12 text-base pr-4 appearance-none"
            >
              <option value="">Selecciona el tipo de vehículo</option>
              <option value="car">Auto</option>
              <option value="motorcycle">Motocicleta</option>
            </select>
            {/* Ícono de flecha para la selección */}
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              arrow_drop_down
            </span>
          </div>
        </label>
        
        {/* Términos y Condiciones */}
        <div className="flex items-start pt-2">
          <input type="checkbox" id="terms" className="mt-1 mr-3 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
          <label htmlFor="terms" className="text-sm text-gray-600">
            Acepto los <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">Términos y Condiciones</a> y la <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">Política de Privacidad</a>.
          </label>
        </div>
        
      </div>

      {/* Botón de Registro */}
      <div className="pt-4">
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-xl bg-blue-600 px-4 py-3.5 text-lg font-bold text-white shadow-xl shadow-blue-500/50 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600/60 transition duration-200"
        >
          Registrarse
        </button>
      </div>

      {}
    </form>
  );
}