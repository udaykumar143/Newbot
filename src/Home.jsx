import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import "./Home.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

function Home() {
  const currencyPairs = ["EUR/USD", "USD/JPY", "GBP/USD", "BTC/USD", "ETH/USD"];
  const [pairs, setPairs] = useState([]);

  // Generate dummy data for live currency pairs
  useEffect(() => {
    const generatePairData = () => {
      return currencyPairs.map((pair) => {
        const trend = Array.from({ length: 10 }, () =>
          (Math.random() * (150 - 1) + 1).toFixed(4)
        ); // last 10 prices
        const strengthPercent = Math.floor(Math.random() * 101);
        let strengthLabel = "Neutral";
        if (strengthPercent >= 70) strengthLabel = "Strong Buy";
        else if (strengthPercent >= 50) strengthLabel = "Buy";
        else if (strengthPercent >= 30) strengthLabel = "Sell";
        else strengthLabel = "Strong Sell";

        return {
          pair,
          price: trend[trend.length - 1],
          strengthPercent,
          strengthLabel,
          trend,
        };
      });
    };

    setPairs(generatePairData()); // initial load
    const interval = setInterval(() => setPairs(generatePairData()), 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Newbot Signals 📈</h1>
        <p>Real-time currency pairs with signal strength and mini trend charts</p>
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

      {/* Live Currency Pairs with Mini Trend Charts */}
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

              {/* Mini Trend Chart */}
              <div className="mini-chart">
                <Line
                  data={{
                    labels: Array(p.trend.length).map((_, i) => i + 1),
                    datasets: [
                      {
                        data: p.trend,
                        borderColor:
                          p.strengthLabel.includes("Buy")
                            ? "#22c55e"
                            : p.strengthLabel.includes("Sell")
                            ? "#ef4444"
                            : "#facc15",
                        borderWidth: 2,
                        fill: false,
                        pointRadius: 0,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      x: { display: false },
                      y: { display: false },
                    },
                  }}
                  height={80}
                />
              </div>
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