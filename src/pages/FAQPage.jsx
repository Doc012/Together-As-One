import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaChevronDown, 
  FaChevronUp, 
  FaQuestion, 
  FaWater, 
  FaHandsHelping, 
  FaUserShield, 
  FaMapMarkedAlt,
  FaUserPlus
} from 'react-icons/fa';

const FAQPage = () => {
  // State to track which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState({});

  // Toggle FAQ item expansion
  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // FAQ data organized by categories
  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      icon: <FaQuestion className="text-blue-500" />,
      questions: [
        {
          id: 'what-is',
          question: 'What is Together As One?',
          answer: 'Together As One is a community platform that connects people who need water during outages with neighbors who have access to boreholes, JoJo tanks, or other water sources. We enable neighbor-to-neighbor water sharing to help communities stay resilient during water shortages.'
        },
        {
          id: 'who-for',
          question: 'Who is this service for?',
          answer: 'Our service is for anyone experiencing water outages in South Africa. If you need water, you can use our platform to find nearby sharing points. If you have a water source like a borehole, you can register to share with your neighbors during municipal outages.'
        },
        {
          id: 'cost',
          question: 'Is there a cost to use this service?',
          answer: 'No, our platform is completely free to use. Water providers volunteer their resources to help their communities, and water seekers can access the platform at no cost. We believe access to water is a basic human right and should be available to everyone.'
        },
        {
          id: 'coverage',
          question: 'Which areas do you cover?',
          answer: 'We currently focus on South African communities experiencing water shortages, with initial coverage in Gauteng, particularly the Emfuleni area. We\'re expanding to more regions as our community grows. If your area isn\'t covered yet, please register interest so we can prioritize expansion.'
        }
      ]
    },
    {
      id: 'finding',
      title: 'Finding Water',
      icon: <FaWater className="text-blue-500" />,
      questions: [
        {
          id: 'how-find',
          question: 'How do I find water near me?',
          answer: 'Visit our "Find Water" page and enable location services when prompted. Our map will show water sharing points near you. You can filter by distance, availability times, and water source type. Each listing includes contact details and collection instructions.'
        },
        {
          id: 'no-results',
          question: 'What if there are no water points in my area?',
          answer: 'If no water points appear in your search, try expanding your search radius or removing filters. You can also check back regularly as new water providers join daily. Consider asking neighbors with boreholes to register on our platform to help the community.'
        },
        {
          id: 'contact-provider',
          question: 'How do I contact a water provider?',
          answer: 'Each water point listing includes the provider\'s preferred contact method, typically a phone number or WhatsApp contact. Tap on a listing to view full details, then use the provided contact information to arrange collection. Please respect the listed availability times.'
        },
        {
          id: 'collection',
          question: 'What should I bring for water collection?',
          answer: 'Bring your own clean containers to collect water. Most providers suggest using sealed containers like water bottles or jerry cans. Check the listing for any specific instructions or container size limitations set by the provider.'
        }
      ]
    },
    {
      id: 'sharing',
      title: 'Sharing Your Water',
      icon: <FaHandsHelping className="text-blue-500" />,
      questions: [
        {
          id: 'how-share',
          question: 'How can I share my borehole water?',
          answer: 'If you have a borehole, JoJo tank, or other water source you\'d like to share, visit our "Share Water" page and complete the registration form. You\'ll be able to specify your location, availability times, and any specific instructions for people collecting water.'
        },
        {
          id: 'requirements',
          question: 'Are there any requirements for water providers?',
          answer: 'Water providers should have legal access to the water they\'re sharing (like a private borehole or storage tank) and be able to safely accommodate people coming to collect water. While we don\'t require water quality testing, we encourage transparency about the water source.'
        },
        {
          id: 'manage-listing',
          question: 'How do I manage my water sharing listing?',
          answer: 'After registering, you\'ll receive access to a dashboard where you can update your availability, pause sharing during certain periods, or add special instructions. You can also track how many people have viewed your listing and mark when you\'re temporarily unavailable.'
        },
        {
          id: 'liability',
          question: 'Am I liable for the water I share?',
          answer: 'While we encourage responsible sharing, water providers share at their own discretion. We recommend clearly communicating to collectors that the water is untreated borehole/tank water unless you\'ve had it tested. Our platform includes standard disclaimers to help protect providers.'
        }
      ]
    },
    {
      id: 'safety',
      title: 'Safety & Privacy',
      icon: <FaUserShield className="text-blue-500" />,
      questions: [
        {
          id: 'water-safety',
          question: 'Is the shared water safe to drink?',
          answer: 'Water quality varies by source. Borehole water is typically not treated to municipal drinking standards. We recommend using shared water for non-drinking purposes (washing, flushing toilets) unless the provider specifically indicates it\'s been tested and is potable. When in doubt, boil water before drinking.'
        },
        {
          id: 'data-privacy',
          question: 'How is my personal information protected?',
          answer: 'We take privacy seriously. Water seekers can view approximate locations until they contact a provider. Full addresses are only shared after initial contact. Providers can choose how much contact information to display publicly. All data is encrypted and stored securely in compliance with POPIA.'
        },
        {
          id: 'verification',
          question: 'Are water providers verified?',
          answer: 'We implement a community trust system where users can report issues and rate their experiences. While we don\'t physically verify each provider, we monitor reports closely and remove listings that receive complaints. Community feedback helps maintain the quality of our network.'
        },
        {
          id: 'safety-tips',
          question: 'What safety measures should I take when collecting water?',
          answer: 'When collecting water, go during daylight hours when possible, let someone know where you\'re going, and consider bringing a friend. Providers should ensure their collection area is well-lit and easily accessible. We encourage respectful, brief interactions focused on the water collection.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Questions',
      icon: <FaMapMarkedAlt className="text-blue-500" />,
      questions: [
        {
          id: 'location-services',
          question: 'Why does the app need my location?',
          answer: 'Location services help us show you the nearest water points and calculate accurate distances. This is optional but provides the best experience. If you prefer not to share your location, you can still search by entering your area manually.'
        },
        {
          id: 'offline',
          question: 'Does the app work offline?',
          answer: 'Currently, an internet connection is required to view updated water points. However, we\'re working on an offline mode that will save recently viewed water points for access during network outages. This feature will be available in a future update.'
        },
        {
          id: 'browser-compatibility',
          question: 'Which browsers are supported?',
          answer: 'Our platform works on all modern browsers including Chrome, Safari, Firefox, and Edge. For the best experience, we recommend using the latest version of your preferred browser. The platform is also optimized for mobile devices.'
        },
        {
          id: 'account-required',
          question: 'Do I need to create an account to find water?',
          answer: 'No account is required to search for water points. However, creating a free account allows you to save favorite locations, receive notifications about new water points in your area, and contact providers more easily. Water providers must create an account to list their water source.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-blue-50/50">
      {/* Hero Section */}
      <div className="relative bg-blue-100 py-16 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-200/40 rounded-full 
                          backdrop-blur-3xl transform-gpu animate-float-slow"></div>
          
          <div className="absolute left-10 bottom-10 w-56 h-56 bg-blue-300/30 rounded-full 
                          backdrop-blur-2xl shadow-[0_0_40px_rgba(56,189,248,0.2)] 
                          transform-gpu animate-float-reverse"></div>
          
          <div className="absolute right-1/4 top-1/2 w-32 h-32 bg-blue-300/20 rounded-full 
                          backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.3)] 
                          transform-gpu animate-pulse-slow"></div>
          
          <div className="absolute left-1/4 top-1/3 w-6 h-6 bg-blue-400/30 rounded-full 
                          transform-gpu animate-ping-slow"></div>
          <div className="absolute right-1/3 bottom-1/4 w-4 h-4 bg-blue-500/20 rounded-full 
                          transform-gpu animate-ping-slow animation-delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-2 rounded-full bg-blue-200/50 mr-3">
                <svg 
                  className="w-10 h-10 text-blue-600"
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
              <h2 className="text-xl font-bold text-blue-600">Together As One</h2>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 animate-fade-in-up">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-blue-700 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Find answers to common questions about our water sharing platform
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Quick Links Section */}
        <div className="mb-12 md:mb-16">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">How can we help you?</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Link to="/find-water" className="bg-blue-50 rounded-xl p-5 hover:bg-blue-100 transition-colors flex items-center group">
                  <div className="bg-blue-100 p-3 rounded-full mr-4 text-blue-600 group-hover:bg-blue-200 transition-colors">
                    <FaMapMarkedAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Find Water</h3>
                    <p className="text-gray-600 text-sm">Locate water sharing points near you</p>
                  </div>
                </Link>
                
                <Link to="/volunteer" className="bg-green-50 rounded-xl p-5 hover:bg-green-100 transition-colors flex items-center group">
                  <div className="bg-green-100 p-3 rounded-full mr-4 text-green-600 group-hover:bg-green-200 transition-colors">
                    <FaHandsHelping className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Share Your Water</h3>
                    <p className="text-gray-600 text-sm">Register to provide water to others</p>
                  </div>
                </Link>
                
                <Link to="/contact" className="bg-sky-50 rounded-xl p-5 hover:bg-sky-100 transition-colors flex items-center group">
                  <div className="bg-sky-100 p-3 rounded-full mr-4 text-sky-600 group-hover:bg-sky-200 transition-colors">
                    <FaUserPlus className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Join Community</h3>
                    <p className="text-gray-600 text-sm">Create an account to get started</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Accordions */}
        <div className="space-y-8 mb-16">
          {faqCategories.map(category => (
            <div key={category.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100">
              <div className="bg-gradient-to-r from-blue-50 to-white p-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    {category.icon}
                  </div>
                  {category.title}
                </h2>
              </div>
              
              <div className="divide-y divide-blue-100">
                {category.questions.map(item => (
                  <div key={item.id} className="p-6">
                    <button
                      className="flex justify-between items-center w-full text-left focus:outline-none"
                      onClick={() => toggleItem(item.id)}
                    >
                      <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
                      <div className="ml-4 flex-shrink-0">
                        {expandedItems[item.id] ? (
                          <FaChevronUp className="h-5 w-5 text-blue-500" />
                        ) : (
                          <FaChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </button>
                    
                    <div 
                      className={`mt-4 text-gray-600 transition-all duration-300 overflow-hidden ${
                        expandedItems[item.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="pb-2">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Still Have Questions Section */}
        <div className="bg-blue-100 rounded-xl shadow-md p-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Still Have Questions?</h2>
            <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Please reach out to our friendly team.
            </p>
            <Link
              to="/contact"
              className="bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center shadow-md hover:shadow-lg"
            >
              Contact Us
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200 rounded-full opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-200 rounded-full opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
      </div>
      
      {/* Animation Styles */}
      <style jsx="true">{`
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        
        .animate-float-slow {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: floatReverse 15s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
        
        .animate-ping-slow {
          animation: pingSlow 10s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0); }
          25% { transform: translateY(-20px) translateX(10px) rotate(2deg); }
          50% { transform: translateY(-15px) translateX(15px) rotate(0); }
          75% { transform: translateY(-25px) translateX(5px) rotate(-2deg); }
        }
        
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0); }
          25% { transform: translateY(15px) translateX(-10px) rotate(-1deg); }
          50% { transform: translateY(20px) translateX(-15px) rotate(0); }
          75% { transform: translateY(10px) translateX(-5px) rotate(1deg); }
        }
        
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 0.9; }
        }
        
        @keyframes pingSlow {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.5); opacity: 0.2; }
          100% { transform: scale(0.8); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default FAQPage;