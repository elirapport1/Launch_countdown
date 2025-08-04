import React, { useEffect, useState } from 'react';
import './App.css';
import FlipClock from './components/FlipClock';

// Target date: August 8, 2025 at 12:00 AM PST (midnight)
// Convert to UTC (PST is UTC-8, but PDT is UTC-7 during summer)
// August 8, 2025 is during PDT, so 12:00 AM PDT = 7:00 AM UTC on August 9th
const TARGET_TIME = new Date("2025-08-09T07:00:00Z").getTime();

function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [previousTimeLeft, setPreviousTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = TARGET_TIME - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setPreviousTimeLeft(timeLeft);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Countdown has ended
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div className="App">
      <div className="dashboard-container">
        <div className="countdown-section">
          <h1>Launch Countdown</h1>
          <FlipClock timeLeft={timeLeft} previousTimeLeft={previousTimeLeft} />
        </div>
      </div>
    </div>
  );
}

export default App;

