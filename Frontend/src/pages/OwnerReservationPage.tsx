type OwnerReservationsPageProps = {
    onGoBack: () => void;
};

// Datos simulados de reservas
const allReservations = [
    { id: 101, client: "Juan Pérez", vehicle: "SUV (ABC-123)", entry: "10:30 AM", duration: "3 hrs", status: "Activa", space: "A-12" },
    { id: 102, client: "María Rodríguez", vehicle: "Sedan (XYZ-456)", entry: "11:00 AM", duration: "1.5 hrs", status: "Activa", space: "B-05" },
    { id: 103, client: "Carlos Gómez", vehicle: "Hatchback (RST-789)", entry: "11:15 AM", duration: "4 hrs", status: "Activa", space: "C-01" },
    { id: 104, client: "Ana López", vehicle: "Moto (MNO-111)", entry: "09:00 AM", duration: "2 hrs", status: "Finalizada", space: "A-07" },
    { id: 105, client: "Pedro García", vehicle: "Camioneta (DEF-222)", entry: "08:30 AM", duration: "5 hrs", status: "Finalizada", space: "B-02" },
    { id: 106, client: "Laura Fuentes", vehicle: "Sedan (GHI-333)", entry: "07:00 AM", duration: "8 hrs", status: "Finalizada", space: "C-10" },
];

// 1. **Definir el tipo del elemento de reserva**
type ReservationItemType = typeof allReservations[0];

const getStatusClasses = (status: string) => {
    switch (status) {
        case 'Activa':
            return 'bg-green-100 text-green-700 border-green-400';
        case 'Finalizada':
            return 'bg-gray-100 text-gray-700 border-gray-400';
        default:
            return 'bg-yellow-100 text-yellow-700 border-yellow-400';
    }
};

// 2. **CORRECCIÓN CLAVE:** El componente recibe la propiedad 'res' que es de tipo ReservationItemType.
const ReservationItem = ({ res }: { res: ReservationItemType }) => (
    <div className="flex justify-between items-start bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-400 hover:shadow-md transition duration-150">
        <div className="flex-1 min-w-0 pr-4">
            <h3 className="text-lg font-bold text-gray-900 truncate">Cliente: {res.client}</h3>
            <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold">{res.vehicle}</span> - Plazo: {res.duration}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Entrada: {res.entry}</p>
        </div>
        
        <div className="text-right flex flex-col items-end space-y-1">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusClasses(res.status)}`}>
                {res.status}
            </span>
            <span className="text-xl font-black text-blue-600">{res.space}</span>
            <span className="text-xs text-gray-500">Espacio</span>
        </div>
    </div>
);


export function OwnerReservationsPage({ onGoBack }: OwnerReservationsPageProps) {
    return (
        <div className="flex flex-col h-full bg-gray-100">
            {/* Header */}
            <div className="flex items-center p-4 border-b border-gray-200 bg-white flex-shrink-0 shadow-md">
                <button 
                    onClick={onGoBack} 
                    className="text-gray-600 hover:text-blue-600 transition duration-150 p-1"
                >
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h2 className="flex-1 text-center text-xl font-bold text-gray-900 -ml-8">
                    Reservas del Parqueo
                </h2>
            </div>

            {/* Lista de Reservas */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <p className="text-sm text-gray-600 font-semibold mb-3">Total de {allReservations.length} reservas registradas hoy:</p>
                {allReservations.map(res => (
                    // 3. **Uso correcto de la prop 'res'**
                    <ReservationItem key={res.id} res={res} />
                ))}
            </div>

            {/* Footer */}
            <div className="p-5 flex-shrink-0 border-t border-gray-200 bg-white">
                <button
                    onClick={onGoBack}
                    className="w-full justify-center rounded-xl bg-gray-200 px-4 py-3 text-lg font-bold text-gray-700 hover:bg-gray-300 transition duration-150"
                >
                    Volver
                </button>
            </div>
        </div>
    );
}