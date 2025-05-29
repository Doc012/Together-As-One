import React, { useState } from 'react';
import { FaLocationArrow, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';

const LocationPermissionRequest = ({ 
  onRequestLocation, 
  permissionStatus = 'prompt',
  userLocationAvailable = false
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleRequestLocation = () => {
    onRequestLocation();
  };

  if (permissionStatus === 'granted' && userLocationAvailable) {
    return (
      <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center">
        <div className="bg-green-100 rounded-full p-2 mr-4">
          <FaCheckCircle className="text-green-600 text-xl" />
        </div>
        <div>
          <h3 className="font-medium text-green-800">Location access enabled</h3>
          <p className="text-sm text-green-700">
            We're showing water points near your current location.
          </p>
        </div>
      </div>
    );
  }

  if (permissionStatus === 'denied') {
    return (
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
        <div className="flex items-start">
          <div className="bg-amber-100 rounded-full p-2 mr-4 mt-1">
            <FaInfoCircle className="text-amber-600 text-xl" />
          </div>
          <div>
            <h3 className="font-medium text-amber-800">Location access blocked</h3>
            <p className="text-sm text-amber-700 mb-2">
              You've blocked location access in your browser. To enable location-based features:
            </p>
            <ol className="list-decimal list-inside text-sm text-amber-700 pl-2 space-y-1 mb-3">
              <li>Click the lock/info icon in your browser's address bar</li>
              <li>Find "Location" or "Site settings"</li>
              <li>Change permission to "Allow"</li>
              <li>Reload this page</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-xl overflow-hidden transition-all duration-300">
      <div className="p-4">
        <div className="flex items-start">
          <div className="bg-indigo-100 rounded-full p-2 mr-4 mt-1">
            <FaLocationArrow className="text-indigo-600 text-xl" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-medium text-indigo-800 text-lg">Find water points near you</h3>
                <p className="text-sm text-indigo-700 mb-3 sm:mb-0">
                  Enable location services to see the closest water points to your current location
                </p>
              </div>
              <button
                onClick={handleRequestLocation}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium"
              >
                <FaLocationArrow />
                Use My Location
              </button>
            </div>
            
            {isExpanded && (
              <div className="mt-4 text-sm text-indigo-700 bg-indigo-100/50 p-3 rounded-lg">
                <p className="font-medium mb-1">Why do we need your location?</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Sort water points by distance from your location</li>
                  <li>Calculate accurate travel times</li>
                  <li>Generate accurate directions</li>
                  <li>We never store or share your location data</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-indigo-100/50 border-t border-indigo-100 px-4 py-2 text-right">
        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="text-sm text-indigo-700 hover:text-indigo-900 font-medium"
        >
          {isExpanded ? 'Show Less' : 'Learn More'}
        </button>
      </div>
    </div>
  );
};

export default LocationPermissionRequest;
