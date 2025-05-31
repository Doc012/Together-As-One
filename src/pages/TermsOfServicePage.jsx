import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

const TermsOfServicePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto">
            These terms govern your use of our water-sharing platform. Please read them carefully.
          </p>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-md rounded-xl p-6 md:p-8 mb-8">
          {/* Last Updated Information */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <p className="text-gray-600 text-sm">Last Updated: May 31, 2025</p>
            <div className="flex items-center mt-4 bg-blue-50 p-4 rounded-lg">
              <div className="text-blue-600 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-blue-700 text-sm">
                By using our water-sharing platform, you agree to these terms. If you don't agree with these terms, please do not use our service.
              </p>
            </div>
          </div>
          
          {/* Table of Contents */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Table of Contents</h2>
            <ul className="grid md:grid-cols-2 gap-2">
              <li>
                <a href="#acceptance" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Acceptance of Terms</span>
                </a>
              </li>
              <li>
                <a href="#description" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Service Description</span>
                </a>
              </li>
              <li>
                <a href="#eligibility" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>User Eligibility</span>
                </a>
              </li>
              <li>
                <a href="#registration" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Account Registration</span>
                </a>
              </li>
              <li>
                <a href="#conduct" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>User Conduct</span>
                </a>
              </li>
              <li>
                <a href="#volunteer" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Volunteer Responsibilities</span>
                </a>
              </li>
              <li>
                <a href="#safety" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Safety Guidelines</span>
                </a>
              </li>
              <li>
                <a href="#privacy" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a href="#intellectual" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Intellectual Property</span>
                </a>
              </li>
              <li>
                <a href="#limitation" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Limitation of Liability</span>
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Disclaimer of Warranties</span>
                </a>
              </li>
              <li>
                <a href="#indemnification" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Indemnification</span>
                </a>
              </li>
              <li>
                <a href="#termination" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Termination</span>
                </a>
              </li>
              <li>
                <a href="#changes" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Changes to Terms</span>
                </a>
              </li>
              <li>
                <a href="#governing" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Governing Law</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Contact Information</span>
                </a>
              </li>
            </ul>
          </div>
          
          {/* Terms Content */}
          <div className="space-y-10">
            <section id="acceptance">
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Acceptance of Terms</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  By accessing or using our water-sharing platform ("the Service"), you agree to be bound by these Terms of Service. The Service is owned and operated by Tao Water Solutions ("we," "us," or "our"). These Terms of Service affect your legal rights and obligations, so if you do not agree to be bound by all of these Terms of Service, do not access or use the Service.
                </p>
                <p>
                  If you are using the Service on behalf of a business or organization, you represent and warrant that you have the authority to bind that business or organization to these Terms of Service and your agreement to these terms will be treated as the agreement of the business or organization. In that event, "you" and "your" will refer to both the individual and the business or organization.
                </p>
              </div>
            </section>
            
            <section id="description">
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. Service Description</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  The Service is a platform that connects individuals seeking water during water shortages with volunteers who are willing to share their water resources. The Service provides information about water collection points, their locations, availability times, and other relevant details to help users find and access water resources during shortages.
                </p>
                <p>
                  We do not own, control, supervise, direct, or otherwise manage the water resources provided by volunteers, nor do we verify the quality, safety, or legality of the water being shared. We are merely facilitating the connection between water seekers and water providers.
                </p>
              </div>
            </section>
            
            <section id="eligibility">
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. User Eligibility</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  You must be at least 18 years old to use the Service. By using the Service, you represent and warrant that you are at least 18 years old and that you have the right, authority, and capacity to enter into these Terms of Service. If you are under 18 years old, you may only use the Service under the supervision of a parent or legal guardian who agrees to be bound by these Terms of Service.
                </p>
              </div>
            </section>
            
            <section id="registration">
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Account Registration</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  To register as a volunteer water provider, you must create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                </p>
                <p>
                  You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. We are not liable for any loss or damage arising from your failure to comply with these requirements.
                </p>
                <p>
                  You may not have more than one active account. We reserve the right to remove or reclaim any usernames at any time and for any reason.
                </p>
              </div>
            </section>
            
            <section id="conduct">
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. User Conduct</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  You agree not to use the Service for any purpose that is prohibited by these Terms of Service. You are responsible for all of your activity in connection with the Service.
                </p>
                <p>
                  You shall not:
                </p>
                <ul>
                  <li>Use the Service for any illegal purpose, or in violation of any local, state, national, or international law</li>
                  <li>Harass, threaten, intimidate, or harm any other user of the Service</li>
                  <li>Provide false or misleading information about water resources</li>
                  <li>Impersonate any person or entity, or falsely state or otherwise misrepresent yourself, your age, or your affiliation with any person or entity</li>
                  <li>Solicit personal information from anyone under the age of 18</li>
                  <li>Use the Service to send or post any form of spam or unsolicited communications</li>
                  <li>Attempt to access any other user's account</li>
                  <li>Use the Service in any manner that could interfere with, disrupt, negatively affect, or inhibit other users from fully enjoying the Service</li>
                </ul>
              </div>
            </section>
            
            <section id="volunteer">
              <h2 className="text-xl font-bold text-gray-800 mb-3">6. Volunteer Responsibilities</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  As a volunteer water provider, you agree to:
                </p>
                <ul>
                  <li>Provide accurate information about your water resources, including location, availability times, and any limitations</li>
                  <li>Ensure that the water you provide is clean and safe for human consumption and use</li>
                  <li>Comply with all applicable laws and regulations regarding water distribution</li>
                  <li>Update your availability information promptly if there are any changes</li>
                  <li>Treat all water seekers with respect and dignity</li>
                  <li>Provide the water resources as described in your listing</li>
                </ul>
                <p>
                  You understand and agree that you are providing water resources voluntarily and without expectation of payment or compensation. Charging money for water access through our platform is strictly prohibited.
                </p>
              </div>
            </section>
            
            <section id="safety">
              <h2 className="text-xl font-bold text-gray-800 mb-3">7. Safety Guidelines</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  While we strive to promote safety on our platform, we cannot guarantee the safety of any interaction between users. When using the Service, we recommend:
                </p>
                <ul>
                  <li>Meeting in public or well-populated areas when possible</li>
                  <li>Informing a friend or family member about your plans to visit a water collection point</li>
                  <li>Bringing your own containers for water collection</li>
                  <li>Following all safety guidelines provided by the volunteer water provider</li>
                  <li>Exercising caution and good judgment in all interactions</li>
                </ul>
                <p>
                  For volunteer water providers, we recommend:
                </p>
                <ul>
                  <li>Setting clear boundaries for access to your property</li>
                  <li>Establishing and communicating clear hours of operation</li>
                  <li>Creating a designated water collection area that limits access to your personal space</li>
                  <li>Having another person present during water collection hours when possible</li>
                </ul>
              </div>
            </section>
            
            <section id="privacy">
              <h2 className="text-xl font-bold text-gray-800 mb-3">8. Privacy Policy</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  Our Privacy Policy, available at <Link to="/privacy" className="text-blue-600 hover:underline">https://www.taowater.org/privacy</Link>, describes how we collect, use, and share information about you when you use our Service. By using our Service, you consent to our collection, use, and sharing of information as described in our Privacy Policy.
                </p>
              </div>
            </section>
            
            <section id="intellectual">
              <h2 className="text-xl font-bold text-gray-800 mb-3">9. Intellectual Property</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  The Service and its original content, features, and functionality are and will remain the exclusive property of Tao Water Solutions and its licensors. The Service is protected by copyright, trademark, and other laws of both South Africa and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Tao Water Solutions.
                </p>
                <p>
                  By submitting content to the Service (including but not limited to descriptions, images, and location information), you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content in any media.
                </p>
                <p>
                  You represent and warrant that: (i) the content is yours or you have the right to use it and grant us the rights and license as provided in these Terms of Service, and (ii) the content does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person.
                </p>
              </div>
            </section>
            
            <section id="limitation">
              <h2 className="text-xl font-bold text-gray-800 mb-3">10. Limitation of Liability</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  To the maximum extent permitted by law, in no event shall Tao Water Solutions, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ol>
                  <li>Your access to or use of or inability to access or use the Service;</li>
                  <li>Any conduct or content of any third party on the Service;</li>
                  <li>Any content obtained from the Service; and</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.</li>
                </ol>
                <p>
                  We do not guarantee the quality, safety, or legality of any water resources provided through the Service. We are not responsible for any illness, injury, or damage resulting from the use of water resources obtained through the Service.
                </p>
              </div>
            </section>
            
            <section id="disclaimer">
              <h2 className="text-xl font-bold text-gray-800 mb-3">11. Disclaimer of Warranties</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Tao Water Solutions expressly disclaims all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                </p>
                <p>
                  Tao Water Solutions makes no warranty that:
                </p>
                <ol>
                  <li>The Service will meet your requirements;</li>
                  <li>The Service will be uninterrupted, timely, secure, or error-free;</li>
                  <li>The results that may be obtained from the use of the Service will be accurate or reliable; and</li>
                  <li>The quality of any products, services, information, or other material purchased or obtained by you through the Service will meet your expectations.</li>
                </ol>
              </div>
            </section>
            
            <section id="indemnification">
              <h2 className="text-xl font-bold text-gray-800 mb-3">12. Indemnification</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  You agree to defend, indemnify, and hold harmless Tao Water Solutions, its directors, employees, partners, agents, suppliers, and affiliates, from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable attorney's fees and costs, arising out of or in any way connected with:
                </p>
                <ol>
                  <li>Your access to or use of the Service;</li>
                  <li>Your violation of these Terms of Service;</li>
                  <li>Your violation of any third-party right, including without limitation any intellectual property right, publicity, confidentiality, property, or privacy right; or</li>
                  <li>Any claim that your content caused damage to a third party.</li>
                </ol>
                <p>
                  This defense and indemnification obligation will survive these Terms of Service and your use of the Service.
                </p>
              </div>
            </section>
            
            <section id="termination">
              <h2 className="text-xl font-bold text-gray-800 mb-3">13. Termination</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms of Service.
                </p>
                <p>
                  If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
                </p>
                <p>
                  All provisions of the Terms of Service which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                </p>
              </div>
            </section>
            
            <section id="changes">
              <h2 className="text-xl font-bold text-gray-800 mb-3">14. Changes to Terms</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms of Service at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p>
                  By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
                </p>
              </div>
            </section>
            
            <section id="governing">
              <h2 className="text-xl font-bold text-gray-800 mb-3">15. Governing Law</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  These Terms shall be governed and construed in accordance with the laws of South Africa, without regard to its conflict of law provisions.
                </p>
                <p>
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                </p>
              </div>
            </section>
            
            <section id="contact">
              <h2 className="text-xl font-bold text-gray-800 mb-3">16. Contact Information</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p className="font-medium">
                  Tao Water Solutions<br/>
                  Email: legal@taowater.org<br/>
                  Address: 123 Water Street, Johannesburg, South Africa, 2000
                </p>
              </div>
            </section>
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Questions about our Terms of Service? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all"
            >
              Contact Us
            </Link>
            <Link 
              to="/" 
              className="inline-flex items-center justify-center px-6 py-3 border border-blue-200 text-base font-medium rounded-md shadow-sm text-blue-600 bg-white hover:bg-blue-50 transition-all"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;