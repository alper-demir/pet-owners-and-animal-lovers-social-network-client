import { createBrowserRouter } from "react-router-dom"
import App from "./App";
import Login from './pages/Login';
import Posts from './pages/Posts';
import MainLayout from "./layouts/MainLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import Pets from "./pages/Pets";
import PetDetail from "./components/pets/PetDetail";
import PostDetail from "./components/posts/PostDetail";
import Notifications from "./pages/Notifications";
import LostPets from "./pages/LostPets";
import LostPetDetail from "./components/lost-pets/LostPetDetail";

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
            { path: "posts", element: <Posts /> },
            {
                path: ":username",
                element: <ProfileLayout />,
                children: [
                    { path: "", element: <Posts /> },
                    { path: "pets", element: <Pets /> },
                ]
            },
            { path: "/pet/:petId", element: <PetDetail /> },
            { path: "/post/:postId", element: <PostDetail /> },
            { path: "/notifications", element: <Notifications /> },
            { path: "/lost-pets", element: <LostPets /> },
            { path: "/lost-pet-notice/:id", element: <LostPetDetail /> },
        ]
    },
    { path: "*", element: "The page you are looking for is not found" }

]);

export default router