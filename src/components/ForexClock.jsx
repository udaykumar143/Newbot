// src/components/ForexClock.jsx
import React, { useEffect, useState } from "react";
import { getCurrentSessionStatus } from "../utils/sessions.js";

function ForexClock() {
  const [status, setStatus] = useState(getCurrentSessionStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getCurrentSessionStatus());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="forex-clock">
      <h2>🕒 Forex Market Time</h2>
      <p>Indian Time: <strong>{status.time}</strong></p>

      <div className="session-info">
        <p>Open Sessions:{" "}
          {status.openSessions.length > 0
            ? status.openSessions.map((s) => s.name).join(", ")
            : "Market Closed"}
        </p>
        <p>
          Volume:{" "}
          <span
            className={status.overlap ? "high-volume" : "low-volume"}
          >
            {status.overlap ? "High (Overlapping Markets)" : "Low"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default ForexClock;