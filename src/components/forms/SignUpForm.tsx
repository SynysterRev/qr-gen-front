"use client";

import useSignUpForm from "@/hooks/useSignUpForm";
import { useState } from "react";
import PasswordInput from "../ui/PasswordInput";

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        form,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
    } = useSignUpForm();

    return (
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
            <PasswordInput
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                placeholder="Create a password"
            />
            <PasswordInput
                label="Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                placeholder="Confirm your password"
            />
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
    )
}