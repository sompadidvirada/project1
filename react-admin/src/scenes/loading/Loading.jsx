import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingText = () => {
  const [countdown, setCountdown] = useState(5); // Starting the countdown from 5
  const navigate = useNavigate(); // Used for navigation after the countdown

  useEffect(() => {
    if (countdown === 0) {
      // Redirect to the target page when countdown reaches 0
      navigate('/login'); // Replace '/target-page' with your desired path
    }

    // Start a countdown interval
    const intervalId = setInterval(() => {
      if (countdown > 0) {
        setCountdown(prev => prev - 1);
      }
    }, 1000);

    // Clear interval when component unmounts or countdown reaches 0
    return () => clearInterval(intervalId);
  }, [countdown, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="flex items-center mb-4 text-white text-4xl font-sans">
        <div className="mr-4">
          {/* Permission message */}
          You don't have permission to access this site
        </div>
        <div className="text-4xl font-sans">
          {/* Countdown */}
          {countdown > 0 ? countdown : 'Redirecting...'}
        </div>
      </div>
      <div className="text-white flex space-x-1">
        {/* Loading text */}
        {['L', 'o', 'a', 'd', 'i', 'n', 'g', '.', '.', '.'].map((letter, index) => (
          <span
            key={index}
            className="text-3xl font-sans transform-gpu animate-bounce"
            style={{ animationDelay: `${(index + 1) * 0.1}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LoadingText;
