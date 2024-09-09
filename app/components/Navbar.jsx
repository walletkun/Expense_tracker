'use client';

import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    const navItems = [
    { name: "Home", path: "/" },
    { name: "Tracker", path: "/pages/tracker" },
    { name: "About", path: "/pages/about" },
    ]
    return (
        <div className="flex round-lg items-center p-4 bg-slate-300 text-center justify-between">
          {navItems.map((item, index) => (
            <Link key={index} href={`${item.path}`}>
              <span className="text-slate-600 hover:text-slate-900 px-4">{item.name}</span>
            </Link>
          ))}
        </div>
      )
}

export default Navbar