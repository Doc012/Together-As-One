import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaWhatsapp, 
  FaFacebook, 
  FaTwitter,
  FaCheck,
  FaExclamationTriangle,
  FaSpinner,
  FaCopy
} from 'react-icons/fa';

const ContactPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general',
  });
  
  // Form submission state
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    error: null,
    loading: false
  });

  // Copy to clipboard state
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Contact email where messages should be sent
  const contactEmail = "info@togetherasone.org.za";

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate email content from form data
  const generateContactEmailContent = () => {
    return `
CONTACT FORM SUBMISSION

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Inquiry Type: ${formData.type}
Subject: ${formData.subject || 'No subject'}

Message:
${formData.message}
    `.trim();
  };
  
  // Check if required fields are filled
  const isFormValid = () => {
    return formData.name && formData.email && formData.message;
  };
  
  // Copy email content to clipboard with validation
  const copyContactToClipboard = () => {
    // Don't need explicit validation here since button will be disabled
    const emailContent = generateContactEmailContent();
    const completeContent = `--- EMAIL INFORMATION ---
TO: ${contactEmail}
SUBJECT: ${formData.subject || 'Website Contact Form'}
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
    // Don't need explicit validation here since button will be disabled
    try {
      const subject = encodeURIComponent(formData.subject || "Website Contact Form");
      const body = encodeURIComponent(generateContactEmailContent());
      
      const mailtoLink = document.createElement('a');
      mailtoLink.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
      mailtoLink.style.display = 'none';
      document.body.appendChild(mailtoLink);
      
      mailtoLink.click();
      
      setTimeout(() => {
        document.body.removeChild(mailtoLink);
      }, 100);
      
      // Don't set success state here - email is not actually sent yet
      // Just provide temporary feedback that email client is opening
      setFormStatus({ 
        submitted: false, 
        success: false, 
        error: null, 
        loading: false 
      });
      
    } catch (error) {
      console.error("Error opening email client:", error);
      
      alert(`Unable to open your email client automatically. Please send an email to ${contactEmail} with your message or use the Copy button.`);
      
      // Only copy if validation passed (which it should be since button was enabled)
      copyContactToClipboard();
    }
  };

  // Regular form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitted: false, success: false, error: null, loading: true });
    
    // We don't need to check validity here since the button will be disabled if invalid
    // But we'll keep it as a safeguard
    if (!isFormValid()) {
      setFormStatus({
        submitted: false,
        success: false,
        error: null,
        loading: false
      });
      return;
    }
    
    // Set loading state briefly to show feedback
    setTimeout(() => {
      setFormStatus({ 
        submitted: false, 
        success: false, 
        error: null, 
        loading: false 
      });
      // Open email client instead of showing success message
      openContactEmailClient();
    }, 300);
  };

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
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-blue-700 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Reach out to our team for support, questions, or collaboration opportunities
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Email Contact */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-100 p-6 transform transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
            <div className="flex items-center mb-4">
              <div className="bg-blue-50 p-3 rounded-full mr-3">
                <FaEnvelope className="text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              Our team typically responds to emails within 24 hours during business days.
            </p>
            
            <div className="space-y-2">
              <a 
                href="mailto:info@togetherasone.org.za" 
                className="block text-blue-600 hover:text-blue-700 transition-colors"
              >
                info@togetherasone.org.za
              </a>
              <a 
                href="mailto:support@togetherasone.org.za" 
                className="block text-blue-600 hover:text-blue-700 transition-colors"
              >
                support@togetherasone.org.za
              </a>
            </div>
          </div>
          
          {/* Phone Contact */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-100 p-6 transform transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
            <div className="flex items-center mb-4">
              <div className="bg-green-50 p-3 rounded-full mr-3">
                <FaPhone className="text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Call or WhatsApp</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              Available Monday to Friday, 8:00 AM - 5:00 PM (South African Time)
            </p>
            
            <div className="space-y-2">
              <a 
                href="tel:+27123456789" 
                className="block text-gray-800 hover:text-blue-600 transition-colors"
              >
                +27 12 345 6789
              </a>
              <a 
                href="https://wa.me/27123456789" 
                className="flex items-center text-green-600 hover:text-green-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="mr-2" /> WhatsApp Support
              </a>
            </div>
          </div>
          
          {/* Social Media */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-100 p-6 transform transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
            <div className="flex items-center mb-4">
              <div className="bg-purple-50 p-3 rounded-full mr-3">
                <FaMapMarkerAlt className="text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Find Us</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              Based in the Emfuleni Municipality area of Gauteng, South Africa.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-3 rounded-full transition-colors"
              >
                <FaFacebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-100 hover:bg-blue-200 text-blue-500 p-3 rounded-full transition-colors"
              >
                <FaTwitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-red-100 hover:bg-red-200 text-red-500 p-3 rounded-full transition-colors"
              >
                <FaMapMarkerAlt size={20} />
                <span className="sr-only">Google Maps</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Contact Form and Information */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100 mb-16">
          <div className="md:flex">
            {/* Contact Form */}
            <div className="md:w-2/3 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              
              {/* Form Status Messages */}
              {formStatus.submitted && (
                <div className={`mb-6 p-4 rounded-lg ${
                  formStatus.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  <div className="flex items-start">
                    {formStatus.success ? (
                      <FaCheck className="mt-1 mr-2 flex-shrink-0" />
                    ) : (
                      <FaExclamationTriangle className="mt-1 mr-2 flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-medium">
                        {formStatus.success ? 'Message sent successfully!' : 'There was a problem sending your message.'}
                      </p>
                      {!formStatus.success && formStatus.error && (
                        <p className="mt-1 text-sm">{formStatus.error}</p>
                      )}
                      {formStatus.success && (
                        <p className="mt-1 text-sm">We'll get back to you as soon as possible.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Contact Form */}
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Optional"
                    />
                  </div>
                  
                  {/* Inquiry Type Field */}
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                      Inquiry Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="volunteer">Volunteer Registration</option>
                      <option value="provider">Water Provider Issues</option>
                      <option value="seeker">Water Seeker Issues</option>
                      <option value="partnership">Partnership Opportunities</option>
                    </select>
                  </div>
                </div>
                
                {/* Subject Field */}
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="What is your message about?"
                  />
                </div>
                
                {/* Message Field */}
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Please provide details about your inquiry..."
                    required
                  ></textarea>
                </div>
                
                {/* Email Options */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                  <button
                    type="button"
                    onClick={copyContactToClipboard}
                    disabled={!isFormValid()}
                    className={`sm:flex-1 flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium ${
                      isFormValid() 
                        ? "text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02]" 
                        : "text-gray-400 bg-gray-100 cursor-not-allowed"
                    }`}
                  >
                    <FaCopy className="mr-2" />
                    {copySuccess ? "Copied to Clipboard!" : "Copy Email Content"}
                  </button>
                  
                  <button
                    type="button"
                    onClick={openContactEmailClient}
                    disabled={!isFormValid()}
                    className={`sm:flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-md text-base font-medium ${
                      isFormValid() 
                        ? "text-white bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg" 
                        : "text-gray-100 bg-gradient-to-r from-blue-300 to-sky-300 cursor-not-allowed"
                    }`}
                  >
                    <FaEnvelope className="mr-2" />
                    Open Email Client
                  </button>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg text-sm mb-6">
                  <div className="flex items-start">
                    <FaExclamationTriangle className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-800 mb-1">Using the buttons above:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-blue-700 ml-1">
                        <li><strong>Copy Email Content</strong>: Copies your message to clipboard. You can then paste it into your email client.</li>
                        <li><strong>Open Email Client</strong>: Opens your default email app with this message. May not work on all devices.</li>
                      </ol>
                      {!isFormValid() && (
                        <p className="mt-2 text-blue-600 italic">Fill out all required fields to enable these options.</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid() || formStatus.loading}
                  className={`px-6 py-3 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isFormValid() && !formStatus.loading
                      ? "bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      : "bg-blue-300 text-white cursor-not-allowed"
                  }`}
                >
                  {formStatus.loading ? (
                    <span className="flex items-center">
                      <FaSpinner className="animate-spin mr-2" />
                      Processing...
                    </span>
                  ) : (
                    'Submit Form'
                  )}
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="md:w-1/3 bg-blue-50 p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
              
              <div className="space-y-6">
                <p className="text-gray-600">
                  If you have questions about water sharing, need technical support, or want to learn more about our community initiatives, please reach out. We're here to help!
                </p>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Operating Hours</h4>
                  <p className="text-gray-600">
                    Monday - Friday: 8:00 AM - 5:00 PM (SAST)<br />
                    Saturday: 9:00 AM - 1:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Response Time</h4>
                  <p className="text-gray-600">
                    We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line.
                  </p>
                </div>
                
                <div className="pt-6 border-t border-blue-200">
                  <Link 
                    to="/faq"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    View our FAQ
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Emergency Contact Section */}
        <div className="bg-red-50 rounded-xl shadow-md overflow-hidden border border-red-100 mb-16 p-6">
          <div className="flex items-start">
            <div className="bg-red-100 p-3 rounded-full mr-4 mt-1">
              <FaExclamationTriangle className="text-red-500" />
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Emergency Water Situations</h2>
              <p className="text-gray-700 mb-4">
                For emergency situations such as water main breaks, sewage leaks, or other critical water infrastructure issues, please contact your local municipality directly:
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-1">Emfuleni Municipality</h4>
                  <a href="tel:0861754311" className="text-red-600 hover:text-red-700 transition-colors">
                    0861 754 311
                  </a>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-1">Johannesburg Water</h4>
                  <a href="tel:0113755555" className="text-red-600 hover:text-red-700 transition-colors">
                    011 375 5555
                  </a>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-1">Rand Water</h4>
                  <a href="tel:0860106456" className="text-red-600 hover:text-red-700 transition-colors">
                    0860 10 10 60
                  </a>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 italic">
                Note: Together As One is a community water sharing network and not affiliated with municipal water services. We cannot respond to municipal infrastructure emergencies.
              </p>
            </div>
          </div>
        </div>
        
        {/* Media Inquiries Section */}
        <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-md overflow-hidden border border-blue-100 mb-16 p-6">
          <div className="md:flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4 mb-4 md:mb-0">
              <FaEnvelope className="text-blue-500" />
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Media Inquiries</h2>
              <p className="text-gray-700 mb-4">
                Journalists and media representatives seeking information about Together As One, our community impact, or water sharing initiatives can contact our media relations team at <a href="mailto:media@togetherasone.org.za" className="text-blue-600 hover:text-blue-800 font-medium">media@togetherasone.org.za</a>.
              </p>
            </div>
          </div>
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
        
        .animation-delay-200 {
          animation-delay: 0.2s;
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
      `}</style>
    </div>
  );
};

export default ContactPage;
