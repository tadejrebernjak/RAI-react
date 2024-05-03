import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="bg-slate-900 min-h-screen lg:py-5 font-ubuntusans">
            <div className="max-w-screen-lg mx-auto">
                <Header />
                <main className="py-10 text-gray-100 px-5 lg:px-5">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}
