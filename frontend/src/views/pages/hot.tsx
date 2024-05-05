import { useEffect, useState } from "react";
import PostCard from "../components/postCard";
import { hotPosts } from "../../api/postService";

export default function Hot() {
    const [posts, setPosts] = useState([]);
    const [fetched, setFetched] = useState<boolean>(false);
    const [pageError, setPageError] = useState<string>("");

    useEffect(() => {
        const fetchPost = async () => {
            const { error, data } = await hotPosts();
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
            <h1 className="text-3xl text-center font-montserrat font-semibold mb-10">
                Hot Posts
            </h1>
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
