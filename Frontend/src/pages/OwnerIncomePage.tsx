type OwnerIncomePageProps = {
    onGoBack: () => void;
};

// Datos simulados de ingresos
const incomeData = {
    dailyTotal: 85.50,
    monthlyTotal: 950.00,
    reservationsToday: 18,
    averageDailyIncome: 145.00,
};

const recentTransactions = [
    { id: 201, date: "1 Nov, 12:30 PM", amount: 15.00, type: "Reserva A-05", color: "text-green-600" },
    { id: 202, date: "1 Nov, 10:00 AM", amount: 25.50, type: "Reserva B-10", color: "text-green-600" },
    { id: 203, date: "31 Oct", amount: -5.00, type: "Comisión (App)", color: "text-red-600" },
    { id: 204, date: "31 Oct", amount: 12.50, type: "Reserva C-01", color: "text-green-600" },
];

const formatCurrency = (amount: number) => `Bs ${amount.toFixed(2)}`;

export function OwnerIncomePage({ onGoBack }: OwnerIncomePageProps) {
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
                    Reporte de Ingresos
                </h2>
            </div>

            {/* Contenido principal */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
                
                {/* Resumen de Ingresos */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Tarjeta de Total (Hoy) */}
                    <div className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-green-500">
                        <p className="text-gray-500 text-sm font-medium">Total (Hoy)</p>
                        {/* CLAVE: Ajuste de tamaño y peso para parecerse a la imagen */}
                        <p className="text-green-600 text-4xl font-extrabold mt-1">{formatCurrency(incomeData.dailyTotal)}</p>
                    </div>
                    
                    {/* Tarjeta de Total (Mes) */}
                    <div className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-blue-500">
                        <p className="text-gray-500 text-sm font-medium">Total (Mes)</p>
                        {/* CLAVE: Ajuste de tamaño y peso para parecerse a la imagen */}
                        <p className="text-blue-600 text-4xl font-extrabold mt-1">{formatCurrency(incomeData.monthlyTotal)}</p>
                    </div>
                    
                    {/* Información adicional */}
                    <div className="bg-white p-4 rounded-xl shadow-sm col-span-2">
                         <p className="text-gray-600 text-sm font-medium">Reservas completadas hoy: <span className="font-bold text-blue-600">{incomeData.reservationsToday}</span></p>
                         <p className="text-gray-600 text-sm font-medium mt-1">Promedio diario: {formatCurrency(incomeData.averageDailyIncome)}</p>
                    </div>
                </div>

                {/* Historial de Transacciones */}
                <div className="space-y-4 pt-4">
                    <h2 className="text-lg font-extrabold text-gray-800">Transacciones Recientes</h2>
                    {recentTransactions.map(t => (
                        <div key={t.id} className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div>
                                <p className="text-lg font-semibold text-gray-900">{t.type}</p>
                                <p className="text-sm text-gray-500">{t.date}</p>
                            </div>
                            {/* Ajuste de tamaño del monto de transacción */}
                            <span className={`text-xl font-black ${t.color}`}>{formatCurrency(t.amount)}</span>
                        </div>
                    ))}
                </div>
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