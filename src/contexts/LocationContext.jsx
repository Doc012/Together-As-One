import React, { createContext, useState, useEffect } from 'react';

// Create the context with default values
export const LocationContext = createContext({
  userLocation: null,
  locationPermission: 'unknown',
  setUserLocation: () => {},
  requestLocationPermission: () => {}
});

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState('unknown'); // 'granted', 'denied', 'unknown'

  // Function to request location permission and get coordinates
  const requestLocationPermission = () => {
    if (!navigator.geolocation) {
      setLocationPermission('unsupported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
        setLocationPermission('granted');
      },
      (error) => {
        console.warn("Error getting location:", error.message);
        setLocationPermission('denied');
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  // Request location on component mount
  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <LocationContext.Provider 
      value={{ 
        userLocation, 
        locationPermission, 
        setUserLocation,
        requestLocationPermission 
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};