import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { FaWater, FaPhone, FaClock, FaCalendarAlt, FaDirections, FaInfoCircle, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// This fixes the default icon issue in react-leaflet
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to recenter the map when user location changes
function MapRecenter({ userLocation }) {
  const map = useMap();
  
  useEffect(() => {
    if (userLocation && userLocation.latitude && userLocation.longitude) {
      map.setView([userLocation.latitude, userLocation.longitude], 13);
    }
  }, [userLocation, map]);
  
  return null;
}

// Component to handle map zoom controls
function MapControls({ userLocation }) {
  const map = useMap();
  
  const handleZoomIn = () => {
    map.zoomIn();
  };
  
  const handleZoomOut = () => {
    map.zoomOut();
  };
  
  const handleCenterOnUser = () => {
    if (userLocation && userLocation.latitude && userLocation.longitude) {
      map.setView([userLocation.latitude, userLocation.longitude], 14);
    }
  };
  
  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <button 
        className="bg-white rounded-lg shadow p-2 hover:bg-gray-100"
        onClick={handleZoomIn}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
      <button 
        className="bg-white rounded-lg shadow p-2 hover:bg-gray-100"
        onClick={handleZoomOut}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
        </svg>
      </button>
      {userLocation && (
        <button 
          className="bg-indigo-600 rounded-lg shadow p-2 hover:bg-indigo-700"
          onClick={handleCenterOnUser}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      )}
    </div>
  );
}

const MapView = ({ 
  waterPoints, 
  userLocation, 
  customLocation, // Add this prop
  isLoading,
  onSelectWaterPoint
}) => {
  const [popupOpenId, setPopupOpenId] = useState(null);
  const markerRefs = useRef({});
  const mapRef = useRef(null);
  
  // Default center location - central Vaal Triangle if no user location
  const defaultCenter = [-26.67450, 27.94582]; // Three Rivers coordinates
  
  // Generate center coordinates based on user location or default
  const centerCoordinates = userLocation && userLocation.latitude && userLocation.longitude
    ? [userLocation.latitude, userLocation.longitude]
    : defaultCenter;
  
  // Handle marker click - ONLY opens the popup, doesn't trigger the detail modal
  const handleMarkerClick = (point) => {
    // Call the parent component's handler with the fromMapMarker flag set to true
    onSelectWaterPoint(point, true);
  };
  
  // Handle details button click - This is what opens the full detail modal
  const handleDetailsClick = (e, point) => {
    if (e) {
      e.stopPropagation();
    }
    
    // Call the parent component's handler to show the full modal
    if (onSelectWaterPoint && point) {
      onSelectWaterPoint(point);
    }
  };
  
  // Check if a water point is currently available
  const isPointAvailableNow = (point) => {
    if (!point.availability || !Array.isArray(point.availability)) {
      return false;
    }
    
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay();
    
    return point.availability.some(
      slot => slot.day === currentDay && currentHour >= slot.startHour && currentHour < slot.endHour
    );
  };
  
  // Create custom house icon based on availability
  const createHouseIcon = (isAvailable) => {
    return new L.divIcon({
      className: 'house-marker',
      html: `
        <div class="relative group">
          <div class="absolute -top-1 -right-1 z-10 w-4 h-4 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-gray-400'} border-2 border-white"></div>
          <div class="bg-white p-2 rounded-lg shadow-lg transform-gpu transition-transform duration-200 group-hover:scale-110 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${isAvailable ? 'text-indigo-600' : 'text-gray-500'}" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20]
    });
  };

  // When the map loads, store the reference
  const handleMapLoad = (map) => {
    mapRef.current = map;
  };

  // Function to estimate travel times based on distance
  const estimateTravelTimes = (distance) => {
    const walkingSpeed = 5; // km/h
    const drivingSpeed = 60; // km/h
    
    const walkingTime = distance / walkingSpeed;
    const drivingTime = distance / drivingSpeed;
    
    return {
      walking: `${walkingTime.toFixed(1)} hr`,
      driving: `${drivingTime.toFixed(1)} hr`
    };
  };

  // Add key cleanup for map initialization and markers
  useEffect(() => {
    // Initialize map code here
    
    // IMPORTANT: Add this cleanup function
    return () => {
      // Clean up any event listeners or DOM elements created by the map
      // If using Google Maps:
      if (mapRef.current) {
        // Remove event listeners
        google.maps.event.clearInstanceListeners(mapRef.current);
        
        // If you have markers, clear them too
        if (markersRef.current) {
          markersRef.current.forEach(marker => {
            google.maps.event.clearInstanceListeners(marker);
            marker.setMap(null);
          });
          markersRef.current = [];
        }
      }
    };
  }, []);

  return (
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden h-[600px] isolate">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 z-10 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="relative h-16 w-16 mb-4">
              <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-indigo-600 animate-spin"></div>
              <div className="absolute inset-3 text-indigo-600">
                <FaWater className="h-full w-full animate-pulse" />
              </div>
            </div>
            <p className="text-gray-800 font-medium">Loading water points...</p>
          </div>
        </div>
      )}

      <MapContainer 
        center={centerCoordinates} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        whenCreated={handleMapLoad}
      >
        {/* Map tile layer - using OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Recenter map on user location change */}
        <MapRecenter userLocation={userLocation} />
        
        {/* Map controls */}
        <MapControls userLocation={userLocation} />

        {/* User location marker with accuracy circle */}
        {userLocation && userLocation.latitude && userLocation.longitude && (
          <>
            <Marker 
              position={[userLocation.latitude, userLocation.longitude]}
              icon={new L.divIcon({
                className: 'user-location-marker',
                html: '<div class="bg-blue-500 rounded-full p-2 shadow-lg pulse-animation"><div class="bg-white rounded-full w-2 h-2"></div></div>',
                iconSize: [24, 24],
                iconAnchor: [12, 12],
              })}
            >
              <Popup>
                <div className="text-center">
                  <p className="font-medium">Your Location</p>
                </div>
              </Popup>
            </Marker>
            <Circle 
              center={[userLocation.latitude, userLocation.longitude]}
              radius={userLocation.accuracy || 500}
              pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1 }}
            />
          </>
        )}

        {/* Custom location marker */}
        {customLocation && (
          <Marker 
            position={[customLocation.lat, customLocation.lng]}
            icon={new L.divIcon({
              className: 'custom-location-marker',
              html: '<div class="bg-indigo-600 rounded-full p-2 shadow-lg"><div class="bg-white rounded-full w-2 h-2"></div></div>',
              iconSize: [24, 24],
              iconAnchor: [12, 12],
            })}
          >
            <Popup>
              <div className="text-center">
                <p className="font-medium">Custom Search Location</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Water point markers */}
        {waterPoints.map(point => {
          if (!point.location || !point.location.latitude || !point.location.longitude) {
            return null;
          }
          
          const isAvailableNow = isPointAvailableNow(point);
          
          return (
            <Marker 
              key={`marker-${point.id}`}
              position={[point.location.latitude, point.location.longitude]}
              icon={createHouseIcon(isAvailableNow)}
              ref={(ref) => { markerRefs.current[point.id] = ref; }}
            >
              <Popup 
                onOpen={() => setPopupOpenId(point.id)}
                onClose={() => setPopupOpenId(null)}
              >
                <div className="popup-content w-64 max-w-full">
                  {point.imageUrl && (
                    <div className="mb-2 -mx-3 -mt-3 rounded-t overflow-hidden">
                      <img 
                        src={point.imageUrl} 
                        alt={point.name} 
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/300x200?text=Water+Point';
                        }}
                      />
                    </div>
                  )}
                  <h3 className="font-bold text-indigo-700 mb-1">{point.name}</h3>
                  <div className="text-sm text-gray-500 mb-2">{point.area} - {point.subArea}</div>
                  
                  <p className="text-sm mb-2">{point.description}</p>
                  
                  <div className="mb-2 flex items-center">
                    <FaClock className={`mr-1 ${isAvailableNow ? 'text-green-600' : 'text-gray-500'}`} />
                    <span className={`text-sm font-medium ${isAvailableNow ? 'text-green-600' : 'text-gray-700'}`}>
                      {isAvailableNow ? 'Open Now' : 'Currently Closed'}
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <FaCalendarAlt className="text-gray-600 mr-1" />
                    <span className="text-sm text-gray-700">
                      {point.availableTimes && point.availableTimes.length > 0 
                        ? point.availableTimes[0] 
                        : 'Schedule unavailable'}
                    </span>
                  </div>
                  
                  {/* Show distance - either from custom location or user location */}
                  {(point.customDistance !== undefined || (userLocation && point.distance)) && (
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center mb-1">
                        <FaMapMarkerAlt className="text-gray-500 mr-1 flex-shrink-0" />
                        <span>Distance: {(point.customDistance !== undefined ? point.customDistance : point.distance).toFixed(1)} km</span>
                      </div>
                      
                      {/* Add condensed travel times */}
                      <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 ml-5">
                        {(() => {
                          const distance = point.customDistance !== undefined ? point.customDistance : point.distance;
                          const times = estimateTravelTimes(distance);
                          
                          return (
                            <>
                              <div>🚶 {times.walking}</div>
                              <div>🚗 {times.driving}</div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-3 flex justify-between">
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${point.location.latitude},${point.location.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-indigo-600 text-white py-1 px-3 rounded text-sm font-medium hover:bg-indigo-700 flex items-center"
                      style={{ color: 'white' }}
                    >
                      <FaDirections className="mr-1 text-white" />
                      <span className="text-white">Directions</span>
                    </a>
                    <button
                      onClick={(e) => handleDetailsClick(e, point)}
                      className="bg-blue-50 text-blue-700 py-1 px-3 rounded text-sm font-medium hover:bg-blue-100 flex items-center"
                    >
                      <FaInfoCircle className="mr-1" />
                      View Details
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-3">
        <div className="text-sm font-medium text-gray-700 mb-2">Legend</div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
          <span className="text-xs">Available Now</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-gray-400 mr-2"></div>
          <span className="text-xs">Currently Closed</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;