import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaHandsHelping, FaQuestion } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">
        {/* Visual Element */}
        <div className="mb-8 relative">
          <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40">
            {/* Water Drops Animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-full h-full text-blue-500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path 
                  fill="currentColor" 
                  d="M100,20 C100,20 140,60 140,100 C140,131.4 120.4,160 100,160 C79.6,160 60,131.4 60,100 C60,60 100,20 100,20 Z"
                  opacity="0.2"
                />
                <path 
                  fill="currentColor" 
                  d="M100,20 C100,20 140,60 140,100 C140,131.4 120.4,160 100,160 C79.6,160 60,131.4 60,100 C60,60 100,20 100,20 Z"
                  className="animate-pulse"
                />
              </svg>
            </div>
            
            {/* 404 Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl md:text-4xl font-bold text-white">404</span>
            </div>
          </div>
          
          {/* Small Decorative Drops */}
          <div className="absolute -top-5 -right-5 w-10 h-10">
            <svg className="w-full h-full text-blue-400 animate-bounce" style={{ animationDuration: '2s' }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path 
                fill="currentColor" 
                d="M100,20 C100,20 140,60 140,100 C140,131.4 120.4,160 100,160 C79.6,160 60,131.4 60,100 C60,60 100,20 100,20 Z"
                opacity="0.6"
              />
            </svg>
          </div>
          
          <div className="absolute bottom-0 -left-5 w-8 h-8">
            <svg className="w-full h-full text-blue-300 animate-bounce" style={{ animationDuration: '1.5s', animationDelay: '0.5s' }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path 
                fill="currentColor" 
                d="M100,20 C100,20 140,60 140,100 C140,131.4 120.4,160 100,160 C79.6,160 60,131.4 60,100 C60,60 100,20 100,20 Z"
                opacity="0.6"
              />
            </svg>
          </div>
        </div>
        
        {/* Content */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for seems to have evaporated. It might have been moved or no longer exists.
        </p>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <Link 
            to="/"
            className="w-full block py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center justify-center"
          >
            <FaHome className="mr-2" />
            Return to Home
          </Link>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link 
              to="/find-water"
              className="py-3 px-4 bg-white hover:bg-blue-50 text-blue-600 font-medium rounded-lg shadow-sm border border-blue-100 transition-colors flex items-center justify-center"
            >
              <FaSearch className="mr-2" />
              Find Water
            </Link>
            
            <Link 
              to="/volunteer"
              className="py-3 px-4 bg-white hover:bg-blue-50 text-blue-600 font-medium rounded-lg shadow-sm border border-blue-100 transition-colors flex items-center justify-center"
            >
              <FaHandsHelping className="mr-2" />
              Volunteer
            </Link>
            
            <Link 
              to="/faq"
              className="py-3 px-4 bg-white hover:bg-blue-50 text-blue-600 font-medium rounded-lg shadow-sm border border-blue-100 transition-colors flex items-center justify-center col-span-2 md:col-span-1"
            >
              <FaQuestion className="mr-2" />
              FAQ
            </Link>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-600 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-2/3 left-1/5 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-blue-300 rounded-full animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-3/4 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDuration: '4.5s' }}></div>
        
        {/* Wave Effect */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-blue-100">
            <path 
              fill="currentColor" 
              fillOpacity="1" 
              d="M0,160L48,144C96,128,192,96,288,90.7C384,85,480,107,576,133.3C672,160,768,192,864,186.7C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
