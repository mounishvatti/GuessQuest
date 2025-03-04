import axios from "axios";
import {BACKEND_URL} from "@/constants"
export const loginService = async (username: string, password: string) => {
    const res = await axios.post(`${BACKEND_URL}/api/auth/login`, { username, password });
    return res.data;
};

export const registerService = async (name: string, username: string, password: string) => {
    const res = await axios.post(`${BACKEND_URL}/api/auth/register`, { name, username, password });
    return res.data;
}