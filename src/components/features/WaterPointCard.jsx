import { useState } from 'react';
import { 
  FaMapMarkerAlt, 
  FaDirections, 
  FaClock, 
  FaPhoneAlt, 
  FaChevronRight, 
  FaInfoCircle,
  FaWalking,
  FaCar
} from 'react-icons/fa';

export default function WaterPointCard({ point, userLocation, onViewDetails }) {
  const [expanded, setExpanded] = useState(false);
  
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  // Check if currently available - with null checks
  const now = new Date();
  const currentHour = now.getHours();
  const currentDay = now.getDay();
  
  // Guard against undefined point or availability array
  const availableToday = point?.availability?.find?.(slot => slot.day === currentDay) || null;
  const isOpenNow = availableToday && 
    currentHour >= availableToday.startHour && 
    currentHour < availableToday.endHour;
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Display distance - use customDistance if available (from custom location filter), otherwise use distance (from user location)
  const displayDistance = point.customDistance !== undefined ? point.customDistance : point.distance;
  const hasDistance = displayDistance !== undefined && displayDistance !== Infinity;
  const distanceSource = point.customDistance !== undefined ? "selected location" : "your location";
  
  const estimateTravelTimes = (distanceKm) => {
    if (distanceKm === undefined || distanceKm === Infinity) {
      return { walking: null, driving: null };
    }
    
    // Estimated walking speed: 5 km/h
    // Estimated driving speed: 40 km/h
    const walkingMinutes = Math.round(distanceKm * 60 / 5);
    const drivingMinutes = Math.round(distanceKm * 60 / 40);
    
    return {
      walking: formatTravelTime(walkingMinutes),
      driving: formatTravelTime(drivingMinutes)
    };
  };

  const formatTravelTime = (minutes) => {
    if (minutes < 1) return "< 1 min";
    if (minutes < 60) return `${minutes} min`;
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) return `${hours}h`;
    return `${hours}h ${remainingMinutes}m`;
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
      <div className="relative">
        {point.imageUrl && (
          <img 
            src={point.imageUrl} 
            alt={point.name} 
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x200?text=Water+Point';
            }}
          />
        )}
        
        {/* Demo listing badge */}
        {point.isDemo && (
          <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1 text-xs font-medium rounded-br-lg shadow-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Demo Listing
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{point.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{point.area} - {point.subArea}</p>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{point.description}</p>
        
        <div className="flex items-center mb-4">
          <FaClock className={`mr-2 ${isOpenNow ? 'text-green-600' : 'text-gray-500'}`} />
          <span className={`text-sm font-medium ${isOpenNow ? 'text-green-600' : 'text-gray-700'}`}>
            {isOpenNow ? 'Open Now' : 'Currently Closed'}
          </span>
        </div>
        
        {point.availableTimes && point.availableTimes.length > 0 && (
          <div className="mb-4">
            <div className="text-sm text-gray-600">{point.availableTimes[0]}</div>
            {point.availableTimes.length > 1 && (
              <div className="text-xs text-gray-500 mt-1">+ {point.availableTimes.length - 1} more times</div>
            )}
          </div>
        )}
        
        {hasDistance && (
          <div className="mb-4">
            <div className="flex items-center mb-1">
              <FaMapMarkerAlt className="text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">{displayDistance.toFixed(1)} km away</span>
            </div>
            
            {/* Add travel time estimates */}
            <div className="grid grid-cols-2 gap-1 ml-6 mt-1">
              {(() => {
                const times = estimateTravelTimes(displayDistance);
                
                return (
                  <>
                    <div className="flex items-center text-xs text-gray-600">
                      <FaWalking className="mr-1 text-blue-600" />
                      <span>{times.walking}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <FaCar className="mr-1 text-indigo-600" />
                      <span>{times.driving}</span>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-auto">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${point.location.latitude},${point.location.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
          >
            <FaDirections className="mr-1" />
            Directions
          </a>
          
          <button 
            onClick={() => onViewDetails(point)}
            className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center"
          >
            Details
            <FaChevronRight className="ml-1 text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
}