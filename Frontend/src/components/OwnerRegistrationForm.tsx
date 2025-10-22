import { Input } from "./Input";
import { useState } from "react";

const MapInput = () => {
    return (
        <label className="flex flex-col flex-1">
            <p className="text-gray-700 text-sm font-medium pb-1.5">
                Dirección del Estacionamiento
            </p>
            <div className="relative h-48 rounded-xl overflow-hidden shadow-md border border-gray-300 bg-gray-100">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-gray-200/50">
                    <span className="material-symbols-outlined text-4xl text-blue-600 opacity-80">location_on</span>
                    <p className="text-gray-600 font-semibold mt-1">Aquí se incrustará el mapa interactivo</p>
                    <p className="text-xs text-gray-500 mt-0.5">(Busca una dirección o arrastra el pin)</p>
                </div>
                <div className="absolute top-4 left-4 right-4">
                    <input
                        type="text"
                        placeholder="Busca o ingresa la dirección"
                        className="w-full rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 border border-gray-300 bg-white h-10 placeholder:text-gray-400 pl-10 pr-4 text-base shadow-lg"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl">search</span>
                </div>
                <button type="button" className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-lg border border-gray-300 hover:bg-gray-50 transition">
                    <span className="material-symbols-outlined text-blue-600">my_location</span>
                </button>
            </div>
        </label>
    );
};

const handleOwnerRegistration = () => console.log('Registrando Dueño de Parqueo...');

export function OwnerRegistrationForm({ onBackToRoleSelect }: { onBackToRoleSelect: () => void }) {
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    
    const [is24h, setIs24h] = useState(false);

    const nextStep = () => setStep(prev => prev < 2 ? prev + 1 : prev);

    const prevStep = () => {
        if (step > 1) {
            setStep(prev => prev - 1);
        } else {
            onBackToRoleSelect(); 
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1) {
            nextStep();
        } else {
            handleOwnerRegistration();
        }
    };

    const StepIndicator = () => (
        <div className="flex items-center justify-center space-x-4 mb-8">
            <div className={`h-2 w-1/2 rounded-full ${step === 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`h-2 w-1/2 rounded-full ${step === 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        </div>
    );

    const renderStep1 = () => (
        <>
            <div className="text-left space-y-1">
                <h2 className="text-gray-900 text-2xl font-extrabold tracking-tight">Paso 1: Tu Cuenta</h2>
                <p className="text-gray-500 text-base">Crea tus credenciales de acceso de forma segura.</p>
            </div>

            <div className="flex flex-col gap-4">
                <Input label="Nombre completo" icon="person" placeholder="Tu nombre completo" />
                <Input label="Correo electrónico" type="email" icon="mail" placeholder="ejemplo@correo.com" />
                <Input
                    label="Contraseña"
                    type={showPassword ? "text" : "password"}
                    icon="lock"
                    placeholder="Mínimo 8 caracteres"
                    trailingIcon={showPassword ? "visibility" : "visibility_off"}
                    onTrailingClick={() => setShowPassword(!showPassword)}
                />
            </div>

            <div className="pt-6">
                <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-xl bg-blue-600 px-4 py-3.5 text-lg font-bold text-white shadow-xl shadow-blue-500/50 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600/60 transition duration-200"
                >
                Continuar
                    <span className="material-symbols-outlined ml-2">arrow_forward</span>
                </button>
            </div>
        </>
    );

    const renderStep2 = () => (
        <>
            <div className="text-left space-y-1">
                <h2 className="text-gray-900 text-2xl font-extrabold tracking-tight">Paso 2: Tu Parqueo</h2>
                <p className="text-gray-500 text-base">Ingresa los detalles de tu establecimiento para que los usuarios te encuentren.</p>
            </div>

            <div className="flex flex-col gap-4">
                <Input label="Nombre del Estacionamiento" icon="apartment" placeholder="Ej: ParkEasy Central" />
                <MapInput />
                <Input label="Cantidad de Espacios" type="number" icon="grid_on" placeholder="0" />
                
                {/* Precio por Hora */}
                <label className="flex flex-col flex-1">
                    <p className="text-gray-700 text-sm font-medium pb-1.5">Precio por Hora</p>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl font-bold">$</span>
                        <input
                            type="number"
                            placeholder="0.00"
                            className="form-input w-full rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 border border-transparent bg-gray-100 h-14 placeholder:text-gray-400 pl-10 pr-4 text-base transition duration-200"
                        />
                    </div>
                </label>
            </div>

            {/* Horario de Atención - VERSION SIMPLIFICADA */}
            <div className="text-left space-y-3 pt-4">
                <h3 className="text-gray-900 text-xl font-bold">Horario de Atención</h3>
                
                <div className="space-y-4 rounded-xl bg-gray-50 p-4 border border-gray-200">
                    
                    {/* Toggle para 24 Horas */}
                    <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                        <label htmlFor="24h-toggle" className="font-bold text-gray-900">
                            Abierto 24 Horas?
                        </label>
                        <input 
                            type="checkbox"
                            id="24h-toggle"
                            checked={is24h}
                            onChange={() => setIs24h(!is24h)}
                            className="h-6 w-11 rounded-full appearance-none cursor-pointer transition duration-200 bg-gray-300 checked:bg-blue-600 focus:outline-none"
                        />
                    </div>

                    {/* Inputs de Horario (Se ocultan si es 24h) */}
                    {!is24h ? (
                        <div className="flex flex-col space-y-4">
                        {/* Hora de Inicio */}
                        <div className="flex items-center space-x-2">
                            <p className="whitespace-nowrap">Desde</p>
                            <div className="flex-1">
                            <input
                                type="time"
                                className="w-full rounded-full border border-gray-300 bg-white p-2 pl-8 text-sm text-gray-700 focus:ring-blue-600"
                            />
                            </div>
                        </div>

                        {/* Hora de Cierre */}
                        <div className="flex items-center space-x-2">
                            <p className="whitespace-nowrap">Hasta</p>
                            <div className="flex-1">
                            <input
                                type="time"
                                className="w-full rounded-full border border-gray-300 bg-white p-2 pl-8 text-sm text-gray-700 focus:ring-blue-600"
                            />
                            </div>
                        </div>
                    </div>

                    ) : (
                         <div className="text-center py-2 text-blue-600 font-semibold bg-blue-50/50 rounded-lg">
                            El estacionamiento está siempre disponible.
                        </div>
                    )}
                </div>
            </div>

            {/* Controles de Navegación del Paso 2 */}
            <div className="pt-6">
                <button
                    type="submit"
                    className="w-full flex justify-center items-center rounded-xl bg-blue-600 px-4 py-3.5 text-lg font-bold text-white shadow-xl shadow-blue-500/50 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600/60 transition duration-200"
                >
                    Registrar
                </button>
            </div>
     </>
    );

    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            
            {/* Botón de volver */}
            <button
                type="button"
                onClick={prevStep}
                className="flex items-center text-sm font-semibold text-gray-500 hover:text-gray-700 transition duration-150 mb-6"
            >
                <span className="material-symbols-outlined text-xl mr-1">arrow_back</span>
                {step === 1 ? 'Volver al Selector de Rol' : 'Paso Anterior'}
            </button>

            <StepIndicator />
            
            {step === 1 ? renderStep1() : renderStep2()}
        </form>
    );
}