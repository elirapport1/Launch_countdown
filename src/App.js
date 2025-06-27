import React, { useEffect, useState } from 'react';
import './App.css';

const TARGET_TIME = new Date("2025-10-01T00:00:00Z").getTime();

function App() {
  const [timeLeft, setTimeLeft] = useState({});
  const [liveValue, setLiveValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = TARGET_TIME - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });

      // Simulate "live data" (can be replaced with API call)
      setLiveValue(Math.floor(Math.random() * 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App" style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>🚀 Launch Countdown</h1>
      <h2>
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </h2>
      <p>📊 Live Data Value: <strong>{liveValue}</strong></p>
    </div>
  );
}

export default App;

