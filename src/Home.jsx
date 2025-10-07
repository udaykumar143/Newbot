import React, { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const [pairs, setPairs] = useState([]);

  // Dummy live currency pairs with signal strength %
  useEffect(() => {
    const currencyPairs = ["EUR/USD", "USD/JPY", "GBP/USD", "BTC/USD", "ETH/USD"];
    
    const generatePairData = () => {
      return currencyPairs.map((pair) => {
        const strengthPercent = Math.floor(Math.random() * 101); // 0-100%
        let strengthLabel = "Neutral";
        if (strengthPercent >= 70) strengthLabel = "Strong Buy";
        else if (strengthPercent >= 50) strengthLabel = "Buy";
        else if (strengthPercent >= 30) strengthLabel = "Sell";
        else strengthLabel = "Strong Sell";

        return {
          pair,
          price: (Math.random() * (150 - 1) + 1).toFixed(4),
          strengthPercent,
          strengthLabel,
        };
      });
    };

    const interval = setInterval(() => {
      setPairs(generatePairData());
    }, 5000);

    // Initial load
    setPairs(generatePairData());

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Newbot Signals 📈</h1>
        <p>Real-time currency pairs with signal strength for binary trading</p>
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

      {/* Live Currency Pairs Section with Strength Bars */}
      <section className="pair-feed">
        <h2>💱 Live Currency Pairs</h2>
        <div className="pair-list">
          {pairs.map((p, index) => (
            <div key={index} className="pair-card">
              <div className="pair-info">
                <span className="pair-name">{p.pair}</span>
                <span className="pair-price">${p.price}</span>
              </div>
              <div className="strength-bar-container">
                <div
                  className={`strength-bar ${
                    p.strengthLabel.includes("Buy")
                      ? "buy"
                      : p.strengthLabel.includes("Sell")
                      ? "sell"
                      : "neutral"
                  }`}
                  style={{ width: `${p.strengthPercent}%` }}
                ></div>
              </div>
              <span className="strength-label">{p.strengthLabel}</span>
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