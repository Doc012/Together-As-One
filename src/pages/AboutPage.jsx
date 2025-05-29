import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaWater, FaHandsHelping, FaMapMarkedAlt, 
  FaShieldAlt, FaUsers, FaPhoneAlt, FaEnvelope
} from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">About Our Mission</h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Connecting communities during water outages through neighbor-to-neighbor sharing
            </p>
          </div>
        </div>
        
        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-24 text-gray-50 fill-current animate-wave">
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Our Story Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Born out of necessity during South Africa's water crisis, our platform was created to help communities support each other when municipal water supplies are interrupted.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We recognized that while many homes with private boreholes were willing to share water with their neighbors, there was no easy way to connect those in need with those who could help. Our platform bridges that gap.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we're proud to facilitate thousands of water-sharing connections, turning individual resources into community assets during challenging times.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/images/community-sharing.jpg" 
                alt="Community members sharing water" 
                className="rounded-xl shadow-xl w-full h-auto object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1578496479531-32e296d5c6e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
                }}
              />
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaMapMarkedAlt className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Find Water Nearby</h3>
              <p className="text-gray-600 text-center">
                Use our map or search feature to locate homes with boreholes that are sharing water in your area.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaHandsHelping className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Connect Directly</h3>
              <p className="text-gray-600 text-center">
                View availability times and contact water providers directly to arrange collection.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaWater className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Collect Safely</h3>
              <p className="text-gray-600 text-center">
                Bring your containers and collect water according to the provider's guidelines during the specified times.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Our Values</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaUsers className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Community First</h3>
                <p className="text-gray-600">
                  We believe in the power of communities to support each other during challenging times. Our platform is built to strengthen these connections.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FaShieldAlt className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Safety & Trust</h3>
                <p className="text-gray-600">
                  We prioritize the safety of all users and work to create a trusted environment for water sharing through verification and community feedback.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>
          <p className="text-gray-600 text-center mb-8">
            Have questions or feedback? We'd love to hear from you.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <FaPhoneAlt className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-lg font-medium text-gray-800">+27 10 123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <FaEnvelope className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-lg font-medium text-gray-800">contact@watershare.co.za</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Your email"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Your message"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
        
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Find or Share Water?</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Join our community of water sharers and help make a difference during water outages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/find-water"
              className="bg-white text-indigo-600 py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Find Water
            </Link>
            <Link
              to="/register"
              className="bg-transparent text-white py-3 px-6 rounded-lg font-medium border border-white hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Register as Provider
            </Link>
          </div>
        </div>
      </div>
      
      {/* Animation styles */}
      <style jsx="true">{`
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animate-wave {
          animation: wave 12s linear infinite;
        }
        
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes wave {
          0% { transform: translateX(0) translateY(5px); }
          50% { transform: translateX(-2%) translateY(0); }
          100% { transform: translateX(0) translateY(5px); }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
