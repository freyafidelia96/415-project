"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentModal({ isOpen, onClose }) {
  const [selectedDebtor, setSelectedDebtor] = useState("");
  const [loadId, setLoadId] = useState(null)
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchLoans();
    }
  }, [isOpen]);

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

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      amount_paid: parseFloat(amount),
      payment_date: paymentDate,
    };

    try {
      await axios.post(`http://localhost:8000/api/loans/payment/${loadId}`, payload);
      alert("Payment recorded successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving payment:", error);
      setError("Failed to record payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Record Payment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* Subtext */}
        <p className="text-sm text-gray-500 mt-2">
          Enter the payment details for the selected debtor.
        </p>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Form */}
        <form className="mt-4 space-y-4" onSubmit={handlePaymentSubmit}>
          <div>
            <label className="block text-sm font-medium">Select Debtor</label>
            <select
              className="w-full p-2 border rounded-lg"
              value={loadId}
              onChange={(e) => setLoadId(e.target.value)}
              required
            >
              <option value="">Select a debtor</option>
              {loans.map((loan) => (
                <option key={loan.id} value={loan.id}>
                  {loan.customer_name} (Balance: #{loan.total_amount_to_pay - loan.total_paid})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Payment Amount</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg"
              placeholder="1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500">Enter amount</p>
          </div>

          <div>
            <label className="block text-sm font-medium">Payment Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded-lg"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800 disabled:bg-gray-500"
            disabled={loading}
          >
            {loading ? "Recording..." : "Record Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}
