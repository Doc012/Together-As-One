import { useEffect, useRef, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function WaterPointsMap({ waterPoints, userCoordinates, onSelectPoint }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load Google Maps script only once
  useEffect(() => {
    // Function to load the script
    const loadGoogleMapsScript = () => {
      // Check if the script is already added to prevent duplicates
      if (document.querySelector('script[src*="maps.googleapis.com/maps/api"]')) {
        console.log("Google Maps script already exists, skipping load");
        setScriptLoaded(true);
        return;
      }

      // For development purposes we'll use a fallback
      window.initMap = () => {
        setScriptLoaded(true);
        console.log("Google Maps script loaded");
      };

      const script = document.createElement('script');
      // Replace YOUR_API_KEY with an actual key in production
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.id = "google-maps-script";
      document.head.appendChild(script);
    };

    // Check if window.google already exists
    if (window.google && window.google.maps) {
      console.log("Google Maps already loaded");
      setScriptLoaded(true);
    } else {
      loadGoogleMapsScript();
    }

    // Cleanup function
    return () => {
      if (window.initMap) {
        window.initMap = null;
      }
    };
  }, []);

  // Initialize map when script is loaded
  useEffect(() => {
    if (!scriptLoaded || !mapRef.current) return;

    // Create a fallback map for development if API key issues exist
    const createFallbackMap = () => {
      console.log("Creating fallback map display");
      const fallbackDiv = document.createElement('div');
      fallbackDiv.className = "p-6 text-center";
      fallbackDiv.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full">
          <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">
            <p class="font-bold">Map API Key Required</p>
            <p>To view the actual map, a Google Maps API key is needed.</p>
          </div>
          <div class="mt-4">
            <h3 class="font-bold text-lg mb-4">Water Points Locations:</h3>
            <ul class="text-left list-disc pl-5">
              ${waterPoints.map(point => 
                `<li class="mb-2">${point.area}: ${point.address}</li>`
              ).join('')}
            </ul>
          </div>
        </div>
      `;
      
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
        mapRef.current.appendChild(fallbackDiv);
      }
      setMapLoaded(true);
    };

    try {
      // Only proceed if Google Maps is fully loaded
      if (!window.google || !window.google.maps || !window.google.maps.Map) {
        console.warn("Google Maps not fully loaded - using fallback");
        createFallbackMap();
        return;
      }

      // Calculate center point based on water points or user location
      let centerPoint;
      if (userCoordinates) {
        centerPoint = { lat: userCoordinates.lat, lng: userCoordinates.lng };
      } else if (waterPoints && waterPoints.length > 0) {
        // Use the first water point as center if no user coordinates
        centerPoint = { 
          lat: waterPoints[0].coordinates.lat, 
          lng: waterPoints[0].coordinates.lng 
        };
      } else {
        // Default to Vanderbijlpark center if no points available
        centerPoint = { lat: -26.7034, lng: 27.8390 };
      }
      
      // Create a new map instance
      const mapOptions = {
        center: centerPoint,
        zoom: 13,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      };
      
      // Clear any existing content
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
      }
      
      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      mapInstanceRef.current = map;
      
      // Add markers for water points
      if (waterPoints && waterPoints.length > 0) {
        addMarkers(map);
      }
      
      // Add user location marker if available
      if (userCoordinates) {
        try {
          const userMarker = new window.google.maps.Marker({
            position: { lat: userCoordinates.lat, lng: userCoordinates.lng },
            map: map,
            icon: {
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              scaledSize: new window.google.maps.Size(40, 40)
            },
            title: 'Your Location',
            zIndex: 1000 // Place above other markers
          });
          
          // Add info window for user location
          const userInfoWindow = new window.google.maps.InfoWindow({
            content: `<div class="p-2"><strong>Your Location</strong></div>`
          });
          
          userMarker.addListener('click', () => {
            userInfoWindow.open(map, userMarker);
          });
        } catch (error) {
          console.error("Error adding user location marker:", error);
        }
      }
      
      setMapLoaded(true);
    } catch (error) {
      console.error("Error initializing map:", error);
      createFallbackMap();
    }

    return () => {
      // Clean up markers
      if (markersRef.current && markersRef.current.length > 0) {
        markersRef.current.forEach((marker) => {
          if (marker) marker.setMap(null);
        });
        markersRef.current = [];
      }
    };
  }, [scriptLoaded, waterPoints, userCoordinates]);
  
  // Add markers for all water points
  const addMarkers = (map) => {
    if (!waterPoints || !map) return;
    
    try {
      // Clear existing markers
      if (markersRef.current && markersRef.current.length > 0) {
        markersRef.current.forEach((marker) => {
          if (marker) marker.setMap(null);
        });
      }
      
      markersRef.current = waterPoints.map((point) => {
        try {
          // Create marker
          const marker = new window.google.maps.Marker({
            position: { 
              lat: parseFloat(point.coordinates.lat), 
              lng: parseFloat(point.coordinates.lng) 
            },
            map: map,
            title: point.address
          });
          
          // Create info window content
          const infoWindowContent = `
            <div style="padding: 12px; max-width: 300px;">
              <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 4px;">${point.area}</h3>
              <p style="font-size: 14px; margin-bottom: 8px;">${point.address}</p>
              <p style="font-size: 14px; color: #666; margin-bottom: 8px;">${point.description}</p>
              <div style="font-size: 14px; margin-bottom: 8px;">
                <strong>Available Times:</strong>
                <div>${point.availableTimes.join(', ')}</div>
              </div>
              <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(point.address)}" 
                target="_blank" rel="noopener noreferrer"
                style="color: #1d4ed8; font-weight: 500; font-size: 14px; display: inline-block; margin-top: 4px;">
                Get Directions
              </a>
            </div>
          `;
          
          // Create info window
          const infoWindow = new window.google.maps.InfoWindow({
            content: infoWindowContent,
            maxWidth: 300
          });
          
          // Add click listener to marker
          marker.addListener('click', () => {
            // Close previously selected marker's info window
            if (selectedMarker && selectedMarker.infoWindow) {
              selectedMarker.infoWindow.close();
              
              // Reset animation of previous marker
              if (selectedMarker.marker && selectedMarker.marker.setAnimation) {
                selectedMarker.marker.setAnimation(null);
              }
            }
            
            // Open this marker's info window
            infoWindow.open(map, marker);
            
            // Call the callback if provided
            if (onSelectPoint) {
              onSelectPoint(point);
            }
            
            // Save as selected marker
            setSelectedMarker({ marker, infoWindow });
          });
          
          return marker;
        } catch (error) {
          console.error("Error creating marker:", error);
          return null;
        }
      }).filter(Boolean); // Remove any null markers
    } catch (error) {
      console.error("Error adding markers:", error);
    }
  };

  return (
    <div className="w-full">
      {!scriptLoaded && (
        <div className="flex items-center justify-center bg-gray-100 p-8 rounded-lg h-[500px]">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      
      <div 
        ref={mapRef} 
        className={`h-[500px] md:h-[600px] w-full rounded-lg shadow-md ${scriptLoaded ? 'block' : 'hidden'}`}
      ></div>
      
      {mapLoaded && waterPoints.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
          <div className="text-center p-4">
            <FaMapMarkerAlt className="mx-auto text-red-500 text-3xl mb-2" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No Water Points Found</h3>
            <p className="text-gray-600">Try adjusting your filters to find water points.</p>
          </div>
        </div>
      )}
    </div>
  );
}