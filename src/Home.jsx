import React, { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const [signals, setSignals] = useState([]);

  // Dummy real-time signal generator
  useEffect(() => {
    const generateSignal = () => {
      const assets = ["EUR/USD", "BTC/USD", "USD/JPY", "ETH/USD", "Gold"];
      const direction = ["CALL", "PUT"];
      const amount = [1, 5, 10, 20];

      return {
        asset: assets[Math.floor(Math.random() * assets.length)],
        direction: direction[Math.floor(Math.random() * direction.length)],
        amount: amount[Math.floor(Math.random() * amount.length)],
        time: new Date().toLocaleTimeString(),
      };
    };

    const interval = setInterval(() => {
      setSignals((prev) => [generateSignal(), ...prev].slice(0, 5)); // keep last 5 signals
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Newbot Signals 📈</h1>
        <p>Accurate binary trading signals delivered in real-time</p>
      </header>

      <section className="home-content">
        <div className="card">
          <h2>⚡ Real-Time Alerts</h2>
          <p>Get instant notifications for the best binary trading opportunities.</p>
        </div>

        <div className="card">
          <h2>📊 Expert Analysis</h2>
          <p>Signals based on trend analysis, candlestick patterns, and market volatility.</p>
        </div>

        <div className="card">
          <h2>💹 Multi-Asset Support</h2>
          <p>Trade across Forex, Crypto, and OTC markets with smart signals.</p>
        </div>
      </section>

      {/* Live Signal Feed */}
      <section className="signal-feed">
        <h2>🟢 Live Signals</h2>
        <div className="signal-list">
          {signals.map((signal, index) => (
            <div key={index} className="signal-card">
              <span>{signal.time}</span>
              <span>{signal.asset}</span>
              <span className={signal.direction === "CALL" ? "call" : "put"}>
                {signal.direction}
              </span>
              <span>${signal.amount}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <p>© 2025 Newbot Signals. Trade smart, trade safe.</p>
      </footer>
    </div>
  );
}

export default Home;