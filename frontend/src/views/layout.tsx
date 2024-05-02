import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="bg-slate-900 lg:py-5">
            <div className="min-h-screen max-w-screen-lg mx-auto">
                <Header />
                <main className="py-5">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}
