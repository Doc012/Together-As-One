import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaClock, FaSearch, FaList, FaMap, FaTimes } from "react-icons/fa";
import WaterPointCard from "../components/common/WaterPointCard";
import WaterPointsMap from "../components/common/WaterPointsMap";
import { getWaterPoints } from "../utils/waterPointsData";

// Emfuleni Local Municipality areas and sub-areas
const EMFULENI_AREAS = {
  "Vanderbijlpark": ["SE1", "SE2", "SE3", "SE4", "SE5", "SE6", "SE7", "SE8", "SE9", "CW1", "CW2", "CW3", "CW4", "CW5", "CW6", "SW1", "SW2", "SW5"],
  "Sebokeng": ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6", "Unit 7", "Unit 8", "Unit 9", "Unit 10", "Unit 11", "Unit 12", "Unit 13", "Unit 14", "Unit 15", "Unit 16", "Unit 17", "Unit 18", "Unit 19", "Unit 20", "Unit 21", "Unit 22", "Unit 23", "Unit 24"],
  "Evaton": ["Evaton North", "Evaton West", "Evaton Central", "Small Farms", "Beverly Hills"],
  "Sharpeville": ["All Sharpeville"],
  "Bophelong": ["Bophelong", "Bophelong Extension"],
  "Boipatong": ["All Boipatong"],
  "Tshepiso": ["Tshepiso North", "Tshepiso South"],
  "Vereeniging": ["Three Rivers", "Duncanville", "Arcon Park", "Bedworth Park", "Sonland Park", "Waldrift", "Risiville", "Roshnee"],
  "Meyerton": ["All Meyerton"]
};

export default function FindWaterPage() {
  const [location, setLocation] = useState("");
  const [waterPoints, setWaterPoints] = useState([]);
  const [filteredPoints, setFilteredPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // "list" or "map"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedSubArea, setSelectedSubArea] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    // Load hardcoded water points
    const points = getWaterPoints();
    setWaterPoints(points);
    setFilteredPoints(points);
    setLoading(false);
  }, []);

  // Filter water points based on location and search query
  useEffect(() => {
    let filtered = [...waterPoints];
    
    // Set filtering status for UI
    setIsFiltering(selectedArea !== "" || searchQuery !== "" || userCoordinates !== null);
    
    // Filter by area if specified
    if (selectedArea) {
      filtered = filtered.filter(point => 
        point.area === selectedArea
      );
      
      // Filter by sub-area if specified
      if (selectedSubArea) {
        filtered = filtered.filter(point => 
          point.address.includes(selectedSubArea)
        );
      }
    }
    
    // Apply search filter if specified
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(point => 
        point.area.toLowerCase().includes(query) ||
        point.address.toLowerCase().includes(query) ||
        point.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredPoints(filtered);
  }, [selectedArea, selectedSubArea, waterPoints, searchQuery]);

  // Sort water points by proximity if user coordinates are available
  useEffect(() => {
    if (userCoordinates && filteredPoints.length > 0) {
      const sortedPoints = [...filteredPoints].sort((a, b) => {
        const distanceA = calculateDistance(
          userCoordinates.lat, 
          userCoordinates.lng,
          a.coordinates.lat,
          a.coordinates.lng
        );
        const distanceB = calculateDistance(
          userCoordinates.lat, 
          userCoordinates.lng,
          b.coordinates.lat,
          b.coordinates.lng
        );
        return distanceA - distanceB;
      });
      
      setFilteredPoints(sortedPoints);
    }
  }, [userCoordinates, selectedArea, selectedSubArea, searchQuery]);

  // Simple distance calculation using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
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
  };
  
  function deg2rad(deg) {
    return deg * (Math.PI/180);
  }
  
  const handleGetLocation = () => {
    // First check if we already have coordinates
    if (userCoordinates) {
      // Clear coordinates to allow toggling
      setUserCoordinates(null);
      return;
    }
    
    // Set loading state
    setLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          
          // Show a temporary toast/notification that location was found
          // You might want to add a toast library or simple temporary notification
          const tempNotification = document.createElement('div');
          tempNotification.className = 'fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 shadow-md';
          tempNotification.innerHTML = '<div class="flex items-center"><svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg><span>Location found! Sorting water points by distance.</span></div>';
          document.body.appendChild(tempNotification);
          
          // Remove the notification after 3 seconds
          setTimeout(() => {
            if (document.body.contains(tempNotification)) {
              document.body.removeChild(tempNotification);
            }
          }, 3000);
          
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          let errorMessage = "Unable to get your location.";
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location access was denied. Please check your browser permissions.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable. Please try again.";
              break;
            case error.TIMEOUT:
              errorMessage = "The request to get your location timed out. Please try again.";
              break;
            case error.UNKNOWN_ERROR:
              errorMessage = "An unknown error occurred while getting your location.";
              break;
          }
          
          alert(errorMessage);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };
  
  const handleAreaChange = (e) => {
    const area = e.target.value;
    setSelectedArea(area);
    setSelectedSubArea("");
  };
  
  const handleSubAreaChange = (e) => {
    const subArea = e.target.value;
    setSelectedSubArea(subArea);
  };
  
  const clearFilters = () => {
    setSelectedArea("");
    setSelectedSubArea("");
    setSearchQuery("");
    setUserCoordinates(null);
    setFilteredPoints(waterPoints);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Find Water Near You
        </h1>
        <p className="text-lg text-gray-600 text-center">
          Locate nearby homes with boreholes willing to share water
        </p>
      </div>
      
      {/* Filters section */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
          <div className="bg-blue-50 px-6 py-3 border-b border-blue-100">
            <h2 className="text-lg font-semibold text-blue-800">Filter Water Points</h2>
          </div>
          
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Area and Sub-area Filters */}
              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                  Area
                </label>
                <select
                  id="area"
                  value={selectedArea}
                  onChange={handleAreaChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">All Areas</option>
                  {Object.keys(EMFULENI_AREAS).map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                
                {selectedArea && EMFULENI_AREAS[selectedArea].length > 0 && (
                  <div className="mt-3">
                    <label htmlFor="subArea" className="block text-sm font-medium text-gray-700 mb-1">
                      {selectedArea} Area
                    </label>
                    <select
                      id="subArea"
                      value={selectedSubArea}
                      onChange={handleSubAreaChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">All of {selectedArea}</option>
                      {EMFULENI_AREAS[selectedArea].map((subArea) => (
                        <option key={subArea} value={subArea}>
                          {subArea}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              
              {/* Search Keywords Filter */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Keywords
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    placeholder="Street name, landmark..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Location-based Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <button
                  onClick={handleGetLocation}
                  className={`w-full flex items-center justify-center ${
                    userCoordinates 
                      ? "bg-blue-100 text-blue-800 border border-blue-300" 
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  } px-4 py-2 rounded-md transition disabled:opacity-70`}
                >
                  <FaMapMarkerAlt className="mr-2" />
                  {userCoordinates 
                    ? "Turn Off Location Sorting" 
                    : "Find Nearest Water Points"
                  }
                </button>
                
                {userCoordinates && (
                  <div className="mt-2 bg-blue-50 p-2 rounded-md flex items-center text-sm">
                    <FaMapMarkerAlt className="text-blue-600 mr-2" />
                    <span className="text-blue-800">Sorting by proximity to your location</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Active Filters and Clear Button */}
            {isFiltering && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-700">Active filters:</span>
                    
                    {selectedArea && (
                      <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs rounded-full px-3 py-1">
                        {selectedArea} {selectedSubArea && `- ${selectedSubArea}`}
                      </span>
                    )}
                    
                    {searchQuery && (
                      <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs rounded-full px-3 py-1">
                        "{searchQuery}"
                      </span>
                    )}
                    
                    {userCoordinates && (
                      <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs rounded-full px-3 py-1">
                        <FaMapMarkerAlt className="mr-1" /> Near me
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-800 flex items-center"
                  >
                    <FaTimes className="mr-1" />
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {filteredPoints.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-3 mb-3 sm:mb-0">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">{filteredPoints.length}</span> water {filteredPoints.length === 1 ? 'point' : 'points'} found
                {selectedArea && <span> in {selectedArea}</span>}
                {selectedSubArea && <span> - {selectedSubArea}</span>}
              </p>
            </div>
          )}
          
          {/* View mode toggle */}
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                viewMode === "list"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <FaList className="inline mr-2" />
              List View
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`px-4 py-2 text-sm font-medium rounded-r-md border ${
                viewMode === "map"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 border-l-0"
              }`}
            >
              <FaMap className="inline mr-2" />
              Map View
            </button>
          </div>
        </div>
      </div>
      
      {/* Water points content section */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {viewMode === "list" && (
            <>
              {filteredPoints.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Water Points Found</h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any water points matching your criteria.
                  </p>
                  <p className="text-gray-600">
                    Try adjusting your filters or search query, or select a different area.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPoints.map(point => (
                    <WaterPointCard 
                      key={point.id} 
                      point={point} 
                      userCoordinates={userCoordinates} 
                    />
                  ))}
                </div>
              )}
            </>
          )}
          
          {viewMode === "map" && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-gray-100 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">Map View</h3>
              </div>
              <div className="relative">
                <WaterPointsMap 
                  waterPoints={filteredPoints} 
                  userCoordinates={userCoordinates}
                  onSelectPoint={(point) => {
                    // Optionally scroll to the selected point's card
                    // or highlight it in the list view
                    console.log("Selected point:", point);
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}