import api from "./service";
import { LoginFormData, RegisterFormData } from "../Types";

export const registerUser = async (formData: RegisterFormData) => {
    try {
        const response = await api.post("/users", formData);

        return {
            error: false,
            data: response.data,
        };
    } catch (err: any) {
        console.log(err);
        return {
            error: true,
            data: err.response.data,
        };
    }
};

export const loginUser = async (formData: LoginFormData) => {
    try {
        const response = await api.post("/users/login", formData);

        return {
            error: false,
            data: response.data,
        };
    } catch (err: any) {
        console.log(err);
        return {
            error: true,
            data: err.response.data,
        };
    }
};

export const checkToken = async () => {
    try {
        const response = await api.get("/users/token");

        console.log(response);
        return {
            error: false,
            data: response.data,
        };
    } catch (err: any) {
        console.log(err);
        return {
            error: true,
            data: err.response.data,
        };
    }
};
