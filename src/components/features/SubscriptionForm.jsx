import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Import the function if Firebase is set up, otherwise use a local mock
let subscribeToUpdates;
try {
  // Try to import from Firebase
  subscribeToUpdates = require('../../firebase/firestore').subscribeToUpdates;
} catch (error) {
  // If import fails, use mock implementation
  subscribeToUpdates = async (email) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Mock subscription for:', email);
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
      await subscribeToUpdates(email);
      
      // Success
      setSubmitted(true);
      setEmail('');
      toast.success('Successfully subscribed to updates!');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      toast.error('Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {submitted ? (
        <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center">
          <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You for Subscribing!</h3>
          <p className="text-gray-600">
            You'll start receiving water updates and important announcements soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
              required
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Subscribe for Updates"
              )}
            </button>
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            We respect your privacy and will never share your information.
            You can unsubscribe at any time.
          </p>
        </form>
      )}
    </div>
  );
}