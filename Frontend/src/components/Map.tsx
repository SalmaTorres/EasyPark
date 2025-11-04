import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const defaultPosition: [number, number] = [-17.3935, -66.1568]; // Cochabamba

const markerIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
});

type ParkingItemType = {
    id: number;
    name: string;
    address: string;
    price: string;
    rating: number;
    availability: 'Vacío' | 'Media' | 'Lleno';
};

interface ParkingMapProps {
    parkings: ParkingItemType[];
    className?: string; 
}

export function ParkingMap({ parkings, className }: ParkingMapProps) {
    return (
        <MapContainer 
            center={defaultPosition} 
            zoom={13} 
            className={className || "h-full w-full rounded-xl"} // Asegura que el mapa siempre tenga tamaño
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {parkings.map((p) => (
                <Marker key={p.id} position={defaultPosition} icon={markerIcon}> 
                    <Popup>
                        <strong>{p.name}</strong><br />
                        {p.address}<br />
                        {p.price}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}