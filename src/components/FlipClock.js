import React, { useState, useEffect } from 'react';
import './FlipClock.css';

const FlipDigit = ({ value, previousValue }) => {
  const [currentDigit, setCurrentDigit] = useState(value);
  const [nextDigit, setNextDigit] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== currentDigit) {
      setNextDigit(value);
      setIsFlipping(true);
      
      const timer = setTimeout(() => {
        setCurrentDigit(value);
        setIsFlipping(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [value, currentDigit]);

  return (
    <div className="flip-digit">
      {/* Static bottom half - shows current digit bottom half */}
      <div className="flip-card-back-static">
        <span className="digit">{currentDigit}</span>
      </div>

      {/* Static top half - shows current digit top half */}
      <div className="flip-card-front-static">
        <span className="digit">{currentDigit}</span>
      </div>

      {/* Flip animation overlay */}
      {isFlipping && (
        <>
          {/* Flipping top half - shows current digit top half flipping down */}
          <div className="flip-card-front-animating">
            <span className="digit">{currentDigit}</span>
          </div>

          {/* Revealing bottom half - shows next digit bottom half */}
          <div className="flip-card-back-animating">
            <span className="digit">{nextDigit}</span>
          </div>
        </>
      )}

      {/* Center line */}
      <div className="center-line"></div>

      {/* Corner dots for vintage styling */}
      <div className="corner-dot top-left"></div>
      <div className="corner-dot top-right"></div>
      <div className="corner-dot bottom-left"></div>
      <div className="corner-dot bottom-right"></div>
    </div>
  );
};

const FlipClock = ({ timeLeft, previousTimeLeft }) => {
  const formatNumber = (num) => num.toString().padStart(2, '0');

  return (
    <div className="flip-clock">
      <div className="flip-clock-container">
        {/* Days - 2 digits */}
        <FlipDigit value={formatNumber(timeLeft.days)[0]} previousValue={formatNumber(previousTimeLeft.days)[0]} />
        <FlipDigit value={formatNumber(timeLeft.days)[1]} previousValue={formatNumber(previousTimeLeft.days)[1]} />
        
        <div className="separator">:</div>
        
        {/* Hours */}
        <FlipDigit value={formatNumber(timeLeft.hours)[0]} previousValue={formatNumber(previousTimeLeft.hours)[0]} />
        <FlipDigit value={formatNumber(timeLeft.hours)[1]} previousValue={formatNumber(previousTimeLeft.hours)[1]} />
        
        <div className="separator">:</div>
        
        {/* Minutes */}
        <FlipDigit value={formatNumber(timeLeft.minutes)[0]} previousValue={formatNumber(previousTimeLeft.minutes)[0]} />
        <FlipDigit value={formatNumber(timeLeft.minutes)[1]} previousValue={formatNumber(previousTimeLeft.minutes)[1]} />
        
        <div className="separator">:</div>
        
        {/* Seconds */}
        <FlipDigit value={formatNumber(timeLeft.seconds)[0]} previousValue={formatNumber(previousTimeLeft.seconds)[0]} />
        <FlipDigit value={formatNumber(timeLeft.seconds)[1]} previousValue={formatNumber(previousTimeLeft.seconds)[1]} />
      </div>
    </div>
  );
};

export default FlipClock;