import { FaSearchLocation, FaHandHoldingWater, FaBell, FaQuoteLeft, FaQuoteRight, FaArrowRight } from 'react-icons/fa';
import { MdOutlineWaterDrop } from 'react-icons/md';
import SubscriptionForm from '../components/features/SubscriptionForm';
import Slider from '../components/ui/Slider';

export default function HomePage() {
  const slides = [
    {
      id: 1,
      image: "https://media.istockphoto.com/id/1433126431/photo/silhouette-of-climbers-who-climbed-to-the-top-of-the-mountain-thanks-to-mutual-assistance-and.jpg?s=612x612&w=0&k=20&c=qYdKGrhdKAPQiCEfWdTau8lSFSDW8Zy3hWklA6-78Qg=",
      title: "Together As One",
      subtitle: "Community Support During the 16-Day Water Outage"
    },
    {
      id: 2,
      image: "https://crenshawcomm.com/wp-content/uploads/2020/08/cover_image_1591715803.jpg.760x400_q85_crop_upscale.jpg",
      title: "Neighbors Helping Neighbors",
      subtitle: "Find Water Access Points Near You"
    },
    {
      id: 3,
      image: "https://www.ethiocec.org/img/help.jpeg",
      title: "Volunteer Your Resources",
      subtitle: "Share Your Borehole Water With Those In Need"
    }
  ];

  return (
    <div className="overflow-x-hidden bg-gray-50">
      {/* Hero Slider */}
      <Slider slides={slides} />

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 relative">
                How This Community Platform Works
                <div className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
              </h2>
            </div>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our platform connects residents who need water with those who can share, making it easier to navigate through the outage together.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* Find Water Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <div className="p-8">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center shadow-md mx-auto">
                    <FaSearchLocation className="text-white text-3xl" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 text-center group-hover:text-indigo-600 transition-colors">Find Water</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Use your location or search by area to find nearby homes offering water access during specific times.
                </p>
                <div className="mt-6 text-center">
                  <a href="/find-water" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-500 transition-colors group/link">
                    Find nearby water
                    <FaArrowRight className="ml-2 text-sm transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Share Water Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <div className="p-8">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center shadow-md mx-auto">
                    <FaHandHoldingWater className="text-white text-3xl" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 text-center group-hover:text-indigo-600 transition-colors">Share Water</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Residents with boreholes can volunteer to share with neighbors during their available hours.
                </p>
                <div className="mt-6 text-center">
                  <a href="/share-water" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-500 transition-colors group/link">
                    Register your borehole
                    <FaArrowRight className="ml-2 text-sm transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Stay Updated Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <div className="p-8">
                <div className="bg-gradient-to-br from-teal-50 to-indigo-50 rounded-2xl p-6 mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-teal-500 to-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center shadow-md mx-auto">
                    <FaBell className="text-white text-3xl" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 text-center group-hover:text-indigo-600 transition-colors">Stay Updated</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Subscribe for updates about new water points, changes, and important announcements during the outage.
                </p>
                <div className="mt-6 text-center">
                  <a href="#subscribe" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-500 transition-colors group/link">
                    Get notifications
                    <FaArrowRight className="ml-2 text-sm transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-white text-4xl md:text-5xl font-bold">200+</div>
              <div className="text-indigo-100 mt-2 text-lg">Water Points</div>
            </div>
            <div className="text-center">
              <div className="text-white text-4xl md:text-5xl font-bold">1,800+</div>
              <div className="text-indigo-100 mt-2 text-lg">Community Members</div>
            </div>
            <div className="text-center">
              <div className="text-white text-4xl md:text-5xl font-bold">15K+</div>
              <div className="text-indigo-100 mt-2 text-lg">Liters Shared</div>
            </div>
            <div className="text-center">
              <div className="text-white text-4xl md:text-5xl font-bold">50+</div>
              <div className="text-indigo-100 mt-2 text-lg">Neighborhoods</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Message */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-3 p-10 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  A Message from Your Neighbor
                </h2>
                <div className="relative">
                  <FaQuoteLeft className="absolute -top-4 -left-2 text-4xl text-indigo-100" />
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed pl-4">
                    This is not a municipal project. It's made by one of your own. Let's come together and survive this together. We don't need permission to help each other.
                  </p>
                  <FaQuoteRight className="absolute -bottom-4 right-0 text-4xl text-indigo-100" />
                </div>
                <div className="mt-10 flex items-center">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-400 w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
                    EM
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-gray-800">Emfuleni Resident</p>
                    <p className="text-gray-500">Vaal Community Member</p>
                  </div>
                </div>
              </div>
              <div className="hidden md:block md:col-span-2 bg-gradient-to-br from-indigo-500 to-purple-600 relative">
                <div className="absolute inset-0 opacity-20">
                  <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#water-pattern)" />
                  </svg>
                  <defs>
                    <pattern id="water-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M5,2.5 Q7.5,0 10,2.5 T15,2.5" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                  </defs>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <MdOutlineWaterDrop className="text-white text-9xl opacity-40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Form */}
      <section id="subscribe" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-10">
              <div className="text-center mb-10">
                <div className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 p-3 rounded-2xl mb-4">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-14 h-14 rounded-xl flex items-center justify-center">
                    <FaBell className="text-white text-2xl" />
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  Stay Updated
                </h2>
                <p className="text-gray-600 text-lg max-w-xl mx-auto">
                  Subscribe to receive updates about new water points, changes, and important announcements.
                </p>
              </div>
              <SubscriptionForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}