'use client'

import { useRouter } from 'next/navigation'
import { useState } from "react";
import axios from "axios";

export default function page() {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const router = useRouter()
    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;

    const getCsrfCookie = async () => {
        try {
          await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
        } catch (error) {
          console.error('Failed to fetch CSRF cookie', error);
        }
    }
    
    const API_URL = "http://127.0.0.1:8000"
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
        const loginPayload = {
            email,
            password,
        };
        try {
            await getCsrfCookie();
            const response = await api.post(`api/login`, loginPayload);
            console.log(response.data)
            const cleanedToken = response.data.token.split('|')[1];
            console.log(cleanedToken);
            localStorage.setItem("token", cleanedToken);
            localStorage.setItem("userId", response.data.user.id)
            router.push("/dashboard");
        } catch (error) {
            console.error("Error registering user:", error);
            alert(error.response?.data?.message || "Login failed");
        }
    };


    return (
        <div>
            <div className="auth-wrapper row">
                <div className="carbg-section col-md-6"></div>
                <div className="auth-form-section col-md-6">
                    <div className="form-wrapper">
                        <div className="form">
                            <div className="form-header">
                                <span className="heading">Account Login</span>
                                <span className="info">If you are already a member, you can login with your email address and password.</span>
                            </div>
                            <form className="auth-form" onClick={handleSubmit}>
                                <div className="form-input-group">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-input-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                <div className="remember-me">
                                    <input type="checkbox" name="rememberMe" value="1" /> Remember me
                                </div>

                                <div className="form-submit">
                                    <input type="submit" className="button-forms button-red" value="Login" />
                                </div>

                                <div className="form-link">
                                    <span>Don't have an account?<span onClick={() => router.push('/register')}>Sign up here </span> </span>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    }