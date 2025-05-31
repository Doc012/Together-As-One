import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaWater, 
  FaHandsHelping, 
  FaMapMarkerAlt, 
  FaCheck,
  FaArrowRight,
  FaEnvelope,
  FaSeedling,
  FaRegLightbulb,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaExclamationCircle
} from 'react-icons/fa';

const CommunitiesPage = () => {
  const [activeRegion, setActiveRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSuccess, setExpandedSuccess] = useState(null);

  // Planned communities - labeled as examples/goals
  const communities = [
    {
      id: 'emfuleni',
      name: 'Emfuleni',
      region: 'gauteng',
      description: 'Potential first community to join the Together As One initiative. We envision residents creating a neighborhood-wide network of water sharing points.',
      stats: {
        sharingPoints: 0,
        peopleHelped: '0',
        waterShared: '0 liters',
      },
      image: 'https://cdn.golflux.com/wp-content/uploads/2024/05/Emfuleni-Golf-Estate-1.jpg',
      facebookUrl: 'https://www.facebook.com/profile.php?id=61577065883332'
    },
    {
      id: 'tshwane',
      name: 'Tshwane',
      region: 'gauteng',
      description: 'We aim to build a Tshwane community focused on both water sharing and educational workshops on water conservation, helping neighbors save and share water efficiently.',
      stats: {
        sharingPoints: 0,
        peopleHelped: '0',
        waterShared: '0 liters',
      },
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c291dGglMjBhZnJpY2FuJTIwY29tbXVuaXR5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      facebookUrl: 'https://www.facebook.com/profile.php?id=61577065883332'
    },
    {
      id: 'capetown',
      name: 'Cape Town',
      region: 'western-cape',
      description: 'After experiencing severe drought conditions, Cape Town could benefit from a community water sharing network. We hope to connect those with boreholes to neighbors in need.',
      stats: {
        sharingPoints: 0,
        peopleHelped: '0',
        waterShared: '0 liters',
      },
      image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcGUlMjB0b3duJTIwY29tbXVuaXR5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      facebookUrl: 'https://www.facebook.com/profile.php?id=61577065883332'
    },
    {
      id: 'stellenbosch',
      name: 'Stellenbosch',
      region: 'western-cape',
      description: 'We envision Stellenbosch implementing an innovative approach combining rainwater harvesting systems with community sharing points, maximizing water collection during rainy seasons.',
      stats: {
        sharingPoints: 0,
        peopleHelped: '0',
        waterShared: '0 liters',
      },
      image: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RlbGxlbmJvc2NofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      facebookUrl: 'https://www.facebook.com/profile.php?id=61577065883332'
    },
    {
      id: 'durban',
      name: 'Durban',
      region: 'kwazulu-natal',
      description: 'The future Durban community could focus on coastal water conservation, combining traditional methods with modern technology to ensure water security during outages.',
      stats: {
        sharingPoints: 0,
        peopleHelped: '0',
        waterShared: '0 liters',
      },
      image: 'https://content.r9cdn.net/rimg/dimg/50/22/266b6677-city-33744-167795c3051.jpg?width=1200&height=630&xhint=1020&yhint=2273&crop=true',
      facebookUrl: 'https://www.facebook.com/profile.php?id=61577065883332'
    },
    {
      id: 'pietermaritzburg',
      name: 'Pietermaritzburg',
      region: 'kwazulu-natal',
      description: 'We hope to see Pietermaritzburg create a volunteer network that not only shares water but also helps with water delivery to elderly and disabled community members.',
      stats: {
        sharingPoints: 0,
        peopleHelped: '0',
        waterShared: '0 liters',
      },
      image: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c291dGglMjBhZnJpY2FuJTIwdG93bnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      facebookUrl: 'https://www.facebook.com/profile.php?id=61577065883332'
    },
    {
      id: 'eastlondon',
      name: 'East London',
      region: 'eastern-cape',
      description: 'East London could develop a comprehensive community water sharing network that combines borehole sharing with municipal collection points, ensuring wide coverage.',
      stats: {
        sharingPoints: 0,
        peopleHelped: '0',
        waterShared: '0 liters',
      },
      image: 'https://i.pinimg.com/originals/f3/b8/4e/f3b84eddef1fc383fb1f2958b2369e52.jpg',
      facebookUrl: 'https://www.facebook.com/profile.php?id=61577065883332'
    },
    {
      id: 'bloemfontein',
      name: 'Bloemfontein',
      region: 'free-state',
      description: 'We envision Bloemfontein community members implementing a unique scheduling system that ensures fair water distribution during shortages, becoming a model for other communities.',
      stats: {
        sharingPoints: 0,
        peopleHelped: '0',
        waterShared: '0 liters',
      },
      image: 'https://media.istockphoto.com/id/2187463985/photo/hoffman-square-and-the-old-post-office.jpg?s=612x612&w=0&k=20&c=0zDQGUoN5etwFPhFfFNt-3w_OM_wsRTPNixdgLOu53E=',
      facebookUrl: 'https://www.facebook.com/profile.php?id=61577065883332'
    },
  ];

  // Vision-based success stories rather than actual ones
  const successStories = [
    {
      id: 'story1',
      title: 'Example: Emfuleni Water Crisis Response',
      community: 'Emfuleni',
      description: 'This is a potential scenario: When municipal water outages last for over two weeks, communities like Emfuleni could mobilize private borehole owners to create a neighborhood water sharing network. Through platforms like Together As One, they could coordinate collection times and help families access clean water for essential needs.',
      impact: 'Potential impact: Providing water access to 1,200+ households during a critical municipal outage',
      lessons: 'Key strategies: Early registration of water providers before crisis hits; clear communication about collection times; volunteer coordinators for each street',
      image: 'https://www.eskom.co.za/wp-content/uploads/2021/10/Township.jpg'
    },
    {
      id: 'story2',
      title: 'Example: Cape Town Day Zero Prevention',
      community: 'Cape Town',
      description: 'Conceptual scenario: Facing potential "Day Zero" when municipal water would be cut off, Cape Town residents could create a community-wide water conservation and sharing program. By connecting those with boreholes to neighbors in need, they could significantly reduce pressure on municipal supplies during critical shortage periods.',
      impact: 'Potential impact: Reducing community water consumption by 40% while ensuring all residents have access to minimum required water',
      lessons: 'Key strategies: Combining conservation education with water sharing; creating neighborhood water collection hubs; implementing fair usage guidelines',
      image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2F0ZXIlMjBzaGFyaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 'story3',
      title: 'Example: Senior Citizen Water Support',
      community: 'Durban',
      description: 'Vision scenario: In communities like Durban, members could notice that elderly residents struggle to collect water during outages. They could form a volunteer delivery network using platforms like Together As One to identify seniors in need and coordinate water delivery to their homes.',
      impact: 'Potential impact: Ensuring water access for elderly and disabled residents who cannot collect water themselves',
      lessons: 'Key strategies: Creating special services for vulnerable community members; coordinating volunteers through online scheduling; using bicycles and small vehicles for delivery',
      image: 'https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d2F0ZXIlMjBoZWxwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
  ];

  // Regions for filtering
  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'gauteng', name: 'Gauteng' },
    { id: 'western-cape', name: 'Western Cape' },
    { id: 'kwazulu-natal', name: 'KwaZulu-Natal' },
    { id: 'eastern-cape', name: 'Eastern Cape' },
    { id: 'free-state', name: 'Free State' },
  ];

  // Filter communities by region and search term
  const filteredCommunities = communities.filter(community => {
    const matchesRegion = activeRegion === 'all' || community.region === activeRegion;
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         community.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  // Toggle success story expansion
  const toggleSuccessStory = (id) => {
    setExpandedSuccess(expandedSuccess === id ? null : id);
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
              Communities Working Together
            </h1>
            <p className="text-lg md:text-xl text-blue-700 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Our vision for how communities across South Africa can share water resources and build resilience
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Platform Status Alert */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaExclamationCircle className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <span className="font-bold">Platform Status:</span> Together As One is currently in development. The communities and stories shown below represent our vision for the platform, not existing networks. We're actively seeking early adopters to start building these communities.
              </p>
            </div>
          </div>
        </div>
        
        {/* Communities Overview */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100 mb-12">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-blue-100 p-4 rounded-full md:mt-2">
                <FaUsers className="text-blue-600 text-3xl" />
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Water Sharing Communities</h2>
                <p className="text-gray-600 mb-4">
                  Our vision is for communities across South Africa to come together to share water resources during shortages and outages. 
                  Through the Together As One platform, neighborhoods can build resilience and ensure everyone has 
                  access to this essential resource. Below we showcase what this could look like:
                </p>
                
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-center">
                  <div className="bg-blue-50 rounded-lg p-4 relative">
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-400 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      Current
                    </div>
                    <div className="text-2xl font-bold text-blue-700">0</div>
                    <div className="text-sm text-gray-600">Active Communities</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 relative">
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-400 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      Current
                    </div>
                    <div className="text-2xl font-bold text-blue-700">0</div>
                    <div className="text-sm text-gray-600">Water Points</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 relative">
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      Goal
                    </div>
                    <div className="text-2xl font-bold text-blue-700">9</div>
                    <div className="text-sm text-gray-600">Provinces</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 relative">
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      Goal
                    </div>
                    <div className="text-2xl font-bold text-blue-700">8,000+</div>
                    <div className="text-sm text-gray-600">People Helped</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 relative">
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      Goal
                    </div>
                    <div className="text-2xl font-bold text-blue-700">100,000+</div>
                    <div className="text-sm text-gray-600">Liters Shared</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-2">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Search potential communities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {regions.map(region => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region.id)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    activeRegion === region.id
                      ? 'bg-blue-100 text-blue-800 border-blue-300 shadow-sm'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {region.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Potential Communities Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaRegLightbulb className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <span className="font-bold">Note:</span> The following are example communities we aim to establish. These are not yet active water sharing networks but represent areas where we hope to build communities. Join us to help make these a reality!
              </p>
            </div>
          </div>
        </div>

        {/* Communities Grid */}
        {filteredCommunities.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredCommunities.map(community => (
              <div key={community.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100 transform transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={community.image} 
                    alt={community.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/500x300?text=Community+Image';
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Planned
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FaMapMarkerAlt className="text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{community.name}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{community.description}</p>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-blue-700">
                        <span className="text-xs text-gray-500">Target:</span> {community.id === 'emfuleni' ? '35' : community.id === 'capetown' ? '42' : '20+'}
                      </div>
                      <div className="text-xs text-gray-600">Water Points</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-blue-700">
                        <span className="text-xs text-gray-500">Goal:</span> {community.id === 'emfuleni' ? '1,200+' : community.id === 'capetown' ? '1,800+' : '800+'}
                      </div>
                      <div className="text-xs text-gray-600">People Helped</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-blue-700">
                        <span className="text-xs text-gray-500">Goal:</span> {community.id === 'emfuleni' ? '15k+' : community.id === 'capetown' ? '22k+' : '10k+'}
                      </div>
                      <div className="text-xs text-gray-600">Liters</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
                    <Link 
                      to="/volunteer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <FaWater className="mr-1" />
                      Help start in {community.name}
                    </Link>
                    
                    {community.facebookUrl && (
                      <a 
                        href={community.facebookUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                        Join Facebook Group
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-10 text-center mb-16">
            <div className="bg-blue-50 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
              <FaSearch className="text-blue-400 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">No Communities Found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any potential communities matching your search criteria. Please try different search terms or filters.
            </p>
            
            <button 
              onClick={() => {setSearchTerm(''); setActiveRegion('all');}}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        )}
        
        {/* Success Stories Section */}
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-3 rounded-full mr-3">
              <FaSeedling className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Potential Success Stories</h2>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaRegLightbulb className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <span className="font-bold">Note:</span> The following are example scenarios that illustrate how communities could utilize our platform. These stories are conceptual and show what's possible when neighbors work together.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {successStories.map(story => (
              <div 
                key={story.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100"
              >
                <div className="md:flex">
                  <div className="md:w-1/3 h-64 md:h-auto relative">
                    <img 
                      src={story.image} 
                      alt={story.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/500x300?text=Success+Story';
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Example
                    </div>
                  </div>
                  
                  <div className="p-6 md:w-2/3">
                    <div className="mb-4">
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                        Potential Scenario
                      </span>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {story.community}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{story.title}</h3>
                    
                    <p className="text-gray-600 mb-4">
                      {expandedSuccess === story.id ? story.description : `${story.description.substring(0, 150)}...`}
                    </p>
                    
                    {expandedSuccess === story.id && (
                      <div className="space-y-4 mt-4 mb-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-1">Potential Impact</h4>
                          <p className="text-blue-700">{story.impact}</p>
                        </div>
                        
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-1">Key Strategies</h4>
                          <p className="text-green-700">{story.lessons}</p>
                        </div>
                      </div>
                    )}
                    
                    <button
                      onClick={() => toggleSuccessStory(story.id)}
                      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {expandedSuccess === story.id ? (
                        <>Read less <FaChevronUp className="ml-1" /></>
                      ) : (
                        <>Read more <FaChevronDown className="ml-1" /></>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Join Your Community Section */}
        <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-md overflow-hidden border border-blue-100 mb-16">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-blue-100 p-4 rounded-full md:mt-2">
                <FaHandsHelping className="text-blue-600 text-3xl" />
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Start In Your Community</h2>
                <p className="text-gray-600 mb-6">
                  Be among the first to bring Together As One to your community. Whether you're starting from scratch or have informal water sharing already happening,
                  we can help you establish a structured water sharing network in your neighborhood.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white p-5 rounded-lg border border-blue-100 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="bg-blue-100 p-2 rounded-full mr-3 text-blue-600">1</div>
                      <h3 className="font-semibold text-gray-800">Register Providers</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Identify and register households with boreholes, JoJo tanks, or other water sources willing to share during outages.
                    </p>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg border border-blue-100 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="bg-blue-100 p-2 rounded-full mr-3 text-blue-600">2</div>
                      <h3 className="font-semibold text-gray-800">Create Local Network</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Set up communication channels to coordinate water sharing and establish guidelines for collection.
                    </p>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg border border-blue-100 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="bg-blue-100 p-2 rounded-full mr-3 text-blue-600">3</div>
                      <h3 className="font-semibold text-gray-800">Educate & Expand</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Share water conservation tips and gradually expand your network to cover more areas in your community.
                    </p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaRegLightbulb className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <span className="font-bold">Pro tip:</span> Start small with just a few reliable water points and build from there. Quality and reliability are more important than quantity, especially when beginning.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/volunteer"
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
                  >
                    Become a Founding Provider
                  </Link>
                  
                  <Link
                    to="/contact"
                    className="flex-1 bg-white text-blue-600 py-3 px-6 rounded-lg font-medium border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm flex items-center justify-center"
                  >
                    <FaEnvelope className="mr-2" />
                    Get Community Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Facebook Communities Info */}
        <div className="bg-blue-50 rounded-xl shadow-md overflow-hidden border border-blue-100 mb-8">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 p-3 rounded-full mr-3 text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Join Our Facebook Group</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              We've created a central Facebook group for everyone interested in water sharing. Join us to:
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mt-1 mr-2">
                    <FaCheck className="text-blue-600 text-xs" />
                  </div>
                  <p className="text-gray-700 text-sm">Connect with others interested in starting community water sharing</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mt-1 mr-2">
                    <FaCheck className="text-blue-600 text-xs" />
                  </div>
                  <p className="text-gray-700 text-sm">Learn about water sharing best practices and strategies</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mt-1 mr-2">
                    <FaCheck className="text-blue-600 text-xs" />
                  </div>
                  <p className="text-gray-700 text-sm">Be first to know when we launch in your area</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <a 
                href="https://www.facebook.com/profile.php?id=61577065883332" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
                Join the Facebook Group
              </a>
            </div>
          </div>
        </div>
        
        {/* Vision Testimonials Section */}
        <div className="mb-16 bg-blue-600 rounded-xl shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-blue-700 opacity-10 pattern-dots"></div>
          
          <div className="p-8 md:p-10 relative z-10">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Our Vision: Community Voices</h2>
            <p className="text-center text-blue-100 mb-8 max-w-2xl mx-auto text-sm">
              These example testimonials represent the voices we hope to hear once our communities are established. Help us make these stories a reality.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/90 backdrop-blur-sm p-5 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4 italic">
                  "When our municipal water was cut off for 10 days, our neighborhood WhatsApp group connected with TAO. Within hours, we had mapped 8 borehole owners willing to help. It transformed a crisis into a community-building opportunity."
                </p>
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">SN</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Potential feedback</p>
                    <p className="text-sm text-gray-500">Future Community Coordinator</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm p-5 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4 italic">
                  "As a borehole owner, I always wanted to help during water outages but didn't know how to organize it effectively. This platform gave me the structure to share my water safely and sustainably without becoming overwhelmed."
                </p>
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">JM</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Potential feedback</p>
                    <p className="text-sm text-gray-500">Future Water Provider</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm p-5 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4 italic">
                  "Our street started with just two water sharing points. After seeing the impact during a three-day outage, five more neighbors with JoJo tanks joined. Now we have a resilient mini-network that can sustain our entire street."
                </p>
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">TK</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Potential feedback</p>
                    <p className="text-sm text-gray-500">Future Community Member</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call-to-Action Section */}
        <div className="bg-blue-100 rounded-xl shadow-md p-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Be a Founding Member</h2>
            <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
              Help us build these water sharing communities from the ground up. Whether you have water to share or want to organize your neighborhood, you can be part of creating a more resilient South Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-blue-600 py-3 px-8 rounded-lg font-medium border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm"
              >
                Contact Us
              </Link>
              <Link
                to="/volunteer"
                className="bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
              >
                Become a Founding Member
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
        
        .pattern-dots {
          background-image: radial-gradient(currentColor 1px, transparent 1px);
          background-size: calc(10 * 1px) calc(10 * 1px);
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

export default CommunitiesPage;