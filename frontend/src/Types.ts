export type Comment = {
    content: string;
    postedAt: Date;
    postedBy: string;
};

export type Post = {
    id: string;
    title: string;
    content: string;
    image: string;
    likes: number;
    dislikes: number;
    liked: boolean | null;
    disliked: boolean | null;
    postedAt: Date;
    postedBy: string;
    comments: Array<Comment>;
};
