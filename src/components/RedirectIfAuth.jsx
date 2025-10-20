import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";


export default function RedirectIfAuth() {
    const { user, loading ,role} = useAuth();

    if (loading) return <Loading />

    if (user && !loading) {
        return <Navigate to={`${role}-dashboard`} replace />;
    }


    return <Outlet />;
}