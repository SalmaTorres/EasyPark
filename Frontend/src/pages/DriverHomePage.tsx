import { useState } from 'react';
import { ParkingMap } from '../components/Map';
import { BookingConfirmationPage } from './BookingConfirmationPage';
import { ProfileMenuPage } from './ProfileMenuPage';
import { ReservationInfoPage } from './ReservationInfoPage';
import { ParkingHistoryPage } from './ParkingHistoryPage';
// FIX: Importar 'UserRole' como un tipo
import type { UserRole } from './LoginPage';

type DriverHomePageProps = {
    onLogout: () => void;
    role: UserRole;
};

type ParkingItemType = {
    id: number;
    name: string;
    address: string;
    price: string;
    rating: number;
    availability: 'Vacío' | 'Media' | 'Lleno'; // Valores definidos
};

const simulatedParkings: ParkingItemType[] = [
    { id: 1, name: "Estacionamiento Central", address: "Av. Principal 123, Centro", price: "Bs 2.50/hora", rating: 4.5, availability: 'Vacío' },
    { id: 2, name: "Parking Norte", address: "Calle Arica 456, Norte", price: "Bs 3.00/hora", rating: 4.8, availability: 'Media' },
    { id: 3, name: "Garaje Sur", address: "Av. 6 de Agosto 789, Sur", price: "Bs 2.00/hora", rating: 4.1, availability: 'Lleno' },
    { id: 4, name: "El Prado Park", address: "Paseo El Prado 101, Centro", price: "Bs 3.50/hora", rating: 4.7, availability: 'Vacío' },
];

const ParkingListItem = ({ parking, onReserveClick }: { parking: ParkingItemType, onReserveClick: (parking: ParkingItemType) => void }) => (
    <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition duration-200 border-l-4 border-blue-600">
        <div className="flex-1 min-w-0 pr-4">
            <h3 className="text-xl font-extrabold text-gray-900 truncate">{parking.name}</h3>
            <p className="text-sm text-gray-500 truncate mt-0.5">{parking.address}</p>
            <div className="flex items-center space-x-3 mt-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 ${
                    parking.availability === 'Vacío' ? 'bg-green-100 text-green-700' :
                    parking.availability === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                }`}>
                    <span className="material-symbols-outlined text-sm">
                        {/* CORRECCIÓN 2: Uso de 'Media' en lugar de 'warning' para el icono */}
                        {parking.availability === 'Vacío' ? 'check_circle' : parking.availability === 'Media' ? 'warning' : 'cancel'}
                    </span>
                    <span>{parking.availability}</span>
                </span>
                
                <div className="flex items-center text-yellow-500 font-bold text-sm">
                    {parking.rating} <span className="material-symbols-outlined text-base ml-1">star</span>
                </div>
            </div>
        </div>
        
        <div className="text-right flex flex-col items-end">
            <p className="text-2xl font-black text-blue-600">{parking.price}</p>
            <button 
                className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition duration-150 shadow-md hover:shadow-lg"
                onClick={() => onReserveClick(parking)} // Llama al handler para cambiar la vista
            >
                Reservar
            </button>
        </div>
    </div>
);

export function DriverHomePage({ role, onLogout }: DriverHomePageProps) {
    const [viewMode, setViewMode] = useState<'mapa' | 'lista' | 'reserva' | 'menu' | 'reservation_info' | 'history'>('mapa');
    const [selectedParking, setSelectedParking] = useState<ParkingItemType | null>(null);

    const handleReserveClick = (parking: ParkingItemType) => {
        setSelectedParking(parking);
        setViewMode('reserva'); 
    };
    
    const handleGoBackToMap = () => {
        setViewMode('mapa');
        setSelectedParking(null);
    };

    const handleMenuOpen = () => {
        setViewMode('menu');
    };

    const handleMenuClose = () => {
        setViewMode('mapa'); 
    };
    
    const handleViewReservation = () => {
        setViewMode('reservation_info'); 
    };

    const handleViewHistory = () => {
        setViewMode('history');
    };
    
    const handleLogout = () => {
        onLogout(); 
    };

    const renderMapAndFeaturedCard = () => {
        const featuredParking = simulatedParkings[0];
        return ( 
            <div className="flex flex-col flex-1 h-full space-y-4">
                {/* 1. Área del Mapa */}
                <div className="relative flex-1 rounded-2xl overflow-hidden shadow-2xl min-h-60">
                    <ParkingMap parkings={simulatedParkings} className="h-full w-full" />
                </div>

                {/* 2. Tarjeta de Estacionamiento (Destacada) */}
                <div className="bg-white p-5 rounded-2xl shadow-xl space-y-3 border-t-4 border-blue-600 flex-shrink-0">
                    <div className="flex justify-between items-start">
                        {/* Información principal */}
                        <div>
                            <h2 className="text-xl font-extrabold text-gray-900">{featuredParking.name}</h2>
                            <p className="text-sm text-gray-500 mt-1">{featuredParking.address}</p>
                            
                            <div className="mt-2 flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                    <span className="h-2.5 w-2.5 rounded-full bg-green-500 flex-shrink-0"></span>
                                    <p className="text-sm text-green-600 font-semibold">Alta Disponibilidad</p>
                                </div>
                                <div className="flex items-center text-yellow-500 font-bold text-sm">
                                    {featuredParking.rating} <span className="material-symbols-outlined text-base ml-1">star</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Horario */}
                        <div className="text-right">
                            <p className="text-sm text-gray-700 font-semibold">Abierto 24/7</p>
                        </div>
                    </div>

                    {/* Precio y Acción */}
                    <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                        <p className="text-2xl font-black text-blue-600">{featuredParking.price}<span className="text-sm font-medium text-gray-500">/hora</span></p>
                        {/* Botón de Reserva para la tarjeta destacada */}
                        <button 
                            onClick={() => handleReserveClick(featuredParking)}
                            className="px-6 py-2.5 bg-blue-600 text-white text-base font-bold rounded-xl hover:bg-blue-700 transition duration-150 shadow-lg shadow-blue-500/50"
                        >
                            Reservar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const renderListView = () => {
        return (
            <div className="flex flex-col space-y-4 flex-1 overflow-y-auto pt-2">
                {simulatedParkings.map(parking => (
                    <ParkingListItem key={parking.id} parking={parking} onReserveClick={handleReserveClick} />
                ))}
                <div className="h-10"></div>
            </div>
        );
    }
    
    // CORRECCIÓN 1: Lógica de renderizado clara basada en viewMode
    const renderView = () => {
        if (viewMode === 'reserva' && selectedParking) {
            return (
                <BookingConfirmationPage 
                    parking={selectedParking}
                    onGoBack={handleGoBackToMap}
                />
            );
        }

        if (viewMode === 'reservation_info') {
            return (
                <ReservationInfoPage 
                    onGoBack={handleMenuOpen} 
                />
            );
        }

        if (viewMode === 'history') {
            return (
                <ParkingHistoryPage 
                    onGoBack={handleMenuOpen} 
                />
            );
        }

        if (viewMode === 'menu') {
            return (
                <ProfileMenuPage 
                    onGoBack={handleMenuClose} 
                    onViewReservation={handleViewReservation}
                    onViewHistory={handleViewHistory} 
                    onLogout={handleLogout}
                />
            );
        }

        if (viewMode === 'mapa') {
            return renderMapAndFeaturedCard();
        }
        
        if (viewMode === 'lista') { 
            return renderListView();
        }
        
        return null;
    };

    // Determina si mostrar el encabezado y el toggle. Se ocultan en las vistas que son páginas completas.
    const shouldShowHeader = viewMode === 'mapa' || viewMode === 'lista';
    const shouldShowToggle = viewMode === 'mapa' || viewMode === 'lista';

    return (
        <div className="relative flex h-screen w-full flex-col bg-gray-100 font-sans">
            
            {/* Encabezado Fijo (Barra de Navegación) */}
            {shouldShowHeader && (
                <header className="flex items-center justify-between p-4 bg-blue-700 text-white shadow-lg z-30 flex-shrink-0">
                    <button 
                        onClick={handleMenuOpen} // Abre el menú
                        className="p-1 hover:bg-blue-600 rounded-full transition duration-150"
                    >
                        <span className="material-symbols-outlined text-3xl">menu</span>
                    </button>
                    
                    {/* UTILIZACIÓN DE LA PROP 'role' para corregir el error */}
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-xl font-extrabold tracking-wide">EasyPark</h1>
                        {role && (
                            <p className="text-xs font-medium mt-[-2px] capitalize opacity-90">
                                {role === 'driver' ? 'Modo Conductor' : 'Modo Propietario'}
                            </p>
                        )}
                    </div>
                    {/* FIN DE LA UTILIZACIÓN DE LA PROP 'role' */}

                    <button className="p-1 hover:bg-blue-600 rounded-full transition duration-150 relative">
                        <span className="material-symbols-outlined text-3xl">notifications</span>
                        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-blue-700 bg-red-500"></span>
                    </button>
                </header>
            )}

            {/* Contenedor Principal: Toggle y Contenido */}
            <main className={`flex-1 flex flex-col ${shouldShowToggle ? 'px-4 py-6 space-y-6' : 'space-y-0 p-0'}`}>
                
                {/* Toggle Mapa/Lista */}
                {shouldShowToggle && (
                    <div className="flex bg-gray-200 p-1.5 rounded-full shadow-inner z-10 w-full flex-shrink-0">
                        <button 
                            className={`flex-1 py-2 text-sm font-bold transition duration-200 rounded-full ${
                                viewMode === 'mapa' 
                                    ? 'text-white bg-blue-600 shadow-md' 
                                    : 'text-gray-600 hover:bg-gray-300'
                            }`}
                            onClick={() => setViewMode('mapa')}
                        >
                            Mapa
                        </button>
                        <button 
                            className={`flex-1 py-2 text-sm font-bold transition duration-200 rounded-full ${
                                viewMode === 'lista' 
                                    ? 'text-white bg-blue-600 shadow-md' 
                                    : 'text-gray-600 hover:bg-gray-300'
                            }`}
                            onClick={() => setViewMode('lista')}
                        >
                            Lista
                        </button>
                    </div>
                )}

                {/* Área de Contenido (Mapa, Lista, Reserva, Menú, Info Reserva o Historial) */}
                <div className={`flex-1 overflow-hidden ${shouldShowToggle ? '' : 'p-0'}`}>
                    {renderView()}
                </div>

            </main>
        </div>
    );
}