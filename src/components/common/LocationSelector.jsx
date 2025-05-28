import { useState } from "react";
import { FaMapMarkerAlt, FaFilter, FaChevronDown } from "react-icons/fa";

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

export default function LocationSelector({ onLocationChange, setUserCoordinates }) {
  const [loading, setLoading] = useState(false);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedSubArea, setSelectedSubArea] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const handleGetLocation = () => {
    setLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please check your browser permissions.");
          setLoading(false);
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
    
    if (area) {
      onLocationChange(area);
    } else {
      onLocationChange("");
    }
  };
  
  const handleSubAreaChange = (e) => {
    const subArea = e.target.value;
    setSelectedSubArea(subArea);
    
    if (subArea) {
      onLocationChange(`${selectedArea} - ${subArea}`);
    } else {
      onLocationChange(selectedArea);
    }
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">Filter by location</h3>
        <button 
          onClick={toggleFilters}
          className="flex items-center text-blue-600 text-sm hover:text-blue-800"
        >
          <FaFilter className="mr-1" />
          {showFilters ? "Hide Filters" : "More Filters"}
          <FaChevronDown className={`ml-1 transform ${showFilters ? 'rotate-180' : ''} transition-transform`} />
        </button>
      </div>
      
      <div className="flex gap-3 mb-3">
        <div className="flex-grow">
          <select
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
        </div>
        
        <button
          onClick={handleGetLocation}
          disabled={loading}
          className="flex-shrink-0 flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-70"
        >
          <FaMapMarkerAlt className="mr-2" />
          {loading ? "..." : "Near Me"}
        </button>
      </div>
      
      {showFilters && (
        <div className="animate-fadeIn">
          {selectedArea && EMFULENI_AREAS[selectedArea].length > 0 && (
            <div className="mb-3">
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
      )}
      
      {selectedArea && (
        <div className="bg-blue-50 p-2 rounded-md flex items-center">
          <FaMapMarkerAlt className="text-blue-600 mr-2" />
          <span className="text-blue-800 text-sm">
            {selectedSubArea ? `${selectedArea} - ${selectedSubArea}` : selectedArea}
          </span>
        </div>
      )}
    </div>
  );
}