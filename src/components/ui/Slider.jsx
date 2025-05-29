import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

export default function Slider({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

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
        // Still set to true to allow display even if some fail
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

  return (
    <div className="relative h-[500px] md:h-[600px] -mt-16">
      {/* Full-width container that extends beyond parent padding */}
      <div className="absolute inset-x-0 h-full" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}>
        {/* Static loader that shows while images are loading */}
        {!imagesLoaded && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Loading...</div>
          </div>
        )}
        
        {/* Slider content - only shown after images are loaded */}
        {imagesLoaded && (
          <>
            {/* Individual slides */}
            {slides.map((slide, index) => (
              <div 
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Image with overlay */}
                <div className="absolute inset-0 bg-black/40"></div>
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
      
      {/* Content layer that sits on top of the slider */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center text-white max-w-3xl px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 drop-shadow-lg">
            {slides[currentSlide]?.title}
          </h1>
          <p className="text-xl md:text-2xl font-medium text-white/90 mb-8 drop-shadow-md">
            {slides[currentSlide]?.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link to="/find-water" className="group bg-white text-indigo-700 hover:bg-indigo-50 transition-all py-3 px-8 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              Find Water Near Me
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/volunteer" className="bg-indigo-500 hover:bg-indigo-400 text-white transition-all py-3 px-8 rounded-lg font-bold text-lg shadow-lg border border-indigo-400/50 hover:shadow-xl">
              Volunteer Your Borehole
            </Link>
          </div>
        </div>
      </div>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}