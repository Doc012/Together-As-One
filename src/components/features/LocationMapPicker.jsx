import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';

// Create custom marker icon
const markerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const LocationMapPicker = ({ onSelectLocation, initialLocation = null }) => {
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const mapRef = useRef(null);

  // Set initial view to South Africa's Vaal Triangle area
  const initialCenter = initialLocation || { lat: -26.6433929, lng: 27.784246 };
  const initialZoom = 11;

  // When initialLocation changes, update selectedLocation
  useEffect(() => {
    setSelectedLocation(initialLocation);
  }, [initialLocation]);

  // Component to handle map clicks
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setSelectedLocation({ lat, lng });
        onSelectLocation({ lat, lng });
      }
    });
    return null;
  };

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[initialCenter.lat, initialCenter.lng]}
        zoom={initialZoom}
        className="h-full w-full"
        whenCreated={map => { mapRef.current = map; }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapClickHandler />
        
        {/* Show marker for selected location */}
        {selectedLocation && (
          <Marker 
            position={[selectedLocation.lat, selectedLocation.lng]} 
            icon={markerIcon}
          />
        )}
      </MapContainer>

      {/* Instructions overlay */}
      <div className="absolute top-4 left-0 right-0 mx-4 bg-white bg-opacity-90 shadow-md rounded-lg p-2">
        <p className="text-sm text-gray-700 text-center">
          Click anywhere on the map to select a location
        </p>
      </div>

      {/* Selected location info */}
      {selectedLocation && (
        <div className="absolute bottom-4 left-0 right-0 mx-4 bg-white shadow-md rounded-lg p-3 border border-blue-200">
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="text-blue-500 mr-2" />
            <span className="font-medium text-gray-800">Selected Location</span>
          </div>
          <div className="text-sm text-gray-600">
            Lat: {selectedLocation.lat.toFixed(5)}, Lng: {selectedLocation.lng.toFixed(5)}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMapPicker;