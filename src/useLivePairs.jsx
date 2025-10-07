// useLivePairs.jsx
import { useState, useEffect } from "react";

export function useLivePairs(apiKey) {
  const [pairs, setPairs] = useState([]);
  const [prices, setPrices] = useState({});

  // Step 1: Fetch supported Forex pairs + add Crypto manually
  useEffect(() => {
    async function fetchPairs() {
      try {
        const forexRes = await fetch(
          `https://api.twelvedata.com/forex_pairs?apikey=${apiKey}`
        );
        const forexData = await forexRes.json();

        // Add Crypto pairs manually
        const cryptoPairs = ["BTC/USD", "ETH/USD"];

        if (forexData.forex_pairs) {
          setPairs([...forexData.forex_pairs, ...cryptoPairs]);
        }
      } catch (err) {
        console.error("Error fetching pairs:", err);
      }
    }

    fetchPairs();
  }, [apiKey]);

  // Step 2: Fetch prices every 15 seconds
  useEffect(() => {
    if (pairs.length === 0) return;

    const interval = setInterval(async () => {
      try {
        const newPrices = {};
        for (const pair of pairs) {
          const res = await fetch(
            `https://api.twelvedata.com/price?symbol=${pair}&apikey=${apiKey}`
          );
          const data = await res.json();
          if (data.price) newPrices[pair] = parseFloat(data.price);
        }
        setPrices(newPrices);
      } catch (err) {
        console.error("Fetch prices error:", err);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [pairs, apiKey]);

  return { pairs, prices };
}