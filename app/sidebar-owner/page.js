import React, { useState, useEffect } from "react";

export default function SidebarOwner() {

    const handleLogout = () => {
        localStorage.removeItem("token"); // Hapus token dari localStorage
        window.location.href = "/"; // Redirect ke halaman login
    };
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/"; // Redirect jika tidak ada token
        }
    }, []);

    return (
        <div>
            <aside class="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
            <span className="mx-4 font-medium text-white">Article Management App</span>

                <div class="flex flex-col justify-between flex-1 mt-6">
                    <nav>

                    <a class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="/owner/profile">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <span class="mx-4 font-medium">Profile</span>
                        </a>

                        <a class="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200" href="/owner/articles">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <span class="mx-4 font-medium">Articles</span>
                        </a>

                    </nav>

                    <div className="flex items-center px-4 -mx-2 mt-5 cursor-pointer">
                        <h4 className="mx-2 font-medium text-gray-800 dark:text-gray-200 hover:underline" onClick={handleLogout}>Logout</h4>
                    </div>
                </div>
            </aside>
        </div>
    );
}
