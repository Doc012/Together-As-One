import React from 'react';
import { Link } from 'react-router-dom';
import { FaHandHoldingWater, FaUsers, FaShieldAlt, FaCalendarAlt } from 'react-icons/fa';

const VolunteerCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Share Your Water With Neighbors</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            If you have a borehole or reliable water source, you can help your community during water outages.
            Register your home and set your own schedule and terms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FaHandHoldingWater className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Share on Your Terms</h3>
            <p className="text-gray-600 text-center">
              You decide when and how much water to share. Set your own schedule that works for you and your family.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FaUsers className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Build Community</h3>
            <p className="text-gray-600 text-center">
              Create connections with neighbors and build a more resilient community during challenging times.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FaShieldAlt className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Safety First</h3>
            <p className="text-gray-600 text-center">
              We prioritize your privacy and safety. You control what information is shared and who can see it.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FaCalendarAlt className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Flexible Scheduling</h3>
            <p className="text-gray-600 text-center">
              Set regular hours or share on an ad-hoc basis. Change your availability anytime as needed.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md border border-blue-200 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Ready to Help Your Community?</h3>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/volunteer" 
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium text-center hover:bg-blue-700 transition-all shadow-md"
            >
              Register as a Volunteer
            </Link>
            
            <Link 
              to="/about" 
              className="px-8 py-4 bg-white text-blue-600 border border-blue-200 rounded-lg font-medium text-center hover:bg-blue-50 transition-all"
            >
              Learn More
            </Link>
          </div>
          
          <p className="mt-6 text-center text-gray-500 text-sm">
            Join over 50+ households already registered to share water during outages
          </p>
        </div>
      </div>
    </section>
  );
};

export default VolunteerCTA;