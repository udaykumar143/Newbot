import React from "react";
import "./Home.css";
import { useLivePairs } from "./useLivePairs"; // path to your hook
import { TWELVE_DATA_API_KEY } from "./config.js"; // your config file
import ForexClock from "./components/ForexClock.jsx";

function Home() {
  const currencyPairs = ["EUR/USD", "USD/JPY", "GBP/USD", "BTC/USD", "ETH/USD"];
  
  // Use your custom hook
  const pairs = useLivePairs(TWELVE_DATA_API_KEY, currencyPairs);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>💱 Live Currency Signals</h1>
        <p>Real-time updates for Forex and Crypto trading</p>
      </header>
      <ForexClock/>
      <section className="pair-feed">
        <div className="pair-list">
          {pairs.map((p, index) => (
            <div key={index} className="pair-card">
              <div className="pair-info">
                <span className="pair-name">{p.pair}</span>
                <span className="pair-price">{p.price}</span>
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