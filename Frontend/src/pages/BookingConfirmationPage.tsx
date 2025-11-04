import { useState, useMemo } from 'react';

type ParkingItemType = {
    id: number;
    name: string;
    address: string;
    price: string; // Ejemplo: "Bs 2.50/hora"
    rating: number;
    availability: 'Vacío' | 'Media' | 'Lleno';
};

type BookingConfirmationPageProps = {
    parking: ParkingItemType;
    onGoBack: () => void; 
};

// Se elimina 'qr_payment' de los modos de vista.
type ViewMode = 'details' | 'success';

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
    const [viewMode, setViewMode] = useState<ViewMode>('details'); 

    const totalCost = useMemo(() => {
        const cost = initialPricePerHour * hours;
        return `Bs ${cost.toFixed(2)}`;
    }, [initialPricePerHour, hours]);

    const handleHoursChange = (amount: number) => {
        setHours(prev => Math.max(1, prev + amount)); 
    };

    // CLAVE: La función de confirmación siempre lleva a 'success'
    const handleConfirm = () => {
        setViewMode('success');
    };

    // 1. Vista de Confirmación Exitosa (Éxito)
    const SuccessView = () => (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">¡Reserva Realizada!</h2>
            <p className="text-lg text-gray-600 mb-8">Tu plaza ha sido reservada con éxito.</p>
            <p className="text-md font-semibold text-gray-700 mb-10">Método de pago: {paymentMethod === 'Efectivo' ? 'Efectivo' : 'QR'}</p>
            <button
                onClick={onGoBack} // Volver al mapa/home
                className="w-full max-w-xs justify-center rounded-xl bg-blue-600 px-4 py-3.5 text-lg font-bold text-white shadow-xl shadow-blue-500/40 hover:bg-blue-700 transition duration-150"
            >
                Volver al Mapa
            </button>
        </div>
    );

    // 2. Vista de Detalles de Reserva (Default)
    const DetailsView = () => (
        <>
            {/* Encabezado Fijo con botón de volver funcionando */}
            <div className="flex items-center p-4 border-b border-gray-100 flex-shrink-0">
                <button onClick={onGoBack} className="text-gray-600 hover:text-blue-600 transition duration-150 p-1">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h2 className="flex-1 text-center text-xl font-bold text-gray-900 -ml-8">
                    Detalles de la Reserva
                </h2>
            </div>
            
            {/* Contenido principal con scroll */}
            <div className="p-5 flex-1 overflow-y-auto">

                {/* 1. Detalles del Parqueo */}
                <h4 className="text-lg font-bold text-gray-800 mb-2">Detalles de Ubicación</h4>
                <div className="bg-gray-50 p-4 rounded-xl mb-6">
                    <p className="text-xl font-extrabold text-gray-900">{parking.name}</p>
                    <p className="text-sm text-gray-500">{parking.address}</p>
                </div>
                
                {/* 2. Selección de Duración */}
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
                    onClick={handleConfirm} // Esta función siempre lleva a SuccessView
                    className="w-full justify-center rounded-xl bg-blue-600 px-4 py-3.5 text-lg font-bold text-white shadow-xl shadow-blue-500/40 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition duration-150"
                >
                    Confirmar Reserva
                </button>
            </div>
        </>
    );

    // Renderizado principal basado en el estado `viewMode`
    return (
        <div className="max-w-none w-full h-full rounded-none shadow-none space-y-0 overflow-y-hidden flex flex-col bg-gray-50">
            {viewMode === 'details' && <DetailsView />}
            {viewMode === 'success' && <SuccessView />}
        </div>
    );
}