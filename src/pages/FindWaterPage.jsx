import { useState, useEffect, useContext, useCallback } from 'react';
import { 
  FaMapMarkerAlt, FaClock, FaSearch, FaFilter, FaWater, 
  FaLocationArrow, FaHourglassHalf, FaSortAmountDown, 
  FaTimes, FaListUl, FaMapMarked, FaDirections, FaChevronDown
} from 'react-icons/fa';
import { LocationContext } from '../contexts/LocationContext';
import { getAvailableWaterPoints } from '../data/waterPoints';
import WaterPointCard from '../components/features/WaterPointCard';
import SearchBar from '../components/features/SearchBar';
import FilterPanel from '../components/features/FilterPanel';
import MapView from '../components/features/MapView';

// Sample areas data - in a real app this would come from an API
const areasData = [
  { 
    name: 'Vanderbijlpark', 
    subAreas: ['Vanderbijlpark CE', 'Vanderbijlpark SE', 'Vanderbijlpark SW', 'Vanderbijlpark CW'] 
  },
  { 
    name: 'Vereeniging', 
    subAreas: ['Three Rivers', 'Arcon Park', 'Peacehaven', 'Duncanville'] 
  },
  { 
    name: 'Sasolburg', 
    subAreas: ['Sasolburg Central', 'Vaalpark', 'Roodia'] 
  },
  { 
    name: 'Evaton', 
    subAreas: ['Evaton West', 'Evaton North', 'Evaton Central'] 
  },
  { 
    name: 'Sebokeng', 
    subAreas: ['Zone 6', 'Zone 7', 'Zone 10', 'Zone 12', 'Zone 14'] 
  }
];

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

export default function FindWaterPage() {
  const { userLocation, locationPermission } = useContext(LocationContext);
  const [waterPoints, setWaterPoints] = useState([]);
  const [filteredPoints, setFilteredPoints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    maxDistance: 10,
    availableNow: false,
    area: null,
    subArea: null,
    availableDays: [],
    timeSlot: null,
    customLocation: null
  });
  const [error, setError] = useState(null);
  const [selectedWaterPoint, setSelectedWaterPoint] = useState(null);

  // View mode state (list or map)
  const [viewMode, setViewMode] = useState('list');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Auto-request location on page load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Location already handled by the LocationContext
          console.log("Location automatically obtained");
        },
        (error) => {
          console.warn("Unable to get user location:", error.message);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, []);
  
  useEffect(() => {
    // Simulate data fetch with a slight delay to show loading state
    setIsLoading(true);
    try {
      setTimeout(() => {
        const points = getAvailableWaterPoints();
        if (!points || !Array.isArray(points)) {
          throw new Error("Failed to load water points data");
        }
        setWaterPoints(points);
        setFilteredPoints(points);
        setIsLoading(false);
      }, 800);
    } catch (err) {
      console.error("Error loading water points:", err);
      setError("Failed to load water points. Please try again later.");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (waterPoints.length > 0) {
      // Apply filters whenever filters or search term changes
      applyFilters();
    }
  }, [userLocation, waterPoints, activeFilters, searchTerm]);

  // Update the applyFilters function to handle distance filtering properly
  const applyFilters = () => {
    setIsLoading(true);
    
    // Simulating a slight delay for filter processing
    setTimeout(() => {
      try {
        let filtered = [...waterPoints];
        
        // Area filtering
        if (activeFilters.area) {
          filtered = filtered.filter(point => point.area === activeFilters.area);
        }
        
        // Sub-area filtering
        if (activeFilters.subArea) {
          filtered = filtered.filter(point => point.subArea === activeFilters.subArea);
        }
        
        // Calculate distances based on location type (custom or user)
        if (activeFilters.customLocation) {
          // Calculate distances from custom location for all points
          filtered = filtered.map(point => {
            if (!point.location || !point.location.latitude || !point.location.longitude) {
              return { ...point, customDistance: Infinity };
            }
            
            const distance = calculateDistance(
              activeFilters.customLocation.lat,
              activeFilters.customLocation.lng,
              point.location.latitude,
              point.location.longitude
            );
            
            return { ...point, customDistance: distance };
          });
          
          // Apply distance filter if maxDistance is less than 10 (not "Any distance")
          if (activeFilters.maxDistance < 10) {
            filtered = filtered.filter(point => 
              point.customDistance !== Infinity && 
              point.customDistance <= activeFilters.maxDistance
            );
          }
          
          // Sort by distance from custom location
          filtered.sort((a, b) => {
            if (a.customDistance === Infinity) return 1;
            if (b.customDistance === Infinity) return -1;
            return a.customDistance - b.customDistance;
          });
        } 
        else if (userLocation) {
          // Calculate distances from user location for all points
          filtered = filtered.map(point => {
            if (!point.location || !point.location.latitude || !point.location.longitude) {
              return { ...point, distance: Infinity };
            }
            
            const distance = calculateDistance(
              userLocation.latitude, 
              userLocation.longitude,
              point.location.latitude,
              point.location.longitude
            );
            
            return { ...point, distance };
          });
          
          // Apply distance filter if maxDistance is less than 10 (not "Any distance")
          if (activeFilters.maxDistance < 10) {
            filtered = filtered.filter(point => 
              point.distance !== Infinity && 
              point.distance <= activeFilters.maxDistance
            );
          }
          
          // Sort by distance from user location
          filtered.sort((a, b) => {
            if (a.distance === Infinity) return 1;
            if (b.distance === Infinity) return -1;
            return a.distance - b.distance;
          });
        }
        
        // Availability filtering - current time
        if (activeFilters.availableNow) {
          const now = new Date();
          const currentHour = now.getHours();
          const currentDay = now.getDay();
          
          filtered = filtered.filter(point => {
            if (!point.availability || !Array.isArray(point.availability)) {
              return false;
            }
            const availableToday = point.availability.find(
              slot => slot.day === currentDay
            );
            
            if (!availableToday) return false;
            
            return (
              currentHour >= availableToday.startHour &&
              currentHour < availableToday.endHour
            );
          });
        }
        
        // Availability filtering - specific days
        if (activeFilters.availableDays && activeFilters.availableDays.length > 0) {
          filtered = filtered.filter(point => {
            if (!point.availability || !Array.isArray(point.availability)) {
              return false;
            }
            return point.availability.some(slot => 
              activeFilters.availableDays.includes(slot.day)
            );
          });
        }
        
        // Time slot filtering
        if (activeFilters.timeSlot) {
          const slot = {
            'morning': [6, 7, 8, 9, 10, 11],
            'afternoon': [12, 13, 14, 15, 16, 17],
            'evening': [18, 19, 20, 21, 22, 23]
          }[activeFilters.timeSlot] || [];
          
          filtered = filtered.filter(point => {
            if (!point.availability || !Array.isArray(point.availability)) {
              return false;
            }
            return point.availability.some(avail => {
              const startHour = avail.startHour;
              const endHour = avail.endHour;
              return slot.some(hour => hour >= startHour && hour < endHour);
            });
          });
        }
        
        // Search term filtering
        if (searchTerm && searchTerm.trim()) {
          const search = searchTerm.toLowerCase().trim();
          filtered = filtered.filter(point => 
            (point.area && point.area.toLowerCase().includes(search)) ||
            (point.address && point.address.toLowerCase().includes(search)) ||
            (point.name && point.name.toLowerCase().includes(search))
          );
        }
        
        // If user location is available and no custom location, add distance and sort
        if (userLocation && userLocation.latitude && userLocation.longitude && !activeFilters.customLocation) {
          filtered = filtered.map(point => {
            if (!point.location || !point.location.latitude || !point.location.longitude) {
              return { ...point, distance: Infinity };
            }
            const distance = calculateDistance(
              userLocation.latitude, 
              userLocation.longitude,
              point.location.latitude,
              point.location.longitude
            );
            return { ...point, distance };
          });
          
          // Sort by distance from user
          filtered.sort((a, b) => {
            if (a.distance === Infinity) return 1;
            if (b.distance === Infinity) return -1;
            return a.distance - b.distance;
          });
        }
        
        setFilteredPoints(filtered);
      } catch (err) {
        console.error("Error applying filters:", err);
        setError("Error filtering results. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  // Create a debounced search handler
  const debouncedSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
    }, 300),
    []
  );

  // Update the handleSearch function
  const handleSearch = (term) => {
    // Show loading state immediately
    if (term !== searchTerm) {
      setIsLoading(true);
    }
    // Debounce the actual search term update
    debouncedSearch(term);
  };

  const handleFilterChange = (filterName, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setActiveFilters({
      maxDistance: 10,
      availableNow: false,
      area: null,
      subArea: null,
      availableDays: [],
      timeSlot: null,
      customLocation: null
    });
    setSearchTerm('');
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (typeof lat1 !== 'number' || typeof lon1 !== 'number' || 
        typeof lat2 !== 'number' || typeof lon2 !== 'number') {
      return Infinity;
    }
    
    try {
      // Haversine formula implementation to calculate distance in kilometers
      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      const distance = R * c; // Distance in km
      return distance;
    } catch (err) {
      console.error("Error calculating distance:", err);
      return Infinity;
    }
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };

  const toggleFilterPanel = () => {
    setIsFilterPanelVisible(!isFilterPanelVisible);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'list' ? 'map' : 'list');
  };
  
  const handleSelectWaterPoint = (point, fromMapMarker = false) => {
    console.log("Selected water point:", point);
    
    // Set state first
    setSelectedWaterPoint(point);
    
    // Only switch to list view if specifically coming from a map marker click
    // and only on mobile devices
    if (fromMapMarker && window.innerWidth < 768 && viewMode === 'map') {
      setViewMode('list');
      
      // Use requestAnimationFrame to wait for the list view to render
      // This is more reliable than setTimeout
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const element = document.getElementById(`water-point-${point.id}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Use classList methods with try/catch for safety
            try {
              element.classList.add('highlight-card');
              setTimeout(() => {
                if (element && document.body.contains(element)) {
                  element.classList.remove('highlight-card');
                }
              }, 3000);
            } catch (err) {
              console.error('Error with highlight animation:', err);
            }
          }
        });
      });
    }
  };
  
  // Update the closeWaterPointDetail function to be simpler
  const closeWaterPointDetail = () => {
    setSelectedWaterPoint(null);
  };

  // Disable body scroll when modal is open
  useEffect(() => {
    // Determine if any modal is open that should lock scrolling
    const shouldLockScroll = selectedWaterPoint || isFilterPanelVisible;
    
    // Lock or unlock scrolling based on state
    if (shouldLockScroll) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup function to ensure scrolling is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedWaterPoint, isFilterPanelVisible]);

  // Add a helper function to estimate travel times based on distance
  const estimateTravelTimes = (distanceKm) => {
    if (distanceKm === undefined || distanceKm === Infinity) {
      return { walking: null, driving: null };
    }
    
    // Estimated walking speed: 5 km/h
    // Estimated driving speed: 40 km/h (accounting for urban traffic, stops, etc.)
    const walkingMinutes = Math.round(distanceKm * 60 / 5);
    const drivingMinutes = Math.round(distanceKm * 60 / 40);
    
    return {
      walking: formatTravelTime(walkingMinutes),
      driving: formatTravelTime(drivingMinutes)
    };
  };

  // Format travel time helper
  const formatTravelTime = (minutes) => {
    if (minutes < 1) return "Less than a minute";
    if (minutes < 60) return `${minutes} min`;
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${remainingMinutes} min`;
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredPoints.length / itemsPerPage);

  // Get current items
  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredPoints.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Add this effect to adjust items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // Mobile: 6 items per page
        setItemsPerPage(6);
      } else if (window.innerWidth < 1280) {
        // Tablet/small desktop: 8 items per page
        setItemsPerPage(8);
      } else {
        // Large desktop: 12 items per page
        setItemsPerPage(12);
      }
      // Reset to first page when screen size changes
      setCurrentPage(1);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Also reset current page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section with improved animation and visual appeal */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-700 py-16 z-10 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-white rounded-full opacity-10 animate-float-slow"></div>
          <div className="absolute left-10 bottom-10 w-48 h-48 bg-white rounded-full opacity-10 animate-float-medium"></div>
          <div className="absolute right-1/4 top-1/2 w-32 h-32 bg-white rounded-full opacity-10 animate-float-fast"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center text-white mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">Find Water Near You</h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Locate nearby homes with boreholes that are volunteering to share water during the outage.
            </p>
          </div>
          
          {/* Search Bar with enhanced design */}
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden animate-fade-in-up animation-delay-400 transform hover:scale-[1.01] transition-all duration-300">
            <div className="p-5">
              <SearchBar 
                searchTerm={searchTerm} 
                onSearch={handleSearch} 
                placeholder="Search by area, street name, or location..."
                autoFocus={false}
                className="transition-all duration-300"
              />
            </div>
          </div>
        </div>
        
        {/* Enhanced wave decoration with better animation */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-24 text-gray-50 fill-current animate-wave">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content Area - Restructured layout for desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Desktop Filter Panel - Always visible on top on large screens */}
        <div className="mb-6 hidden lg:block">
          <div className="bg-white rounded-xl shadow-md p-6">
            <FilterPanel 
              onFilterChange={handleFilterChange}
              activeFilters={activeFilters}
              onResetFilters={resetFilters}
              areas={areasData}
              hasUserLocation={!!userLocation}
              totalWaterPoints={waterPoints.length}
              filteredCount={filteredPoints.length}
              isLoading={isLoading}
              showFacilitiesFilters={false}
              showCapacityFilter={false}
              horizontal={true}
            />
          </div>
        </div>
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button
            className="w-full flex items-center justify-between bg-white p-4 rounded-xl shadow-sm text-gray-700 hover:text-indigo-600 transition-colors"
            onClick={toggleFilterPanel}
          >
            <div className="flex items-center">
              <FaFilter className="mr-2" />
              <span className="font-medium">Filters</span>
              {Object.values(activeFilters).some(v => 
                v !== null && 
                v !== false && 
                v !== 10 && 
                (Array.isArray(v) ? v.length > 0 : true)
              ) && (
                <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {Object.values(activeFilters).filter(v => 
                    v !== null && 
                    v !== false && 
                    v !== 10 && 
                    (Array.isArray(v) ? v.length > 0 : true)
                  ).length}
                </span>
              )}
            </div>
            <FaChevronDown className="text-gray-400" />
          </button>
        </div>
        
        {/* Control bar with enhanced styling */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center mb-4 sm:mb-0 w-full sm:w-auto">
            {/* Results count with loading animation */}
            <h2 className="text-lg font-semibold text-gray-800">
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-4 w-4 mr-2 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Finding water points...
                </span>
              ) : (
                <span className="flex items-center">
                  <span className="text-indigo-600 font-bold mr-1">{filteredPoints.length}</span> 
                  {filteredPoints.length === 1 ? 'Location' : 'Locations'} Found
                </span>
              )}
            </h2>
          </div>
          
          {/* View toggle buttons with improved styling */}
          <div className="flex border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <button
              className={`px-4 py-2 text-sm flex items-center transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-indigo-600 text-white font-medium' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setViewMode('list')}
            >
              <FaListUl className={`mr-2 ${viewMode === 'list' ? 'animate-pulse-once' : ''}`} />
              <span className="hidden sm:inline">List View</span>
            </button>
            <button
              className={`px-4 py-2 text-sm flex items-center transition-all duration-200 ${
                viewMode === 'map' 
                  ? 'bg-indigo-600 text-white font-medium' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setViewMode('map')}
            >
              <FaMapMarked className={`mr-2 ${viewMode === 'map' ? 'animate-pulse-once' : ''}`} />
              <span className="hidden sm:inline">Map View</span>
            </button>
          </div>
        </div>
        
        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
            <p className="font-medium">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 text-sm text-red-700 hover:text-red-900 underline"
            >
              Refresh the page
            </button>
          </div>
        )}

        {/* Content Display - List or Map */}
        {viewMode === 'list' ? (
          /* List View */
          isLoading ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="relative h-16 w-16 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-indigo-600 animate-spin"></div>
                <div className="absolute inset-3 text-indigo-600">
                  <FaWater className="h-full w-full animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Finding Water Points</h3>
              <p className="text-gray-600">Searching based on your filters...</p>
            </div>
          ) : filteredPoints.length > 0 ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {getCurrentItems().map((point, index) => (
                <div 
                  id={`water-point-${point.id}`} 
                  key={point.id || `point-${Math.random()}`} 
                  className={`transition-all duration-300 animate-fade-in`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <WaterPointCard 
                    point={point} 
                    userLocation={userLocation} 
                    onViewDetails={handleSelectWaterPoint}
                    className="h-full transform transition-transform hover:scale-[1.02] hover:shadow-lg"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-10 text-center animate-fade-in">
              <div className="bg-indigo-50 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
                <FaSearch className="text-indigo-400 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">No Water Points Found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                No water points match your current filters. Try adjusting your search criteria or reset filters to see all available water points.
              </p>
              
              <button 
                onClick={resetFilters}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Reset All Filters
              </button>
            </div>
          )
        ) : (
          /* Map View */
          <MapView 
            waterPoints={filteredPoints}
            userLocation={userLocation}
            customLocation={activeFilters.customLocation}
            isLoading={isLoading}
            onSelectWaterPoint={handleSelectWaterPoint}
          />
        )}
        
        {/* Pagination - if needed */}
        {filteredPoints.length > itemsPerPage && viewMode === 'list' && (
          <div className="mt-8 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              {/* Previous Page Button */}
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${
                  currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                } text-sm font-medium`}
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dynamic Page Numbers */}
              {(() => {
                const pageNumbers = [];
                
                // Helper to add page number
                const addPageNumber = (number) => {
                  pageNumbers.push(
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === number
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {number}
                    </button>
                  );
                };
                
                // Logic for showing page numbers
                if (totalPages <= 5) {
                  // If total pages are 5 or less, show all pages
                  for (let i = 1; i <= totalPages; i++) {
                    addPageNumber(i);
                  }
                } else {
                  // Show first page
                  addPageNumber(1);
                  
                  // Logic for ellipsis and middle pages
                  if (currentPage > 3) {
                    pageNumbers.push(
                      <span key="ellipsis1" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        ...
                      </span>
                    );
                  }
                  
                  // Middle pages
                  let startPage = Math.max(2, currentPage - 1);
                  let endPage = Math.min(totalPages - 1, currentPage + 1);
                  
                  // Adjust to always show 3 pages in the middle if possible
                  if (currentPage <= 3) {
                    endPage = Math.min(totalPages - 1, 4);
                  }
                  if (currentPage >= totalPages - 2) {
                    startPage = Math.max(2, totalPages - 3);
                  }
                  
                  for (let i = startPage; i <= endPage; i++) {
                    addPageNumber(i);
                  }
                  
                  // Second ellipsis
                  if (currentPage < totalPages - 2) {
                    pageNumbers.push(
                      <span key="ellipsis2" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        ...
                      </span>
                    );
                  }
                  
                  // Last page
                  if (totalPages > 1) {
                    addPageNumber(totalPages);
                  }
                }
                
                return pageNumbers;
              })()}

              {/* Next Page Button */}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${
                  currentPage === totalPages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                } text-sm font-medium`}
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
      
      {/* Mobile Filter Panel - Slide Up Panel */}
      {isFilterPanelVisible && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-[3000] animate-fade-in">
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-xl max-h-[90%] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white px-4 py-4 border-b flex justify-between items-center">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <FaFilter className="text-indigo-500 mr-2" />
                Filters
              </h3>
              <button 
                onClick={toggleFilterPanel}
                className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
              >
                <FaTimes className="text-gray-700" />
              </button>
            </div>
            
            {/* Add a visual indicator of active filters */}
            {Object.values(activeFilters).some(v => 
              v !== null && 
              v !== false && 
              v !== 10 && 
              (Array.isArray(v) ? v.length > 0 : true)
            ) && (
              <div className="px-4 py-2 bg-indigo-50 border-b border-indigo-100">
                <p className="text-sm text-indigo-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {Object.values(activeFilters).filter(v => 
                    v !== null && 
                    v !== false && 
                    v !== 10 && 
                    (Array.isArray(v) ? v.length > 0 : true)
                  ).length} active filters
                </p>
              </div>
            )}
            
            <div className="p-4">
              <FilterPanel 
                onFilterChange={handleFilterChange}
                activeFilters={activeFilters}
                onResetFilters={resetFilters}
                areas={areasData}
                hasUserLocation={!!userLocation}
                totalWaterPoints={waterPoints.length}
                filteredCount={filteredPoints.length}
                isLoading={isLoading}
                showFacilitiesFilters={false}
                showCapacityFilter={false}
              />
            </div>
            <div className="sticky bottom-0 bg-white border-t p-4 shadow-lg">
              <div className="flex space-x-3">
                <button
                  onClick={resetFilters}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={toggleFilterPanel}
                  className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
                >
                  <span>Show</span>
                  <span className="inline-flex items-center justify-center bg-white text-indigo-600 rounded-full h-6 w-6 mx-2 text-sm font-bold">
                    {filteredPoints.length}
                  </span>
                  <span>Results</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced water point detail modal with animations */}
      {selectedWaterPoint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[2000] flex items-center justify-center p-4 overflow-hidden animate-fade-in">
          <div 
            className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in"
            key={`detail-modal-${selectedWaterPoint.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">{selectedWaterPoint.name}</h2>
              <button 
                onClick={closeWaterPointDetail}
                className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors duration-200"
                aria-label="Close details"
              >
                <FaTimes className="text-gray-700" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {selectedWaterPoint.imageUrl && (
                    <div className="rounded-xl overflow-hidden shadow-md transform transition-transform hover:scale-[1.02]">
                      <img 
                        src={selectedWaterPoint.imageUrl} 
                        alt={selectedWaterPoint.name} 
                        className="w-full h-72 object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/800x400?text=Water+Point';
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                    <h3 className="text-lg font-semibold text-indigo-800 mb-3 flex items-center">
                      <FaMapMarkerAlt className="text-indigo-500 mr-2" />
                      Location Details
                    </h3>
                    <p className="text-indigo-900 font-medium mb-2">{selectedWaterPoint.area} - {selectedWaterPoint.subArea}</p>
                    <div className="flex items-start bg-white p-3 rounded-lg">
                      <div className="bg-indigo-100 p-2 rounded-lg mr-3 flex-shrink-0">
                        <FaMapMarkerAlt className="text-indigo-700" />
                      </div>
                      <p className="text-gray-700">{selectedWaterPoint.address || "Address not provided"}</p>
                    </div>
                  </div>
                  
                  {/* Distance and travel time with enhanced styling */}
                  {(selectedWaterPoint.customDistance !== undefined || (userLocation && selectedWaterPoint.distance)) && (
                    <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        Distance & Travel Time
                      </h3>
                      <p className="text-blue-900 font-medium mb-4">
                        {selectedWaterPoint.customDistance !== undefined 
                          ? `${selectedWaterPoint.customDistance.toFixed(1)} km from selected location`
                          : `${selectedWaterPoint.distance.toFixed(1)} km from your location`
                        }
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {(() => {
                          const distance = selectedWaterPoint.customDistance !== undefined 
                            ? selectedWaterPoint.customDistance 
                            : selectedWaterPoint.distance;
                          
                          const times = estimateTravelTimes(distance);
                          
                          return (
                            <>
                              <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center text-blue-800 font-medium mb-2">
                                  <span className="inline-block bg-blue-100 rounded-full p-2 mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                  </span>
                                  <span>Walking</span>
                                </div>
                                <p className="text-blue-700 ml-9 font-bold">{times.walking}</p>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center text-indigo-800 font-medium mb-2">
                                  <span className="inline-block bg-indigo-100 rounded-full p-2 mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8a2 2 0 012 2v1M8 11h12m0 0l-4-4m4 4l-4 4" />
                                    </svg>
                                  </span>
                                  <span>Driving</span>
                                </div>
                                <p className="text-indigo-700 ml-9 font-bold">{times.driving}</p>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Description
                    </h3>
                    <div className="bg-white rounded-lg p-4 shadow-inner">
                      <p className="text-gray-700 whitespace-pre-line">{selectedWaterPoint.description || "No detailed description available."}</p>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                    <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                      <FaClock className="text-green-600 mr-2" />
                      Available Times
                    </h3>
                    <div className="bg-white rounded-lg p-4 shadow-inner">
                      {selectedWaterPoint.availableTimes && selectedWaterPoint.availableTimes.length > 0 ? (
                        <ul className="space-y-3">
                          {selectedWaterPoint.availableTimes.map((time, index) => (
                            <li key={index} className="text-gray-700 flex items-center bg-green-50 p-2 rounded-lg">
                              <div className="bg-green-100 p-1.5 rounded-lg mr-3">
                                <FaClock className="text-green-600" />
                              </div>
                              <span className="font-medium">{time}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic">Schedule information not available</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Additional details with enhanced styling */}
                  {selectedWaterPoint.additionalInfo && (
                    <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                      <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Additional Information
                      </h3>
                      <div className="bg-white rounded-lg p-4 shadow-inner">
                        <p className="text-gray-700 whitespace-pre-line">{selectedWaterPoint.additionalInfo}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                  <a
                    href={selectedWaterPoint && selectedWaterPoint.location && selectedWaterPoint.location.latitude && selectedWaterPoint.location.longitude
                      ? `https://www.openstreetmap.org/directions?from=&to=${selectedWaterPoint.location.latitude}%2C${selectedWaterPoint.location.longitude}`
                      : `https://www.openstreetmap.org/search?query=${encodeURIComponent(selectedWaterPoint.address || selectedWaterPoint.name || '')}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 flex items-center justify-center shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
                  >
                    <FaDirections className="mr-2 text-xl" />
                    Get Directions
                  </a>
                  
                  <button
                    onClick={closeWaterPointDetail}
                    className="flex-1 sm:flex-none bg-gray-200 text-gray-800 py-3 px-10 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add enhanced CSS for animations and transitions */}
      <style jsx="true">{`
        .highlight-card {
          animation: highlight 3s ease-in-out;
        }
        
        @keyframes highlight {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(79, 70, 229, 0);
          }
          20% {
            transform: scale(1.03);
            box-shadow: 0 0 0 10px rgba(79, 70, 229, 0.3);
          }
          80% {
            transform: scale(1.01);
            box-shadow: 0 0 0 5px rgba(79, 70, 229, 0.1);
          }
        }
        
        /* Marker pulse animation */
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }
        
        /* Map popups */
        :global(.leaflet-popup-content-wrapper) {
          border-radius: 12px;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(226, 232, 240, 1);
        }
        
        :global(.leaflet-popup-content) {
          margin: 0;
          min-width: 220px;
        }
        
        :global(.map-popup) {
          padding: 16px;
        }
        
        /* New animations */
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        
        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-wave {
          animation: wave 12s linear infinite;
        }
        
        .animate-pulse-once {
          animation: pulseOnce 0.5s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(15px); }
        }
        
        @keyframes wave {
          0% { transform: translateX(0) translateY(5px); }
          50% { transform: translateX(-2%) translateY(0); }
          100% { transform: translateX(0) translateY(5px); }
        }
        
        @keyframes pulseOnce {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .animate-fade-in, .animate-fade-in-up {
            animation-duration: 0.3s;
          }
        }
      `}</style>
    </div>
  );
};