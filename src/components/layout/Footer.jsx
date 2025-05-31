import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaCode, FaExternalLinkAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and mission */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-blue-900/30 mr-3">
                <svg 
                  className="w-8 h-8 text-blue-400"
                  viewBox="0 0 24 24" 
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="12" cy="7" r="2.5" fill="currentColor" opacity="0.8" />
                  <circle cx="7" cy="14" r="2.5" fill="currentColor" opacity="0.8" />
                  <circle cx="17" cy="14" r="2.5" fill="currentColor" opacity="0.8" />
                  <line x1="10" y1="8.5" x2="8" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="14" y1="8.5" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="9" y1="14" x2="15" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-bold text-xl">Together As One</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Building community resilience through water solidarity.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61577065883332" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaFacebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              
              {/* Disabled Twitter link with coming soon tooltip */}
              <div className="relative group">
                <span className="text-gray-600 cursor-not-allowed opacity-60">
                  <FaTwitter size={20} />
                  <span className="sr-only">Twitter (Coming Soon)</span>
                </span>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  Coming Soon
                </div>
              </div>
              
              {/* Disabled Instagram link with coming soon tooltip */}
              <div className="relative group">
                <span className="text-gray-600 cursor-not-allowed opacity-60">
                  <FaInstagram size={20} />
                  <span className="sr-only">Instagram (Coming Soon)</span>
                </span>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  Coming Soon
                </div>
              </div>
              
              <a href="https://whatsapp.com/channel/0029Vb6AUXbGk1FsEBV3Gw1r" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                <FaWhatsapp size={20} />
                <span className="sr-only">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/find-water" className="text-gray-400 hover:text-blue-400 transition-colors">Find Water</Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-gray-400 hover:text-blue-400 transition-colors">Volunteer</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-blue-400 transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/conservation" className="text-gray-400 hover:text-blue-400 transition-colors">Water Conservation Tips</Link>
              </li>
              <li>
                <Link to="/communities" className="text-gray-400 hover:text-blue-400 transition-colors">Community Stories</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <address className="not-italic text-gray-400">
              <p className="mb-2">Emfuleni Municipality Area</p>
              <p className="mb-2">Gauteng, South Africa</p>
              
              <div className="space-y-2">
                <p className="flex items-start">
                  <span className="text-blue-400 text-xs uppercase font-semibold mr-2 mt-1">General:</span>
                  <a href="mailto:taosa.info@gmail.com" className="hover:text-blue-400 transition-colors">
                    taosa.info@gmail.com
                  </a>
                </p>
                
                <p className="flex items-start">
                  <span className="text-blue-400 text-xs uppercase font-semibold mr-2 mt-1">Support:</span>
                  <a href="mailto:taosa.help@gmail.com" className="hover:text-blue-400 transition-colors">
                    taosa.help@gmail.com
                  </a>
                </p>
                
                <p className="flex items-start">
                  <span className="text-blue-400 text-xs uppercase font-semibold mr-2 mt-1">Register:</span>
                  <a href="mailto:taosa.register@gmail.com" className="hover:text-blue-400 transition-colors">
                    taosa.register@gmail.com
                  </a>
                </p>
              </div>
              
              {/* <p>
                <a href="tel:+27123456789" className="hover:text-blue-400 transition-colors">
                  +27 12 345 6789
                </a>
              </p> */}
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-3 md:mb-0">
              &copy; {currentYear} Together As One. All rights reserved. 
              <span className="hidden md:inline"> | </span>
              <span className="block md:inline">Developed with 💙 for South African communities.</span>
            </p>
            
            <div className="flex items-center text-gray-500 text-sm hover:text-blue-400 transition-colors group">
              <FaCode className="mr-2 text-blue-500 group-hover:text-blue-400" />
              <span>Developed by </span>
              <a 
                href="https://mr-sn.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium ml-1 border-b border-transparent group-hover:border-blue-400 inline-flex items-center"
              >
                Siphamandla Ngcepe
                <FaExternalLinkAlt className="ml-1 text-xs opacity-70" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;