import { useState } from "react";
import { FaUser, FaHome, FaClock, FaEnvelope, FaPhone, FaImage, FaInfoCircle } from "react-icons/fa";
import toast from "react-hot-toast";

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    area: "",
    availableTimes: "",
    email: "",
    phone: "",
    image: null,
    additionalInfo: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image file is too large. Maximum size is 5MB.");
        return;
      }
      
      setFormData(prev => ({ ...prev, image: file }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.address || !formData.email || !formData.availableTimes) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call to submit form
    // In a real application, this would send data to the backend
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      toast.success("Your volunteer submission has been received!");
    }, 1500);
  };
  
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Volunteer Your Borehole
          </h1>
          <p className="text-lg text-gray-600">
            If you have a borehole and would like to help your community during the water outage, please fill out this form
          </p>
        </div>
        
        {success ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="rounded-full bg-green-100 mx-auto flex items-center justify-center h-16 w-16">
              <FaCheck className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-gray-900">Thank You for Volunteering!</h2>
            <p className="mt-2 text-gray-600">
              Your submission has been received. We'll review your information and add your water point to the map soon.
              Thank you for supporting your community during this difficult time.
            </p>
            <p className="mt-4 text-gray-600">
              If you have any questions, please contact us at support@emfuleniwaterhelp.co.za
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  House Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaHome className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your complete address"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                  Area/Suburb <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  required
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="e.g., Vanderbijlpark, Vereeniging, Sebokeng"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="availableTimes" className="block text-sm font-medium text-gray-700 mb-1">
                  Available Times <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaClock className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="availableTimes"
                    name="availableTimes"
                    required
                    value={formData.availableTimes}
                    onChange={handleChange}
                    placeholder="e.g., Weekdays: 6AM-8AM, Weekends: 9AM-11AM"
                    rows="3"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  House Image (Helps people identify your house)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaImage className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Please upload a photo of your house (front view) to help people identify it. Max 5MB.
                </p>
              </div>
              
              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 pt-2 pointer-events-none">
                    <FaInfoCircle className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    placeholder="Any additional details or instructions for visitors"
                    rows="3"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    "Submit Volunteer Application"
                  )}
                </button>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> Your personal contact information will not be displayed publicly.
                  Only your house location, photo, and available times will be shown to users.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}