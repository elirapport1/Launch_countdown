import React from 'react';
import './FlipClock.css';

const FlipDigit = ({ value, previousValue }) => {
  const [isFlipping, setIsFlipping] = React.useState(false);
  const [displayValue, setDisplayValue] = React.useState(value);

  React.useEffect(() => {
    if (value !== previousValue) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setIsFlipping(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [value, previousValue]);

  return (
    <div className="flip-digit-container">
      <div className="flip-digit">
        <div className={`flip-card ${isFlipping ? 'flipping' : ''}`}>
          <div className="flip-card-inner">
            {/* Top half - shows current value */}
            <div className="flip-card-front">
              <div className="digit">{displayValue}</div>
            </div>
            {/* Bottom half - shows next value */}
            <div className="flip-card-back">
              <div className="digit">{value}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FlipClock = ({ timeLeft, previousTimeLeft }) => {
  const formatNumber = (num) => {
    return num.toString().padStart(2, '0');
  };

  const formatDays = (days) => {
    return days.toString().padStart(3, '0');
  };

  return (
    <div className="flip-clock">
      <div className="flip-clock-container">
        {/* Days - 3 separate cards */}
        <FlipDigit 
          value={formatDays(timeLeft.days)[0]} 
          previousValue={formatDays(previousTimeLeft.days)[0]}
        />
        <FlipDigit 
          value={formatDays(timeLeft.days)[1]} 
          previousValue={formatDays(previousTimeLeft.days)[1]}
        />
        <FlipDigit 
          value={formatDays(timeLeft.days)[2]} 
          previousValue={formatDays(previousTimeLeft.days)[2]}
        />
        
        <div className="separator">:</div>
        
        {/* Hours - 2 separate cards */}
        <FlipDigit 
          value={formatNumber(timeLeft.hours)[0]} 
          previousValue={formatNumber(previousTimeLeft.hours)[0]}
        />
        <FlipDigit 
          value={formatNumber(timeLeft.hours)[1]} 
          previousValue={formatNumber(previousTimeLeft.hours)[1]}
        />
        
        <div className="separator">:</div>
        
        {/* Minutes - 2 separate cards */}
        <FlipDigit 
          value={formatNumber(timeLeft.minutes)[0]} 
          previousValue={formatNumber(previousTimeLeft.minutes)[0]}
        />
        <FlipDigit 
          value={formatNumber(timeLeft.minutes)[1]} 
          previousValue={formatNumber(previousTimeLeft.minutes)[1]}
        />
        
        <div className="separator">:</div>
        
        {/* Seconds - 2 separate cards */}
        <FlipDigit 
          value={formatNumber(timeLeft.seconds)[0]} 
          previousValue={formatNumber(previousTimeLeft.seconds)[0]}
        />
        <FlipDigit 
          value={formatNumber(timeLeft.seconds)[1]} 
          previousValue={formatNumber(previousTimeLeft.seconds)[1]}
        />
      </div>
    </div>
  );
};

export default FlipClock; 