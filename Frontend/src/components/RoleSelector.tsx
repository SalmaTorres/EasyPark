type RoleCardProps = {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
};

const RoleCard = ({ icon, title, description, onClick }: RoleCardProps) => (
  <button
    onClick={onClick}
    className="w-full text-left p-5 border-2 border-gray-200 rounded-xl bg-white hover:border-blue-600 hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-600/20"
  >
    <div className="flex items-start space-x-4">
      <span className="material-symbols-outlined text-4xl text-blue-600 mt-0.5">
        {icon}
      </span>
      <div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  </button>
);

type RoleSelectorProps = {
    onBack: () => void;
    onSelectRole: (role: 'owner' | 'driver') => void; 
}

export function RoleSelector({ onBack, onSelectRole }: RoleSelectorProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-center text-2xl font-extrabold text-gray-900">
        Selecciona tu Rol
      </h2>
      <p className="text-center text-gray-500 mb-6">
        ¿Cómo deseas utilizar ParkEasy?
      </p>

      <div className="space-y-4">
        <RoleCard
          icon="corporate_fare"
          title="Dueño de Parqueo"
          description="Quiero registrar y administrar mis espacios de estacionamiento."
          onClick={() => onSelectRole('owner')} 
        />
        <RoleCard
          icon="directions_car"
          title="Conductor"
          description="Quiero encontrar y reservar un lugar para estacionar mi vehículo."
          onClick={() => onSelectRole('driver')}
        />
      </div>

      <div className="pt-4 text-center">
        <button
          onClick={onBack}
          className="text-sm font-semibold text-gray-500 hover:text-gray-700 transition duration-150"
        >
          &larr; Volver al Inicio de Sesión
        </button>
      </div>
    </div>
  );
}