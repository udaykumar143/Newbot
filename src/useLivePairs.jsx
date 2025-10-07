// useLivePairs.jsx
import { useState, useEffect } from "react";

export function useLivePairs(apiKey) {
  const [pairs, setPairs] = useState([]); // Stores supported pairs
  const [prices, setPrices] = useState({}); // Stores latest prices

  // Step 1: Fetch supported currency pairs from TwelveData
  useEffect(() => {
    async function fetchPairs() {
      try {
        const res = await fetch(
          `https://api.twelvedata.com/forex_pairs?apikey=${apiKey}`
        );
        const data = await res.json();
        if (data.forex_pairs) {
          setPairs(data.forex_pairs);
        } else {
          console.error("Error fetching pairs:", data);
        }
      } catch (err) {
        console.error("Fetch pairs error:", err);
      }
    }

    fetchPairs();
  }, [apiKey]);

  // Step 2: Fetch live prices every 15 seconds
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
          if (data.price) {
            newPrices[pair] = parseFloat(data.price);
          }
        }
        setPrices(newPrices);
      } catch (err) {
        console.error("Fetch prices error:", err);
      }
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, [pairs, apiKey]);

  return { pairs, prices };
}