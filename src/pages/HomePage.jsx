import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaHandHoldingWater, FaBell } from "react-icons/fa";
import CountdownTimer from "../components/common/CountdownTimer";

export default function HomePage() {
  // Outage starts on May 30, 2025
  const outageStartDate = new Date("2025-05-30T00:00:00");

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Emfuleni Water Help
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Community Platform for the 16-Day Water Outage
            </p>
            
            <div className="bg-blue-800 inline-block p-4 rounded-lg mb-8">
              <CountdownTimer targetDate={outageStartDate} />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link
                to="/find-water"
                className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
              >
                Find Water Near You
              </Link>
              <Link
                to="/volunteer"
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg border border-white hover:bg-blue-700 transition"
              >
                Volunteer Your Borehole
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Connecting residents with water to those without during the 16-day outage
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <FaMapMarkerAlt className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Water</h3>
              <p className="text-gray-700">
                Locate nearby homes with boreholes willing to share water with the community
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <FaHandHoldingWater className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Volunteer</h3>
              <p className="text-gray-700">
                Have a borehole? Register to help your neighbors during this crisis
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <FaBell className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-700">
                Subscribe for updates on new water points and important announcements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Message */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            A Message from the Community
          </h2>
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            <p className="text-xl text-gray-700 italic">
              "This is not a municipal project. It's made by one of your own. Let's come together and survive this together. We don't need permission to help each other."
            </p>
          </div>
          <div className="mt-8">
            <Link
              to="/subscribe"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Subscribe for Updates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}