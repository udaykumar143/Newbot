import React, { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const [pairs, setPairs] = useState([]);
  const [previousPrices, setPreviousPrices] = useState({});

  const currencyPairs = ["EUR/USD", "USD/JPY", "GBP/USD", "BTC/USD", "ETH/USD"];
  const apiKey = "5173bd2c96674ca2a18f504d6ab6339d"; // replace with your API key

  useEffect(() => {
    const fetchPairsData = async () => {
      try {
        const responses = await Promise.all(
          currencyPairs.map((pair) =>
            fetch(
              `https://api.twelvedata.com/price?symbol=${pair.replace("/", "")}&apikey=${apiKey}`
            ).then((res) => res.json())
          )
        );

        const updatedPairs = responses.map((res, index) => {
          const currentPrice = res.price ? parseFloat(res.price) : null;
          const previousPrice = previousPrices[currencyPairs[index]] || currentPrice;

          let strengthPercent = 0;
          let strengthLabel = "Closed";

          if (currentPrice !== null) {
            const changePercent = ((currentPrice - previousPrice) / previousPrice) * 100;
            strengthPercent = Math.min(Math.abs(changePercent) * 10, 100);
            if (changePercent > 2) strengthLabel = "Strong Buy";
            else if (changePercent > 0.5) strengthLabel = "Buy";
            else if (changePercent < -2) strengthLabel = "Strong Sell";
            else if (changePercent < -0.5) strengthLabel = "Sell";
            else strengthLabel = "Neutral";
          }

          return {
            pair: currencyPairs[index],
            price: currentPrice !== null ? currentPrice.toFixed(4) : "Asset is closed",
            strengthPercent,
            strengthLabel,
          };
        });

        const newPreviousPrices = {};
        updatedPairs.forEach((p) => {
          if (p.price !== "Asset is closed") newPreviousPrices[p.pair] = parseFloat(p.price);
        });
        setPreviousPrices(newPreviousPrices);

        setPairs(updatedPairs);
      } catch (error) {
        console.error("Error fetching Forex data:", error);
      }
    };

    fetchPairsData();
    const interval = setInterval(fetchPairsData, 5000);
    return () => clearInterval(interval);
  }, [previousPrices]);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>💱 Live Currency Signals</h1>
        <p>Real-time updates for Forex and Crypto trading</p>
      </header>

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