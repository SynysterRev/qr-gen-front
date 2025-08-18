"use client";

import PasswordInput from "../ui/PasswordInput";
import EmailInput from "../ui/EmailInput";
import Link from "next/link";
import useSignInForm from "@/hooks/useSignInForm";

export default function SignUpForm() {
    const {
        form,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
    } = useSignInForm();

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <EmailInput
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
            />
            <PasswordInput
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
            />
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 font-semibold">
                    <input
                        type="checkbox"
                        id="remember"
                        className="h-4 w-4"
                        name="remember"
                        checked={form.remember}
                        onChange={handleChange}
                    />
                    <label htmlFor="remember" className="text-md">Remember me</label>
                </div>
                <Link href="/" className="text-purple-600 hover:text-purple-500"> Forgot password? </Link>
            </div>
            <button type="submit" className="w-full text-center rounded-xl h-10 text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 cursor-pointer">
                Sign In
            </button>
        </form>
    )
}