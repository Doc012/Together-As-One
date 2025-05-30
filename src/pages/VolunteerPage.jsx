import React, { useState, useRef } from 'react';
import { FaCheckCircle, FaWater, FaMapMarkerAlt, FaClock, FaList, FaPhoneAlt, FaEnvelope, FaExclamationCircle, FaCopy, FaDownload, FaHandHoldingWater } from 'react-icons/fa';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const VolunteerPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    subArea: '',
    address: '',
    description: '',
    phone: '',
    email: '',
    availableDays: [],
    availableTimes: '',
  });
  
  const [copySuccess, setCopySuccess] = useState(false);
  const emailContentRef = useRef(null);
  
  // Contact email where volunteers should send their information
  const contactEmail = "water-volunteers@emfuleni-crisis.co.za";

  const daysOfWeek = [
    { id: 0, name: 'Sunday', short: 'Sun' },
    { id: 1, name: 'Monday', short: 'Mon' },
    { id: 2, name: 'Tuesday', short: 'Tue' },
    { id: 3, name: 'Wednesday', short: 'Wed' },
    { id: 4, name: 'Thursday', short: 'Thu' },
    { id: 5, name: 'Friday', short: 'Fri' },
    { id: 6, name: 'Saturday', short: 'Sat' }
  ];

  const areasData = [
    { name: "Vanderbijlpark", subAreas: ["Vanderbijlpark SE1", "Vanderbijlpark SE2", "Vanderbijlpark CW", "Vanderbijlpark SW"] },
    { name: "Vereeniging", subAreas: ["Three Rivers", "Arcon Park", "Duncanville", "Peacehaven"] },
    { name: "Sasolburg", subAreas: ["Sasolburg Central", "Vaalpark", "Roodia"] },
    { name: "Evaton", subAreas: ["Evaton North", "Evaton West"] },
    { name: "Sebokeng", subAreas: ["Zone 6", "Zone 12", "Zone 14"] }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDayToggle = (dayId) => {
    const updatedDays = formData.availableDays.includes(dayId)
      ? formData.availableDays.filter(day => day !== dayId)
      : [...formData.availableDays, dayId];
    
    setFormData(prev => ({ ...prev, availableDays: updatedDays }));
  };

  const getSubAreas = () => {
    if (!formData.area) return [];
    const selectedArea = areasData.find(a => a.name === formData.area);
    return selectedArea ? selectedArea.subAreas || [] : [];
  };

  // Format days of week for email
  const getFormattedDays = () => {
    return formData.availableDays
      .map(dayId => daysOfWeek.find(d => d.id === dayId)?.name)
      .filter(Boolean)
      .join(', ');
  };

  // Update the generateEmailContent function to format time slots correctly
  const generateEmailContent = () => {
    // Format availability times
    const availabilityText = formData.availableDays.map(dayId => {
      const day = daysOfWeek.find(d => d.id === dayId)?.name;
      const timePeriods = [];
      
      if (formData[`morning-${dayId}`]) {
        timePeriods.push(`${formData[`morning-start-${dayId}`] || '06:00'} - ${formData[`morning-end-${dayId}`] || '12:00'}`);
      }
      
      if (formData[`afternoon-${dayId}`]) {
        timePeriods.push(`${formData[`afternoon-start-${dayId}`] || '12:00'} - ${formData[`afternoon-end-${dayId}`] || '17:00'}`);
      }
      
      if (formData[`evening-${dayId}`]) {
        timePeriods.push(`${formData[`evening-start-${dayId}`] || '17:00'} - ${formData[`evening-end-${dayId}`] || '21:00'}`);
      }
      
      return `${day}: ${timePeriods.join(', ')}`;
    }).join('\n');

    return `
WATER VOLUNTEER REGISTRATION

BASIC INFORMATION:
Water Point Name: ${formData.name}
Area: ${formData.area}
Neighborhood: ${formData.subArea}
Address: ${formData.address}

Description:
${formData.description}

CONTACT INFORMATION:
Phone: ${formData.phone}
Email: ${formData.email}

AVAILABILITY:
${availabilityText}

I confirm that I have a borehole or alternative water source that I'm willing to share with my community.
I understand that my address will be displayed on the public map but my contact details will remain private.
    `.trim();
  };

  // Copy email content to clipboard
  const copyToClipboard = () => {
    const emailContent = generateEmailContent();
    const completeContent = `--- EMAIL INFORMATION - DO NOT PASTE THIS SECTION INTO EMAIL BODY ---
TO: ${contactEmail}
SUBJECT: Water Volunteer Registration
--- END EMAIL INFORMATION ---

${emailContent}

--- IMPORTANT REMINDER ---
⚠️ PLEASE REMEMBER TO ATTACH A PHOTO OF YOUR PROPERTY/WATER POINT BEFORE SENDING! ⚠️
--- END REMINDER ---`;
    
    navigator.clipboard.writeText(completeContent).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  // Open default email client with prefilled email
  const openEmailClient = () => {
    try {
      const subject = encodeURIComponent("Water Volunteer Registration");
      const body = encodeURIComponent(generateEmailContent());
      
      // Create an actual anchor element to trigger the email client
      const mailtoLink = document.createElement('a');
      mailtoLink.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
      mailtoLink.style.display = 'none';
      document.body.appendChild(mailtoLink);
      
      // Simulate a click on this link
      mailtoLink.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(mailtoLink);
      }, 100);
    } catch (error) {
      console.error("Error opening email client:", error);
      
      // Show a fallback message with instructions if the email client can't be opened
      alert(`Unable to open your email client automatically. Please send an email to ${contactEmail} with the subject "Water Volunteer Registration" and copy the information from the form.`);
      
      // Copy the content to clipboard as a fallback
      copyToClipboard();
    }
  };

  // Check if form is complete
  const isFormComplete = () => {
    // Basic fields check
    const basicFieldsComplete = (
      formData.name &&
      formData.area &&
      formData.subArea &&
      formData.address &&
      formData.description &&
      formData.phone &&
      formData.email &&
      formData.availableDays.length > 0
    );
    
    // Check that each selected day has at least one time slot
    const hasTimeSlots = formData.availableDays.every(dayId => 
      formData[`morning-${dayId}`] || 
      formData[`afternoon-${dayId}`] || 
      formData[`evening-${dayId}`]
    );
    
    return basicFieldsComplete && hasTimeSlots;
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gray-50 pb-20">
        <Helmet>
          <title>Volunteer to Share Water - Emfuleni Water Crisis</title>
          <meta name="description" content="Volunteer to share your borehole water with your community during the Emfuleni water crisis." />
        </Helmet>

        {/* Enhanced Hero section with animated background elements */}
        <div className="relative bg-blue-100 py-16 z-10 overflow-hidden">
          {/* Advanced animated background elements */}
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
            
            {/* Gradient blob */}
            <div className="absolute left-1/2 top-10 w-64 h-64 
                          bg-gradient-to-br from-blue-300/30 to-blue-200/20 
                          rounded-full blur-3xl opacity-40 
                          transform-gpu animate-morph"></div>
            
            {/* Subtle moving lines */}
            <div className="absolute left-0 top-1/4 w-full h-px bg-gradient-to-r 
                          from-transparent via-blue-400/40 to-transparent 
                          transform-gpu animate-scan-slow"></div>
            <div className="absolute left-0 top-2/3 w-full h-px bg-gradient-to-r 
                          from-transparent via-blue-500/30 to-transparent 
                          transform-gpu animate-scan-slow animation-delay-2000"></div>
            
            {/* Glowing accent */}
            <div className="absolute right-10 top-10 w-2 h-20 bg-blue-500/30 rounded-full 
                          blur-md transform-gpu animate-glow"></div>
            
            {/* Glass panel effect */}
            <div className="absolute left-1/3 bottom-20 w-40 h-40 
                          bg-gradient-to-tr from-white/10 to-blue-200/20 
                          rounded-lg backdrop-blur-lg border border-white/20 rotate-12 
                          transform-gpu animate-float-subtle"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center text-gray-800 mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">Share Your Water</h1>
              <p className="text-lg md:text-xl text-blue-700 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
                Help your community during the water crisis by registering your borehole or water source
              </p>
            </div>
            
            {/* Search Bar with enhanced design */}
            <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden animate-fade-in-up animation-delay-400 transform hover:scale-[1.01] transition-all duration-300">
              <div className="p-5 text-center">
                <p className="text-gray-600">Complete the form below to register your water source</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-20">
          {/* Introduction Card */}
          <div className="bg-white rounded-xl shadow-xl p-6 mb-10 transform hover:scale-[1.01] transition-all duration-300">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-2 rounded-lg mr-3 text-white">
                  <FaWater className="h-5 w-5" />
                </div>
                Why Volunteer Your Water?
              </h2>
              <p className="text-gray-600 mb-6">
                During the water crisis, many of our neighbors don't have access to clean water. By sharing your borehole or water source, you become a vital lifeline for your community.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 transform hover:translate-y-[-5px] transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-100 rounded-full p-2 mr-2">
                      <FaCheckCircle className="text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-blue-900">Help Your Community</h3>
                  </div>
                  <p className="text-blue-800 text-sm">Provide essential support to neighbors, elderly, and families in need.</p>
                </div>
                
                <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 transform hover:translate-y-[-5px] transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <div className="bg-teal-100 rounded-full p-2 mr-2">
                      <FaClock className="text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-teal-900">On Your Schedule</h3>
                  </div>
                  <p className="text-teal-800 text-sm">Set your own availability times that work with your daily routine.</p>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100 transform hover:translate-y-[-5px] transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <div className="bg-indigo-100 rounded-full p-2 mr-2">
                      <FaMapMarkerAlt className="text-indigo-600" />
                    </div>
                    <h3 className="font-semibold text-indigo-900">Be on the Map</h3>
                  </div>
                  <p className="text-indigo-800 text-sm">Your water point will be listed on our map to help people find you.</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <FaExclamationCircle className="text-blue-600 mr-2" />
                  How the Process Works
                </h3>
                <ol className="space-y-2 mt-3">
                  <li className="flex items-center">
                    <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center mr-2">1</span>
                    <p className="text-blue-900">Fill out the form with your information and availability</p>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center mr-2">2</span>
                    <p className="text-blue-900">Send your details via email (with a photo of your water point)</p>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center mr-2">3</span>
                    <p className="text-blue-900">We'll review and add you to our map within 24-48 hours</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-12 gap-8">
            {/* Information column */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6 animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg mr-3 text-white">
                    <FaList className="h-5 w-5" />
                  </div>
                  Required Information
                </h2>
                
                <div className="space-y-4 mt-6">
                  <div className="bg-blue-50 rounded-lg p-4 flex items-start">
                    <div className="bg-blue-100 p-1.5 rounded-lg mr-3 flex-shrink-0">
                      <FaMapMarkerAlt className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">Location Details</h3>
                      <p className="text-blue-800 text-sm">Your area, neighborhood, and address to display on the map</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 flex items-start">
                    <div className="bg-blue-100 p-1.5 rounded-lg mr-3 flex-shrink-0">
                      <FaWater className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">Water Source</h3>
                      <p className="text-blue-800 text-sm">Brief description of your water source (borehole, tank, etc.)</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 flex items-start">
                    <div className="bg-blue-100 p-1.5 rounded-lg mr-3 flex-shrink-0">
                      <FaClock className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">Availability</h3>
                      <p className="text-blue-800 text-sm">Days and times when people can collect water</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 flex items-start">
                    <div className="bg-blue-100 p-1.5 rounded-lg mr-3 flex-shrink-0">
                      <FaPhoneAlt className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">Contact</h3>
                      <p className="text-blue-800 text-sm">Phone and email for verification (not publicly displayed)</p>
                    </div>
                  </div>
                  
                  {/* Photo requirement - highlighted */}
                  <div className="bg-red-50 rounded-lg p-4 flex items-start border-2 border-red-200 animate-pulse-once">
                    <div className="bg-red-100 p-1.5 rounded-lg mr-3 flex-shrink-0">
                      <FaExclamationCircle className="text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-900 mb-1">Photo Required</h3>
                      <p className="text-red-800 text-sm">A clear image of your property/water point (to be attached to your email)</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 animate-fade-in animation-delay-400">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <div className="bg-gradient-to-r from-teal-500 to-green-500 p-2 rounded-lg mr-3 text-white">
                    <FaEnvelope className="h-5 w-5" />
                  </div>
                  Submission Instructions
                </h2>
                
                <div className="bg-indigo-50 p-5 rounded-lg mb-5 border border-indigo-100">
                  <h3 className="text-indigo-800 font-semibold mb-3 flex items-center">
                    <FaEnvelope className="text-indigo-600 mr-2" />
                    Send Your Information by Email
                  </h3>
                  <p className="text-indigo-700 text-sm mb-2">
                    Fill out the form, then send your information to:
                  </p>
                  <div className="bg-white p-3 rounded-lg border border-indigo-200 flex items-center justify-between">
                    <span className="font-medium text-indigo-700">{contactEmail}</span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(contactEmail);
                        alert("Email copied to clipboard!");
                      }}
                      className="text-indigo-600 hover:text-indigo-800 p-1.5 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors duration-200"
                      title="Copy email address"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">After You Submit:</h3>
                    <p className="text-blue-700 text-sm mb-3">
                      After receiving your email, our team will:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="bg-blue-100 p-1 rounded-full mt-0.5 mr-2 flex-shrink-0">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-blue-800 text-sm">Review your information for completeness</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-100 p-1 rounded-full mt-0.5 mr-2 flex-shrink-0">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-blue-800 text-sm">May contact you to verify details</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-100 p-1 rounded-full mt-0.5 mr-2 flex-shrink-0">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-blue-800 text-sm">Add your water point to our map (within 24-48 hours)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-100 p-1 rounded-full mt-0.5 mr-2 flex-shrink-0">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-blue-800 text-sm">Send a confirmation email when your listing goes live</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Form column */}
            <div className="md:col-span-7 lg:col-span-8">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in transform hover:scale-[1.01] transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-2 rounded-lg mr-3 text-white">
                    <FaWater className="h-5 w-5" />
                  </div>
                  Volunteer Registration Form
                </h2>
                
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">1</span>
                      Basic Information
                    </h3>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Water Point Name or Title*
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="e.g., Smith Family Borehole"
                          value={formData.name}
                          onChange={handleChange}
                          className="block w-full rounded-lg border-2 border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4"
                        />
                        <p className="mt-1 text-xs text-gray-500">This is how your water point will be listed on the map</p>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                          Area*
                        </label>
                        <select
                          id="area"
                          name="area"
                          required
                          value={formData.area}
                          onChange={handleChange}
                          className="block w-full rounded-lg border-2 border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4"
                        >
                          <option value="">Select an area</option>
                          {areasData.map(area => (
                            <option key={area.name} value={area.name}>{area.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subArea" className="block text-sm font-medium text-gray-700">
                          Neighborhood/Sub-Area*
                        </label>
                        <select
                          id="subArea"
                          name="subArea"
                          required
                          value={formData.subArea}
                          onChange={handleChange}
                          disabled={!formData.area}
                          className="block w-full rounded-lg border-2 border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 py-3 px-4"
                        >
                          <option value="">Select neighborhood</option>
                          {getSubAreas().map(subArea => (
                            <option key={subArea} value={subArea}>{subArea}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                          Street Address*
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          required
                          placeholder="e.g., 123 Main Street"
                          value={formData.address}
                          onChange={handleChange}
                          className="block w-full rounded-lg border-2 border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description*
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows="3"
                        required
                        placeholder="Briefly describe your water source, e.g., 'Residential home with 5000L storage tank and borehole'"
                        value={formData.description}
                        onChange={handleChange}
                        className="block w-full rounded-lg border-2 border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4"
                      ></textarea>
                      <p className="mt-1 text-xs text-gray-500">Describe your water point and any relevant details for people who might collect water</p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                      <span className="bg-teal-100 text-teal-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">2</span>
                      Contact Information
                    </h3>
                    <div className="bg-blue-50 p-4 rounded-lg mb-5 border-l-4 border-blue-500">
                      <p className="text-sm text-blue-800 flex items-center">
                        <FaExclamationCircle className="text-blue-500 mr-2 flex-shrink-0" />
                        Your contact information will not be publicly displayed. It will be used only for verification and communication purposes.
                      </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone Number*
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          placeholder="e.g., 082 123 4567"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full rounded-lg border-2 border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email Address*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="e.g., yourname@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="block w-full rounded-lg border-2 border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">3</span>
                      Availability
                    </h3>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Days*
                      </label>
                      <div className="grid grid-cols-7 gap-2">
                        {daysOfWeek.map(day => (
                          <button
                            type="button"
                            key={day.id}
                            onClick={() => handleDayToggle(day.id)}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                              formData.availableDays.includes(day.id)
                                ? 'bg-indigo-100 text-indigo-800 font-medium border border-indigo-200 shadow-sm'
                                : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50'
                            }`}
                          >
                            <span>{day.short}</span>
                            {formData.availableDays.includes(day.id) && (
                              <FaCheckCircle className="text-indigo-600 mt-1" size={10} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Time Slots*
                      </label>
                      <p className="text-xs text-gray-500 mb-3">
                        Select time slots when people can collect water for each selected day. You can add multiple time slots per day.
                      </p>
                      
                      {formData.availableDays.length > 0 ? (
                        <div className="space-y-6">
                          {formData.availableDays.map(dayId => {
                            const day = daysOfWeek.find(d => d.id === dayId);
                            return (
                              <div key={dayId} className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm">
                                <h4 className="font-medium text-gray-800 mb-3 pb-2 border-b border-gray-200">{day.name}</h4>
                                
                                {/* Time slot inputs for this day */}
                                <div className="space-y-4">
                                  {/* Morning slot */}
                                  <div className="flex flex-wrap items-center gap-2">
                                    <div className="flex items-center min-w-[200px]">
                                      <input
                                        type="checkbox"
                                        id={`morning-${dayId}`}
                                        checked={formData[`morning-${dayId}`] || false}
                                        onChange={(e) => handleChange({
                                          target: {
                                            name: `morning-${dayId}`,
                                            type: 'checkbox',
                                            checked: e.target.checked
                                          }
                                        })}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-2 border-indigo-200 rounded"
                                      />
                                      <label htmlFor={`morning-${dayId}`} className="ml-2 text-sm text-gray-700">
                                        Morning (6:00 - 12:00)
                                      </label>
                                    </div>
                                    
                                    {formData[`morning-${dayId}`] && (
                                      <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
                                        <select
                                          value={formData[`morning-start-${dayId}`] || "06:00"}
                                          onChange={(e) => handleChange({
                                            target: {
                                              name: `morning-start-${dayId}`,
                                              value: e.target.value
                                            }
                                          })}
                                          className="block rounded-lg border border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-1.5 px-2 text-sm"
                                        >
                                          {["06:00", "07:00", "08:00", "09:00", "10:00", "11:00"].map(time => (
                                            <option key={time} value={time}>{time}</option>
                                          ))}
                                        </select>
                                        <span className="text-gray-500">to</span>
                                        <select
                                          value={formData[`morning-end-${dayId}`] || "12:00"}
                                          onChange={(e) => handleChange({
                                            target: {
                                              name: `morning-end-${dayId}`,
                                              value: e.target.value
                                            }
                                          })}
                                          className="block rounded-lg border border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-1.5 px-2 text-sm"
                                        >
                                          {["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"].map(time => (
                                            <option key={time} value={time}>{time}</option>
                                          ))}
                                        </select>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Afternoon slot */}
                                  <div className="flex flex-wrap items-center gap-2">
                                    <div className="flex items-center min-w-[200px]">
                                      <input
                                        type="checkbox"
                                        id={`afternoon-${dayId}`}
                                        checked={formData[`afternoon-${dayId}`] || false}
                                        onChange={(e) => handleChange({
                                          target: {
                                            name: `afternoon-${dayId}`,
                                            type: 'checkbox',
                                            checked: e.target.checked
                                          }
                                        })}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-2 border-indigo-200 rounded"
                                      />
                                      <label htmlFor={`afternoon-${dayId}`} className="ml-2 text-sm text-gray-700">
                                        Afternoon (12:00 - 17:00)
                                      </label>
                                    </div>
                                    
                                    {formData[`afternoon-${dayId}`] && (
                                      <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
                                        <select
                                          value={formData[`afternoon-start-${dayId}`] || "12:00"}
                                          onChange={(e) => handleChange({
                                            target: {
                                              name: `afternoon-start-${dayId}`,
                                              value: e.target.value
                                            }
                                          })}
                                          className="block rounded-lg border border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-1.5 px-2 text-sm"
                                        >
                                          {["12:00", "13:00", "14:00", "15:00", "16:00"].map(time => (
                                            <option key={time} value={time}>{time}</option>
                                          ))}
                                        </select>
                                        <span className="text-gray-500">to</span>
                                        <select
                                          value={formData[`afternoon-end-${dayId}`] || "17:00"}
                                          onChange={(e) => handleChange({
                                            target: {
                                              name: `afternoon-end-${dayId}`,
                                              value: e.target.value
                                            }
                                          })}
                                          className="block rounded-lg border border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-1.5 px-2 text-sm"
                                        >
                                          {["13:00", "14:00", "15:00", "16:00", "17:00"].map(time => (
                                            <option key={time} value={time}>{time}</option>
                                          ))}
                                        </select>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Evening slot */}
                                  <div className="flex flex-wrap items-center gap-2">
                                    <div className="flex items-center min-w-[200px]">
                                      <input
                                        type="checkbox"
                                        id={`evening-${dayId}`}
                                        checked={formData[`evening-${dayId}`] || false}
                                        onChange={(e) => handleChange({
                                          target: {
                                            name: `evening-${dayId}`,
                                            type: 'checkbox',
                                            checked: e.target.checked
                                          }
                                        })}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-2 border-indigo-200 rounded"
                                      />
                                      <label htmlFor={`evening-${dayId}`} className="ml-2 text-sm text-gray-700">
                                        Evening (17:00 - 21:00)
                                      </label>
                                    </div>
                                    
                                    {formData[`evening-${dayId}`] && (
                                      <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
                                        <select
                                          value={formData[`evening-start-${dayId}`] || "17:00"}
                                          onChange={(e) => handleChange({
                                            target: {
                                              name: `evening-start-${dayId}`,
                                              value: e.target.value
                                            }
                                          })}
                                          className="block rounded-lg border border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-1.5 px-2 text-sm"
                                        >
                                          {["17:00", "18:00", "19:00", "20:00"].map(time => (
                                            <option key={time} value={time}>{time}</option>
                                          ))}
                                        </select>
                                        <span className="text-gray-500">to</span>
                                        <select
                                          value={formData[`evening-end-${dayId}`] || "21:00"}
                                          onChange={(e) => handleChange({
                                            target: {
                                              name: `evening-end-${dayId}`,
                                              value: e.target.value
                                            }
                                          })}
                                          className="block rounded-lg border border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-1.5 px-2 text-sm"
                                        >
                                          {["18:00", "19:00", "20:00", "21:00"].map(time => (
                                            <option key={time} value={time}>{time}</option>
                                          ))}
                                        </select>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                          <p className="flex items-center">
                            <FaExclamationCircle className="text-yellow-600 mr-2" />
                            Please select at least one day above before specifying time slots.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Email Preview */}
                  {isFormComplete() && (
                    <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-inner">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                        <FaEnvelope className="text-blue-600 mr-2" />
                        Email Preview
                      </h3>
                      
                      {/* Add recipient info notice */}
                      <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4 text-sm">
                        <p className="flex items-start">
                          <FaExclamationCircle className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong className="text-yellow-800">Important:</strong> When sending your email, please use <span className="font-medium">{contactEmail}</span> as the recipient address. This information will be automatically copied when you click "Copy Email Content".
                          </span>
                        </p>
                      </div>
                      
                      {/* Add photo requirement */}
                      <div className="mb-4 bg-red-50 border-l-4 border-red-400 rounded-lg p-4 text-sm">
                        <p className="flex items-start">
                          <FaExclamationCircle className="text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong className="text-red-800">Required:</strong> Please attach a photo of your property/water point to your email. This helps us verify your information and gives residents a visual reference of where to collect water.
                          </span>
                        </p>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4">
                        This is what will be sent when you generate your email. Review it before sending.
                      </p>
                      <div 
                        ref={emailContentRef} 
                        className="bg-white p-4 rounded-lg border border-gray-300 font-mono text-sm text-gray-700 whitespace-pre-wrap mb-4 max-h-64 overflow-y-auto shadow-inner"
                      >
                        {generateEmailContent()}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <button
                        onClick={copyToClipboard}
                        disabled={!isFormComplete()}
                        className={`sm:flex-1 flex items-center justify-center px-6 py-3.5 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 ${!isFormComplete() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                      >
                        <FaCopy className="mr-2" />
                        {copySuccess ? "Copied to Clipboard!" : "Copy Email Content"}
                      </button>
                      
                      <button
                        onClick={openEmailClient}
                        disabled={!isFormComplete()}
                        className={`sm:flex-1 flex items-center justify-center px-6 py-3.5 border border-transparent rounded-lg shadow-md textBase font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 ${!isFormComplete() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-lg'}`}
                      >
                        <FaEnvelope className="mr-2" />
                        Open Email Client
                      </button>
                    </div>
                    
                    {!isFormComplete() && (
                      <p className="mt-3 text-sm text-red-600 flex items-start">
                        <FaExclamationCircle className="mr-2 mt-0.5 flex-shrink-0" />
                        Please complete all required fields before generating your email
                      </p>
                    )}
                    
                    <div className="mt-4 bg-blue-50 p-4 rounded-lg text-sm">
                      <h4 className="font-medium text-blue-800 mb-1">Using the buttons above:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-blue-700">
                        <li><strong>Copy Email Content</strong>: Copies all information to your clipboard. Open your email client manually, create a new email to {contactEmail}, and paste the content.</li>
                        <li><strong>Open Email Client</strong>: Attempts to open your default email client automatically. This may not work on all systems.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Custom animations for the page */}
        <style jsx="true">{`
          /* Fading and sliding animations */
          .animate-fade-in {
            animation: fadeIn 0.6s ease-out forwards;
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }
          
          .animation-delay-200 {
            animation-delay: 0.2s;
          }
          
          .animation-delay-400 {
            animation-delay: 0.4s;
          }
          
          .animation-delay-1000 {
            animation-delay: 1s;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
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
          
          .animate-morph {
            animation: morph 25s ease-in-out infinite;
          }
          
          .animate-scan-slow {
            animation: scan 15s ease-in-out infinite;
          }
          
          .animate-glow {
            animation: glow 4s ease-in-out infinite;
          }
          
          .animate-float-subtle {
            animation: floatSubtle 10s ease-in-out infinite;
          }
          
          .animate-pulse-once {
            animation: pulseOnce 2s ease-in-out;
          }
          
          /* Button animation */
          @keyframes pulseOnce {
            0%, 100% { 
              box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.3);
            }
            50% { 
              box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); 
            }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
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
          
          @keyframes morph {
            0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
            25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
            50% { border-radius: 50% 60% 30% 40% / 40% 30% 70% 60%; }
            75% { border-radius: 40% 60% 50% 70% / 60% 70% 40% 30%; }
          }
          
          @keyframes scan {
            0%, 100% { transform: translateX(-100%); opacity: 0; }
            50% { transform: translateX(100%); opacity: 1; }
          }
          
          @keyframes glow {
            0%, 100% { opacity: 0.4; box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); }
            50% { opacity: 0.8; box-shadow: 0 0 30px rgba(59, 130, 246, 0.8); }
          }
          
          @keyframes floatSubtle {
            0%, 100% { transform: translateY(0) rotate(12deg); }
            50% { transform: translateY(-10px) rotate(14deg); }
          }
          
          /* Mobile optimizations */
          @media (max-width: 640px) {
            .animate-fade-in, .animate-fade-in-up {
              animation-duration: 0.3s;
            }
          }
        `}</style>
      </div>
    </HelmetProvider>
  );
};

export default VolunteerPage;
