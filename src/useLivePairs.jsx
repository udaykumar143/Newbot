// src/hooks/useLivePairs.js
import { useState, useEffect } from "react";

export function useLivePairs(apiKey, currencyPairs) {
  const [pairs, setPairs] = useState([]);
  const [previousPrices, setPreviousPrices] = useState({});

  useEffect(() => {
    const fetchPairsData = async () => {
      try {
        const responses = await Promise.all(
          currencyPairs.map((pair) =>
            fetch(
              `https://api.twelvedata.com/price?symbol=${pair}&apikey=${apiKey}`
            ).then((res) => res.json())
          )
        );

        const updatedPairs = responses.map((res, index) => {
          const pairName = currencyPairs[index];
          const currentPrice = res.price ? parseFloat(res.price) : null;
          const previousPrice = previousPrices[pairName] || currentPrice;

          let strengthPercent = 0;
          let strengthLabel = "Closed";

          if (currentPrice !== null) {
            const changePercent =
              ((currentPrice - previousPrice) / previousPrice) * 100;
            strengthPercent = Math.min(Math.abs(changePercent) * 10, 100);

            if (changePercent > 2) strengthLabel = "Strong Buy";
            else if (changePercent > 0.5) strengthLabel = "Buy";
            else if (changePercent < -2) strengthLabel = "Strong Sell";
            else if (changePercent < -0.5) strengthLabel = "Sell";
            else strengthLabel = "Neutral";
          } else {
            strengthLabel = "Market Closed";
          }

          return {
            pair: pairName,
            price:
              currentPrice !== null
                ? currentPrice.toFixed(4)
                : "Market Closed (Weekend)",
            strengthPercent,
            strengthLabel,
          };
        });

        const newPreviousPrices = {};
        updatedPairs.forEach((p) => {
          if (p.price !== "Market Closed (Weekend)") {
            newPreviousPrices[p.pair] = parseFloat(p.price);
          }
        });

        setPreviousPrices(newPreviousPrices);
        setPairs(updatedPairs);
      } catch (error) {
        console.error("Error fetching Forex data:", error);
      }
    };

    fetchPairsData();

    // ✅ Adaptive interval calculation
    const FREE_PLAN_LIMIT = 8; // max requests per minute
    const pairsCount = currencyPairs.length;
    const safeIntervalSec = Math.max(
      Math.ceil((pairsCount * 60) / FREE_PLAN_LIMIT),
      5
    ); // at least 5 seconds
    const intervalMs = safeIntervalSec * 1000;

    const interval = setInterval(fetchPairsData, intervalMs);
    return () => clearInterval(interval);
  }, [currencyPairs, apiKey, previousPrices]);

  return pairs;
}