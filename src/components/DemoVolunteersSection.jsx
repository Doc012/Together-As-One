import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaWater, FaChevronRight } from 'react-icons/fa';

const DemoVolunteersSection = () => {
  const demoVolunteers = [
    {
      id: "demo1",
      name: "Villa Gardens Residence",
      area: "Vanderbijlpark",
      subArea: "Villa Gardens",
      description: "Family home with 5000L storage tank and clean borehole water",
      availableTimes: ["Tue, Thu: 07:00-09:00", "Sat: 09:00-12:00"],
      imageUrl: "https://s.hdnux.com/photos/61/17/31/12908103/4/rawImage.jpg"
    },
    {
      id: "demo2",
      name: "Duncanville Family Home",
      area: "Vereeniging",
      subArea: "Duncanville",
      description: "Residential property with borehole and multiple filling points",
      availableTimes: ["Mon, Wed, Fri: 16:00-18:00"],
      imageUrl: "https://devvlsnxxkrq9.cloudfront.net/prod/assets/Newton-Swansea-5-bedrooms-Beautiful-House.jpg"
    },
    {
      id: "demo3",
      name: "Riverside Borehole Share",
      area: "Three Rivers",
      subArea: "Riverside",
      description: "Modern home with high-capacity borehole system and covered waiting area",
      availableTimes: ["Mon-Fri: 07:00-09:00", "Sat: 08:00-12:00"],
      imageUrl: "https://interiordesign.net/wp-content/uploads/2024/12/Interior-Design-Westchester-Home-Amy-Courtney-Design-RockledgeDrive-29C.jpg"
    }
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How Your Home Will Appear</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            When you volunteer your home's borehole or water supply, it will be displayed like these examples. 
            Help your community during water outages by registering today!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {demoVolunteers.map((volunteer) => (
            <div 
              key={volunteer.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100 transform transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              {/* Image container with aspect ratio */}
              <div className="relative h-48">
                <img 
                  src={volunteer.imageUrl} 
                  alt={volunteer.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 bg-blue-600 text-white px-3 py-1 rounded-br-lg text-xs font-medium">
                  Demo Listing
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{volunteer.name}</h3>
                
                <div className="flex items-start mb-3">
                  <FaMapMarkerAlt className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">{volunteer.area}, {volunteer.subArea}</span>
                </div>
                
                <p className="text-gray-700 mb-4">{volunteer.description}</p>
                
                <div className="border-t pt-4">
                  <h4 className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaClock className="text-blue-500 mr-2" />
                    Available Times
                  </h4>
                  <ul className="space-y-1">
                    {volunteer.availableTimes.map((time, index) => (
                      <li key={index} className="text-sm text-gray-600 bg-blue-50 rounded-lg px-3 py-1">
                        {time}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/volunteer" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all"
          >
            Register Your Home <FaChevronRight className="ml-2" />
          </Link>
          <p className="mt-4 text-gray-500 text-sm">
            Your water sharing helps build community resilience during outages
          </p>
        </div>
      </div>
    </section>
  );
};

export default DemoVolunteersSection;