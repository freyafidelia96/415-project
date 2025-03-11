"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import SideNav from "../components/SideNav";
import PaymentModal from "../components/PaymentModal";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);


  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchPayments() 
  };


  const fetchPayments = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const response = await axios.get(`http://localhost:8000/api/loans/payment/${userId}`);
      setPayments(response.data.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  return (
    <section className="flex">
      <SideNav />
      <div className="w-full">
        <header className="border-b border-black w-full p-2">
          <h2 className="text-xl font-semibold">Loan Management</h2>
        </header>

        <div className="flex justify-between items-center mb-4 p-8">
          <h2 className="text-3xl font-bold">Payments</h2>
          <button
            className="px-6 py-3 bg-black text-white rounded-lg cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            + Record Payment
          </button>
        </div>

        <div className="overflow-x-auto p-8 rounded">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-gray-500 font-medium">Date</th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">customer Name</th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">Amount Paid</th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="px-6 py-4 text-black">{payment.payment_date}</td>
                    <td className="px-6 py-4 text-black">{payment.customer_name}</td>
                    <td className="px-6 py-4 text-black">${payment.amount_paid}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-full">
                        {payment.status || "On Track"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No payments recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <PaymentModal isOpen={isModalOpen} onClose={handleModalClose} />
    </section>
  );
}
