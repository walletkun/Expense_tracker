// pages/_app.jsx
import React from 'react';
import '../styles/global.css'; // Import global CSS
import Navbar from '@/app/components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
