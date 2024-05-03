import { Link } from "react-router-dom";
import { useUserContext } from "../../userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export default function Header() {
    const context = useUserContext();

    const logout = () => {
        localStorage.removeItem("token");
        context.setUserData(null);
    };

    const userNav =
        context.username == null ? (
            <>
                <Link
                    to={"/login"}
                    className="font-bold hover:text-sky-400 transition-colors"
                >
                    Login
                </Link>
                <Link
                    to={"/register"}
                    className="font-bold hover:text-sky-400 transition-colors"
                >
                    Register
                </Link>
            </>
        ) : (
            <>
                <span className="font-bold">
                    <FontAwesomeIcon icon={faUser} />
                    <span className="ml-2">{context.username}</span>
                </span>
                <Link
                    to={"/upload"}
                    className="font-bold hover:text-sky-400 transition-colors"
                >
                    New Post
                </Link>
                <button
                    className="font-bold hover:text-sky-400 transition-colors"
                    onClick={logout}
                >
                    Log Out
                </button>
            </>
        );

    return (
        <header className="bg-slate-950 text-white p-7 flex justify-center md:justify-between items-center flex-wrap gap-10 border-b border-gray-800">
            <Link to={"/"}>
                <h1 className="text-4xl hover:text-sky-400 transition-colors font-montserrat">
                    RAI-React
                </h1>
            </Link>

            <nav className="flex flex-wrap gap-7 text-xl items-center justify-center">
                <Link
                    to={"/"}
                    className="font-bold hover:text-sky-400 transition-colors"
                >
                    Home
                </Link>
                <Link
                    to={"/"}
                    className="font-bold hover:text-sky-400 transition-colors"
                >
                    Popular
                </Link>

                <span className="hidden sm:block w-[1px] h-8 border-r border-gray-400" />

                {userNav}
            </nav>
        </header>
    );
}
