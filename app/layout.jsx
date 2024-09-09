import localFont from "next/font/local";
import "./globals.css";

//Components
import PageTransition from "./components/PageTransition";
import Navbar from "./components/Navbar";


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

export const metadata = {
  title: "Expense Tracker",
  description: "A simple expense tracker has the ability to add, edit, and delete items.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <PageTransition>
          <div className="flex-row flex gap-5 items-center justify-center navbar-container z-50">
            <Navbar />
          </div>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
