import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Newbot 🤖</h1>
        <p>Your smart automation assistant built with React + Vite</p>
      </header>

      <section className="home-content">
        <div className="card">
          <h2>🚀 Fast Performance</h2>
          <p>Powered by Vite for lightning-fast builds and updates.</p>
        </div>

        <div className="card">
          <h2>🧠 Smart Features</h2>
          <p>We’ll soon integrate AI-powered automation and smart tools.</p>
        </div>

        <div className="card">
          <h2>⚙️ Customizable</h2>
          <p>Fully modular — add pages, components, and APIs easily.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;