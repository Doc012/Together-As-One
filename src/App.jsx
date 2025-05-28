import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import FindWaterPage from "./pages/FindWaterPage";
import VolunteerPage from "./pages/VolunteerPage";
import AboutPage from "./pages/AboutPage";
import SubscribePage from "./pages/SubscribePage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-blue-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/find-water" element={<FindWaterPage />} />
              <Route path="/volunteer" element={<VolunteerPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/subscribe" element={<SubscribePage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}