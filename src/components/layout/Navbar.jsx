import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaWater, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <FaWater className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-blue-600">Emfuleni Water Help</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) => 
                isActive 
                  ? "px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600" 
                  : "px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/find-water"
              className={({ isActive }) => 
                isActive 
                  ? "px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600" 
                  : "px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }
            >
              Find Water
            </NavLink>
            <NavLink
              to="/volunteer"
              className={({ isActive }) => 
                isActive 
                  ? "px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600" 
                  : "px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }
            >
              Volunteer
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => 
                isActive 
                  ? "px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600" 
                  : "px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/subscribe"
              className={({ isActive }) => 
                isActive 
                  ? "px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600" 
                  : "px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }
            >
              Subscribe
            </NavLink>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600" 
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/find-water"
              onClick={closeMenu}
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600" 
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }
            >
              Find Water
            </NavLink>
            <NavLink
              to="/volunteer"
              onClick={closeMenu}
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600" 
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }
            >
              Volunteer
            </NavLink>
            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600" 
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/subscribe"
              onClick={closeMenu}
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600" 
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }
            >
              Subscribe
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}