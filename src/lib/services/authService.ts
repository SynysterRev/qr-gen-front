import { UserLogin } from "../types/user";

const apiURL = "http://127.0.0.1:8000/api/login/"

export async function loginUser(user: UserLogin) {
    const requestData = {
        email: user.email,
        password: user.password
    }

    const response = await fetch(
        apiURL,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        }
    );

    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch {
            errorData = { detail: 'Unknown error' };
        }

        const error = new Error(errorData.detail || 'Connexion failed');
        (error as any).status = response.status;
        (error as any).data = errorData;
        throw error;
    }

    return response.json();
}