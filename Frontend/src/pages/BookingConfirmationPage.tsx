import { useState, useMemo } from 'react';

type ParkingItemType = {
    id: number;
    name: string;
    address: string;
    price: string; // Ejemplo: "Bs 2.50/hora"
    rating: number;
    availability: 'Alta' | 'Media' | 'Baja';
};

type BookingConfirmationPageProps = {
    parking: ParkingItemType;
    onGoBack: () => void; 
};

const extractPriceValue = (priceString: string): number => {
    const match = priceString.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
};

export function BookingConfirmationPage({
    parking,
    onGoBack,
}: BookingConfirmationPageProps) {
    
    const initialPricePerHour = extractPriceValue(parking.price);
    const [hours, setHours] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState<'Efectivo' | 'QR'>('Efectivo');

    const totalCost = useMemo(() => {
        const cost = initialPricePerHour * hours;
        return `Bs ${cost.toFixed(2)}`;
    }, [initialPricePerHour, hours]);

    const handleHoursChange = (amount: number) => {
        setHours(prev => Math.max(1, prev + amount)); 
    };

    const handleConfirm = () => {
        
    };

    return (
        <div className="max-w-none w-full h-full rounded-none shadow-none space-y-0 overflow-y-hidden flex flex-col bg-white">
            
            {/* Encabezado Fijo */}
            <div className="flex items-center p-4 border-b border-gray-100 flex-shrink-0">
                <button onClick={onGoBack} className="text-gray-600 hover:text-blue-600 transition duration-150 p-1">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h2 className="flex-1 text-center text-xl font-bold text-gray-900 -ml-8">
                    Detalles de la Reserva
                </h2>
            </div>
            
            {/* Contenido principal con scroll (flex-1 para ocupar el espacio) */}
            <div className="p-5 flex-1 overflow-y-auto">

                {/* 1. Detalles del Parqueo */}
                <h4 className="text-lg font-bold text-gray-800 mb-2">Detalles de Ubicación</h4>
                <div className="bg-gray-50 p-4 rounded-xl mb-6">
                    <p className="text-xl font-extrabold text-gray-900">{parking.name}</p>
                    <p className="text-sm text-gray-500">{parking.address}</p>
                </div>
                
                {/* 2. Selección de Duración (Nuevo Input con botones) */}
                <h4 className="text-lg font-bold text-gray-800 mb-3">Duración (Horas)</h4>
                <div className="flex items-center justify-between bg-white p-3 border border-gray-200 rounded-xl shadow-sm mb-6">
                    <button 
                        onClick={() => handleHoursChange(-1)} 
                        disabled={hours <= 1}
                        className="p-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition duration-150"
                    >
                        <span className="material-symbols-outlined text-2xl">remove</span>
                    </button>
                    
                    <div className="text-center">
                        <input
                            type="number"
                            value={hours}
                            readOnly
                            className="w-16 text-center text-3xl font-black text-gray-900 border-none focus:ring-0 bg-transparent p-0"
                        />
                        <p className="text-sm text-gray-500 font-medium">horas</p>
                    </div>

                    <button 
                        onClick={() => handleHoursChange(1)} 
                        className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition duration-150"
                    >
                        <span className="material-symbols-outlined text-2xl">add</span>
                    </button>
                </div>

                {/* 3. Selección de Método de Pago */}
                <h4 className="text-lg font-bold text-gray-800 mt-4 mb-3">Método de Pago</h4>
                <div className="flex space-x-3">
                    {/* Botón Efectivo */}
                    <button 
                        onClick={() => setPaymentMethod('Efectivo')}
                        className={`flex-1 flex flex-col items-center justify-center space-y-1 p-3 border-2 font-semibold rounded-xl transition duration-150 ${
                            paymentMethod === 'Efectivo' 
                            ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-md' 
                            : 'bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200'
                        }`}
                    >
                        <span className="material-symbols-outlined text-2xl">payments</span>
                        <span>Efectivo</span>
                    </button>
                    
                    {/* Botón QR */}
                    <button 
                        onClick={() => setPaymentMethod('QR')}
                        className={`flex-1 flex flex-col items-center justify-center space-y-1 p-3 border-2 font-semibold rounded-xl transition duration-150 ${
                            paymentMethod === 'QR' 
                            ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-md' 
                            : 'bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200'
                        }`}
                    >
                        <span className="material-symbols-outlined text-2xl">qr_code_scanner</span>
                        <span>Pagar con QR</span>
                    </button>
                </div>
            </div>
            
            {/* Pie de página (Barra de acción fija) */}
            <div className="p-5 flex-shrink-0 bg-white border-t border-gray-100 shadow-t-lg">
                {/* Fila de Costo Total */}
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-700">Costo Total</span>
                    <span className="text-3xl font-black text-blue-600">{totalCost}</span>
                </div>
                
                <button
                    onClick={handleConfirm}
                    className="w-full justify-center rounded-xl bg-blue-600 px-4 py-3.5 text-lg font-bold text-white shadow-xl shadow-blue-500/40 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition duration-150"
                >
                    Confirmar Reserva
                </button>
            </div>
        </div>
    );
}