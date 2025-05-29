import React, { useState, useRef } from 'react';
import { FaCheckCircle, FaWater, FaMapMarkerAlt, FaClock, FaList, FaPhoneAlt, FaEnvelope, FaExclamationCircle, FaCopy, FaDownload } from 'react-icons/fa';
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

        {/* Hero section */}
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-16 z-10 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute -right-20 -top-20 w-72 h-72 bg-white rounded-full opacity-10 animate-float-slow"></div>
            <div className="absolute left-10 bottom-10 w-48 h-48 bg-white rounded-full opacity-10 animate-float-medium"></div>
            <div className="absolute right-1/4 top-1/2 w-32 h-32 bg-white rounded-full opacity-10 animate-float-fast"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center text-white mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">Volunteer Your Water</h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
                Share your borehole water with your community during the Emfuleni water crisis
              </p>
            </div>
          </div>
          
          {/* Wave decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-24 text-gray-50 fill-current animate-wave">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
            </svg>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-12 gap-8">
            {/* Information column */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6 animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaWater className="text-blue-500 mr-2" />
                  Why Volunteer?
                </h2>
                <p className="text-gray-600 mb-4">
                  By volunteering your borehole water, you're providing an essential service to your community during the Emfuleni water crisis. Your contribution can help neighbors, the elderly, and families who don't have access to alternative water sources.
                </p>
                <div className="space-y-3 mt-6">
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <p className="ml-2 text-gray-700">Support your local community</p>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <p className="ml-2 text-gray-700">Help those without access to water</p>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <p className="ml-2 text-gray-700">Be listed on our water finder map</p>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <p className="ml-2 text-gray-700">Control your availability schedule</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 mb-6 animate-fade-in animation-delay-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaList className="text-blue-500 mr-2" />
                  Required Information
                </h2>
                <p className="text-gray-600 mb-4">
                  When you volunteer, we'll need the following information to list your water point on our map:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-2 flex-shrink-0">
                      <FaMapMarkerAlt className="text-blue-600" />
                    </div>
                    <span><strong>Location details:</strong> Your area, neighborhood, and address</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-2 flex-shrink-0">
                      <FaWater className="text-blue-600" />
                    </div>
                    <span><strong>Description:</strong> Brief info about your water source</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-2 flex-shrink-0">
                      <FaClock className="text-blue-600" />
                    </div>
                    <span><strong>Availability:</strong> Days and times when people can collect water</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-2 flex-shrink-0">
                      <FaPhoneAlt className="text-blue-600" />
                    </div>
                    <span><strong>Contact:</strong> Phone number and email for verification (not publicly displayed)</span>
                  </li>
                  {/* Add photo requirement */}
                  <li className="flex items-start">
                    <div className="bg-red-100 p-1 rounded-full mr-2 flex-shrink-0">
                      <FaExclamationCircle className="text-red-600" />
                    </div>
                    <span><strong>Photo:</strong> A clear image of your property/water point (to be attached to your email)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 animate-fade-in animation-delay-400">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaExclamationCircle className="text-blue-500 mr-2" />
                  How to Volunteer
                </h2>
                <div className="bg-indigo-50 p-4 rounded-lg mb-4">
                  <h3 className="text-indigo-800 font-semibold mb-2 flex items-center">
                    <FaEnvelope className="text-indigo-600 mr-2" />
                    Send Your Information by Email
                  </h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Fill out the form on this page, then send your information to:
                  </p>
                  <div className="bg-white p-2 rounded border border-indigo-200 flex items-center justify-between">
                    <span className="font-medium text-indigo-700">{contactEmail}</span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(contactEmail);
                        alert("Email copied to clipboard!");
                      }}
                      className="text-indigo-600 hover:text-indigo-800 p-1"
                      title="Copy email address"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
                
                <ol className="space-y-4 mt-4">
                  <li className="bg-blue-50 p-3 rounded-lg flex">
                    <span className="bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                    <div>
                      <p className="text-blue-800 font-medium">Fill the form completely</p>
                      <p className="text-gray-700 text-sm mt-1">
                        Enter all your information in the form to the right.
                      </p>
                    </div>
                  </li>
                  <li className="bg-blue-50 p-3 rounded-lg flex">
                    <span className="bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                    <div>
                      <p className="text-blue-800 font-medium">Click "Generate Email"</p>
                      <p className="text-gray-700 text-sm mt-1">
                        Once complete, click the button to automatically generate an email with your information.
                      </p>
                    </div>
                  </li>
                  <li className="bg-blue-50 p-3 rounded-lg flex">
                    <span className="bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                    <div>
                      <p className="text-blue-800 font-medium">Attach photo and send the email</p>
                      <p className="text-gray-700 text-sm mt-1">
                        Your default email client will open with your information pre-filled. Attach a photo of your property/water point and send the email.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
            
            {/* Form column */}
            <div className="md:col-span-7 lg:col-span-8">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Volunteer Registration Form</h2>
                
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Basic Information</h3>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Water Point Name or Title*
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="e.g., Smith Family Borehole, Three Rivers Water Station"
                          value={formData.name}
                          onChange={handleChange}
                          className="block w-full rounded-md border-2 border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3"
                        />
                        <p className="mt-1 text-xs text-gray-500">This is how your water point will be listed on the map</p>
                      </div>
                      <div>
                        <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                          Area*
                        </label>
                        <select
                          id="area"
                          name="area"
                          required
                          value={formData.area}
                          onChange={handleChange}
                          className="block w-full rounded-md border-2 border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3"
                        >
                          <option value="">Select an area</option>
                          {areasData.map(area => (
                            <option key={area.name} value={area.name}>{area.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="subArea" className="block text-sm font-medium text-gray-700 mb-1">
                          Neighborhood/Sub-Area*
                        </label>
                        <select
                          id="subArea"
                          name="subArea"
                          required
                          value={formData.subArea}
                          onChange={handleChange}
                          disabled={!formData.area}
                          className="block w-full rounded-md border-2 border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 py-3"
                        >
                          <option value="">Select neighborhood</option>
                          {getSubAreas().map(subArea => (
                            <option key={subArea} value={subArea}>{subArea}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
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
                          className="block w-full rounded-md border-2 border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="block w-full rounded-md border-2 border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3"
                      ></textarea>
                      <p className="mt-1 text-xs text-gray-500">Describe your water point and any relevant details for people who might collect water</p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Contact Information</h3>
                    <p className="text-sm text-gray-600 mb-4 bg-blue-50 p-3 rounded-lg">
                      <FaExclamationCircle className="inline-block text-blue-500 mr-2" />
                      This information will not be publicly displayed. It will be used only for verification and communication purposes.
                    </p>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
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
                          className="block w-full rounded-md border-2 border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                          className="block w-full rounded-md border-2 border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Availability</h3>
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
                            className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${
                              formData.availableDays.includes(day.id)
                                ? 'bg-indigo-100 text-indigo-800 font-medium border border-indigo-200'
                                : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-200'
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
                              <div key={dayId} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <h4 className="font-medium text-gray-800 mb-3">{day.name}</h4>
                                
                                {/* Time slot inputs for this day */}
                                <div className="space-y-3">
                                  {/* Morning slot */}
                                  <div className="flex items-center">
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
                                      Morning (6:00 AM - 12:00 PM)
                                    </label>
                                    
                                    {formData[`morning-${dayId}`] && (
                                      <div className="ml-6 flex items-center space-x-2">
                                        <select
                                          value={formData[`morning-start-${dayId}`] || "06:00"}
                                          onChange={(e) => handleChange({
                                            target: {
                                              name: `morning-start-${dayId}`,
                                              value: e.target.value
                                            }
                                          })}
                                          className="block rounded-md border-2 border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 text-sm"
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
                                          className="block rounded-md border-2 border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 text-sm"
                                        >
                                          {["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"].map(time => (
                                            <option key={time} value={time}>{time}</option>
                                          ))}
                                        </select>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Afternoon slot */}
                                  <div className="flex items-center">
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
                                      Afternoon (12:00 PM - 5:00 PM)
                                    </label>
                                    
                                    {formData[`afternoon-${dayId}`] && (
                                      <div className="ml-6 flex items-center space-x-2">
                                        <select
                                          value={formData[`afternoon-start-${dayId}`] || "12:00"}
                                          onChange={(e) => handleChange({
                                            target: {
                                              name: `afternoon-start-${dayId}`,
                                              value: e.target.value
                                            }
                                          })}
                                          className="block rounded-md border-2 border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 text-sm"
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
                                          className="block rounded-md border-2 border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 text-sm"
                                        >
                                          {["13:00", "14:00", "15:00", "16:00", "17:00"].map(time => (
                                            <option key={time} value={time}>{time}</option>
                                          ))}
                                        </select>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Evening slot */}
                                  <div className="flex items-center">
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
                                      Evening (5:00 PM - 9:00 PM)
                                    </label>
                                    
                                    {formData[`evening-${dayId}`] && (
                                      <div className="ml-6 flex items-center space-x-2">
                                        <select
                                          value={formData[`evening-start-${dayId}`] || "17:00"}
                                          onChange={(e) => handleChange({
                                            target: {
                                              name: `evening-start-${dayId}`,
                                              value: e.target.value
                                            }
                                          })}
                                          className="block rounded-md border-2 border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 text-sm"
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
                                          className="block rounded-md border-2 border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 text-sm"
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
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Preview</h3>
                      
                      {/* Add recipient info notice */}
                      <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
                        <p className="flex items-start">
                          <FaExclamationCircle className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong className="text-yellow-800">Important:</strong> When sending your email, please use <span className="font-medium">{contactEmail}</span> as the recipient address. This information will be automatically copied when you click "Copy Email with Address".
                          </span>
                        </p>
                      </div>
                      
                      {/* Add photo requirement */}
                      <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
                        <p className="flex items-start">
                          <FaExclamationCircle className="text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong className="text-red-800">Required:</strong> Please attach a photo of your property/water point to your email. This helps us verify your information and gives residents a visual reference of where to collect water.
                          </span>
                        </p>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4">
                        This is what will be sent when you click "Generate Email". You can review it before sending.
                      </p>
                      <div 
                        ref={emailContentRef} 
                        className="bg-white p-4 rounded-lg border border-gray-300 font-mono text-sm text-gray-700 whitespace-pre-wrap mb-4"
                      >
                        {generateEmailContent()}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <button
                        onClick={copyToClipboard}
                        disabled={!isFormComplete()}
                        className={`sm:flex-1 flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 ${!isFormComplete() ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <FaCopy className="mr-2" />
                        {copySuccess ? "Copied!" : "Copy Email Content (Recommended)"}
                      </button>
                      
                      <button
                        onClick={openEmailClient}
                        disabled={!isFormComplete()}
                        className={`sm:flex-1 flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm textBase font-medium text-white bg-indigo-600 hover:bg-indigo-700 ${!isFormComplete() ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                    
                    <div className="mt-4 bg-blue-50 p-3 rounded-lg text-sm">
                      <h4 className="font-medium text-blue-800 mb-1">Using the buttons above:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-gray-700">
                        <li><strong>Copy Email Content</strong>: Copies all information to your clipboard. Open your email client manually, create a new email to {contactEmail}, and paste the content.</li>
                        <li><strong>Open Email Client</strong>: Attempts to open your default email client automatically. This may not work on all systems.</li>
                      </ol>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-600">
                    <p className="flex items-start">
                      <FaExclamationCircle className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        If the "Generate Email" button doesn't open your email client, please use the "Copy Email with Address" button 
                        and manually paste the content into a new email to <span className="font-medium">{contactEmail}</span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Instructions at the bottom */}
              <div className="mt-6 bg-blue-50 rounded-xl p-4 shadow-sm animate-fade-in">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <FaExclamationCircle className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800 mb-1">What happens after you send your email?</h3>
                    <p className="text-sm text-gray-700">
                      After receiving your email, our team will review your information and may contact you to verify details. 
                      Once verified, your water point will be added to our map within 24-48 hours. You'll receive a confirmation 
                      email when your listing goes live.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default VolunteerPage;
