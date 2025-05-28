import { useState, useEffect } from "react";

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const { days, hours, minutes, seconds } = timeLeft;

  if (!days && !hours && !minutes && !seconds) {
    return <div className="text-xl">Water outage has begun</div>;
  }

  return (
    <div className="text-center">
      <p className="text-lg mb-2">Water Outage Begins In:</p>
      <div className="flex justify-center space-x-3 text-xl md:text-2xl">
        <div className="flex flex-col items-center">
          <span className="font-bold">{days}</span>
          <span className="text-sm opacity-80">Days</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">{hours}</span>
          <span className="text-sm opacity-80">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">{minutes}</span>
          <span className="text-sm opacity-80">Mins</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">{seconds}</span>
          <span className="text-sm opacity-80">Secs</span>
        </div>
      </div>
    </div>
  );
}