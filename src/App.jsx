import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocationProvider } from './contexts/LocationContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FindWaterPage from './pages/FindWaterPage';
import VolunteerPage from './pages/VolunteerPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import WaterConservationPage from './pages/WaterConservationPage';
import CommunitiesPage from './pages/CommunitiesPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'; // Add this import
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <LocationProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/find-water" element={<FindWaterPage />} />
              <Route path="/volunteer" element={<VolunteerPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/conservation" element={<WaterConservationPage />} />
              <Route path="/communities" element={<CommunitiesPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} /> {/* Add this route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LocationProvider>
  );
}

export default App;