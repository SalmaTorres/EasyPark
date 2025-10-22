import { useState } from 'react';
import { ParkingMap } from '../components/Map';

type ParkingItemType = {
    id: number;
    name: string;
    address: string;
    price: string;
    rating: number;
    availability: 'Alta' | 'Media' | 'Baja';
};

const simulatedParkings: ParkingItemType[] = [
    { id: 1, name: "Estacionamiento Central", address: "Av. Principal 123, Centro", price: "Bs 2.50/hora", rating: 4.5, availability: 'Alta' },
    { id: 2, name: "Parking Norte", address: "Calle Arica 456, Norte", price: "Bs 3.00/hora", rating: 4.8, availability: 'Media' },
    { id: 3, name: "Garaje Sur", address: "Av. 6 de Agosto 789, Sur", price: "Bs 2.00/hora", rating: 4.1, availability: 'Baja' },
    { id: 4, name: "El Prado Park", address: "Paseo El Prado 101, Centro", price: "Bs 3.50/hora", rating: 4.7, availability: 'Alta' },
];

const ParkingListItem = ({ parking }: { parking: ParkingItemType }) => (
    <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition duration-200 border-l-4 border-blue-600">
        <div className="flex-1 min-w-0 pr-4">
            <h3 className="text-xl font-extrabold text-gray-900 truncate">{parking.name}</h3>
            <p className="text-sm text-gray-500 truncate mt-0.5">{parking.address}</p>
            <div className="flex items-center space-x-3 mt-2">
                {/* Etiqueta de disponibilidad más visible y con icono */}
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 ${
                    parking.availability === 'Alta' ? 'bg-green-100 text-green-700' :
                    parking.availability === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                }`}>
                    <span className="material-symbols-outlined text-sm">
                        {parking.availability === 'Alta' ? 'check_circle' : parking.availability === 'Media' ? 'warning' : 'cancel'}
                    </span>
                    <span>{parking.availability}</span>
                </span>
                
                {/* Rating */}
                <div className="flex items-center text-yellow-500 font-bold text-sm">
                    {parking.rating} <span className="material-symbols-outlined text-base ml-1">star</span>
                </div>
            </div>
        </div>
        
        {/* Precio y Botón */}
        <div className="text-right flex flex-col items-end">
            <p className="text-2xl font-black text-blue-600">{parking.price}</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition duration-150 shadow-md hover:shadow-lg">
                Reservar
            </button>
        </div>
    </div>
);

export function DriverHomePage() {
    const [viewMode, setViewMode] = useState<'mapa' | 'lista'>('mapa');

    const renderView = () => {
        if (viewMode === 'mapa') {
            return ( 
                <div className="flex flex-col flex-1 h-full space-y-4">
                    
                    {/* 1. Área del Mapa */}
                    <div className="relative flex-1 rounded-2xl overflow-hidden shadow-2xl min-h-60">
                        <ParkingMap parkings={simulatedParkings} className="h-full w-full" />
                    </div>

                    {/* 2. Tarjeta de Estacionamiento (Ubicada debajo del mapa) */}
                    <div className="bg-white p-5 rounded-2xl shadow-xl space-y-3 border-t-4 border-blue-600 flex-shrink-0">
                        <div className="flex justify-between items-start">
                            {/* Información principal */}
                            <div>
                                <h2 className="text-xl font-extrabold text-gray-900">Estacionamiento Central</h2>
                                <p className="text-sm text-gray-500 mt-1">Av. Principal 123, Centro</p>
                                
                                {/* Disponibilidad y Rating en una fila */}
                                <div className="mt-2 flex items-center space-x-4">
                                    <div className="flex items-center space-x-1">
                                        <span className="h-2.5 w-2.5 rounded-full bg-green-500 flex-shrink-0"></span>
                                        <p className="text-sm text-green-600 font-semibold">Alta Disponibilidad</p>
                                    </div>
                                    <div className="flex items-center text-yellow-500 font-bold text-sm">
                                        4.5 <span className="material-symbols-outlined text-base ml-1">star</span>
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
                            <p className="text-2xl font-black text-blue-600">Bs 2.50<span className="text-sm font-medium text-gray-500">/hora</span></p>
                            <button className="px-6 py-2.5 bg-blue-600 text-white text-base font-bold rounded-xl hover:bg-blue-700 transition duration-150 shadow-lg shadow-blue-500/50">
                                Reservar
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else { 
            return (
                <div className="flex flex-col space-y-4 flex-1 overflow-y-auto pt-2">
                    {simulatedParkings.map(parking => (
                        <ParkingListItem key={parking.id} parking={parking} />
                    ))}
                    <div className="h-10"></div>
                </div>
            );
        }
    };

    return (
        <div className="relative flex h-screen w-full flex-col bg-gray-100 font-sans">
            
            {/* Encabezado Fijo (Barra de Navegación) */}
            <header className="flex items-center justify-between p-4 bg-blue-700 text-white shadow-lg z-30">
                <button className="p-1 hover:bg-blue-600 rounded-full transition duration-150">
                    <span className="material-symbols-outlined text-3xl">menu</span>
                </button>
                <h1 className="text-xl font-extrabold tracking-wide">ParkEasy</h1>
                <button className="p-1 hover:bg-blue-600 rounded-full transition duration-150 relative">
                    <span className="material-symbols-outlined text-3xl">notifications</span>
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-blue-700 bg-red-500"></span>
                </button>
            </header>

            {/* Contenedor Principal: Búsqueda, Toggle y Contenido */}
            {/* Se eliminó el SearchBar y se ajustó el espaciado */}
            <main className="flex-1 flex flex-col px-4 py-6 space-y-6 overflow-hidden">
                
                {/* Toggle Mapa/Lista (AHORA FULL WIDTH) */}
                {/* Se eliminó 'max-w-lg mx-auto' para que ocupe todo el ancho disponible y se vea bien en web. */}
                <div className="flex bg-gray-200 p-1.5 rounded-full shadow-inner z-10 w-full">
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

                {/* Área de Contenido (Mapa o Lista) - Ocupa todo el espacio restante */}
                <div className="flex-1 overflow-hidden">
                    {renderView()}
                </div>

            </main>
        </div>
    );
}