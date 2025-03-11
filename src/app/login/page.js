'use client'

import { useRouter } from 'next/navigation'
import { useState } from "react";
import axios from "axios";

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;

    const getCsrfCookie = async () => {
        try {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
        } catch (error) {
            console.error('Failed to fetch CSRF cookie', error);
        }
    }

    const API_URL = "http://127.0.0.1:8000";
    const api = axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        withCredentials: true,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginPayload = { email, password };

        try {
            await getCsrfCookie();
            const response = await api.post(`api/login`, loginPayload);
            console.log(response.data);
            const cleanedToken = response.data.token.split('|')[1];
            localStorage.setItem("token", cleanedToken);
            localStorage.setItem("userId", response.data.user.id);
            router.push("/dashboard");
        } catch (error) {
            console.error("Error logging in:", error);
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex h-screen">
            {/* Left side: Image */}
            <div className="hidden md:flex w-1/2 h-full">
                <img src="/login-bg.jpg" alt="Login Background" className="w-full h-full object-cover" />
            </div>

            {/* Right side: Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Account Login</h2>
                    <p className="text-sm text-gray-600 text-center mb-6">
                        If you are already a member, you can log in with your email and password.
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="flex items-center">
                            <input type="checkbox" name="rememberMe" className="mr-2" />
                            <span className="text-sm text-gray-600">Remember me</span>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
                        >
                            Login
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <span className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <span
                                className="text-blue-600 cursor-pointer hover:underline"
                                onClick={() => router.push('/register')}
                            >
                                Sign up here
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
