'use client'
import { useState } from "react";
import SideNav from "../components/SideNav";
import PaymentModal from "../components/PaymentModal";


export default function page() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="flex">

            <SideNav />
            <div className="w-full">
        <header className="border-b border-black w-full p-2">
          <h2 className="text-xl font-semibold">Loan Management</h2>
        </header>

        <div className="flex justify-between items-center mb-4 p-8">
          <h2 className="text-3xl font-bold">Payments</h2>
          <button className="px-6 py-3 bg-black text-white rounded-lg cursor-pointer" onClick={() => setIsModalOpen(true)}>
            + Record Payment
          </button>
        </div>

        <div className="overflow-x-auto p-8 rounded">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-gray-500 font-medium">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">
                  Debtor
                </th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">
                  Amount Paid
                </th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">
                  Status
                </th>
               
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-4 text-black">2024-04-15</td>
                <td className="px-6 py-4 text-black">John Doe</td>
                <td className="px-6 py-4 text-black">$3,500</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-full">
                    On Track
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </section>
    )
}