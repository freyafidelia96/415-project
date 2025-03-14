"use client";
import Link from "next/link";
import { useState } from "react";
import { FaHome, FaCreditCard, FaDollarSign, FaBars, FaTimes, FaUserAlt, FaChartLine } from "react-icons/fa";

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <FaHome size={18} /> },
    { name: "Loans", href: "/loans", icon: <FaCreditCard size={18} /> },
    { name: "Payments", href: "/payments", icon: <FaDollarSign size={18} /> },
    // { name: "Clients", href: "/clients", icon: <FaUserAlt size={18} /> },
    // { name: "Reports", href: "/reports", icon: <FaChartLine size={18} /> },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-700 text-white rounded-md shadow-md"
        onClick={toggleSidebar}
        aria-label="Toggle navigation"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

    
      <section
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:relative md:translate-x-0 transition-transform duration-300 ease-in-out h-screen w-64 text-white shadow-lg z-40 bg-gradient-to-b from-blue-700 to-blue-900 border-r border-blue-800`}
      >
        <div className="flex flex-col h-full">
          
          
          <div className="py-6 px-4 mb-6 bg-gradient-to-r from-blue-800 to-blue-900 border-b border-blue-600">
            <div className="flex items-center justify-between">
              <a href="/" className="text-2xl font-bold flex items-center">
                <span className="text-white">Debt</span>
                <span className="text-green-400">Track</span>
              </a>
              <button
                className="md:hidden text-gray-200 hover:text-white"
                onClick={toggleSidebar}
                aria-label="Close navigation"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>
          <nav className="flex-grow px-3">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="flex items-center p-3 rounded-lg hover:bg-blue-800 hover:border-l-4 hover:border-green-400 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="mr-3 text-green-300">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
{/* 
          
          <div className="px-4 py-3 mt-auto border-t border-blue-700 bg-blue-800 bg-opacity-50">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                <FaUserAlt className="text-blue-200" />
              </div>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-blue-300">admin@debttrack.com</p>
              </div>
            </div>
          </div> */}

          {/* Footer section */}
          <div className="p-4 bg-blue-900">
            <p className="text-sm text-blue-300 text-center">
              © 2025 DebtTrack Management
            </p>
          </div>
        </div>
      </section>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}