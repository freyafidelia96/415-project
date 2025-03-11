"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import SideNav from "../components/SideNav";
import LoanModal from "../components/LoanModal";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loans, setLoans] = useState([]);

  const fetchLoans = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get(
        `http://localhost:8000/api/loans/${userId}`
      );
      setLoans(response.data.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchLoans(); 
  };



  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <section className="flex">
      <SideNav />
      <div className="w-full">
        <header className="border-b border-black w-full p-2">
          <h2 className="text-xl font-semibold">Loan Management</h2>
        </header>

        <div className="flex justify-between items-center mb-4 p-8">
          <h2 className="text-3xl font-bold">Loans</h2>
          <button
            className="px-6 py-3 bg-black text-white rounded-lg cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            + New Loans
          </button>
        </div>

        <div className="overflow-x-auto p-8 rounded">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-gray-500 font-medium">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">
                  Loan Amount
                </th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">
                  Amount to Pay
                </th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">
                  Remaining Balance
                </th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">
                  End Date
                </th>
              </tr>
            </thead>

            {/* <tbody>
              <tr className="border-b">
                <td className="px-6 py-4 text-black">John Doe</td>
                <td className="px-6 py-4 text-black">$5000</td>
                <td className="px-6 py-4 text-black">$5500</td>
                <td className="px-6 py-4 text-black">6 months</td>
                <td className="px-6 py-4 text-black">$3500</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-full">
                    On Track
                  </span>
                </td>
                <td className="px-6 py-4 text-black">2024-04-15</td>
                <td className="px-6 py-4 text-black">2024-04-15</td>
              </tr>
            </tbody> */}

            <tbody>
              {loans.length > 0 ? (
                loans.map((loan) => (
                  <tr key={loan.id} className="border-b">
                    <td className="px-6 py-4 text-black">
                      {loan.customer_name}
                    </td>
                    <td className="px-6 py-4 text-black">${loan.amount}</td>
                    <td className="px-6 py-4 text-black">
                      ${loan.total_amount_to_pay}
                    </td>
                    <td className="px-6 py-4 text-black">
                      {loan.repayment_plan} months
                    </td>
                    <td className="px-6 py-4 text-black">
                      ${loan.total_amount_to_pay - loan.total_paid}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full 
                        ${
                          loan.status === "ongoing"
                            ? "text-green-600 bg-green-100"
                            : "text-red-600 bg-red-100"
                        }`}
                      >
                        {loan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-black">{loan.start_date}</td>
                    <td className="px-6 py-4 text-black">
                      {new Date(
                        new Date(loan.start_date).setMonth(
                          new Date(loan.start_date).getMonth() +
                            loan.repayment_plan
                        )
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No loans found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <LoanModal isOpen={isModalOpen} onClose={handleModalClose} />
    </section>
  );
}
