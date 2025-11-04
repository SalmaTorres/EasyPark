type ReservationInfoPageProps = {
    onGoBack: () => void; // Esta función ahora debe llevar al menú (handleMenuOpen en DriverHomePage)
};

// Componente auxiliar para las filas de detalle (con tipos definidos)
type DetailRowProps = {
    label: string;
    value: string;
    icon: string;
    isTotal?: boolean;
}

const DetailRow = ({ label, value, icon, isTotal = false }: DetailRowProps) => (
    <div className={`flex items-center justify-between ${isTotal ? 'text-blue-600' : 'text-gray-700'}`}>
        <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-lg">{icon}</span>
            <span className={`text-md ${isTotal ? 'font-bold' : 'font-medium'}`}>{label}</span>
        </div>
        <span className={`text-md ${isTotal ? 'font-black text-xl' : 'font-semibold'}`}>{value}</span>
    </div>
);


export function ReservationInfoPage({ onGoBack }: ReservationInfoPageProps) {
    // Datos simulados de una reserva activa
    const simulatedReservation = {
        name: "Estacionamiento Central",
        address: "Av. Principal 123, Centro",
        entryTime: "09:30 AM",
        duration: "2 horas",
        totalCost: "Bs 5.00",
        paymentMethod: "Pagado con QR",
        spaceNumber: "A-12",
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="flex items-center p-4 border-b border-gray-100 flex-shrink-0">
                <button 
                    onClick={onGoBack} // Llama al onGoBack (que ahora regresa al menú)
                    className="text-gray-600 hover:text-blue-600 transition duration-150 p-1"
                >
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h2 className="flex-1 text-center text-xl font-bold text-gray-900 -ml-8">
                    Mi Reserva Activa
                </h2>
            </div>

            {/* Contenido principal de la reserva */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
                
                {/* Estatus */}
                <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                    <span className="material-symbols-outlined text-green-600 text-4xl">check_circle</span>
                    <p className="text-xl font-bold text-green-700 mt-2">¡Reserva Activa!</p>
                    <p className="text-sm text-green-600">Tu plaza te está esperando.</p>
                </div>

                {/* Detalles del Parqueo */}
                <div className="bg-gray-50 p-4 rounded-xl shadow-sm space-y-2">
                    <p className="text-sm font-semibold text-gray-500">Ubicación</p>
                    <p className="text-xl font-extrabold text-gray-900">{simulatedReservation.name}</p>
                    <p className="text-md text-gray-700">{simulatedReservation.address}</p>
                </div>

                {/* Tabla de Detalles */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-md space-y-3">
                    <DetailRow label="Espacio Asignado" value={simulatedReservation.spaceNumber} icon="local_parking" />
                    <DetailRow label="Hora de Entrada" value={simulatedReservation.entryTime} icon="schedule" />
                    <DetailRow label="Duración Estimada" value={simulatedReservation.duration} icon="timer" />
                    <div className="border-t border-gray-100 pt-3 mt-3">
                        <DetailRow label="Costo Total" value={simulatedReservation.totalCost} icon="paid" isTotal />
                    </div>
                    <DetailRow label="Método de Pago" value={simulatedReservation.paymentMethod} icon="credit_card" />
                </div>
            </div>

            {/* Footer con opción de volver al menú (más lógico) */}
            <div className="p-5 flex-shrink-0 border-t border-gray-100 bg-white">
                <button
                    onClick={onGoBack}
                    className="w-full justify-center rounded-xl bg-blue-600 px-4 py-3.5 text-lg font-bold text-white shadow-xl shadow-blue-500/40 hover:bg-blue-700 transition duration-150"
                >
                    Volver al Menú
                </button>
            </div>
        </div>
    );
}