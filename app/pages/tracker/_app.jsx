// _app.jsx
import React from "react";
import Navbar from "@/app/components/Navbar";
import "./global.css";

function MyApp({ Component, pageProps }) {
  return (
      <div className="app-container">
        <header className="header">
          <Navbar />
        </header>
        <main className="main-content">
          <Component {...pageProps} />
        </main>
      </div>
  );
}

export default MyApp;
