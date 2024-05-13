import { createBrowserRouter } from "react-router-dom"
import Login from './pages/Auth/Login';
import Posts from './pages/Posts';
import MainLayout from "./layouts/MainLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import Pets from "./pages/Pets";
import PetDetail from "./components/pets/PetDetail";
import PostDetail from "./components/posts/PostDetail";
import Notifications from "./pages/Notifications";
import LostPets from "./pages/LostPets";
import LostPetDetail from "./components/lost-pets/LostPetDetail";
import Register from "./pages/Auth/Register";
import Notices from "./pages/Notices";
import Search from "./pages/Search";
import About from "./pages/About";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import Home from "./pages/Home";
import Terms from "./pages/Terms";
import AnimalProtectionDayCountdown from "./pages/AnimalProtectionDayCountDown";
import AnimalCharities from "./pages/AnimalCharities";

const router = createBrowserRouter([
    {
        path: "login",
        element: <Login />
    },
    {
        path: "register",
        element: <Register />
    },
    {
        path: "terms",
        element: <Terms />
    },
    {
        path: "reset-password",
        children: [
            { path: "", element: <ForgotPassword /> },
            { path: ":token/:id", element: <ResetPassword /> },
        ]
    },
    {
        path: "",
        element: <MainLayout />,
        children: [
            { path: "", element: <Home /> },
            { path: "posts", element: <Posts /> },
            {
                path: ":username",
                element: <ProfileLayout />,
                children: [
                    { path: "", element: <Posts /> },
                    { path: "pets", element: <Pets /> },
                    { path: "notices", element: <Notices /> },
                ]
            },
            { path: "/pet/:petId", element: <PetDetail /> },
            { path: "/post/:postId", element: <PostDetail /> },
            { path: "/notifications", element: <Notifications /> },
            { path: "/lost-pets", element: <LostPets /> },
            { path: "/lost-pet-notice/:id", element: <LostPetDetail /> },
            { path: "/search", element: <Search /> },
            { path: "/about", element: <About /> },
            { path: "/animal-protection-day-count-down", element: <AnimalProtectionDayCountdown /> },
            { path: "/animal-charities", element: <AnimalCharities /> },
        ]
    },
    { path: "*", element: "The page you are looking for is not found" }

]);

export default router