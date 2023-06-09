import React from 'react';
import { Link, Navigate } from 'react-router-dom';

import { useDispatch } from "react-redux";
import portalogo from "../assets/image/learningportal.svg";
import { userLoggedOut } from "../features/auth/authSlice";
export default function AdminNav() {
    const student = JSON.parse(localStorage.getItem("auth")).user;

    const dispatch = useDispatch();
    const logOut = ()=>{
        dispatch(userLoggedOut());
        localStorage.clear();
        alert("Log Out Successfully!");
        window.location.href = "/admin/login";
    }
  return (
    <nav class="shadow-md">
    <div class="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
    <Link to="/admin/dashboard">  <img class="h-10" src={portalogo} alt="logo" />
    </Link>
        <div class="flex items-center gap-3">
        <Link to="/admin/dashboard">Dashboard</Link>
            <h2 class="font-bold">Admin {student?.name}</h2>
            <button onClick={logOut}
                class="flex gap-2 items-center px-4 py-1 rounded-full text-sm transition-all bg-red-600 hover:bg-red-700 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                Logout
            </button>
        </div>
    </div>
</nav>
  )
}
