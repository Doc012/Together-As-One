import { useState, useEffect, useRef } from 'react';
import { 
  FaFilter, FaMapMarkerAlt, FaCalendarAlt, FaClock, 
  FaChevronDown, FaCheck, FaSearch, FaTimes, FaAngleRight,
  FaLocationArrow, FaExclamationCircle
} from 'react-icons/fa';
import LocationMapPicker from './LocationMapPicker';

const FilterPanel = ({ 
  onFilterChange, 
  activeFilters = {}, 
  onResetFilters,
  areas = [],
  hasUserLocation = false,
  totalWaterPoints = 0,
  filteredCount = 0,
  isLoading = false,
  showFacilitiesFilters = true,
  showCapacityFilter = true,
  horizontal = false // New prop for horizontal layout
}) => {
  // State for UI controls
  const [areaExpanded, setAreaExpanded] = useState(false);
  const [availabilityExpanded, setAvailabilityExpanded] = useState(false);
  const [showMapSelector, setShowMapSelector] = useState(false);
  const [mapLocation, setMapLocation] = useState(null);
  
  // Refs for click outside handling
  const areaRef = useRef(null);
  const daysRef = useRef(null);
  
  // Days of the week for availability filtering
  const daysOfWeek = [
    { id: 0, name: 'Sunday', short: 'Sun' },
    { id: 1, name: 'Monday', short: 'Mon' },
    { id: 2, name: 'Tuesday', short: 'Tue' },
    { id: 3, name: 'Wednesday', short: 'Wed' },
    { id: 4, name: 'Thursday', short: 'Thu' },
    { id: 5, name: 'Friday', short: 'Fri' },
    { id: 6, name: 'Saturday', short: 'Sat' }
  ];
  
  // Time slots for availability filtering
  const timeSlots = [
    { id: 'morning', name: 'Morning', hours: [6, 7, 8, 9, 10, 11] },
    { id: 'afternoon', name: 'Afternoon', hours: [12, 13, 14, 15, 16, 17] },
    { id: 'evening', name: 'Evening', hours: [18, 19, 20, 21, 22, 23] }
  ];

  // Get unique sub-areas based on selected area
  const getSubAreas = () => {
    if (!activeFilters.area) return [];
    const selectedArea = areas.find(a => a.name === activeFilters.area);
    return selectedArea ? selectedArea.subAreas || [] : [];
  };

  // Active filters count for badges
  const getActiveFilterCount = (section) => {
    switch (section) {
      case 'area':
        return (activeFilters.area ? 1 : 0) + 
               (activeFilters.subArea ? 1 : 0) + 
               (activeFilters.maxDistance && activeFilters.maxDistance < 10 ? 1 : 0);
      case 'availability':
        return (activeFilters.availableNow ? 1 : 0) + 
               (activeFilters.availableDays && activeFilters.availableDays.length > 0 ? 1 : 0) +
               (activeFilters.timeSlot ? 1 : 0);
      default:
        return 0;
    }
  };

  // Total active filters
  const getTotalActiveFilters = () => {
    return getActiveFilterCount('area') + getActiveFilterCount('availability');
  };

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    // For arrays (like availableDays), toggle values
    if (type === 'availableDays') {
      const currentDays = activeFilters.availableDays || [];
      const updatedDays = currentDays.includes(value)
        ? currentDays.filter(day => day !== value)
        : [...currentDays, value];
        
      onFilterChange(type, updatedDays);
      return;
    }
    
    // For boolean toggles
    if (['availableNow'].includes(type)) {
      onFilterChange(type, !activeFilters[type]);
      return;
    }
    
    // For area selection, reset subArea if area changes
    if (type === 'area' && activeFilters.area !== value) {
      onFilterChange('subArea', null);
    }
    
    // For all other cases
    onFilterChange(type, value);
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    switch (section) {
      case 'area':
        setAreaExpanded(!areaExpanded);
        break;
      case 'availability':
        setAvailabilityExpanded(!availabilityExpanded);
        break;
      default:
        break;
    }
  };

  // Handle map location selection
  const handleMapLocationSelect = (location) => {
    setMapLocation(location);
    onFilterChange('customLocation', location);
    setShowMapSelector(false);
  };

  // Clear all filters
  const handleResetFilters = () => {
    setAreaExpanded(false);
    setAvailabilityExpanded(false);
    onResetFilters();
  };
  
  // Handle clicks outside expanded sections
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (areaRef.current && !areaRef.current.contains(event.target)) {
        setAreaExpanded(false);
      }
      if (daysRef.current && !daysRef.current.contains(event.target)) {
        setAvailabilityExpanded(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`${horizontal ? 'lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-4' : 'space-y-6'}`}>
      {/* In horizontal mode, we'll make filter sections side by side */}
      
      {/* Distance Filter */}
      <div className={horizontal ? "p-2" : ""}>
        <button 
          onClick={() => toggleSection('area')}
          className="w-full flex items-center justify-between py-2 text-left font-medium text-gray-700 hover:text-indigo-600 focus:outline-none transition-colors"
        >
          <div className="flex items-center">
            <FaLocationArrow className="text-indigo-500 mr-2" />
            <span>Set Distance Limit</span>
            {activeFilters.maxDistance && activeFilters.maxDistance < 10 && (
              <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                {activeFilters.maxDistance} km
              </span>
            )}
          </div>
        </button>
        
        <div className={`px-3 pt-2 pb-1 ${!hasUserLocation && !activeFilters.customLocation ? 'opacity-70' : ''}`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Maximum distance</span>
            {!hasUserLocation && !activeFilters.customLocation && (
              <span className="text-xs text-indigo-600 italic flex items-center">
                <FaExclamationCircle className="mr-1" size={10} />
                Select location first
              </span>
            )}
          </div>
          
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={activeFilters.maxDistance || 10}
            onChange={(e) => handleFilterChange('maxDistance', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            disabled={!hasUserLocation && !activeFilters.customLocation}
          />
          
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>1 km</span>
            <span>{activeFilters.maxDistance < 10 ? `${activeFilters.maxDistance} km` : 'Any distance'}</span>
            <span>10+ km</span>
          </div>
        </div>
      </div>
      
      {/* Area Filter */}
      <div className={horizontal ? "p-2" : ""}>
        {/* <h3 className="font-medium text-gray-700 mb-3 flex items-center">
          <FaMapMarkerAlt className="text-indigo-500 mr-2" />
          Area
        </h3> */}
        
        <div ref={areaRef} className="mb-4">
          <button 
            onClick={() => toggleSection('area')}
            className="w-full flex items-center justify-between py-2 text-left font-medium text-gray-700 hover:text-indigo-600 focus:outline-none transition-colors"
          >
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-indigo-500 mr-2" />
              <span>Select Location</span>
              {getActiveFilterCount('area') > 0 && (
                <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {getActiveFilterCount('area')}
                </span>
              )}
            </div>
            <FaChevronDown className={`text-gray-400 transition-transform ${areaExpanded ? 'transform rotate-180' : ''}`} />
          </button>
          
          {areaExpanded && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
              {/* Area Selection */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Area
                </label>
                <select
                  value={activeFilters.area || ''}
                  onChange={(e) => handleFilterChange('area', e.target.value || null)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">All Areas</option>
                  {areas.map(area => (
                    <option key={area.name} value={area.name}>
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Sub-Area Selection (conditional) */}
              {activeFilters.area && getSubAreas().length > 0 && (
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Neighborhood
                  </label>
                  <select
                    value={activeFilters.subArea || ''}
                    onChange={(e) => handleFilterChange('subArea', e.target.value || null)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">All Neighborhoods</option>
                    {getSubAreas().map(subArea => (
                      <option key={subArea} value={subArea}>
                        {subArea}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {/* Distance Filter */}
              <DistanceFilter 
                maxDistance={activeFilters.maxDistance || 10}
                onChange={handleFilterChange}
                hasUserLocation={hasUserLocation}
                customLocation={activeFilters.customLocation}
              />
              
              {/* Advanced: Custom Location Selection */}
              <div className="mt-3">
                <button
                  onClick={() => setShowMapSelector(true)}
                  className="w-full flex items-center justify-center py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FaSearch className="mr-2" />
                  Choose a Different Location
                </button>
                
                {showMapSelector && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Select Custom Location</h3>
                      
                      {/* Replace placeholder with actual map component */}
                      <div className="rounded h-60 mb-4 overflow-hidden border border-gray-200">
                        <LocationMapPicker 
                          onSelectLocation={(location) => setMapLocation(location)} 
                          initialLocation={mapLocation || activeFilters.customLocation}
                        />
                      </div>
                      
                      {/* Show selected coordinates if available */}
                      {mapLocation && (
                        <div className="mb-4 text-sm text-indigo-700 bg-indigo-50 p-2 rounded-md flex items-center">
                          <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                          Selected location: {mapLocation.lat.toFixed(5)}, {mapLocation.lng.toFixed(5)}
                        </div>
                      )}
                      
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => {
                            setMapLocation(null);
                            setShowMapSelector(false);
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleMapLocationSelect(mapLocation || { lat: -26.7145, lng: 27.8543 })}
                          className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                            mapLocation ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-400 cursor-not-allowed'
                          }`}
                          disabled={!mapLocation}
                        >
                          Confirm Location
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Availability Filter */}
      <div className={horizontal ? "p-2" : ""}>
        {/* <h3 className="font-medium text-gray-700 mb-3 flex items-center">
          <FaClock className="text-indigo-500 mr-2" />
          Availability
        </h3> */}
        
        <div ref={daysRef} className="mb-4">
          <button 
            onClick={() => toggleSection('availability')}
            className="w-full flex items-center justify-between py-2 text-left font-medium text-gray-700 hover:text-indigo-600 focus:outline-none transition-colors"
          >
            <div className="flex items-center">
              <FaCalendarAlt className="text-indigo-500 mr-2" />
              <span>Select Days & Times</span>
              {getActiveFilterCount('availability') > 0 && (
                <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {getActiveFilterCount('availability')}
                </span>
              )}
            </div>
            <FaChevronDown className={`text-gray-400 transition-transform ${availabilityExpanded ? 'transform rotate-180' : ''}`} />
          </button>
          
          {availabilityExpanded && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
              {/* Available Now Toggle */}
              <div className="mb-3">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters.availableNow || false}
                    onChange={() => handleFilterChange('availableNow')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Available Right Now</span>
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    Immediate
                  </span>
                </label>
              </div>
              
              {/* Days of Week Selection */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available on Specific Days
                </label>
                <div className="grid grid-cols-7 gap-1">
                  {daysOfWeek.map(day => (
                    <button
                      key={day.id}
                      onClick={() => handleFilterChange('availableDays', day.id)}
                      className={`flex flex-col items-center justify-center p-2 rounded-md text-xs ${
                        activeFilters.availableDays?.includes(day.id)
                          ? 'bg-indigo-100 text-indigo-800 font-medium border border-indigo-200'
                          : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-200'
                      }`}
                    >
                      <span>{day.short}</span>
                      {activeFilters.availableDays?.includes(day.id) && (
                        <FaCheck className="text-indigo-600 mt-1" size={10} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Time of Day Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time of Day
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map(slot => (
                    <button
                      key={slot.id}
                      onClick={() => handleFilterChange('timeSlot', activeFilters.timeSlot === slot.id ? null : slot.id)}
                      className={`flex items-center justify-center p-2 rounded-md text-sm ${
                        activeFilters.timeSlot === slot.id
                          ? 'bg-indigo-100 text-indigo-800 font-medium border border-indigo-200'
                          : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-200'
                      }`}
                    >
                      <FaClock className="mr-1" size={12} />
                      <span>{slot.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Custom Location Picker */}
        <LocationPicker 
          onSelectLocation={(location) => onFilterChange('customLocation', location)}
          activeLocation={activeFilters.customLocation}
        />
      </div>
      
      {/* Reset Filters Button */}
      <div className={horizontal ? "p-2" : ""}>
        <div className="flex justify-center mt-2">
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

// Update the LocationPicker component
const LocationPicker = ({ onSelectLocation, activeLocation }) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [tempLocation, setTempLocation] = useState(null);
  
  const openLocationPicker = () => {
    setTempLocation(activeLocation);
    setIsMapOpen(true);
  };
  
  const closeLocationPicker = () => {
    setTempLocation(null);
    setIsMapOpen(false);
  };
  
  const handleMapClick = (locationData) => {
    setTempLocation({
      lat: locationData.lat,
      lng: locationData.lng
    });
  };
  
  const handleConfirmLocation = () => {
    if (tempLocation) {
      onSelectLocation(tempLocation);
      setIsMapOpen(false);
    }
  };
  
  return (
    <div className="mb-6">
      <h3 className="font-medium text-gray-700 mb-2">Custom Location</h3>
      
      {activeLocation ? (
        <div className="mb-3 p-3 border border-gray-200 bg-indigo-50 rounded-md">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium text-indigo-700">Using Your Selected Location</div>
              {/* <div className="text-sm text-gray-600">Results are filtered based on this location</div> */}
            </div>
            <button 
              onClick={() => onSelectLocation(null)}
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-indigo-100"
              aria-label="Remove custom location"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      ) : null}
      
      <button
        onClick={openLocationPicker}
        className="w-full py-2 px-4 border border-indigo-300 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors flex items-center justify-center"
      >
        <FaMapMarkerAlt className="mr-2" />
        {activeLocation ? 'Change Location' : 'Choose Location on Map'}
      </button>
      
      {isMapOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[4000] flex items-center justify-center p-4 overflow-y-auto"
             style={{ touchAction: 'none' }}
             onClick={(e) => e.target === e.currentTarget && closeLocationPicker()}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium text-gray-800">Select a Location</h3>
              <button 
                onClick={closeLocationPicker} 
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            <div className="h-[400px] relative">
              <LocationMapPicker 
                onSelectLocation={handleMapClick} 
                initialLocation={activeLocation}
              />
            </div>
            <div className="p-4 border-t flex justify-end space-x-3">
              <button
                onClick={closeLocationPicker}
                className="py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLocation}
                className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  tempLocation ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300 cursor-not-allowed'
                }`}
                disabled={!tempLocation}
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Distance filter component
const DistanceFilter = ({ maxDistance, onChange, hasUserLocation, customLocation }) => {
  const hasLocation = hasUserLocation || !!customLocation;
  
  return (
    <div className={`mb-6 ${!hasLocation ? 'opacity-50 pointer-events-none' : ''}`}>
      <h3 className="font-medium text-gray-800 mb-3 flex items-center justify-between">
        <span>Distance</span>
        {!hasLocation && (
          <span className="text-xs text-gray-500 italic">
            Choose on map to use
          </span>
        )}
      </h3>
      
      <div className="px-1">
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={maxDistance}
          onChange={(e) => onChange('maxDistance', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          disabled={!hasLocation}
        />
        
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>1 km</span>
          <span>{maxDistance < 10 ? `${maxDistance} km` : 'Any distance'}</span>
          <span>10+ km</span>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;