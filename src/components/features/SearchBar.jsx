import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ 
  searchTerm = '', 
  onSearch, 
  placeholder = 'Search...',
  className = '',
  recentSearches = [],
  onSaveRecentSearch = () => {},
  autoFocus = false
}) => {
  const [inputValue, setInputValue] = useState(searchTerm);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);
  const suggestionRef = useRef(null);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  // Update the autoFocus effect to only focus when explicitly requested via a prop
  useEffect(() => {
    // Only focus if autoFocus is true AND it's not a mobile device
    if (autoFocus && inputRef.current && !isMobileDevice()) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Handle clicks outside suggestion box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsSearching(true);
    // Call onSearch immediately as user types
    onSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSaveRecentSearch(inputValue);
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setInputValue('');
    onSearch('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    onSearch(suggestion);
    onSaveRecentSearch(suggestion);
    setShowSuggestions(false);
  };

  // Reset the searching state when searchTerm (from parent) changes
  useEffect(() => {
    setIsSearching(false);
  }, [searchTerm]);

  // Add a helper function to detect mobile devices
  const isMobileDevice = () => {
    return (
      typeof window !== 'undefined' && 
      (window.navigator.userAgent.match(/Android/i) ||
       window.navigator.userAgent.match(/webOS/i) ||
       window.navigator.userAgent.match(/iPhone/i) ||
       window.navigator.userAgent.match(/iPad/i) ||
       window.navigator.userAgent.match(/iPod/i) ||
       window.navigator.userAgent.match(/BlackBerry/i) ||
       window.navigator.userAgent.match(/Windows Phone/i))
    );
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {isSearching ? (
              <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <FaSearch className="h-5 w-5 text-gray-400" />
            )}
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleChange}
            onFocus={() => recentSearches.length > 0 && setShowSuggestions(true)}
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200"
            placeholder={placeholder}
            aria-label="Search"
          />
          
          {inputValue && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Clear search"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </form>
      
      {/* Recent searches dropdown */}
      {showSuggestions && recentSearches.length > 0 && (
        <div 
          ref={suggestionRef}
          className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 py-1 text-sm"
        >
          <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
            Recent Searches
          </div>
          {recentSearches.map((search, index) => (
            <div
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => handleSuggestionClick(search)}
            >
              <FaSearch className="h-3 w-3 text-gray-400 mr-2" />
              <span className="text-gray-700">{search}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
