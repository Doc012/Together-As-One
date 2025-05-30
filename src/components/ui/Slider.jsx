import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Slider({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const promises = slides.map((slide) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = slide.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      
      try {
        await Promise.all(promises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Failed to load some images", error);
        setImagesLoaded(true);
      }
    };
    
    preloadImages();
  }, [slides]);

  // Auto-slide functionality
  useEffect(() => {
    if (!imagesLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length, imagesLoaded]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight - 40, // Scroll just past the hero
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative h-[110vh] w-full -mt-16">
      {/* Full-width container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Static loader */}
        {!imagesLoaded && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-blue-600 font-medium">Loading...</p>
            </div>
          </div>
        )}
        
        {/* Slider content */}
        {imagesLoaded && (
          <>
            {/* Individual slides */}
            {slides.map((slide, index) => (
              <div 
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Image with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </>
        )}
      </div>
      
      {/* Content layer */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center text-white max-w-3xl px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 drop-shadow-lg">
            {slides[currentSlide]?.title}
          </h1>
          <p className="text-xl md:text-2xl font-medium text-white/90 mb-8 drop-shadow-md">
            {slides[currentSlide]?.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link to="/find-water" className="group bg-white text-blue-700 hover:bg-blue-50 transition-all py-3 px-8 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              Find Water Near Me
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/volunteer" className="bg-blue-500 hover:bg-blue-400 text-white transition-all py-3 px-8 rounded-lg font-bold text-lg shadow-lg border border-blue-400/50 hover:shadow-xl">
              Volunteer Your Borehole
            </Link>
          </div>
        </div>
      </div>
      
      {/* Navigation arrows */}
      {/* {imagesLoaded && (
        <>
          <button 
            onClick={() => goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-xl" />
          </button>
          
          <button 
            onClick={() => goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-xl" />
          </button>
        </>
      )} */}
      
      {/* Dots Indicator - moved to bottom */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white w-6' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}