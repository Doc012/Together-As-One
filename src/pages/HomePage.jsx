import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, FaHandHoldingWater, FaUsers,
  FaArrowRight, FaSearch, FaPhone,
  FaListUl, FaBell
} from 'react-icons/fa';
import { MdLocationOn, MdWaterDrop, MdOutlineWaterDrop } from 'react-icons/md';
import { IoWaterOutline } from 'react-icons/io5';
import SubscriptionForm from '../components/features/SubscriptionForm';
import Slider from '../components/ui/Slider';

export default function HomePage() {
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('idle');
  
  // Handle location detection
  const detectLocation = () => {
    setLocationStatus('loading');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationStatus('success');
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationStatus('error');
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLocationStatus('unsupported');
    }
  };
  
  // Hero slider content
  const slides = [
    {
      id: 1,
      image: "https://www.ethiocec.org/img/help.jpeg",
      title: "Together As One",
      subtitle: "Community Water Solidarity Network"
    },
    {
      id: 2,
      image: "https://www.ethiocec.org/img/help.jpeg",
      title: "Find Water Access Points",
      subtitle: "Locate Available Water Resources Near You"
    },
    {
      id: 3,
      image: "https://prod-cms.scouts.org.uk/media/5046/thumbnail_db-20160331-0687-1680.jpg",
      title: "Share Your Resources",
      subtitle: "Help Your Community By Sharing Your Water Supply"
    }
  ];

  return (
    <div className="overflow-x-hidden bg-gray-50">
      {/* Hero Slider - Full height without negative margin below */}
      <div>
        <Slider slides={slides} />
      </div>

      {/* Main Action Cards - Moved below slider */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Find Water Card */}
              <div className="bg-blue-50 rounded-xl p-6 relative overflow-hidden transition-all hover:shadow-md">
                <div className="absolute right-0 top-0 w-24 h-24 text-blue-100">
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="75" cy="25" r="20" />
                  </svg>
                </div>
                <div className="relative">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <FaMapMarkerAlt className="text-blue-600 text-xl" />
                    </div>
                    <h3 className="ml-3 text-lg font-bold text-gray-800">Find Water</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Find locations where community members are sharing water. Enter your location to see the nearest options.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Your Location</label>
                      <div className="flex">
                        <button 
                          onClick={detectLocation}
                          className={`flex items-center justify-center px-4 py-2 rounded-l-lg border border-gray-300 bg-white hover:bg-gray-50 ${
                            locationStatus === 'loading' ? 'opacity-75' : ''
                          }`}
                          disabled={locationStatus === 'loading'}
                        >
                          {locationStatus === 'loading' ? (
                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                          ) : (
                            <MdLocationOn className="mr-2 text-blue-600" />
                          )}
                          {locationStatus === 'success' ? 'Located' : 'Detect'}
                        </button>
                        <input 
                          type="text" 
                          placeholder="Enter location or area..."
                          className="flex-1 px-4 py-2 rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>
                    </div>
                    <Link 
                      to="/find-water" 
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors"
                    >
                      Find Nearby Water Points
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Share Water Card */}
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 text-teal-100">
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="50" cy="50" r="40" />
                  </svg>
                </div>
                <div className="relative">
                  <div className="flex items-center mb-4">
                    <div className="bg-teal-100 p-3 rounded-lg">
                      <FaHandHoldingWater className="text-teal-600 text-xl" />
                    </div>
                    <h3 className="ml-3 text-lg font-bold text-gray-800">Share Your Water</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    Have a borehole, water tank, or extra supply? Help neighbors by sharing your resources during water outages.
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Easy registration process</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Set your own availability hours</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Help neighbors in need</span>
                    </div>
                  </div>
                  
                  <Link 
                    to="/volunteer" 
                    className="block w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors"
                  >
                    Register to Share
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 relative">
                How Our Platform Works
                <div className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
              </h2>
            </div>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A community platform connecting those who need water with those who can share, making it easier for everyone during water outages.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* Find Water Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <div className="p-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center shadow-md mx-auto">
                    <FaSearch className="text-white text-3xl" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 text-center group-hover:text-blue-600 transition-colors">Find Water</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Use your location or search by area to find nearby homes and water points offering access during specific times.
                </p>
                <div className="mt-6 text-center">
                  <Link to="/find-water" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors group/link">
                    Find nearby water
                    <FaArrowRight className="ml-2 text-sm transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Share Water Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <div className="p-8">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-indigo-500 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center shadow-md mx-auto">
                    <FaHandHoldingWater className="text-white text-3xl" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 text-center group-hover:text-blue-600 transition-colors">Share Water</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Residents with boreholes, JoJo tanks, or other water sources can volunteer to share with neighbors during their available hours.
                </p>
                <div className="mt-6 text-center">
                  <Link to="/volunteer" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors group/link">
                    Register your water source
                    <FaArrowRight className="ml-2 text-sm transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Stay Updated Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <div className="p-8">
                <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6 mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-teal-500 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center shadow-md mx-auto">
                    <FaBell className="text-white text-3xl" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 text-center group-hover:text-blue-600 transition-colors">Stay Connected</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Subscribe to get notified about new water points in your area, community updates, and helpful resources.
                </p>
                <div className="mt-6 text-center">
                  <a href="#subscribe" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors group/link">
                    Get notifications
                    <FaArrowRight className="ml-2 text-sm transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Resource Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Types of Water Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform connects you with various types of water resources shared by the community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Boreholes */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <MdWaterDrop className="text-blue-600 text-2xl" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-800">Private Boreholes</h3>
                  <p className="text-gray-600 mt-1">Households sharing their borehole water with neighbors</p>
                </div>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-blue-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Self-sustainable water source</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-blue-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Available during specific hours</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-blue-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Usually with tap access points</span>
                </li>
              </ul>
            </div>
            
            {/* Water Tanks */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
              <div className="flex items-start mb-4">
                <div className="bg-teal-100 p-3 rounded-xl">
                  <IoWaterOutline className="text-teal-600 text-2xl" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-800">JoJo Tanks & Reservoirs</h3>
                  <p className="text-gray-600 mt-1">Stored water from various collection methods</p>
                </div>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-teal-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Limited supply based on tank capacity</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-teal-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Rainwater or pre-stored municipal water</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-teal-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Ideal for emergency needs</span>
                </li>
              </ul>
            </div>
            
            {/* Community Points */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-100">
              <div className="flex items-start mb-4">
                <div className="bg-amber-100 p-3 rounded-xl">
                  <FaUsers className="text-amber-600 text-2xl" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-800">Community Points</h3>
                  <p className="text-gray-600 mt-1">Public spaces offering water collection</p>
                </div>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-amber-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Schools, churches, and community centers</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-amber-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Water trucks and municipal delivery points</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-amber-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Often available during set schedules</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section with Screenshots */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes it easy to connect with water resources in your community.
            </p>
          </div>
          
          {/* Feature 1 - Map View */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <div className="bg-white p-2 rounded-2xl shadow-xl">
                {/* Replace with actual screenshot of your map interface */}
                <img 
                  src="https://images.pexels.com/photos/8828419/pexels-photo-8828419.jpeg" 
                  alt="Interactive map showing water points" 
                  className="rounded-xl w-full"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-blue-600 inline-block rounded-lg p-2 mb-4">
                <FaMapMarkerAlt className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Map</h3>
              <p className="text-lg text-gray-600 mb-6">
                Find water points near you with our easy-to-use map interface. See availability hours, water types, and contact information.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mt-1.5 mr-3">
                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Real-time availability indicators</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mt-1.5 mr-3">
                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Filter by water source type and distance</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mt-1.5 mr-3">
                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Get directions to water points</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Feature 2 - Registration */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="bg-teal-600 inline-block rounded-lg p-2 mb-4">
                <FaListUl className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Simple Registration</h3>
              <p className="text-lg text-gray-600 mb-6">
                Easily register your water source with our step-by-step process. Set your availability hours and what you can offer.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-teal-100 p-1 rounded-full mt-1.5 mr-3">
                    <svg className="w-3 h-3 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Quick 3-step registration process</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-teal-100 p-1 rounded-full mt-1.5 mr-3">
                    <svg className="w-3 h-3 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Set custom availability schedules</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-teal-100 p-1 rounded-full mt-1.5 mr-3">
                    <svg className="w-3 h-3 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Privacy controls for your information</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="bg-white p-2 rounded-2xl shadow-xl">
                {/* Replace with actual screenshot of your registration form */}
                <img 
                  src="https://una-acctg.com/wp-content/uploads/2023/04/Business-Registration-Image.jpg" 
                  alt="Registration form interface" 
                  className="rounded-xl w-full"
                />
              </div>
            </div>
          </div>
          
          {/* Feature 3 - Community Connect */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-white p-2 rounded-2xl shadow-xl">
                {/* Replace with actual screenshot of your messaging interface */}
                <img 
                  src="https://www.sacap.edu.za/wp-content/uploads/2017/02/community-psychology-sacap-768x497.jpg" 
                  alt="Community connection features" 
                  className="rounded-xl w-full"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-indigo-600 inline-block rounded-lg p-2 mb-4">
                <FaPhone className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Connect</h3>
              <p className="text-lg text-gray-600 mb-6">
                Safely connect with water providers through our platform, without sharing personal contact details until you're ready.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-indigo-100 p-1 rounded-full mt-1.5 mr-3">
                    <svg className="w-3 h-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">In-app messaging system</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-100 p-1 rounded-full mt-1.5 mr-3">
                    <svg className="w-3 h-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Community ratings and verification</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-100 p-1 rounded-full mt-1.5 mr-3">
                    <svg className="w-3 h-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Request specific collection times</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced with a lighter background */}
      <section className="py-16 bg-gradient-to-r from-blue-500/90 to-indigo-500/90 relative overflow-hidden">
        {/* Decorative elements with increased transparency */}
        <div className="absolute inset-0 overflow-hidden opacity-15">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-56 h-56 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-white rounded-full"></div>
          
          {/* Water droplet patterns */}
          <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white rounded-b-full rotate-45"></div>
          <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-white rounded-b-full -rotate-12"></div>
        </div>
        
        {/* Lighter animated wave effect */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/10 backdrop-blur-sm 
                        animate-wave-slow" 
             style={{maskImage: 'linear-gradient(to bottom, transparent, black)'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center backdrop-blur-sm rounded-lg py-6 px-2 bg-white/10 hover:bg-white/15 transition-colors">
              <div className="text-white text-4xl md:text-5xl font-bold">400+</div>
              <div className="text-blue-50 mt-2 text-lg">Water Points</div>
            </div>
            <div className="text-center backdrop-blur-sm rounded-lg py-6 px-2 bg-white/10 hover:bg-white/15 transition-colors">
              <div className="text-white text-4xl md:text-5xl font-bold">4,200+</div>
              <div className="text-blue-50 mt-2 text-lg">Community Members</div>
            </div>
            <div className="text-center backdrop-blur-sm rounded-lg py-6 px-2 bg-white/10 hover:bg-white/15 transition-colors">
              <div className="text-white text-4xl md:text-5xl font-bold">25K+</div>
              <div className="text-blue-50 mt-2 text-lg">Liters Shared</div>
            </div>
            <div className="text-center backdrop-blur-sm rounded-lg py-6 px-2 bg-white/10 hover:bg-white/15 transition-colors">
              <div className="text-white text-4xl md:text-5xl font-bold">120+</div>
              <div className="text-blue-50 mt-2 text-lg">Neighborhoods</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Community Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from people who have used our platform during water outages.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  JM
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">John Mokoena</h4>
                  <p className="text-gray-600 text-sm">Sandton</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "When our area lost water, I found three neighbors with boreholes within walking distance. They were so helpful and I was able to get enough water for my family."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-xl">
                  SP
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Sarah Pillay</h4>
                  <p className="text-gray-600 text-sm">Midrand</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "We have a borehole and were happy to share with our community. The platform made it easy to set times when people could come and collect water safely."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                  TN
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Thabo Ndlovu</h4>
                  <p className="text-gray-600 text-sm">Soweto</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Our church registered as a community water point during the outage. This platform helped us organize collection times and reach more people who needed water."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Join Section - Updated with light blue and circles */}
      <section id="subscribe" className="bg-blue-50 py-16 relative overflow-hidden">
        {/* Decorative Circles for the section */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/30 rounded-full -mt-20 -mr-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100/30 rounded-full -mb-32 -ml-32"></div>
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-indigo-200/20 rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-5"> {/* Changed from mb-10 to mb-5 */}
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2"> {/* Changed from mb-3 to mb-2 */}
              Join Our Water Solidarity Network
            </h2>
            <p className="text-blue-700 text-lg max-w-xl mx-auto">
              Connect with neighbors and stay updated on water resources in your community.
            </p>
          </div>
          <SubscriptionForm />
        </div>
      </section>
    </div>
  );
}