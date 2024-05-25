import { createBrowserRouter } from "react-router-dom"
import Login from './pages/Auth/Login';
import Posts from './components/profile/Posts';
import MainLayout from "./layouts/MainLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import Pets from "./components/profile/Pets";
import PetDetail from "./components/pets/PetDetail";
import PostDetail from "./components/posts/PostDetail";
import Notifications from "./pages/Notifications";
import Notices from "./pages/Notices";
import LostPetDetail from "./components/lost-pets/LostPetDetail";
import Register from "./pages/Auth/Register";
import LostNotices from "./components/profile/LostNotices";
import Search from "./pages/Search";
import About from "./pages/About";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import Home from "./pages/Home";
import Terms from "./pages/Terms";
import AnimalProtectionDayCountdown from "./pages/AnimalProtectionDayCountDown";
import AnimalCharities from "./pages/AnimalCharities";
import ConfirmAccount from "./pages/Auth/ConfirmAccount";
import DiscussionForum from "./pages/DiscussionForum";
import DiscussionDetail from "./components/discussion/DiscussionDetail";
import Volunteer from "./pages/Volunteer";
import Volunteers from "./pages/Volunteers";
import AdoptionNotices from "./components/profile/AdoptionNotices";
import AdoptionNoticeDetail from "./components/adoption-notice/AdoptionNoticeDetail";
import Chat from "./pages/Chat";
import ChatLayout from "./layouts/ChatLayout";

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
        path: "confirm-account/:token/:id", element: <ConfirmAccount />
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
                    { path: "notices", element: <LostNotices /> },
                    { path: "adoption-notices", element: <AdoptionNotices /> },
                ]
            },
            { path: "/pet/:petId", element: <PetDetail /> },
            { path: "/post/:postId", element: <PostDetail /> },
            { path: "/notifications", element: <Notifications /> },
            { path: "/notices", element: <Notices /> },
            { path: "/lost-pet-notice/:id", element: <LostPetDetail /> },
            { path: "/adoption-notice/:id", element: <AdoptionNoticeDetail /> },
            { path: "/search", element: <Search /> },
            { path: "/about", element: <About /> },
            { path: "/animal-protection-day-count-down", element: <AnimalProtectionDayCountdown /> },
            { path: "/animal-charities", element: <AnimalCharities /> },
            { path: "/discussion-forum", element: <DiscussionForum /> },
            { path: "/discussion/:id", element: <DiscussionDetail /> },
            { path: "/volunteer", element: <Volunteer /> },
            { path: "/volunteers", element: <Volunteers /> },
            {
                path: "chat",
                element: <ChatLayout />,
                children: [
                    { path: ":roomId", element: <Chat /> }
                ]
            }

        ]
    },
    { path: "*", element: "The page you are looking for is not found" }

]);

export default router