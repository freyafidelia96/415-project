import { useState } from "react";
import axios from "axios";

export default function LoanModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const [customerName, setCustomerName] = useState(null);
  const [amount, setAmount] = useState(null);
  const [repaymentPlan, setRepaymentPlan] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const API_URL = "http://127.0.0.1:8000"

   const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
       'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true,
  });
  
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
   


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token")
    //const crsfToken = await getToken()
    const loanPayload = {
        customer_name: customerName,
        amount,
        repayment_plan : repaymentPlan,
        start_date : startDate,
        user_id : localStorage.getItem("userId")
    };
    try {
        const response = await api.post(`/api/loans`, loanPayload)
        console.log(response.data)
        onClose()
    } catch (error) {
        console.error("Error registering loan:", error);
        alert(error.response?.data?.message || "failed");
    }
};

  


  return (
    <div className="fixed flex items-center justify-center inset-0 bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Create New Loan</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Enter the debtor's information and loan details below.
        </p>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              placeholder="John Doe"
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-lg bg-gray-100"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Start Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-lg"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Loan Amount</label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                placeholder="5000"
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="text-xs text-gray-500">Enter amount</p>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Repayment Plan
              </label>
              <select
                className="w-full p-2 border rounded-lg"
                onChange={(e) => setRepaymentPlan(parseInt(e.target.value, 10))}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a plan
                </option>
                <option value={6}>6 months</option>
                <option value={12}>12 months</option>
              </select>
            </div>
          </div>

          <button className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800">
            Register Loan
          </button>
        </form>
      </div>
    </div>
  );
}
