export type FormControl<FormData> = {
    label: string;
    name: keyof FormData;
    type: "text" | "email" | "password" | "textarea" | "file";
    error: string | null;
    check: (data: FormData) => string | null;
};

export type RegisterFormData = {
    email: string;
    username: string;
    password: string;
    passwordRepeat: string;
};

export type LoginFormData = {
    username: string;
    password: string;
};

export type UploadFormData = {
    title: string;
    content: string;
    image: File | null;
};

export type Comment = {
    content: string;
    postedAt: Date;
    postedBy: any;
};

export type PostPreview = {
    id: string;
    title: string;
    content: string;
    image: string;
    likes: number;
    dislikes: number;
    reports: number;
    postedAt: Date;
};

export type Post = {
    id: string;
    title: string;
    content: string;
    image: string;
    likes: number;
    dislikes: number;
    reports: number;
    liked: boolean | null;
    disliked: boolean | null;
    reported: boolean | null;
    postedAt: Date;
    postedBy: string;
    comments: Array<Comment>;
};

export type ServiceResponse = {
    error: boolean;
    data: any;
};
