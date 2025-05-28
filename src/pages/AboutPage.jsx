import { Link } from "react-router-dom";
import { FaWater, FaUsers, FaHandHoldingWater, FaQuestionCircle } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            About Emfuleni Water Help
          </h1>
          <p className="text-lg text-gray-600">
            A community-driven platform connecting residents during the 16-day water outage
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
          <div className="bg-blue-600 text-white p-6">
            <h2 className="text-2xl font-semibold">The Situation</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-4">
              From May 30, 2025, Emfuleni Local Municipality residents will face a 16-day water outage due to critical infrastructure repairs. This decision has caused significant public concern and will leave thousands of people without reliable access to water.
            </p>
            <p className="text-gray-700 mb-4">
              While the repairs are necessary for the long-term stability of our water supply, the immediate impact on daily life will be substantial. Many households, especially those without storage tanks or alternative water sources, will struggle during this period.
            </p>
            <p className="text-gray-700">
              This platform was created as a community response to help residents support each other during this challenging time.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
          <div className="bg-blue-600 text-white p-6">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
          </div>
          <div className="p-6">
            <div className="flex items-start mb-6">
              <FaUsers className="text-blue-600 text-2xl mt-1 mr-4" />
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Community-Driven Solution</h3>
                <p className="text-gray-700">
                  This is not a government or municipal initiative. It's a platform built by a resident of Emfuleni, for the people of Emfuleni. We believe that our community can come together to help each other through difficult times.
                </p>
              </div>
            </div>
            
            <div className="flex items-start mb-6">
              <FaHandHoldingWater className="text-blue-600 text-2xl mt-1 mr-4" />
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Connecting Resources</h3>
                <p className="text-gray-700">
                  Our platform connects residents who have borehole water with those who need it. By facilitating this sharing of resources, we aim to help our community survive this water outage with minimal disruption to daily life.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FaWater className="text-blue-600 text-2xl mt-1 mr-4" />
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Free Access for All</h3>
                <p className="text-gray-700">
                  All water sharing through this platform is voluntary and free. We believe that access to water is a basic human right, and during a crisis, we should help each other without expectation of payment.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
          <div className="bg-blue-600 text-white p-6">
            <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h3 className="flex items-center text-lg font-medium text-gray-900 mb-2">
                <FaQuestionCircle className="text-blue-600 mr-2" />
                Is this an official municipal project?
              </h3>
              <p className="text-gray-700 pl-7">
                No, this is not affiliated with any government or municipal entity. It's a citizen-led initiative created to help our community during the water outage.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="flex items-center text-lg font-medium text-gray-900 mb-2">
                <FaQuestionCircle className="text-blue-600 mr-2" />
                How can I trust the water sources?
              </h3>
              <p className="text-gray-700 pl-7">
                All water points are from private boreholes in residential homes. The water is the same that the homeowners use themselves. However, if you have concerns about water quality, we recommend boiling water before drinking.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="flex items-center text-lg font-medium text-gray-900 mb-2">
                <FaQuestionCircle className="text-blue-600 mr-2" />
                Do I need to pay for water?
              </h3>
              <p className="text-gray-700 pl-7">
                No. All water sharing through this platform is completely free. The homeowners are volunteering their resources to help the community.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="flex items-center text-lg font-medium text-gray-900 mb-2">
                <FaQuestionCircle className="text-blue-600 mr-2" />
                How do I volunteer my borehole?
              </h3>
              <p className="text-gray-700 pl-7">
                If you have a borehole and would like to help, please visit our <Link to="/volunteer" className="text-blue-600 hover:underline">Volunteer page</Link> and fill out the form. We'll review your information and add your water point to the map.
              </p>
            </div>
            
            <div>
              <h3 className="flex items-center text-lg font-medium text-gray-900 mb-2">
                <FaQuestionCircle className="text-blue-600 mr-2" />
                How can I get updates about new water points?
              </h3>
              <p className="text-gray-700 pl-7">
                You can <Link to="/subscribe" className="text-blue-600 hover:underline">subscribe to our updates</Link> with your email address. We'll send notifications about new water points and important announcements.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Join Our Community Effort</h2>
          <p className="text-lg text-blue-700 mb-6">
            Together, we can get through this water outage by helping each other.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/volunteer"
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Volunteer Your Borehole
            </Link>
            <Link
              to="/find-water"
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg border border-blue-300 hover:bg-blue-50 transition"
            >
              Find Water Near You
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}