import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate, className }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      
      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);
      
      // Clear interval when the target date is reached
      if (updatedTimeLeft.days === 0 && 
          updatedTimeLeft.hours === 0 && 
          updatedTimeLeft.minutes === 0 && 
          updatedTimeLeft.seconds === 0) {
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);
  
  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span>Starts in:</span>
      <div className="flex items-center space-x-1">
        {timeLeft.days > 0 && (
          <>
            <span>{timeLeft.days}d</span>
            <span>:</span>
          </>
        )}
        <span>{formatTime(timeLeft.hours)}h</span>
        <span>:</span>
        <span>{formatTime(timeLeft.minutes)}m</span>
        <span>:</span>
        <span>{formatTime(timeLeft.seconds)}s</span>
      </div>
    </div>
  );
};

export default CountdownTimer;