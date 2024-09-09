'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserAuth } from "./pages/context/AuthContext";

export default function Home() {
  const { googleSignIn, user } = UserAuth(); // Destructure user and googleSignIn from context
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to /tracker if user is already authenticated
  useEffect(() => {
    if (user) {
      router.push('pages/tracker');
    }
  }, [user, router]);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await googleSignIn();
      router.push('/tracker'); // Redirect to /tracker after successful sign-in
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        alert("Sign-in failed because the popup was closed by the user.");
      } else {
        alert('An error occurred during sign-in. Please try again.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex max-h-screen min-h-screen flex-col items-center justify-center p-4 z-40">
      <h1 className="text-4xl items-center text-center justify-center mb-4">Welcome to Our Expense Tracker</h1>
      <p className="mb-4 text-center">Track your expenses easily with our tool.</p>
      <button 
        className="text-white bg-slate-400 hover:bg-slate-700 p-3 rounded"
        onClick={handleSignIn}
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? 'Signing In...' : 'Go to Tracker'}
      </button>
    </div>
  );
}
