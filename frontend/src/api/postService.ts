import api from "./service";
import { UploadFormData } from "../Types";

export const createPost = async ({ title, content, image }: UploadFormData) => {
    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", image as File);

        const response = await api.post("/posts", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

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
