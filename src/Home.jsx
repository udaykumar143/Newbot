import React from "react";
import "./Home.css";
import { useLivePairs } from "./useLivePairs"; // updated hook
import { TWELVE_DATA_API_KEY } from "./config.js";
import ForexClock from "./components/ForexClock.jsx";

function Home() {
  // Use the updated hook
  const { pairs, prices } = useLivePairs(TWELVE_DATA_API_KEY);

  // Optional: filter for only your main pairs
  const mainPairs = ["EUR/USD", "USD/JPY", "GBP/USD", "BTC/USD", "ETH/USD"];
  const displayedPairs = pairs.filter(p => mainPairs.includes(p));

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>💱 Live Currency Signals</h1>
        <p>Real-time updates for Forex and Crypto trading</p>
      </header>

      <ForexClock/>

      <section className="pair-feed">
        <div className="pair-list">
          {displayedPairs.map((pair, index) => (
            <div key={index} className="pair-card">
              <div className="pair-info">
                <span className="pair-name">{pair}</span>
                <span className="pair-price">{prices[pair] || "Loading..."}</span>
              </div>

              <div className="strength-bar-container">
                {/* For now, dummy strength values; you can calculate later */}
                <div
                  className="strength-bar neutral"
                  style={{ width: `50%` }}
                ></div>
              </div>

              <span className="strength-label">Neutral</span>
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