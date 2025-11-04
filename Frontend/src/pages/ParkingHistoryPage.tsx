type ParkingHistoryPageProps = {
    onGoBack: () => void;
};

// Datos simulados de historial
const historyItems = [
    { id: 5, name: "Garaje Sur", address: "Av. 6 de Agosto 789, Sur", date: "25 Oct, 2025", duration: "1.5 horas", cost: "Bs 3.00" },
    { id: 6, name: "Parking Norte", address: "Calle Arica 456, Norte", date: "20 Oct, 2025", duration: "3 horas", cost: "Bs 9.00" },
    { id: 7, name: "Estacionamiento Central", address: "Av. Principal 123, Centro", date: "15 Oct, 2025", duration: "0.5 horas", cost: "Bs 1.25" },
    { id: 8, name: "El Prado Park", address: "Paseo El Prado 101, Centro", date: "10 Oct, 2025", duration: "4 horas", cost: "Bs 14.00" },
];

// Componente para una fila del historial
const HistoryListItem = ({ item }: { item: typeof historyItems[0] }) => (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md border-l-4 border-gray-400">
        <div className="flex-1 min-w-0 pr-4">
            <h3 className="text-lg font-bold text-gray-900 truncate">{item.name}</h3>
            <p className="text-sm text-gray-500 truncate mt-0.5">{item.address}</p>
            <p className="text-sm font-medium text-gray-600 mt-2">
                {item.date} ({item.duration})
            </p>
        </div>
        
        <div className="text-right flex flex-col items-end">
            <p className="text-xl font-black text-green-600">{item.cost}</p>
            <span className="text-xs text-gray-500 mt-1">Total Pagado</span>
        </div>
    </div>
);

export function ParkingHistoryPage({ onGoBack }: ParkingHistoryPageProps) {
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
                    Historial de Parqueos
                </h2>
            </div>

            {/* Lista de Historial */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <p className="text-sm text-gray-600 font-semibold">Últimos parqueos completados:</p>
                {historyItems.map(item => (
                    <HistoryListItem key={item.id} item={item} />
                ))}
            </div>

            {/* Footer */}
            <div className="p-5 flex-shrink-0 border-t border-gray-200 bg-white">
                <button
                    onClick={onGoBack}
                    className="w-full justify-center rounded-xl bg-gray-200 px-4 py-3 text-lg font-bold text-gray-700 hover:bg-gray-300 transition duration-150"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}