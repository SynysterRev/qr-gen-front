import { createUser } from "@/lib/services/userService";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import { loginUser } from "@/lib/services/authService";
import useLocalStorage from "./useLocalStorage";
import { UserResponse } from "@/lib/types/user";

export default function useSignInForm() {

    interface Form {
        email: string;
        password: string;
        remember: boolean;
    }

    const [form, setForm] = useState<Form>({
        email: "",
        password: "",
        remember: false
    });

    interface Errors {
        email: string;
    }

    const [errors, setErrors] = useState<Errors>({
        email: "",
    });

    const router = useRouter();
    const [
        user,
        setUser
    ] = useLocalStorage<UserResponse | null>("current_user", null);

    const validateField = (value: string) => {
        let error = "";
        if (!value) error = "Please enter a valid email";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            error = "Please enter a valid email";
        setErrors((prev) => ({ ...prev, 'email': error }));
    };

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleBlur = (e: any) => {
        const { value } = e.target;
        validateField(value);
    };

    async function handleSubmit(e: any) {
        e.preventDefault();
        validateField(form.email,)
        if (Object.values(errors).every((err) => !err)) {
            console.log("Formulaire valide :", form);
            const userData = {
                email: form.email,
                password: form.password
            }
            try {
                const result = await loginUser(userData);
                toast.success("Logged in!");
                setUser(result.user);
                

                // setTimeout(() => {
                //     router.push('/login');
                // }, 1500);
            } catch (error: any) {
                console.error('Error user creation:', error);
                console.log(error.response?.status);
                if (error.status === 401 &&
                    error.data?.detail === "Incorrect email or password") {

                    setErrors(prev => ({
                        ...prev,
                        email: "Incorrect email or password."
                    }));

                } else {
                    toast.error(`Error when trying to log into your account: ${error.message || error}`);
                }
            }
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