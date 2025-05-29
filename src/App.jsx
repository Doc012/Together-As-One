import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocationProvider } from './contexts/LocationContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import FindWaterPage from './pages/FindWaterPage';
import VolunteerPage from './pages/VolunteerPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Router>
      <LocationProvider>
        <div className="flex flex-col min-h-screen bg-blue-50">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/find-water" element={<FindWaterPage />} />
              <Route path="/volunteer" element={<VolunteerPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer position="bottom-right" />
      </LocationProvider>
    </Router>
  );
}