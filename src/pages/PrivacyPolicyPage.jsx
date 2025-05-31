import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaShieldAlt } from 'react-icons/fa';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto">
            Your privacy matters to us. This policy explains how we collect, use, and protect your personal information.
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
                <FaShieldAlt className="h-6 w-6" />
              </div>
              <p className="text-blue-700 text-sm">
                Together As One ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our water-sharing platform.
              </p>
            </div>
          </div>
          
          {/* Table of Contents */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Table of Contents</h2>
            <ul className="grid md:grid-cols-2 gap-2">
              <li>
                <a href="#information-collected" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Information We Collect</span>
                </a>
              </li>
              <li>
                <a href="#use-information" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>How We Use Your Information</span>
                </a>
              </li>
              <li>
                <a href="#disclosure-information" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Disclosure of Your Information</span>
                </a>
              </li>
              <li>
                <a href="#security-information" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Security of Your Information</span>
                </a>
              </li>
              <li>
                <a href="#third-party" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Third-Party Websites</span>
                </a>
              </li>
              <li>
                <a href="#data-retention" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Data Retention</span>
                </a>
              </li>
              <li>
                <a href="#privacy-rights" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Your Privacy Rights</span>
                </a>
              </li>
              <li>
                <a href="#children" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Children's Privacy</span>
                </a>
              </li>
              <li>
                <a href="#updates" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Updates to this Privacy Policy</span>
                </a>
              </li>
              <li>
                <a href="#contact-us" className="flex items-center text-blue-600 hover:text-blue-800 py-1">
                  <FaChevronRight className="mr-2 text-xs" />
                  <span>Contact Us</span>
                </a>
              </li>
            </ul>
          </div>
          
          {/* Privacy Policy Content */}
          <div className="space-y-10">
            <section id="information-collected">
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Information We Collect</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  We collect several types of information from and about users of our platform, including:
                </p>
                
                <h3 className="font-semibold text-gray-800">Personal Information</h3>
                <p>
                  When you register as a volunteer water provider or interact with our platform, we may collect:
                </p>
                <ul>
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Home address or location information for water sharing points</li>
                  <li>Profile images or property images that you upload</li>
                  <li>Water resource details (availability times, descriptions)</li>
                </ul>
                
                <h3 className="font-semibold text-gray-800">Non-Personal Information</h3>
                <p>
                  We may also collect non-personal information about your interaction with our platform:
                </p>
                <ul>
                  <li>Device and browser information</li>
                  <li>IP address and geographic location</li>
                  <li>Usage data (pages visited, features used, time spent)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
                
                <h3 className="font-semibold text-gray-800">Location Information</h3>
                <p>
                  Our platform requires location data to function effectively. We collect:
                </p>
                <ul>
                  <li>Precise location data (with your permission) from your device's GPS</li>
                  <li>Approximate location based on IP address</li>
                  <li>Location information you voluntarily provide for water collection points</li>
                </ul>
                <p>
                  You can control location permissions through your device settings, but this may limit functionality.
                </p>
              </div>
            </section>
            
            <section id="use-information">
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. How We Use Your Information</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  We use the information we collect for various purposes, including:
                </p>
                <ul>
                  <li>Providing and maintaining our water-sharing platform</li>
                  <li>Connecting water seekers with volunteer water providers</li>
                  <li>Displaying water point locations and availability on maps</li>
                  <li>Improving and personalizing user experience</li>
                  <li>Communicating with you about your account or water point</li>
                  <li>Sending important service announcements and updates</li>
                  <li>Responding to your inquiries or support requests</li>
                  <li>Analyzing usage patterns to improve our platform</li>
                  <li>Protecting our platform from fraudulent or harmful activities</li>
                  <li>Complying with legal obligations</li>
                </ul>
                
                <p>
                  When you register as a volunteer water provider, your provided information (including location, availability times, and description) will be visible to other users to facilitate water sharing during shortages.
                </p>
              </div>
            </section>
            
            <section id="disclosure-information">
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. Disclosure of Your Information</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  We may disclose your personal information in the following circumstances:
                </p>
                
                <h3 className="font-semibold text-gray-800">Public Information</h3>
                <p>
                  If you register as a volunteer water provider, certain information (location, availability, description) will be publicly visible to other users of the platform. We recommend carefully considering what information you share.
                </p>
                
                <h3 className="font-semibold text-gray-800">Service Providers</h3>
                <p>
                  We may share information with third-party vendors, service providers, and contractors who perform services on our behalf, such as:
                </p>
                <ul>
                  <li>Hosting and cloud infrastructure providers</li>
                  <li>Analytics providers</li>
                  <li>Email and communication service providers</li>
                  <li>Map and location service providers</li>
                </ul>
                <p>
                  These service providers are bound by contractual obligations to keep personal information confidential and use it only for the purposes for which we disclose it to them.
                </p>
                
                <h3 className="font-semibold text-gray-800">Legal Requirements</h3>
                <p>
                  We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., court orders, government requests).
                </p>
                
                <h3 className="font-semibold text-gray-800">Business Transfers</h3>
                <p>
                  If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our platform of any change in ownership or uses of your personal information.
                </p>
                
                <h3 className="font-semibold text-gray-800">With Your Consent</h3>
                <p>
                  We may disclose your personal information for any other purpose with your consent.
                </p>
              </div>
            </section>
            
            <section id="security-information">
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Security of Your Information</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  We implement appropriate technical and organizational measures to maintain the safety of your personal information. However, no Internet or email transmission is ever fully secure or error-free. In particular, email sent to or from our platform may not be secure.
                </p>
                <p>
                  We take the following measures to protect your information:
                </p>
                <ul>
                  <li>Use of encryption for data transmission (HTTPS/SSL)</li>
                  <li>Access controls and authentication for our systems</li>
                  <li>Regular security assessments and monitoring</li>
                  <li>Staff training on privacy and security practices</li>
                </ul>
                <p>
                  You should take steps to protect your personal information as well, including using strong passwords, not sharing your account information, and signing out of your account after use.
                </p>
              </div>
            </section>
            
            <section id="third-party">
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Third-Party Websites</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  Our platform may contain links to third-party websites and services, including for map directions, social media platforms, or other external services. These third-party sites have separate and independent privacy policies.
                </p>
                <p>
                  We have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our platform and welcome any feedback about these sites.
                </p>
                <p>
                  Some specific third-party services we use include:
                </p>
                <ul>
                  <li>Google Maps for location services and directions</li>
                  <li>OpenStreetMap for mapping services</li>
                  <li>Analytics tools to understand platform usage</li>
                </ul>
                <p>
                  We encourage you to review the privacy policies of any third-party services you access through our platform.
                </p>
              </div>
            </section>
            
            <section id="data-retention">
              <h2 className="text-xl font-bold text-gray-800 mb-3">6. Data Retention</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
                </p>
                <p>
                  For volunteer water providers, we will maintain your account information and water point details for as long as your account remains active. If you deactivate your account or remove your water point, we may retain certain information for a limited period to ensure the integrity of our platform.
                </p>
                <p>
                  Usage data and analytics information may be retained in an aggregated, anonymized form for statistical purposes even after you have deleted your account.
                </p>
              </div>
            </section>
            
            <section id="privacy-rights">
              <h2 className="text-xl font-bold text-gray-800 mb-3">7. Your Privacy Rights</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                
                <h3 className="font-semibold text-gray-800">Access and Update</h3>
                <p>
                  You can access and update most of your personal information through your account settings. If you need assistance with information you cannot access, please contact us.
                </p>
                
                <h3 className="font-semibold text-gray-800">Data Portability</h3>
                <p>
                  You may request a copy of your personal information in a structured, commonly used, and machine-readable format.
                </p>
                
                <h3 className="font-semibold text-gray-800">Deletion</h3>
                <p>
                  You may request the deletion of your personal information, subject to certain exceptions provided by law.
                </p>
                
                <h3 className="font-semibold text-gray-800">Restriction and Objection</h3>
                <p>
                  You may request restriction of processing of your personal information or object to the processing of your data under certain circumstances.
                </p>
                
                <h3 className="font-semibold text-gray-800">Withdrawal of Consent</h3>
                <p>
                  Where we rely on your consent to process your personal information, you have the right to withdraw your consent at any time.
                </p>
                
                <p>
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section. We will respond to your request within a reasonable timeframe and in accordance with applicable laws.
                </p>
              </div>
            </section>
            
            <section id="children">
              <h2 className="text-xl font-bold text-gray-800 mb-3">8. Children's Privacy</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  Our platform is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you believe your child has provided us with personal information, please contact us, and we will take steps to remove that information from our systems.
                </p>
              </div>
            </section>
            
            <section id="updates">
              <h2 className="text-xl font-bold text-gray-800 mb-3">9. Updates to this Privacy Policy</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this page.
                </p>
                <p>
                  For significant changes that materially affect your rights or how we use your personal information, we will provide a more prominent notice, such as email notification or a banner on our platform.
                </p>
                <p>
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </div>
            </section>
            
            <section id="contact-us">
              <h2 className="text-xl font-bold text-gray-800 mb-3">10. Contact Us</h2>
              <div className="prose prose-blue max-w-none">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <p className="font-medium">
                  Together As One<br/>
                  Email: <a href="mailto:taosa.info@gmail.com" className="text-blue-600 hover:underline">taosa.info@gmail.com</a><br/>
                  Address: Emfuleni Municipality Area, Gauteng, South Africa
                </p>
              </div>
            </section>
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Questions about privacy or how we handle your data? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all"
            >
              Contact Us
            </Link>
            <Link 
              to="/terms" 
              className="inline-flex items-center justify-center px-6 py-3 border border-blue-200 text-base font-medium rounded-md shadow-sm text-blue-600 bg-white hover:bg-blue-50 transition-all"
            >
              View Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;