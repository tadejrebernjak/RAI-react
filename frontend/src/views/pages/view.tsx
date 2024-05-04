import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Post } from "../../Types";
import {
    createComment,
    findPost,
    ratePost,
    reportPost,
} from "../../api/postService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFlag,
    faThumbsDown,
    faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import clsx from "clsx";
import { useUserContext } from "../../userContext";

export default function View() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const context = useUserContext();

    const [post, setPost] = useState<Post | null>(null);
    const [pageError, setPageError] = useState<string>("");
    const [newComment, setNewComment] = useState<string>("");

    const { id } = useParams();

    const fetchPost = async () => {
        const { error, data } = await findPost(id);

        if (error) {
            setPageError(data);
            return;
        }

        setPageError("");
        setPost(data);
    };

    useEffect(() => {
        if (id !== undefined && post === null && pageError === "") fetchPost();
    });

    const rate = async (action: "like" | "dislike" | "report") => {
        if (!token) {
            navigate("/login");
            return;
        }

        if (post === null) {
            return;
        }

        if (action === "report") {
            const { error, data } = await reportPost(post.id);

            if (error) {
                setPageError(data);
                return;
            }

            setPost((prevPost: Post | null) => ({
                ...prevPost!,
                reported: !prevPost!.reported,
                reports: prevPost!.reported
                    ? prevPost!.reports - 1
                    : prevPost!.reports + 1,
            }));
            return;
        }

        const { error, data } = await ratePost(action, post.id);

        if (error) {
            setPageError(data);
            return;
        }

        if (action === "like") {
            setPost((prevPost: Post | null) => ({
                ...prevPost!,
                liked: !prevPost!.liked,
                disliked: false,
                likes: prevPost!.liked
                    ? prevPost!.likes - 1
                    : prevPost!.likes + 1,
                dislikes: prevPost!.disliked
                    ? prevPost!.dislikes - 1
                    : prevPost!.dislikes,
            }));
        } else {
            setPost((prevPost: Post | null) => ({
                ...prevPost!,
                disliked: !prevPost!.disliked,
                liked: false,
                dislikes: prevPost!.disliked
                    ? prevPost!.dislikes - 1
                    : prevPost!.dislikes + 1,
                likes: prevPost!.liked ? prevPost!.likes - 1 : prevPost!.likes,
            }));
        }

        return;
    };

    const addComment = async () => {
        if (!token || newComment.trim() === "" || post == null) return;

        const { error, data } = await createComment(newComment.trim(), post.id);

        if (error) {
            setPageError(data);
            return;
        }

        setNewComment("");
        fetchPost();
    };

    const commentForm =
        context.username == null ? (
            <>
                <Link to={"/login"} className="text-center">
                    Log in to post a comment
                </Link>
            </>
        ) : (
            <>
                <div>
                    <textarea
                        placeholder="Write your comment here..."
                        value={newComment}
                        onChange={(e) => {
                            setNewComment(e.target.value);
                        }}
                        rows={4}
                        className="my-3 w-full bg-transparent outline-none border border-gray-500 focus:border-sky-500 transition-colors p-2 text-lg"
                    />
                    <div className="flex justify-end">
                        <button
                            onClick={addComment}
                            className="px-3 py-2 bg-sky-600 hover:bg-sky-500 transition-colors rounded-md text-xl font-semibold"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </>
        );

    if (post === null) {
        return (
            <>
                <p>Loading...</p>
                <p className="text-red-500">{pageError}</p>
            </>
        );
    }

    return (
        <>
            <div className="max-w-screen-md mx-auto p-5 bg-slate-950 border border-gray-600 rounded-xl">
                <h2 className="text-3xl font-montserrat font-semibold text-center">
                    {post.title}
                </h2>

                <h3 className="text-lg font-montserrat italic text-center">
                    Posted by {post.postedBy}, {moment(post.postedAt).fromNow()}
                </h3>

                <img
                    src={post.image}
                    alt="post"
                    className="my-10 mx-auto max-w-full max-h-[400px] object-scale-down"
                />

                <p className="font-motserrat text-lg">Description:</p>
                <p className="text-justify whitespace-break-spaces">
                    {post.content}
                </p>

                <hr className="border-gray-500 my-5" />

                <div className="flex justify-center felx-wrap gap-10 text-xl">
                    <button
                        className={clsx(
                            post.reported && "text-orange-500",
                            "hover:text-orange-600 transition-colors"
                        )}
                        onClick={() => rate("report")}
                    >
                        <FontAwesomeIcon icon={faFlag} />
                        <p>{post.reports}</p>
                    </button>
                    <button
                        className={clsx(
                            post.disliked && "text-red-500",
                            "hover:text-red-600 transition-colors"
                        )}
                        onClick={() => rate("dislike")}
                    >
                        <FontAwesomeIcon icon={faThumbsDown} />
                        <p>{post.dislikes}</p>
                    </button>
                    <button
                        className={clsx(
                            post.liked && "text-green-500",
                            "hover:text-green-600 transition-colors"
                        )}
                        onClick={() => rate("like")}
                    >
                        <FontAwesomeIcon icon={faThumbsUp} />
                        <p>{post.likes}</p>
                    </button>
                </div>
                <p className="text-center text-red-500">{pageError}</p>
            </div>

            <h2 className="mt-10 text-3xl font-montserrat font-semibold">
                Comments:
            </h2>

            {commentForm}

            <hr className="border-gray-500 my-5" />

            {post.comments.map((comment) => (
                <div className="bg-slate-800 mb-5 p-3 rounded-lg border border-gray-600">
                    <h2 className="font-montserrat text-lg">
                        {comment.postedBy.username}:
                        <span className="text-sm italic ml-3">
                            ({moment(comment.postedAt).fromNow()})
                        </span>
                    </h2>
                    <hr className="mt-2 mb-3 border-gray-500" />
                    <p className="text-justify whitespace-break-spaces">
                        {comment.content}
                    </p>
                </div>
            ))}
        </>
    );
}
