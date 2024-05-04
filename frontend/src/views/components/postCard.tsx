import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";

import { PostPreview } from "../../Types";
import { Link } from "react-router-dom";

export default function PostCard({
    id,
    title,
    content,
    image,
    likes,
    dislikes,
    postedAt,
}: PostPreview) {
    return (
        <Link to={`/view/${id}`}>
            <div className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform shadow-slate-950 shadow-md border border-gray-700">
                <img
                    className="w-full h-[200px] object-cover bg-slate-950"
                    src={image}
                    alt="Post"
                />
                <div className="p-3">
                    <h3 className="mb-3 truncate text-xl font-semibold font-montserrat">
                        {title}
                    </h3>
                    <div className="h-[125px]">
                        <p className="text-justify text-ellipsis overflow-hidden whitespace-normal line-clamp-5">
                            {content}
                        </p>
                    </div>

                    <hr className="mt-4 mb-3" />

                    <div className="flex justify-between flex-wrap gap-5 italic text-gray-300">
                        <p className="capitalize">
                            {moment(postedAt).fromNow()}
                        </p>
                        <div className="flex gap-5">
                            <div>
                                <FontAwesomeIcon icon={faThumbsDown} />
                                <span className="ml-2">{dislikes}</span>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faThumbsUp} />
                                <span className="ml-2">{likes}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
