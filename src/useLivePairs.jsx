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
  }, [currencyPairs, apiKey, previousPrices]);

  return pairs;
}