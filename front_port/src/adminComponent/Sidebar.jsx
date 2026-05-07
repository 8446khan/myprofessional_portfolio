import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const menuItem = (path, label) => (
        <button
            onClick={() => {
                navigate(path);
                setIsOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800"
        >
            {label}
        </button>
    );

    return (
        <div className="flex bg-gray-950 text-white">


            <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-black flex items-center justify-between px-4 z-50 border-b border-gray-800">

                <h1 className="text-lg font-bold text-blue-500">
                    Admin Panel
                </h1>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-2xl text-white"
                >
                    ☰
                </button>

            </div>


            <div
                className={`fixed top-0 left-0 h-full w-72 bg-black border-r border-gray-800 p-6 transform transition-transform duration-300 z-40

                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0`}
            >

                <h1 className="text-2xl font-bold text-blue-500 mb-8 hidden md:block">
                    Admin Panel
                </h1>

                <div className="mt-16 md:mt-0 space-y-2">

                    {menuItem("/projects", "📁 Projects")}
                    {menuItem("/certificates", "📜 Certificates")}
                    {menuItem("/skills", "⚡ Skills")}
                    {menuItem("/qualification", "🎓 Qualification")}
                    {menuItem("/users", "👤 User Information")}

                </div>

            </div>


            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 md:hidden z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}


            <div className="flex-1 w-full md:ml-72 pt-16 md:pt-10 p-6 md:p-10 min-h-screen">

                <Outlet />

            </div>

        </div>
    );
};

export default Sidebar;