"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Authentication
import { UserAuth } from "../pages/context/AuthContext";

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Tracker", path: "/pages/tracker" },
    { name: "About", path: "/pages/about" },
  ];

  return (
    <div className="flex rounded-lg items-center w-2/3 p-4 bg-slate-300 text-center justify-between">
      {navItems.map((item, index) => (
        <Link key={index} href={item.path}>
          <span className="text-slate-600 hover:text-slate-900 px-4">
            {item.name}
          </span>
        </Link>
      ))}

      {/* Login/Logout Button */}
      <span className="text-slate-600 hover:text-slate-900 px-4 cursor-pointer">
        {user ? (
          <span onClick={handleLogout}>Logout</span>
        ) : (
          <div className="justify-between px-4 gap-5 flex">
            <span onClick={handleSignIn}>Login</span>
            <span onClick={handleSignIn}>Signup</span>
          </div>
        )}
      </span>
    </div>
  );
};

export default Navbar;
