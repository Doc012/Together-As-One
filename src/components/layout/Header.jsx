import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaWater, FaBars, FaTimes } from 'react-icons/fa';

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
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={`p-2 rounded-full ${
              isScrolled ? 'bg-gray-100' : 'bg-gray-100'
            } transition-colors`}>
              <FaWater className={`text-2xl ${
                isScrolled ? 'text-indigo-600' : 'text-indigo-600'
              } group-hover:scale-110 transition-transform`} />
            </div>
            <div>
              <span className="font-bold text-xl text-gray-900">Together As One</span>
              <p className="text-xs font-light text-gray-500">
                Emfuleni Community Water Initiative
              </p>
            </div>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none transition-colors text-gray-800 hover:text-indigo-700" 
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
                  ? 'font-medium text-indigo-700 bg-gray-100' 
                  : 'text-gray-800 hover:text-indigo-700 hover:bg-gray-100'
              }`
            }>
              Home
            </NavLink>
            <NavLink to="/find-water" className={({isActive}) => 
              `px-4 py-2 rounded-md transition-all ${
                isActive 
                  ? 'font-medium text-indigo-700 bg-gray-100' 
                  : 'text-gray-800 hover:text-indigo-700 hover:bg-gray-100'
              }`
            }>
              Find Water
            </NavLink>
            <NavLink to="/volunteer" className={({isActive}) => 
              `px-4 py-2 rounded-md transition-all ${
                isActive 
                  ? 'font-medium text-indigo-700 bg-gray-100' 
                  : 'text-gray-800 hover:text-indigo-700 hover:bg-gray-100'
              }`
            }>
              Volunteer
            </NavLink>
            <NavLink to="/about" className={({isActive}) => 
              `px-4 py-2 rounded-md transition-all ${
                isActive 
                  ? 'font-medium text-indigo-700 bg-gray-100' 
                  : 'text-gray-800 hover:text-indigo-700 hover:bg-gray-100'
              }`
            }>
              About
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
                      ? 'bg-gray-100 text-indigo-700 font-medium' 
                      : 'text-gray-800 hover:bg-gray-100 hover:text-indigo-700'
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
                      ? 'bg-gray-100 text-indigo-700 font-medium' 
                      : 'text-gray-800 hover:bg-gray-100 hover:text-indigo-700'
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
                      ? 'bg-gray-100 text-indigo-700 font-medium' 
                      : 'text-gray-800 hover:bg-gray-100 hover:text-indigo-700'
                  }`
                }
              >
                Volunteer
              </NavLink>
              <NavLink 
                to="/about" 
                className={({isActive}) => 
                  `block py-3 px-4 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-gray-100 text-indigo-700 font-medium' 
                      : 'text-gray-800 hover:bg-gray-100 hover:text-indigo-700'
                  }`
                }
              >
                About
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}