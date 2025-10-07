import React, { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const [pairs, setPairs] = useState([]);

  // Dummy live currency pairs generator
  useEffect(() => {
    const currencyPairs = ["EUR/USD", "USD/JPY", "GBP/USD", "BTC/USD", "ETH/USD"];
    
    const generatePairData = () => {
      return currencyPairs.map((pair) => ({
        pair,
        price: (Math.random() * (150 - 1) + 1).toFixed(4), // random price
        strength: ["Strong Buy", "Buy", "Neutral", "Sell", "Strong Sell"][
          Math.floor(Math.random() * 5)
        ],
      }));
    };

    // Update every 5 seconds
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

      {/* Live Currency Pairs Section */}
      <section className="pair-feed">
        <h2>💱 Live Currency Pairs</h2>
        <div className="pair-list">
          {pairs.map((p, index) => (
            <div key={index} className="pair-card">
              <span className="pair-name">{p.pair}</span>
              <span className="pair-price">${p.price}</span>
              <span
                className={`pair-strength ${
                  p.strength.includes("Buy")
                    ? "buy"
                    : p.strength.includes("Sell")
                    ? "sell"
                    : "neutral"
                }`}
              >
                {p.strength}
              </span>
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