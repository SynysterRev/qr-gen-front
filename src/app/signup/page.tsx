"use client"

import Card from "../../components/ui/Card";
import { useState } from "react";

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    interface Form {
        email: string;
        password: string;
        confirmPassword: string;
        terms: boolean;
    }

    const [form, setForm] = useState<Form>({
        email: "",
        password: "",
        confirmPassword: "",
        terms: false
    });

    interface Errors {
        email: string;
        password: string;
        confirmPassword: string;
        terms: boolean;
    }

    const [errors, setErrors] = useState<Errors>({
        email: "",
        password: "",
        confirmPassword: "",
        terms: false
    });

    const validateField = (name: string, value: string | boolean) => {
        let error = "";
        switch (name) {
            case "email":
                if (typeof value !== 'string') break;
                if (!value) error = "Please enter a valid email";
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    error = "Please enter a valid email";
                break;

            case "password":
                if (typeof value !== 'string') break;
                if (!value) {
                    error = "Please enter a password";
                } else {
                    const errorsList = [];
                    if (value.length < 8)
                        errorsList.push("• Must contain at least 8 characters");
                    if (!/[0-9]/.test(value))
                        errorsList.push("• Must contain at least one digit");
                    if (!/[a-z]/.test(value))
                        errorsList.push("• Must contain at least one lowercase letter");
                    if (!/[A-Z]/.test(value))
                        errorsList.push("• Must contain at least one uppercase letter");
                    if (!/[\W_]/.test(value))
                        errorsList.push("• Must contain at least one special character");

                    error = errorsList.join("\n");
                }
                break;

            case "confirmPassword":
                if (typeof value !== 'string') break;
                if (!value) error = "Please confirm your password";
                else if (value !== form.password)
                    error = "Passwords do not match";
                break;

            case "terms":
                if (!value) error = "You must accept the conditions";
                break;

            default:
                break;
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleBlur = (e: any) => {
        const { name, value, type, checked } = e.target;
        validateField(name, type === "checkbox" ? checked : value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        Object.keys(form).forEach((field) =>
            validateField(field as keyof Form, form[field as keyof Form])
        );
        if (Object.values(errors).every((err) => !err)) {
            console.log("Formulaire valide :", form);
            // createAccount(form) — si tu veux appeler ta fonction backend
        }
    };

    return (
        <>
            <div className="pt-16 flex justify-center">
                <div className=" max-w-md w-full">
                    <a className="text-3xl"><span className="bg-gradient-to-r from-blue-600 via-primary to-pink-600 bg-clip-text text-transparent font-bold">Title</span></a>
                    <h1 className="text-3xl font-bold tracking-tight mt-6 mb-2">Create your account</h1>
                    <p className="text-muted-foreground text-lg mb-10">Join to create amazing QR codes.</p>
                    <Card className="py-8">
                        <div className="text-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col">
                            <h3 className="font-semibold text-2xl mb-2">Sign Up</h3>
                            <p className="text-muted-foreground">Create your account to get started with title.</p>
                        </div>
                        <div className="space-y-6 mt-8 p-6">
                            <div className="space-y-3">
                                <button className="inline-flex items-center justify-center gap-2 px-4 py-2 w-full border border-gray-50 rounded-xl text-sm font-semibold shadow-sm cursor-pointer hover:bg-gray-50">
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
                                    </svg>
                                    Continue with Google
                                </button>
                                <button className="inline-flex items-center justify-center gap-2 px-4 py-2 w-full border border-gray-50 rounded-xl text-sm font-semibold shadow-sm cursor-pointer hover:bg-gray-50">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                                    </svg>
                                    Continue with GitHub
                                </button>
                                <button className="inline-flex items-center justify-center gap-2 px-4 py-2 w-full border border-gray-50 rounded-xl text-sm font-semibold shadow-sm cursor-pointer hover:bg-gray-50">
                                    <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                                    </svg>
                                    Continue with Facebook
                                </button>
                            </div>
                            <div className="flex items-center text-gray-500">
                                <div className="flex-1 border-t border-gray-300"></div>
                                <span className="px-3 text-xs">OR CONTINUE WITH EMAIL</span>
                                <div className="flex-1 border-t border-gray-300"></div>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="email">Email</label>
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail absolute left-3 top-3.5 h-4 w-4 text-muted-foreground">
                                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                        </svg>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="border border-gray-50 rounded-xl w-full h-10 pl-10 shadow-sm"
                                            placeholder="Enter your email"
                                            value={form.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                        />
                                    </div>
                                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                                </div>

                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="password">Password</label>
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock absolute left-3 top-3.5 h-4 w-4 text-muted-foreground">
                                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            className="border border-gray-50 rounded-xl w-full h-10 pl-10 shadow-sm"
                                            placeholder="Create a password"
                                            value={form.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                        />
                                        <button
                                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all absolute right-0 top-0 mx-1 my-1 p-2 rounded-full cursor-pointer hover:bg-gray-100"
                                            type="button"
                                            onClick={() => setShowPassword(prev => !prev)}
                                            aria-label={showPassword ? "Hide password" : "Show password"}>
                                            {showPassword ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-10-7-10-7a17.45 17.45 0 013.414-4.765M6.9 6.9A9.967 9.967 0 0112 5c7 0 10 7 10 7a17.467 17.467 0 01-2.892 4.148M3 3l18 18" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <div className="text-red-500 text-sm" style={{ whiteSpace: "pre-line" }}>{errors.password}</div>
                                    )}
                                </div>

                                <div className="space-y-2 flex flex-col">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock absolute left-3 top-3.5 h-4 w-4 text-muted-foreground">
                                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            className="border border-gray-50 rounded-xl w-full h-10 pl-10 shadow-sm"
                                            placeholder="Confirm your password"
                                            value={form.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                        />
                                        <button
                                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all absolute right-0 top-0 mx-1 my-1 p-2 rounded-full cursor-pointer hover:bg-gray-100"
                                            type="button"
                                            onClick={() => setShowConfirmPassword(prev => !prev)}
                                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}>
                                            {showConfirmPassword ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-10-7-10-7a17.45 17.45 0 013.414-4.765M6.9 6.9A9.967 9.967 0 0112 5c7 0 10 7 10 7a17.467 17.467 0 01-2.892 4.148M3 3l18 18" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
                                </div>
                                <div className="space-y-2 flex flex-col">
                                    <div className="flex items-center space-x-2 font-semibold">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            className="h-4 w-4"
                                            required
                                            name="terms"
                                            checked={form.terms}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <label htmlFor="terms" className="text-md">
                                            I agree to the
                                            <a href="/terms" className="text-purple-600 hover:text-purple-500"> Terms of Service </a>
                                            and
                                            <a href="/privacy" className="text-purple-600 hover:text-purple-500"> Privacy Policy</a>
                                        </label>
                                    </div>
                                    {errors.terms && <span className="text-red-500 text-sm">{errors.terms}</span>}
                                </div>
                                <button type="submit" className="w-full text-center rounded-xl h-10 text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 cursor-pointer">
                                    Create Account
                                </button>
                            </form>
                        </div>
                        <div className="text-center text-sm">
                            <span className="text-muted-foreground">Already have an account? </span>
                            <a href="/login" className="text-purple-600 hover:text-purple-500 font-medium">Sign in</a>
                        </div>
                    </Card>
                    <div className="text-center mt-8 text-sm text-muted-foreground">
                        <p>By creating an account, you agree to our
                            <a href="/terms" className="text-purple-600 hover:text-purple-500"> Terms of Service</a> and
                            <a href="/privacy" className="text-purple-600 hover:text-purple-500"> Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div >
        </>
    )
}