import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { FaEnvelope, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function SubscribePage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      setSubmitting(false);
      return;
    }

    try {
      // Add document to "subscribers" collection
      await addDoc(collection(db, "subscribers"), {
        email: email,
        subscribedAt: Timestamp.now(),
      });

      toast.success("You've been subscribed successfully!");
      setSubmitting(false);
      setSubscribed(true);
      setEmail("");
    } catch (error) {
      console.error("Error adding subscriber: ", error);
      toast.error("Failed to subscribe. Please try again.");
      setSubmitting(false);
    }
  };

  if (subscribed) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6 flex justify-center">
              <div className="bg-green-100 p-3 rounded-full">
                <FaCheck className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Subscription Confirmed!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for subscribing to Emfuleni Water Help updates.
            </p>
            <p className="text-gray-600 mb-8">
              We'll keep you informed about new water points, important
              announcements, and any changes to the platform during the water
              outage.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/"
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Back to Home
              </Link>
              <Link
                to="/find-water"
                className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg border border-blue-300 hover:bg-blue-50 transition"
              >
                Find Water Points
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Subscribe for Updates
          </h1>
          <p className="text-lg text-gray-600">
            Stay informed about new water points and important announcements
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
          <div className="bg-blue-600 text-white p-6">
            <h2 className="text-2xl font-semibold">Why Subscribe?</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <FaEnvelope className="flex-shrink-0 h-6 w-6 text-blue-600 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    New Water Points
                  </h3>
                  <p className="mt-1 text-gray-600">
                    Be the first to know when new volunteer locations are added to
                    the platform.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <FaEnvelope className="flex-shrink-0 h-6 w-6 text-blue-600 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    Emergency Updates
                  </h3>
                  <p className="mt-1 text-gray-600">
                    Receive important announcements about the water outage or
                    changes to the schedule.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <FaEnvelope className="flex-shrink-0 h-6 w-6 text-blue-600 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    Community Information
                  </h3>
                  <p className="mt-1 text-gray-600">
                    Get useful resources and tips to help you manage during the
                    water outage period.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 text-white p-6">
            <h2 className="text-2xl font-semibold">Sign Up Now</h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="relative flex items-start mb-6">
                <div className="flex h-5 items-center">
                  <input
                    id="privacy"
                    type="checkbox"
                    required
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="privacy"
                    className="font-medium text-gray-700"
                  >
                    I agree to receive email updates
                  </label>
                  <p className="text-gray-500">
                    We'll only send important information related to the water
                    outage. You can unsubscribe at any time.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-70"
              >
                {submitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}