import { FaMapMarkerAlt, FaClock, FaWalking, FaCar, FaDirections } from "react-icons/fa";

export default function WaterPointCard({ point, userCoordinates }) {
  // Calculate distance if user coordinates are available
  const distance = userCoordinates ? calculateDistance(
    userCoordinates.lat,
    userCoordinates.lng,
    point.coordinates.lat,
    point.coordinates.lng
  ) : null;
  
  // Format distance to 1 decimal place if available
  const formattedDistance = distance !== null ? `${distance.toFixed(1)} km` : null;
  
  // Google Maps distance calculation values
  // For distances under 2km, Google Maps uses:
  // - Walking: ~4.8 km/h (80 m/min) 
  // - Driving in residential areas: ~24-30 km/h (400-500 m/min)
  
  // These values account for real-world routes (not direct "as the crow flies")
  const routeFactor = 1.2; // Roads are typically 20% longer than direct paths
  const adjustedDistance = distance ? distance * routeFactor : null;
  
  // Calculate times based on adjusted distance
  const walkingMinutes = adjustedDistance ? Math.round(adjustedDistance * 60 / 4.8) : null; // 4.8 km/h
  const drivingMinutes = adjustedDistance ? Math.max(2, Math.round(adjustedDistance * 60 / 24)) : null; // 24 km/h minimum 2 min
  
  // Format time display to use hours for values over 60 minutes
  const formatTime = (minutes) => {
    if (!minutes) return null;
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours} hr ${remainingMinutes} min` : `${hours} hr`;
  };
  
  const walkingTime = formatTime(walkingMinutes);
  const drivingTime = formatTime(drivingMinutes);
  
  // Create Google Maps directions URL using address instead of coordinates
  const getDirectionsUrl = () => {
    // Encode the full address for the destination
    const destination = encodeURIComponent(point.address);
    
    // If user coordinates are available, use their current location
    if (userCoordinates) {
      return `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
    }
    
    // Otherwise just search for the destination address
    return `https://www.google.com/maps/search/?api=1&query=${destination}`;
  };
  
  // Simple distance calculation using Haversine formula
  function calculateDistance(lat1, lon1, lat2, lon2) {
    // Convert string coordinates to numbers if needed
    lat1 = typeof lat1 === 'string' ? parseFloat(lat1) : lat1;
    lon1 = typeof lon1 === 'string' ? parseFloat(lon1) : lon1;
    lat2 = typeof lat2 === 'string' ? parseFloat(lat2) : lat2;
    lon2 = typeof lon2 === 'string' ? parseFloat(lon2) : lon2;
    
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180);
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={point.image} 
          alt={`House in ${point.area}`}
          className="w-full h-48 object-cover"
        />
        
        {formattedDistance && (
          <div className="absolute top-3 right-3 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow">
            {formattedDistance}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{point.area}</h3>
        
        <p className="text-gray-600 mt-1 flex items-start">
          <FaMapMarkerAlt className="mr-2 mt-1 text-gray-400 flex-shrink-0" />
          <span>{point.address}</span>
        </p>
        
        <div className="mt-2">
          <a 
            href={getDirectionsUrl()} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <FaDirections className="mr-1" />
            Get Directions
          </a>
        </div>
        
        <p className="text-gray-600 mt-3 text-sm">
          {point.description}
        </p>
        
        {formattedDistance && (
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="mb-1">
              <span className="text-sm text-gray-700 font-medium">Estimated travel time:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center text-gray-600">
                <FaWalking className="mr-1 text-blue-500" />
                <span className="text-sm">~{walkingTime} walk</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaCar className="mr-1 text-blue-500" />
                <span className="text-sm">~{drivingTime} drive</span>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-xs text-gray-500 italic">
                Times are estimates and may vary based on traffic, route, and walking pace
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center mb-2">
            <FaClock className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-700 font-medium">Available Times:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {point.availableTimes.map((time, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
              >
                {time}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}