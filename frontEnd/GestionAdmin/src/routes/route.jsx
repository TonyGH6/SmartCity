import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../components/login";
import ForgotPassword from "../components/ForgotPassword.jsx";
import ResetPassword from "../components/ResetPassword";
import Dashboard from "../components/dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import PostsHeatMap from "../components/PostsHeatMap";


import Stats from "../components/Stats";
import Comments from "../components/Comments";
import Posts from "../components/Posts";
import Reservation from "../components/reservations";
import Categories from "../components/Categories";
import Users from "../components/Users";


const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/login" replace /> },
    { path: "/login", element: <Login /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Stats /> },
            { path: "comments", element: <Comments /> },
            { path: "posts", element: <Posts /> },
            { path: "reservations", element: <Reservation /> } ,
            { path: "categories", element: <Categories /> } ,
            { path: "users", element: <Users /> } ,
            { path: "map", element: <PostsHeatMap /> },

        ],
    },
]);

export default router;
