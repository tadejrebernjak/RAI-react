import { useEffect, useState } from "react";
import PostCard from "../components/postCard";
import { listPosts } from "../../api/postService";

/*
const dummyPosts: Array<Post> = [
    {
        id: "1",
        title: "First Post",
        content:
            "Integer ultrices nec nulla eu tincidunt. Maecenas interdum efficitur tellus, et tristique metus placerat eu. Nulla facilisi. Nullam eget est sit amet risus placerat tristique. Vestibulum a aliquet elit. Ut eget convallis libero. Phasellus varius lacus sit amet libero condimentum, vitae ultricies mauris vestibulum. Mauris auctor enim eu scelerisque malesuada. Integer posuere lectus nec dui interdum, id convallis nunc aliquet.",
        image: "https://picsum.photos/id/0/5000/3333",
        likes: 20,
        dislikes: 5,
        liked: null,
        disliked: null,
        postedAt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // Yesterday
        postedBy: "Alice Smith",
        comments: [],
    },
    {
        id: "2",
        title: "Second Post",
        content:
            "Curabitur consequat arcu nec sapien ullamcorper efficitur. Aliquam dapibus sapien a neque dapibus, a aliquam lectus vulputate. Pellentesque nec urna et ipsum cursus cursus. Nunc eget sapien in quam ullamcorper fermentum vitae eu nulla. Nulla facilisi. Morbi aliquet mi quis nunc pharetra, vel lobortis ligula finibus. Sed convallis nec arcu vel posuere. Nam in dolor auctor, sodales diam non, ullamcorper turpis.",
        image: "https://picsum.photos/id/1/5000/3333",
        likes: 15,
        dislikes: 3,
        liked: null,
        disliked: null,
        postedAt: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), // Two days ago
        postedBy: "Bob Johnson",
        comments: [],
    },
    {
        id: "3",
        title: "Third Post",
        content:
            "Curabitur consequat arcu nec sapien ullamcorper efficitur. Aliquam dapibus sapien a neque dapibus, a aliquam lectus vulputate. Pellentesque nec urna et ipsum cursus cursus. Nunc eget sapien in quam ullamcorper fermentum vitae eu nulla. Nulla facilisi. Morbi aliquet mi quis nunc pharetra, vel lobortis ligula finibus. Sed convallis nec arcu vel posuere. Nam in dolor auctor, sodales diam non, ullamcorper turpis.",
        image: "https://picsum.photos/id/2/5000/3333",
        likes: 15,
        dislikes: 3,
        liked: null,
        disliked: null,
        postedAt: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1002), // Two days ago
        postedBy: "Bob Johnson",
        comments: [],
    },
    {
        id: "4",
        title: "Fourth Post",
        content:
            "Curabitur consequat arcu nec sapien ullamcorper efficitur. Aliquam dapibus sapien a neque dapibus, a aliquam lectus vulputate. Pellentesque nec urna et ipsum cursus cursus. Nunc eget sapien in quam ullamcorper fermentum vitae eu nulla. Nulla facilisi. Morbi aliquet mi quis nunc pharetra, vel lobortis ligula finibus. Sed convallis nec arcu vel posuere. Nam in dolor auctor, sodales diam non, ullamcorper turpis.",
        image: "https://picsum.photos/id/3/5000/3333",
        likes: 15,
        dislikes: 3,
        liked: null,
        disliked: null,
        postedAt: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // Two days ago
        postedBy: "Bob Johnson",
        comments: [],
    },
    {
        id: "5",
        title: "Fifth Post",
        content:
            "Curabitur consequat arcu nec sapien ullamcorper efficitur. Aliquam dapibus sapien a neque dapibus, a aliquam lectus vulputate. Pellentesque nec urna et ipsum cursus cursus. Nunc eget sapien in quam ullamcorper fermentum vitae eu nulla. Nulla facilisi. Morbi aliquet mi quis nunc pharetra, vel lobortis ligula finibus. Sed convallis nec arcu vel posuere. Nam in dolor auctor, sodales diam non, ullamcorper turpis.",
        image: "https://picsum.photos/id/4/5000/3333",
        likes: 15,
        dislikes: 3,
        liked: null,
        disliked: null,
        postedAt: new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000), // Two days ago
        postedBy: "Bob Johnson",
        comments: [],
    },
];
*/

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [fetched, setFetched] = useState<boolean>(false);
    const [pageError, setPageError] = useState<string>("");

    useEffect(() => {
        const fetchPost = async () => {
            const { error, data } = await listPosts();
            setFetched(true);

            if (error) {
                setPageError(data);

                return;
            }

            setPosts(data);
        };

        if (!fetched) fetchPost();
    });

    return (
        <>
            <p className="text-center text-red-500">{pageError}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {posts.map((post: any) => (
                    <PostCard
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        content={post.content}
                        image={post.image}
                        likes={post.likes}
                        dislikes={post.dislikes}
                        reports={post.reports}
                        postedAt={post.postedAt}
                    />
                ))}
            </div>
        </>
    );
}
