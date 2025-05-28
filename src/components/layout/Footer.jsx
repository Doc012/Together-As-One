import { Link } from "react-router-dom";
import { FaWater, FaEnvelope, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center">
              <FaWater className="h-8 w-8 text-blue-300" />
              <span className="ml-2 text-xl font-bold">Emfuleni Water Help</span>
            </div>
            <p className="mt-2 text-sm text-blue-200">
              A community platform connecting those with water to those without during the 16-day outage.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-blue-300 tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/" className="text-base text-blue-100 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/find-water" className="text-base text-blue-100 hover:text-white">
                  Find Water
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-base text-blue-100 hover:text-white">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-base text-blue-100 hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-blue-300 tracking-wider uppercase">Community</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/subscribe" className="text-base text-blue-100 hover:text-white">
                  Subscribe
                </Link>
              </li>
              <li>
                <a href="#" className="text-base text-blue-100 hover:text-white">
                  Emergency Contacts
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-blue-100 hover:text-white">
                  Water Conservation Tips
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-blue-300 tracking-wider uppercase">Connect</h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-blue-200 hover:text-white">
                <span className="sr-only">Facebook</span>
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white">
                <span className="sr-only">WhatsApp</span>
                <FaWhatsapp className="h-6 w-6" />
              </a>
              <a href="mailto:contact@emfuleniwaterhelp.co.za" className="text-blue-200 hover:text-white">
                <span className="sr-only">Email</span>
                <FaEnvelope className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-blue-700 pt-8">
          <p className="text-base text-blue-200 text-center">
            &copy; {currentYear} Emfuleni Water Help. A community initiative. Not affiliated with any government entity.
          </p>
        </div>
      </div>
    </footer>
  );
}