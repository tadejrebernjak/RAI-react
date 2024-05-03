import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserProvider } from "./userContext";
import Layout from "./views/layout";
import Home from "./views/pages/home";
import Register from "./views/pages/register";
import Login from "./views/pages/login";
import View from "./views/pages/view";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
            { path: "/view/:id", element: <View /> },
        ],
    },
]);

function App() {
    return (
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    );
}

export default App;
