import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-slate-950 text-white p-5 flex justify-between items-center flex-wrap gap-10 border-b lg:border border-gray-700">
            <Link to={"/"}>
                <h1 className="text-2xl hover:text-sky-400 transition-colors">
                    RAI-React
                </h1>
            </Link>

            <nav className="flex flex-wrap gap-5">
                <Link to={"/login"}>
                    <button className="font-bold hover:text-sky-400 transition-colors">
                        Login
                    </button>
                </Link>
                <Link to={"/register"}>
                    <button className="font-bold hover:text-sky-400 transition-colors">
                        Register
                    </button>
                </Link>
            </nav>
        </header>
    );
}
