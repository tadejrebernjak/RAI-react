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

export const listPosts = async () => {
    try {
        const response = await api.get("/posts");

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

export const hotPosts = async () => {
    try {
        const response = await api.get("/posts/hot");

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

export const findPost = async (id: string | undefined) => {
    try {
        const response = await api.get(`/posts/${id}`);

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

export const ratePost = async (action: string, id: string) => {
    try {
        const response = await api.post(`/posts/rate/${id}/${action}`);

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

export const reportPost = async (id: string) => {
    try {
        const response = await api.post(`/posts/report/${id}`);

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

export const createComment = async (content: string, postId: string) => {
    try {
        const response = await api.post("/comments", {
            postId,
            content,
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
