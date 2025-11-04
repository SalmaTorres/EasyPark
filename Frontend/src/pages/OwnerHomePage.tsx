import { useState } from 'react';
import { OwnerMenuPage } from './OwnerMenuPage';
import { OwnerReservationsPage } from './OwnerReservationPage';
import { OwnerIncomePage } from './OwnerIncomePage';

type OwnerHomePageProps = {
    onLogout: () => void;
};

// **ACTUALIZAR TIPO DE ESTADO DE VISTA**
type OwnerViewMode = 'home' | 'menu_owner' | 'reservations' | 'income'; 

// Datos simulados para las últimas reservas
const lastReservations = [
    { id: 1, name: "Juan Pérez", arrivalTime: "10:30 AM", space: "Plaza A-12", avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: 2, name: "María Rodríguez", arrivalTime: "11:00 AM", space: "Plaza B-05", avatar: 'https://i.pravatar.cc/150?img=27' },
    { id: 3, name: "Carlos Gómez", arrivalTime: "11:15 AM", space: "Plaza C-01", avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 4, name: "Ana López", arrivalTime: "11:30 AM", space: "Plaza A-07", avatar: 'https://i.pravatar.cc/150?img=25' },
    { id: 5, name: "Pedro García", arrivalTime: "11:45 AM", space: "Plaza B-02", avatar: 'https://i.pravatar.cc/150?img=50' },
];

export function OwnerHomePage({ onLogout }: OwnerHomePageProps) {
    // **USAR EL NUEVO TIPO DE VISTA**
    const [viewMode, setViewMode] = useState<OwnerViewMode>('home');

    // Manejadores de navegación

    // Volver al menú (desde una subpágina) o volver al Home (desde el menú)
    const handleGoBackToHome = () => setViewMode('home'); 
    
    // Abrir/Cerrar menú
    const handleMenuOpen = () => setViewMode('menu_owner');
    const handleMenuClose = () => setViewMode('home');

    // **NUEVOS MANEJADORES DE ACCIÓN**
    const handleViewReservations = () => setViewMode('reservations');
    const handleViewIncome = () => setViewMode('income');

    // Funciones simuladas para otras opciones (pasan a ser simulaciones en el menú)
    const handleAddSpace = () => alert('Simulación: Navegando a Agregar Espacio');
    const handleConfigureParking = () => alert('Simulación: Navegando a Configurar Parqueo');
    const handleViewProfile = () => alert('Simulación: Navegando a Ver Perfil');


    // Lógica de Renderizado de Vistas
    if (viewMode === 'menu_owner') {
        return (
            <OwnerMenuPage 
                onGoBack={handleMenuClose}
                onAddSpace={handleAddSpace}
                onViewReservations={handleViewReservations} // Conectado a la nueva vista
                onConfigureParking={handleConfigureParking}
                onViewIncome={handleViewIncome} // Conectado a la nueva vista
                onViewProfile={handleViewProfile}
                onLogout={onLogout}
            />
        );
    }
    
    if (viewMode === 'reservations') {
        return <OwnerReservationsPage onGoBack={handleGoBackToHome} />;
    }

    if (viewMode === 'income') {
        return <OwnerIncomePage onGoBack={handleGoBackToHome} />;
    }


    // Renderizado de la Vista Principal ('home')
    return (
        <div className="flex flex-col h-screen bg-gray-100 font-sans">
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-white text-gray-900 shadow-md flex-shrink-0">
                <button 
                    onClick={handleMenuOpen} 
                    className="p-1 hover:bg-gray-100 rounded-full transition duration-150"
                >
                    <span className="material-symbols-outlined text-3xl">menu</span>
                </button>
                <h1 className="text-xl font-extrabold tracking-wide">Mi Estacionamiento</h1>
                <button className="p-1 hover:bg-gray-100 rounded-full transition duration-150 relative">
                    <span className="material-symbols-outlined text-3xl">notifications</span>
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
                </button>
            </header>

            {/* Contenido principal */}
            <main className="flex-1 overflow-y-auto p-5 space-y-6">
                {/* Tarjetas de Resumen */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-green-500">
                        <p className="text-gray-500 text-sm font-medium">Disponibles</p>
                        <p className="text-green-600 text-4xl font-extrabold mt-1">12<span className="text-gray-400 text-2xl">/20</span></p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-blue-500">
                        <p className="text-gray-500 text-sm font-medium">Reservas Activas</p>
                        <p className="text-blue-600 text-4xl font-extrabold mt-1">8</p>
                    </div>
                </div>

                {/* Botones de Acción */}
                <div className="space-y-3">
                    {/* Botón 1: Ver Reservas (Conectado) */}
                    <button 
                        onClick={handleViewReservations}
                        className="w-full flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3.5 text-lg font-bold text-white shadow-lg hover:bg-blue-700 transition duration-150"
                    >
                        <span className="material-symbols-outlined mr-2">receipt_long</span>
                        Ver Todas las Reservas
                    </button>
                    
                    {/* Botón 2: Ver Ingresos (Conectado) */}
                    <button 
                        onClick={handleViewIncome}
                        className="w-full flex items-center justify-center rounded-xl bg-blue-100 px-4 py-3.5 text-lg font-bold text-blue-800 shadow-md hover:bg-blue-200 transition duration-150"
                    >
                        <span className="material-symbols-outlined mr-2">payments</span>
                        Ver Ingresos
                    </button>
                </div>

                {/* Últimas Reservas (Componente en Home) */}
                <div className="space-y-4 pt-4">
                    <h2 className="text-lg font-extrabold text-gray-800">Últimas Reservas</h2>
                    {lastReservations.map(reservation => (
                        <div key={reservation.id} className="flex items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition duration-150">
                            <img 
                                src={reservation.avatar} 
                                alt={reservation.name} 
                                className="w-12 h-12 rounded-full mr-4 object-cover border border-gray-200"
                            />
                            <div className="flex-1">
                                <p className="text-lg font-semibold text-gray-900">{reservation.name}</p>
                                <p className="text-sm text-gray-500">Llegada: {reservation.arrivalTime}</p>
                            </div>
                            <span className="text-md font-bold text-blue-600">{reservation.space}</span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}