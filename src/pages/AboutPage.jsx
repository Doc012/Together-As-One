import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaWater, FaHandsHelping, FaMapMarkedAlt, 
  FaShieldAlt, FaUsers, FaPhoneAlt, FaEnvelope,
  FaGlobe, FaHeartbeat, FaUserFriends, FaLightbulb,
  FaCopy, FaExclamationCircle
} from 'react-icons/fa';

const AboutPage = () => {
  // Add these new states and constants
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Contact email where messages should be sent
  const contactEmail = "contact@watershare.co.za";
  
  // Function to generate email content from form
  const generateContactEmailContent = () => {
    return `
CONTACT FORM SUBMISSION

Name: ${contactForm.name}
Email: ${contactForm.email}

Message:
${contactForm.message}
    `.trim();
  };
  
  // Copy email content to clipboard
  const copyContactToClipboard = () => {
    const emailContent = generateContactEmailContent();
    const completeContent = `--- EMAIL INFORMATION ---
TO: ${contactEmail}
SUBJECT: Website Contact Form
--- END EMAIL INFORMATION ---

${emailContent}`;
    
    navigator.clipboard.writeText(completeContent).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };
  
  // Open default email client with prefilled email
  const openContactEmailClient = () => {
    try {
      const subject = encodeURIComponent("Website Contact Form");
      const body = encodeURIComponent(generateContactEmailContent());
      
      const mailtoLink = document.createElement('a');
      mailtoLink.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
      mailtoLink.style.display = 'none';
      document.body.appendChild(mailtoLink);
      
      mailtoLink.click();
      
      setTimeout(() => {
        document.body.removeChild(mailtoLink);
      }, 100);
    } catch (error) {
      console.error("Error opening email client:", error);
      
      alert(`Unable to open your email client automatically. Please send an email to ${contactEmail} with your message or use the Copy button.`);
      
      copyContactToClipboard();
    }
  };
  
  return (
    <div className="min-h-screen bg-blue-50/50">
      {/* Hero Section */}
      <div className="relative bg-blue-100 py-16 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large floating circle */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-200/40 rounded-full 
                        backdrop-blur-3xl transform-gpu animate-float-slow"></div>
          
          {/* Medium circle with glow effect */}
          <div className="absolute left-10 bottom-10 w-56 h-56 bg-blue-300/30 rounded-full 
                        backdrop-blur-2xl shadow-[0_0_40px_rgba(56,189,248,0.2)] 
                        transform-gpu animate-float-reverse"></div>
          
          {/* Small pulsing circle */}
          <div className="absolute right-1/4 top-1/2 w-32 h-32 bg-blue-300/20 rounded-full 
                        backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.3)] 
                        transform-gpu animate-pulse-slow"></div>
          
          {/* Tiny floating dots */}
          <div className="absolute left-1/4 top-1/3 w-6 h-6 bg-blue-400/30 rounded-full 
                        transform-gpu animate-ping-slow"></div>
          <div className="absolute right-1/3 bottom-1/4 w-4 h-4 bg-blue-500/20 rounded-full 
                        transform-gpu animate-ping-slow animation-delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Logo and heading container */}
          <div className="text-center text-gray-800 mb-8">
            {/* Add logo above the heading */}
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
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 animate-fade-in-up">About Our Mission</h1>
            <p className="text-lg md:text-xl text-blue-700 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Connecting communities during water outages through neighbor-to-neighbor sharing
            </p>
          </div>
          
          
        </div>
        
        
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Our Story Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl overflow-hidden shadow-sm border border-blue-100">
            <div className="flex flex-col md:flex-row h-80">
              {/* Left column with image - ADJUSTED TO FIT CONTAINER */}
              <div className="md:w-5/12 relative animate-fade-in-left h-auto">
                <div className="h-full flex items-stretch">
                  <div className="relative w-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-sky-300/20 mix-blend-overlay"></div>
                    <img 
                      src="/images/community-sharing.jpg" 
                      alt="Community members sharing water" 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://www.sciencelearn.org.nz/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F117510%2F1722387797-water20161110-17124-gv7a3b.jpg%3Fw%3D1840%26h%3D1226.6666666666665&w=1920&q=85&dpl=dpl_4n9pVfrF4H6vbtWLHqt8okXU1ahu";
                      }}
                    />
                    <div className="absolute top-2 left-2 flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-full py-0.5 px-2 shadow-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-xs font-medium text-gray-700">15+ communities</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right column with content */}
              <div className="md:w-7/12 p-4 md:p-6 animate-fade-in-right">
                <div className="flex items-center mb-2">
                  <div className="bg-gradient-to-r from-blue-400 to-sky-400 p-1.5 rounded-lg mr-2 text-white">
                    <FaHeartbeat className="h-4 w-4" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Our Story</h2>
                </div>
                
                <div className="space-y-2 prose prose-sm prose-blue">
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Born from a collective response to South Africa's water crisis, our platform emerged when neighbors began connecting to share borehole access during municipal outages. What started as informal community support has grown into a coordinated network of care.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 my-1">
                    <div className="inline-flex items-center bg-blue-50 rounded-full px-2 py-1 text-xs text-blue-700">
                      <span className="font-semibold mr-1">Community</span> Driven
                    </div>
                    <div className="inline-flex items-center bg-blue-50 rounded-full px-2 py-1 text-xs text-blue-700">
                      <span className="font-semibold mr-1">Neighbor</span> Connections
                    </div>
                    <div className="inline-flex items-center bg-green-50 rounded-full px-2 py-1 text-xs text-green-700">
                      <span className="font-semibold">Water Resilience</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Today, we're transforming how communities respond to water challenges. By connecting those with resources to neighbors in need, we're creating resilient networks that turn crisis into opportunity for connection, proving that even our most essential needs can become bridges between us.
                  </p>
                  
                  {/* <div className="flex items-center mt-2">
                    <a href="#how-it-works" className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors font-medium text-sm">
                      <span>Learn how it works</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center flex items-center justify-center">
            <div className="bg-gradient-to-r from-blue-400 to-sky-400 p-2 rounded-lg mr-3 text-white">
              <FaLightbulb className="h-5 w-5" />
            </div>
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] animate-fade-in animation-delay-200 border border-blue-100">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaMapMarkedAlt className="text-blue-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Find Water Nearby</h3>
              <p className="text-gray-600 text-center">
                Use our map or search feature to locate homes with boreholes that are sharing water in your area.
              </p>
              <div className="flex justify-center mt-4">
                <div className="inline-flex space-x-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-200"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-200"></span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] animate-fade-in animation-delay-400 border border-blue-100">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaHandsHelping className="text-blue-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Connect Directly</h3>
              <p className="text-gray-600 text-center">
                View availability times and contact water providers directly to arrange collection.
              </p>
              <div className="flex justify-center mt-4">
                <div className="inline-flex space-x-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-200"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-200"></span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] animate-fade-in animation-delay-600 border border-blue-100">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaWater className="text-blue-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Collect Safely</h3>
              <p className="text-gray-600 text-center">
                Bring your containers and collect water according to the provider's guidelines during the specified times.
              </p>
              <div className="flex justify-center mt-4">
                <div className="inline-flex space-x-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-200"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-200"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center flex items-center justify-center">
            <div className="bg-gradient-to-r from-green-400 to-blue-400 p-2 rounded-lg mr-3 text-white">
              <FaUserFriends className="h-5 w-5" />
            </div>
            Our Values
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 flex items-start transform hover:scale-[1.01] transition-all duration-300 animate-fade-in animation-delay-300">
              <div className="bg-gradient-to-r from-green-300 to-green-400 p-3 rounded-full mr-4 text-white">
                <FaUsers className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Community First</h3>
                <p className="text-gray-600">
                  We believe in the power of communities to support each other during challenging times. Our platform is built to strengthen these connections.
                </p>
                <div className="mt-4 bg-green-50 p-2 rounded-lg border border-green-100">
                  <span className="text-sm text-green-600">"Alone we can do so little; together we can do so much."</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 flex items-start transform hover:scale-[1.01] transition-all duration-300 animate-fade-in animation-delay-500">
              <div className="bg-gradient-to-r from-blue-300 to-blue-400 p-3 rounded-full mr-4 text-white">
                <FaShieldAlt className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Safety & Trust</h3>
                <p className="text-gray-600">
                  We prioritize the safety of all users and work to create a trusted environment for water sharing through verification and community feedback.
                </p>
                <div className="mt-4 bg-blue-50 p-2 rounded-lg border border-blue-100">
                  <span className="text-sm text-blue-600">"Trust is the foundation of every successful community."</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-sky-100 flex items-start transform hover:scale-[1.01] transition-all duration-300 animate-fade-in animation-delay-400">
              <div className="bg-gradient-to-r from-sky-300 to-sky-400 p-3 rounded-full mr-4 text-white">
                <FaGlobe className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Environmental Stewardship</h3>
                <p className="text-gray-600">
                  We promote responsible water usage and conservation practices, ensuring that sharing resources leads to sustainable community solutions.
                </p>
                <div className="mt-4 bg-sky-50 p-2 rounded-lg border border-sky-100">
                  <span className="text-sm text-sky-600">"We do not inherit the earth from our ancestors; we borrow it from our children."</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 flex items-start transform hover:scale-[1.01] transition-all duration-300 animate-fade-in animation-delay-600">
              <div className="bg-gradient-to-r from-amber-300 to-amber-400 p-3 rounded-full mr-4 text-white">
                <FaHandsHelping className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Inclusive Access</h3>
                <p className="text-gray-600">
                  We're committed to ensuring everyone in our community has access to clean water, regardless of their background or circumstances.
                </p>
                <div className="mt-4 bg-amber-50 p-2 rounded-lg border border-amber-100">
                  <span className="text-sm text-amber-600">"Access to water is a fundamental human right."</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">What People Say</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50/80 to-white rounded-xl shadow-sm border border-blue-100 p-6 animate-fade-in animation-delay-300 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold text-lg">
                  JM
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">John Makumbe</h4>
                  <p className="text-sm text-gray-500">Vanderbijlpark</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "This platform was a lifesaver during the water outage last month. I found a neighbor just two streets away who let me fill my containers."
              </p>
              <div className="flex text-yellow-400">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-sky-50/80 to-white rounded-xl shadow-sm border border-sky-100 p-6 animate-fade-in animation-delay-500 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-500 font-bold text-lg">
                  ST
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Sarah Thompson</h4>
                  <p className="text-sm text-gray-500">Vereeniging</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "As someone with a borehole, I'm happy to share with my community. This platform made it easy to let people know when they can come collect water."
              </p>
              <div className="flex text-yellow-400">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-50/80 to-white rounded-xl shadow-sm border border-cyan-100 p-6 animate-fade-in animation-delay-700 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-500 font-bold text-lg">
                  MN
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Mandla Nkosi</h4>
                  <p className="text-sm text-gray-500">Sebokeng</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "I needed water urgently for my elderly mother, and within an hour of using this site, I had found a reliable source just a few blocks away."
              </p>
              <div className="flex text-yellow-400">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="bg-white rounded-xl shadow-sm border border-blue-100 p-8 mb-12 relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-b from-blue-50 to-transparent rounded-full opacity-70 transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-t from-sky-50 to-transparent rounded-full opacity-70 transform -translate-x-1/3 translate-y-1/3"></div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
            <div className="bg-gradient-to-r from-blue-400 to-sky-400 p-2 rounded-lg mr-3 text-white">
              <FaEnvelope className="h-5 w-5" />
            </div>
            Contact Us
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Have questions or feedback? We'd love to hear from you.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <div>
                <div className="flex items-center mb-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-gradient-to-r from-blue-400 to-sky-400 p-4 rounded-xl mr-4 text-white shadow-sm">
                    <FaPhoneAlt className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="text-lg font-medium text-gray-800">+27 10 123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-gradient-to-r from-blue-400 to-sky-400 p-4 rounded-xl mr-4 text-white shadow-sm">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="text-lg font-medium text-gray-800">contact@watershare.co.za</p>
                  </div>
                </div>
                
                <div className="flex items-center transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-gradient-to-r from-blue-400 to-sky-400 p-4 rounded-xl mr-4 text-white shadow-sm">
                    <FaMapMarkedAlt className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="text-lg font-medium text-gray-800">Emfuleni, Gauteng</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form className="space-y-4 relative">
              <div className="bg-blue-50 p-2 px-4 rounded-t-lg text-sm text-blue-700 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                We'll respond within 24 hours
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                  placeholder="Your name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                  placeholder="Your email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                  placeholder="Your message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                ></textarea>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                  type="button"
                  onClick={copyContactToClipboard}
                  className="sm:flex-1 flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02]"
                >
                  <FaCopy className="mr-2" />
                  {copySuccess ? "Copied to Clipboard!" : "Copy Email Content"}
                </button>
                
                <button
                  type="button"
                  onClick={openContactEmailClient}
                  className="sm:flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-md text-base font-medium text-white bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                >
                  <FaEnvelope className="mr-2" />
                  Open Email Client
                </button>
              </div>
              
              <div className="mt-4 bg-blue-50 p-4 rounded-lg text-sm">
                <h4 className="font-medium text-blue-800 mb-1">Using the buttons above:</h4>
                <ol className="list-decimal list-inside space-y-1 text-blue-700">
                  <li><strong>Copy Email Content</strong>: Copies your message to clipboard. You can then paste it into your email client.</li>
                  <li><strong>Open Email Client</strong>: Opens your default email app with this message. May not work on all devices.</li>
                </ol>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-2">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </section>
        
        {/* Call to Action */}
        <div className="bg-blue-100 rounded-xl shadow-sm p-8 text-center relative overflow-hidden transform hover:scale-[1.01] transition-all duration-300 border border-blue-200">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/40 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-200/40 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-blue-300/30 rounded-full transform -translate-y-1/2"></div>
          </div>
          
          <div className="relative">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Ready to Find or Share Water?</h2>
            <p className="text-blue-600 mb-6 max-w-2xl mx-auto">
              Join our community of water sharers and help make a difference during water outages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/find-water"
                className="bg-white text-blue-600 py-3 px-6 rounded-lg font-medium border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm transform hover:translate-y-[-2px] hover:shadow-md transition-all duration-300"
              >
                Find Water
              </Link>
              <Link
                to="/volunteer"
                className="bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm transform hover:translate-y-[-2px] hover:shadow-md transition-all duration-300"
              >
                Share Your Water
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animation styles */}
      <style jsx="true">{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        
        .animate-fade-in-left {
          animation: fadeInLeft 0.6s ease-out forwards;
        }
        
        .animate-fade-in-right {
          animation: fadeInRight 0.6s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animate-wave {
          animation: wave 12s linear infinite;
        }
        
        /* Floating and morphing animations */
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
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeInLeft {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeInRight {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes wave {
          0% { transform: translateX(0) translateY(5px); }
          50% { transform: translateX(-2%) translateY(0); }
          100% { transform: translateX(0) translateY(5px); }
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

export default AboutPage;
