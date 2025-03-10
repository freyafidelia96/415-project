'use client'

import { useRouter } from 'next/navigation'
import { useState } from "react";
import axios from "axios";

export default function page() {


    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const router = useRouter()

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
                            <form className="auth-form">
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