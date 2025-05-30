import { useState } from 'react';
import { FaCheckCircle, FaUsers } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Import the function if Firebase is set up, otherwise use a local mock
let joinCommunity;
try {
  // Try to import from Firebase
  joinCommunity = require('../../firebase/firestore').subscribeToUpdates;
} catch (error) {
  // If import fails, use mock implementation
  joinCommunity = async (email) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Mock community join for:', email);
    return true;
  };
}

export default function SubscriptionForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await joinCommunity(email);
      
      // Success
      setSubmitted(true);
      setEmail('');
      toast.success('Welcome to the water solidarity community!');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      toast.error('Joining failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6">
      {submitted ? (
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-5 w-full flex items-center border border-blue-200/50 shadow-sm">
          <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
            <FaUsers className="text-white text-xl" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-blue-800">Welcome to Our Community!</h3>
            <p className="text-blue-600">
              You're now connected with neighbors helping neighbors. We'll keep you updated on new water points in your area.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-blue-700 mb-1">
              Email Address
            </label>
            <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg border border-blue-300/50 bg-white/70 backdrop-blur-sm focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-400 text-blue-700 shadow-sm"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Join Community"
                )}
              </button>
            </div>
            {error && <p className="mt-2 text-sm text-red-600 bg-red-100/80 px-2 py-0.5 rounded">{error}</p>}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <ul className="flex flex-wrap mb-2 sm:mb-0">
              <li className="flex items-center text-sm text-blue-700 mr-4 mb-2 sm:mb-0">
                <svg className="h-4 w-4 text-blue-500 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Water point alerts</span>
              </li>
              <li className="flex items-center text-sm text-blue-700 mr-4 mb-2 sm:mb-0">
                <svg className="h-4 w-4 text-blue-500 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Community resources</span>
              </li>
              <li className="flex items-center text-sm text-blue-700">
                <svg className="h-4 w-4 text-blue-500 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Help opportunities</span>
              </li>
            </ul>
            <p className="text-sm text-blue-700">
              Your privacy is protected. Leave the community anytime.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}