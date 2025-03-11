"use client";
import Link from "next/link";

export default function SideNav() {
  return (
    <section className="h-screen w-64 text-white p-2 bg-gray-800">
      <h1 className="text-xl">Navigation</h1>

      <ul className="p-2 mt-20">
        <li className="block p-2 bg-gray-700 rounded hover:bg-gray-600 mb-2">
          <Link href="/dashboard">
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="block p-2 bg-gray-700 rounded hover:bg-gray-600 mb-2">
          <Link href="/loans">
            <span>Loans</span>
          </Link>
        </li>
        <li className="block p-2 bg-gray-700 rounded hover:bg-gray-600 mb-2">
          <Link href="/payments">
            <span>Payments</span>
          </Link>
        </li>

      </ul>
    </section>
  );
}
