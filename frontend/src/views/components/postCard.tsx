import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";

import { Post } from "../../Types";
import { Link } from "react-router-dom";

export default function PostCard({
    id,
    title,
    content,
    image,
    likes,
    dislikes,
    postedAt,
}: Post) {
    const sliceText = (text: string): string => {
        const split = text.split(" ");
        let result = split.slice(0, 20).join(" ");
        if (split.length > 20) result += "...";

        return result;
    };

    return (
        <Link to={`/view/${id}`}>
            <div className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform shadow-slate-950 shadow-md">
                <img className="w-full h-[200px] object-cover" src={image} />
                <div className="p-3">
                    <h3 className="mb-3 truncate text-xl font-semibold font-montserrat">
                        {title}
                    </h3>
                    <p className="text-justify">{sliceText(content)}</p>

                    <hr className="mt-4 mb-3" />

                    <div className="flex justify-between flex-wrap gap-5 italic text-gray-300">
                        <p className="capitalize">
                            {moment(postedAt).fromNow()}
                        </p>
                        <div className="flex gap-5">
                            <div>
                                <FontAwesomeIcon icon={faThumbsUp} />
                                <span className="ml-2">{likes}</span>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faThumbsDown} />
                                <span className="ml-2">{dislikes}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
