import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-slate-950 text-white p-7 flex justify-between items-center flex-wrap gap-10 border-b lg:border border-gray-700">
            <Link to={"/"}>
                <h1 className="text-4xl hover:text-sky-400 transition-colors font-montserrat">
                    RAI-React
                </h1>
            </Link>

            <nav className="flex flex-wrap gap-5 text-xl items-center">
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
            </nav>
        </header>
    );
}
