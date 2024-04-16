import { createBrowserRouter } from "react-router-dom"
import App from "./App";
import Login from './pages/Login';
import Posts from './pages/Posts';
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter([
    {
        path: "login",
        element: <Login />
    },
    {
        path: "",
        element: <MainLayout />,
        children: [
            { path: "", element: <App /> },
            { path: "/posts", element: <Posts /> },
        ]
    }

]);

export default router