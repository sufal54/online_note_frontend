import { ApiResponse, LoginDataType, UserDataType } from "@/app/interfaces/interface";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL as string;
export const register = async ({ username, email, password }: LoginDataType): Promise<boolean> => {
    const fetchData = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
    });
    const data: ApiResponse = await fetchData.json();
    return data.success;
}

export const login = async ({ email, password }: { email: string; password: string }): Promise<boolean> => {
    const fetchData: ApiResponse = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, credentials: "include", body: JSON.stringify({ email, password })
    }).then((data) => data.json());
    return fetchData.success;
}

export const getUserData = async (): Promise<UserDataType | null> => {
    console.log(`${baseUrl}/api/auth/profile`)
    const fetchData: ApiResponse = await fetch(`${baseUrl}/api/auth/profile`, { credentials: "include" }).then((data) => data.json());
    console.log(fetchData);
    if (fetchData.success) {

        return fetchData.data;
    }
    return null;
}