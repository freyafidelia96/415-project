import { useState } from "react";

export default function PaymentModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Record Payment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        {/* Subtext */}
        <p className="text-sm text-gray-500 mt-2">
          Enter the payment details for the selected debtor.
        </p>

        {/* Form */}
        <form className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium">Select Debtor</label>
            <select className="w-full p-2 border rounded-lg">
              <option>Select a debtor</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Payment Amount</label>
            <input type="number" className="w-full p-2 border rounded-lg" placeholder="1000" />
            <p className="text-xs text-gray-500">Enter amount in dollars</p>
          </div>

          <div>
            <label className="block text-sm font-medium">Payment Date</label>
            <input type="date" className="w-full p-2 border rounded-lg" />
          </div>

          {/* Submit Button */}
          <button className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800">
            Record Payment
          </button>
        </form>
      </div>
    </div>
  );
}
