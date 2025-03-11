'use client'

import { useRouter } from 'next/navigation'
import { useState } from "react";
import axios from "axios";



export default function Page() {

    const [email, setEmail] = useState(null)
    const [name, setName] = useState(null)
    const [password, setPassword] = useState(null)

    const router = useRouter()
    const api = "http://127.0.0.1:8000"

    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;
    

    const getToken = async () => {
        const response = await axios.get(`${api}/token`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response)
        return response.data
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await getToken()
        console.log("token", token)

        const registerPayload = {
            email,
            name,
            password,
        };
        try {
            const response = await axios.post(`${api}/api/register`, registerPayload, {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token

                },
            });
            router.push("/login");
        } catch (error) {
            console.error("Error registering user:", error);
            alert(error.response?.data?.message || "Registration failed. Please try again.");
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
                                <span className="heading">Account Sign Up</span>
                                <span className="info">Become a member and enjoy exclusive promotions.</span>
                            </div>
                            <form className="auth-form" onSubmit={handleSubmit}>
                                <div className="form-input-group">
                                    <label htmlFor="fullName">Full Name</label>
                                    <input type="text" name="fullName" onChange={(e) => setName(e.target.value)} />
                                </div>

                                <div className="form-input-group">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div className="form-input-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                                </div>


                                <div className="form-submit">
                                    <input type="submit" className="button-forms button-red" value="Continue" />
                                </div>

                                <div className="form-link">
                                    <span>Already have an account? <span onClick={() => router.push('/login')}>Sign in here</span> </span>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}