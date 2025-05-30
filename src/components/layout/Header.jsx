import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaWater, FaUsers, FaQuestion, FaEnvelope } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white text-gray-900 shadow-md py-2' 
        : 'bg-white text-gray-900 py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${
              isScrolled ? 'bg-blue-50' : 'bg-blue-50'
            } transition-colors`}>
              {/* Simple Unity Circle Logo - removed hover animation */}
              <svg 
                className={`w-8 h-8 ${
                  isScrolled ? 'text-blue-600' : 'text-blue-600'
                }`}
                viewBox="0 0 24 24" 
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                
                {/* Three figures holding hands in a circle */}
                <circle cx="12" cy="7" r="2.5" fill="currentColor" opacity="0.8" />
                <circle cx="7" cy="14" r="2.5" fill="currentColor" opacity="0.8" />
                <circle cx="17" cy="14" r="2.5" fill="currentColor" opacity="0.8" />
                
                {/* Connecting lines representing held hands */}
                <line x1="10" y1="8.5" x2="8" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="14" y1="8.5" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="9" y1="14" x2="15" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-xl text-gray-900">Together As One</span>
              <p className="text-xs font-light text-gray-500">
                South Africa Water Solidarity Network
              </p>
            </div>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none transition-colors text-gray-800 hover:text-blue-700" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-1">
            <NavLink to="/" className={({isActive}) => 
              `px-4 py-2 rounded-md transition-all ${
                isActive 
                  ? 'font-medium text-blue-700 bg-blue-50' 
                  : 'text-gray-800 hover:text-blue-700 hover:bg-blue-50'
              }`
            }>
              Home
            </NavLink>
            <NavLink to="/find-water" className={({isActive}) => 
              `px-4 py-2 rounded-md transition-all ${
                isActive 
                  ? 'font-medium text-blue-700 bg-blue-50' 
                  : 'text-gray-800 hover:text-blue-700 hover:bg-blue-50'
              }`
            }>
              Find Water
            </NavLink>
            <NavLink to="/volunteer" className={({isActive}) => 
              `px-4 py-2 rounded-md transition-all ${
                isActive 
                  ? 'font-medium text-blue-700 bg-blue-50' 
                  : 'text-gray-800 hover:text-blue-700 hover:bg-blue-50'
              }`
            }>
              Volunteer
            </NavLink>
            <NavLink to="/communities" className={({isActive}) => 
              `px-4 py-2 rounded-md transition-all ${
                isActive 
                  ? 'font-medium text-blue-700 bg-blue-50' 
                  : 'text-gray-800 hover:text-blue-700 hover:bg-blue-50'
              }`
            }>
              Communities
            </NavLink>
            <NavLink to="/conservation" className={({isActive}) => 
              `px-4 py-2 rounded-md transition-all ${
                isActive 
                  ? 'font-medium text-blue-700 bg-blue-50' 
                  : 'text-gray-800 hover:text-blue-700 hover:bg-blue-50'
              }`
            }>
              Water Tips
            </NavLink>
            <NavLink to="/faq" className={({isActive}) => 
              `px-4 py-2 rounded-md transition-all ${
                isActive 
                  ? 'font-medium text-blue-700 bg-blue-50' 
                  : 'text-gray-800 hover:text-blue-700 hover:bg-blue-50'
              }`
            }>
              FAQ
            </NavLink>
            <NavLink to="/about" className={({isActive}) => 
              `px-4 py-2 rounded-md transition-all ${
                isActive 
                  ? 'font-medium text-blue-700 bg-blue-50' 
                  : 'text-gray-800 hover:text-blue-700 hover:bg-blue-50'
              }`
            }>
              About
            </NavLink>
            <NavLink to="/contact" className={({isActive}) => 
              `px-4 py-2 rounded-md transition-all ${
                isActive 
                  ? 'font-medium text-blue-700 bg-blue-50' 
                  : 'text-gray-800 hover:text-blue-700 hover:bg-blue-50'
              }`
            }>
              Contact
            </NavLink>
          </nav>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-3 px-2 rounded-lg bg-white shadow-lg border border-gray-100">
            <nav className="space-y-1">
              <NavLink 
                to="/" 
                className={({isActive}) => 
                  `block py-3 px-4 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-800 hover:bg-blue-50 hover:text-blue-700'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/find-water" 
                className={({isActive}) => 
                  `block py-3 px-4 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-800 hover:bg-blue-50 hover:text-blue-700'
                  }`
                }
              >
                Find Water
              </NavLink>
              <NavLink 
                to="/volunteer" 
                className={({isActive}) => 
                  `block py-3 px-4 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-800 hover:bg-blue-50 hover:text-blue-700'
                  }`
                }
              >
                Volunteer
              </NavLink>
              <NavLink 
                to="/communities" 
                className={({isActive}) => 
                  `block py-3 px-4 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-800 hover:bg-blue-50 hover:text-blue-700'
                  }`
                }
              >
                <div className="flex items-center">
                  <FaUsers className="mr-2" />
                  Communities
                </div>
              </NavLink>
              <NavLink 
                to="/conservation" 
                className={({isActive}) => 
                  `block py-3 px-4 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-800 hover:bg-blue-50 hover:text-blue-700'
                  }`
                }
              >
                <div className="flex items-center">
                  <FaWater className="mr-2" />
                  Water Tips
                </div>
              </NavLink>
              <NavLink 
                to="/faq" 
                className={({isActive}) => 
                  `block py-3 px-4 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-800 hover:bg-blue-50 hover:text-blue-700'
                  }`
                }
              >
                <div className="flex items-center">
                  <FaQuestion className="mr-2" />
                  FAQ
                </div>
              </NavLink>
              <NavLink 
                to="/about" 
                className={({isActive}) => 
                  `block py-3 px-4 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-800 hover:bg-blue-50 hover:text-blue-700'
                  }`
                }
              >
                About
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({isActive}) => 
                  `block py-3 px-4 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-800 hover:bg-blue-50 hover:text-blue-700'
                  }`
                }
              >
                <div className="flex items-center">
                  <FaEnvelope className="mr-2" />
                  Contact
                </div>
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}