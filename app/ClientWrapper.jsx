'use client'; // Mark this as a client component

import localFont from "next/font/local";
import "./globals.css";

// Components
import PageTransition from "./components/PageTransition";
import Navbar from "./components/Navbar";

// Authentications
import { AuthContextProvider } from "./pages/context/AuthContext";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function ClientWrapper({ children }) {
  return (
    <AuthContextProvider>
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <PageTransition>
          <div className="flex-row flex gap-5 items-center justify-center navbar-container z-50">
            <Navbar />
          </div>
          {children}
        </PageTransition>
      </div>
    </AuthContextProvider>
  );
}
