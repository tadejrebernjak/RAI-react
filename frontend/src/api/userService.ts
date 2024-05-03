import axios from "axios";
import { LoginFormData, RegisterFormData } from "../Types";

export const registerUser = async (formData: RegisterFormData) => {
    try {
        const response = await axios.post(
            "http://localhost:5000/users",
            formData
        );

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
        const response = await axios.post(
            "http://localhost:5000/users/login",
            formData
        );

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
