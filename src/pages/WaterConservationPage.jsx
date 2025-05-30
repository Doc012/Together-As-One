import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaWater, 
  FaShower, 
  FaToilet, 
  FaTint, 
  FaLeaf, 
  FaSeedling,
  FaHandHoldingWater,
  FaHome,
  FaCheck,
  FaInfoCircle,
  FaArrowRight,
  FaRegLightbulb
} from 'react-icons/fa';

const WaterConservationPage = () => {
  // State to track active tip categories
  const [activeCategory, setActiveCategory] = useState('all');

  // Function to filter tips by category
  const filterTips = (category) => {
    setActiveCategory(category);
  };

  // Water saving tips data
  const waterTips = [
    {
      id: 'bathroom-1',
      category: 'bathroom',
      title: 'Shorter Showers',
      description: 'Take shorter showers of 2-3 minutes instead of baths. A typical bath uses 80-150 liters, while a 3-minute shower uses about 40-60 liters.',
      saving: 'Saves up to 90 liters per bath avoided',
      icon: <FaShower className="text-blue-500" />,
      difficulty: 'easy'
    },
    {
      id: 'bathroom-2',
      category: 'bathroom',
      title: 'Bucket in Shower',
      description: 'Place a bucket in the shower to catch water while it\'s heating up. Use this grey water for flushing toilets or watering plants.',
      saving: 'Saves up to 10 liters per shower',
      icon: <FaWater className="text-blue-500" />,
      difficulty: 'easy'
    },
    {
      id: 'bathroom-3',
      category: 'bathroom',
      title: 'Low-Flow Showerhead',
      description: 'Install a low-flow or water-saving showerhead. These can reduce water usage by up to 40% without reducing pressure significantly.',
      saving: 'Saves up to 6 liters per minute',
      icon: <FaShower className="text-blue-500" />,
      difficulty: 'medium'
    },
    {
      id: 'bathroom-4',
      category: 'bathroom',
      title: 'Toilet Water Saving',
      description: 'Place a filled water bottle or brick in your toilet cistern to reduce the amount of water used per flush. Make sure it doesn\'t interfere with the flushing mechanism.',
      saving: 'Saves 1-3 liters per flush',
      icon: <FaToilet className="text-blue-500" />,
      difficulty: 'easy'
    },
    {
      id: 'bathroom-5',
      category: 'bathroom',
      title: 'Fix Leaking Toilets',
      description: 'Check for toilet leaks by adding food coloring to the tank. If color appears in the bowl without flushing, you have a leak that needs fixing.',
      saving: 'Saves up to 400 liters per day',
      icon: <FaTint className="text-blue-500" />,
      difficulty: 'medium'
    },
    {
      id: 'kitchen-1',
      category: 'kitchen',
      title: 'Efficient Dishwashing',
      description: 'When washing dishes by hand, don\'t let the water run. Fill one basin with wash water and the other with rinse water, or use a dishpan.',
      saving: 'Saves up to 50 liters per dishwashing session',
      icon: <FaWater className="text-blue-500" />,
      difficulty: 'easy'
    },
    {
      id: 'kitchen-2',
      category: 'kitchen',
      title: 'Full Loads Only',
      description: 'Only run your dishwasher when it\'s full. This maximizes water efficiency and reduces the number of cycles needed.',
      saving: 'Saves 15-30 liters per load avoided',
      icon: <FaHome className="text-blue-500" />,
      difficulty: 'easy'
    },
    {
      id: 'kitchen-3',
      category: 'kitchen',
      title: 'Reuse Cooking Water',
      description: 'Save the water used for cooking pasta or vegetables and use it to water plants after it cools. This water contains nutrients that plants can use.',
      saving: 'Saves 3-5 liters per cooking session',
      icon: <FaSeedling className="text-blue-500" />,
      difficulty: 'easy'
    },
    {
      id: 'kitchen-4',
      category: 'kitchen',
      title: 'Defrost in Refrigerator',
      description: 'Defrost frozen foods in the refrigerator instead of using running water. This saves water and is safer for food handling.',
      saving: 'Saves 5-15 liters per item defrosted',
      icon: <FaWater className="text-blue-500" />,
      difficulty: 'easy'
    },
    {
      id: 'kitchen-5',
      category: 'kitchen',
      title: 'Water-Efficient Appliances',
      description: 'When replacing appliances, choose water-efficient models with high water efficiency ratings.',
      saving: 'Saves up to 50% of water usage',
      icon: <FaHome className="text-blue-500" />,
      difficulty: 'hard'
    },
    {
      id: 'laundry-1',
      category: 'laundry',
      title: 'Full Washing Machine',
      description: 'Only run your washing machine with full loads. This maximizes efficiency and reduces the number of loads needed.',
      saving: 'Saves 30-100 liters per load avoided',
      icon: <FaWater className="text-blue-500" />,
      difficulty: 'easy'
    },
    {
      id: 'laundry-2',
      category: 'laundry',
      title: 'Reuse Laundry Water',
      description: 'Consider installing a greywater system to reuse washing machine water for garden irrigation or toilet flushing.',
      saving: 'Saves up to 100 liters per load',
      icon: <FaHandHoldingWater className="text-blue-500" />,
      difficulty: 'hard'
    },
    {
      id: 'laundry-3',
      category: 'laundry',
      title: 'Efficient Wash Cycle',
      description: 'Use the shortest effective wash cycle for your clothes, and consider skipping the extra rinse cycle if your clothes aren\'t heavily soiled.',
      saving: 'Saves 20-40 liters per load',
      icon: <FaWater className="text-blue-500" />,
      difficulty: 'easy'
    },
    {
      id: 'garden-1',
      category: 'garden',
      title: 'Water During Cool Hours',
      description: 'Water your garden early in the morning or late in the evening when temperatures are cooler to minimize evaporation.',
      saving: 'Reduces water needs by up to 30%',
      icon: <FaSeedling className="text-blue-500" />,
      difficulty: 'easy'
    },
    {
      id: 'garden-2',
      category: 'garden',
      title: 'Mulching',
      description: 'Apply mulch around plants to reduce evaporation, suppress weeds, and improve soil health. This reduces watering frequency significantly.',
      saving: 'Reduces water needs by up to 70%',
      icon: <FaLeaf className="text-blue-500" />,
      difficulty: 'medium'
    },
    {
      id: 'garden-3',
      category: 'garden',
      title: 'Indigenous Plants',
      description: 'Plant indigenous, drought-resistant plants that are adapted to local rainfall patterns and require less additional watering.',
      saving: 'Reduces garden water usage by up to 50-75%',
      icon: <FaSeedling className="text-blue-500" />,
      difficulty: 'medium'
    },
    {
      id: 'garden-4',
      category: 'garden',
      title: 'Rainwater Harvesting',
      description: 'Install a rainwater tank to collect roof runoff. This water is perfect for garden use and can significantly reduce municipal water dependency.',
      saving: 'Can collect 1000+ liters per rainfall',
      icon: <FaHandHoldingWater className="text-blue-500" />,
      difficulty: 'hard'
    },
    {
      id: 'garden-5',
      category: 'garden',
      title: 'Drip Irrigation',
      description: 'Install a drip irrigation system for garden beds and potted plants. This delivers water directly to plant roots with minimal waste.',
      saving: 'Reduces garden water usage by up to 60%',
      icon: <FaTint className="text-blue-500" />,
      difficulty: 'medium'
    },
    {
      id: 'general-1',
      category: 'general',
      title: 'Fix Leaking Taps',
      description: 'A tap dripping at one drop per second wastes about 10,000 liters per year. Fix leaking taps by replacing washers or cartridges.',
      saving: 'Saves up to 30 liters per day per tap',
      icon: <FaTint className="text-blue-500" />,
      difficulty: 'medium'
    },
    {
      id: 'general-2',
      category: 'general',
      title: 'Turn Off Taps',
      description: 'Turn off taps tightly and make sure they don\'t drip. Teach children to turn taps off properly after use.',
      saving: 'Prevents waste of 5-20 liters per day',
      icon: <FaWater className="text-blue-500" />,
      difficulty: 'easy'
    },
    {
      id: 'general-3',
      category: 'general',
      title: 'Water Meter Monitoring',
      description: 'Check your water meter regularly to monitor usage and identify potential leaks. Record readings at night and in the morning to detect hidden leaks.',
      saving: 'Can identify leaks saving 100+ liters per day',
      icon: <FaInfoCircle className="text-blue-500" />,
      difficulty: 'medium'
    }
  ];

  // Get all unique categories
  const categories = ['all', ...new Set(waterTips.map(tip => tip.category))];

  // Filter tips based on active category
  const filteredTips = activeCategory === 'all' 
    ? waterTips 
    : waterTips.filter(tip => tip.category === activeCategory);

  // Functions to get difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  // Function to get category name for display
  const getCategoryName = (category) => {
    switch(category) {
      case 'bathroom': return 'Bathroom';
      case 'kitchen': return 'Kitchen';
      case 'laundry': return 'Laundry';
      case 'garden': return 'Garden';
      case 'general': return 'General';
      case 'all': return 'All Tips';
      default: return category;
    }
  };

  // Function to get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'bathroom': return <FaShower />;
      case 'kitchen': return <FaHome />;
      case 'laundry': return <FaWater />;
      case 'garden': return <FaSeedling />;
      case 'general': return <FaTint />;
      case 'all': return <FaRegLightbulb />;
      default: return <FaWater />;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50/50">
      {/* Hero Section with animated background */}
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
          
          <div className="absolute left-1/4 top-1/3 w-6 h-6 bg-blue-400/30 rounded-full 
                          transform-gpu animate-ping-slow"></div>
          <div className="absolute right-1/3 bottom-1/4 w-4 h-4 bg-blue-500/20 rounded-full 
                          transform-gpu animate-ping-slow animation-delay-1000"></div>
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
              Water Conservation Tips
            </h1>
            <p className="text-lg md:text-xl text-blue-700 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Simple ways to save water during shortages and in everyday life
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Water Crisis Info Box */}
        <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-md overflow-hidden border border-blue-100 mb-10">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-blue-100 p-4 rounded-full md:mt-2">
                <FaWater className="text-blue-600 text-3xl" />
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Why Water Conservation Matters</h2>
                <p className="text-gray-600 mb-4">
                  South Africa is a water-scarce country, and climate change is making water resources even more unpredictable. 
                  By implementing water conservation practices in our daily lives, we can:
                </p>
                
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mt-1 mr-2">
                      <FaCheck className="text-blue-600 text-xs" />
                    </div>
                    <span className="text-gray-700">Extend the availability of existing water supplies during outages</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mt-1 mr-2">
                      <FaCheck className="text-blue-600 text-xs" />
                    </div>
                    <span className="text-gray-700">Reduce the strain on municipal water systems and infrastructure</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mt-1 mr-2">
                      <FaCheck className="text-blue-600 text-xs" />
                    </div>
                    <span className="text-gray-700">Save money on water bills and electricity used for heating water</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mt-1 mr-2">
                      <FaCheck className="text-blue-600 text-xs" />
                    </div>
                    <span className="text-gray-700">Build community resilience against future water challenges</span>
                  </li>
                </ul>
                
                <p className="text-gray-600 italic">
                  Every drop saved contributes to water security for our community. The tips below can help you make a difference.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Category Filter Tabs */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Browse Tips by Area</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => filterTips(category)}
                className={`flex items-center px-4 py-2 rounded-full border transition-all ${
                  activeCategory === category
                    ? 'bg-blue-100 text-blue-800 border-blue-300 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{getCategoryIcon(category)}</span>
                {getCategoryName(category)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Water Saving Tips */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredTips.map(tip => (
            <div key={tip.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-100 transform transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-50 p-3 rounded-full mr-3">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{tip.title}</h3>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border mt-1 ${getDifficultyColor(tip.difficulty)}`}>
                      {tip.difficulty.charAt(0).toUpperCase() + tip.difficulty.slice(1)}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{tip.description}</p>
                
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <p className="text-sm text-blue-800 font-medium">
                    <FaTint className="inline mr-1 text-blue-500" /> {tip.saving}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Advanced Water Conservation Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100 mb-16">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <FaHandHoldingWater className="text-blue-600" />
              </div>
              Advanced Conservation Solutions
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Rainwater Harvesting Systems</h3>
                <p className="text-gray-600">
                  Install gutters and downspouts connected to storage tanks to collect rainwater from your roof. This water can be used for irrigation, flushing toilets, and more. A typical South African home with a 100 m² roof can collect over 10,000 liters of water annually in moderate rainfall areas.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Greywater Recycling</h3>
                <p className="text-gray-600">
                  Install a greywater system to reuse water from showers, baths, and washing machines for garden irrigation. Simple manual systems can be installed DIY, while more complex automatic systems may require professional installation.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Water-Efficient Appliances</h3>
                <p className="text-gray-600">
                  When replacing appliances, look for water efficiency ratings. Modern efficient washing machines can use 65% less water than older models. Low-flow toilets, showerheads, and faucet aerators can dramatically reduce household water usage.
                </p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Xeriscaping</h3>
                <p className="text-gray-600">
                  Replace water-intensive lawns with drought-resistant landscaping using indigenous plants, rock gardens, and efficient irrigation. Xeriscaping can reduce outdoor water usage by 50-75% while still maintaining an attractive yard.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Educational Resources Section */}
        <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-md overflow-hidden border border-blue-100 mb-16">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Educational Resources</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg border border-blue-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">For Children</h3>
                <p className="text-gray-600 mb-4">
                  Teaching children about water conservation creates lifelong habits. These resources make learning fun:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <FaArrowRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Water conservation games and activities for kids</span>
                  </li>
                  <li className="flex items-start">
                    <FaArrowRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Printable water saving charts for tracking family efforts</span>
                  </li>
                  <li className="flex items-start">
                    <FaArrowRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Simple water science experiments to understand conservation</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-blue-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">For Communities</h3>
                <p className="text-gray-600 mb-4">
                  Community-wide efforts multiply the impact of water conservation:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <FaArrowRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Start a neighborhood water-wise garden initiative</span>
                  </li>
                  <li className="flex items-start">
                    <FaArrowRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Organize community water audit workshops</span>
                  </li>
                  <li className="flex items-start">
                    <FaArrowRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Create a water-saving challenge between streets or neighborhoods</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call-to-Action Section */}
        <div className="bg-blue-100 rounded-xl shadow-md p-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Ready to Make a Difference?</h2>
            <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
              Every drop counts. Start implementing these water conservation tips today and become part of the solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/find-water"
                className="bg-white text-blue-600 py-3 px-6 rounded-lg font-medium border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm"
              >
                Find Water Near You
              </Link>
              <Link
                to="/volunteer"
                className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
              >
                Share Your Borehole Water
              </Link>
            </div>
          </div>
          
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200 rounded-full opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-200 rounded-full opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>
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
        
        .animate-ping-slow {
          animation: pingSlow 10s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
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
      `}</style>
    </div>
  );
};

export default WaterConservationPage;