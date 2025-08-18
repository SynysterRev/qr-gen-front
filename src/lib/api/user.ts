import { UserCreate } from "../types/user";

const apiURL = "http://127.0.0.1:8000/api/users/"

export async function createUser(newUser: UserCreate) {
    const requestData = {
        email: newUser.email,
        password: newUser.password
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
        throw new Error('User creation failed');
    }

    return response.json();
}