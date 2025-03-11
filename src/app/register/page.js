'use client'

import { useRouter } from 'next/navigation'
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    
    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;

    const getToken = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/token", {
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching token", error);
            return "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await getToken();
        
        const registerPayload = { email, name, password };
        try {
            await axios.post("http://127.0.0.1:8000/api/register", registerPayload, {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token,
                },
            });
            router.push("/login");
        } catch (error) {
            console.error("Error registering user:", error);
            alert(error.response?.data?.message || "Registration failed.");
        }
    };

    return (
        <div className="flex h-screen">
            {/* Left side: Image */}
            <div className="hidden md:flex w-1/2 h-full">
                <img src="/register-bg.jpg" alt="Register Background" className="w-full h-full object-cover" />
            </div>
            
            {/* Right side: Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Account Sign Up</h2>
                    <p className="text-sm text-gray-600 text-center mb-6">
                        Become a member and enjoy exclusive promotions.
                    </p>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" className="w-full p-3 border border-gray-300 rounded-md" required
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" className="w-full p-3 border border-gray-300 rounded-md" required
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" className="w-full p-3 border border-gray-300 rounded-md" required
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900">
                            Sign Up
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <span className="text-sm text-gray-600">
                            Already have an account? <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => router.push('/login')}>Sign in here</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}