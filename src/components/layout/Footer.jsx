import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-2">Emfuleni Water Help</h2>
            <p className="text-gray-400 text-sm max-w-md">
              A community initiative to help Emfuleni residents during the 16-day water outage from 30 May to 14 June 2025.
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaTwitter size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaWhatsapp size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>
            This is not a municipal project. It's a community initiative built by a resident of Emfuleni, for the people of Emfuleni.
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} Emfuleni Water Help. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}