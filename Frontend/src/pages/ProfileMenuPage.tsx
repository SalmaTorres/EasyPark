type ProfileMenuPageProps = {
    onGoBack: () => void;
    onViewReservation: () => void;
    onViewHistory: () => void; // **NUEVO: Añadido manejador para Historial**
    onLogout: () => void;
};

type MenuOptionProps = {
    label: string;
    icon: string;
    onClick: () => void;
    color: string;
}

const MenuOption = ({ label, icon, onClick, color }: MenuOptionProps) => (
    <button
        onClick={onClick}
        className="flex items-center w-full p-4 bg-white rounded-xl hover:bg-gray-50 transition duration-150 shadow-md border border-gray-100"
    >
        <span className={`material-symbols-outlined text-2xl mr-4 ${color}`}>{icon}</span>
        <span className="text-lg font-semibold text-gray-800">{label}</span>
        <span className="material-symbols-outlined text-gray-400 ml-auto">chevron_right</span>
    </button>
);


export function ProfileMenuPage({
    onGoBack,
    onViewReservation,
    onViewHistory, // **NUEVO: Usado aquí**
    onLogout,
}: ProfileMenuPageProps) {
    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Header */}
            <div className="flex items-center p-4 border-b border-gray-200 bg-white flex-shrink-0 shadow-md">
                <button onClick={onGoBack} className="text-gray-600 hover:text-blue-600 transition duration-150 p-1">
                    <span className="material-symbols-outlined text-2xl">close</span>
                </button>
                <h2 className="flex-1 text-center text-xl font-bold text-gray-900 -ml-8">
                    Opciones de Usuario
                </h2>
            </div>

            {/* Contenido - Diseño más moderno */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
                
                {/* Tarjeta de Perfil */}
                <div className="flex flex-col items-center justify-center p-6 bg-blue-600 text-white rounded-2xl shadow-xl">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-3 border-4 border-blue-400">
                        <span className="material-symbols-outlined text-blue-600 text-4xl">account_circle</span>
                    </div>
                    <p className="text-xl font-extrabold">Usuario ParkEasy</p>
                    <p className="text-sm opacity-90">tucorreo@ejemplo.com</p>
                </div>

                {/* Opción 1: Información de Reserva */}
                <MenuOption 
                    label="Ver Info de mi Reserva"
                    icon="receipt_long"
                    onClick={onViewReservation}
                    color="text-blue-600"
                />

                {/* Opción 2: Historial (Ya no es una alerta) */}
                <MenuOption 
                    label="Historial de Parqueos"
                    icon="history"
                    onClick={onViewHistory} // **AQUÍ: Nuevo manejador de navegación**
                    color="text-gray-600"
                />
            </div>

            {/* Botón de Cerrar Sesión */}
            <div className="p-5 flex-shrink-0 border-t border-gray-200 bg-white shadow-t-lg">
                <button
                    onClick={onLogout}
                    className="flex items-center justify-center w-full p-4 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition duration-150 shadow-md"
                >
                    <span className="material-symbols-outlined text-2xl mr-2">logout</span>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}