"use client";

import { useState } from "react";

export default function useSignUpForm() {
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

    return {
        form,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
    }
}