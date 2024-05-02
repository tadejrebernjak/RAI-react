import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./views/layout";
import Home from "./views/routes/home";
import Register from "./views/routes/register";
import Login from "./views/routes/login";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
