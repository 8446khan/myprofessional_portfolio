import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

const AdminLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="flex">

            <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-black flex items-center justify-between px-4 text-white border-b border-gray-800 z-50">
                <h1 className="text-lg font-bold text-blue-500">
                    Admin Panel
                </h1>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-2xl"
                >
                    ☰
                </button>
            </div>

            <div
                className={`fixed top-0 left-0 h-screen w-72 bg-black p-6 text-white border-r border-gray-800 transform transition-transform duration-300 z-40
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0`}
            >
                <h1 className="text-2xl font-bold text-blue-500 mb-8 hidden md:block">
                    Admin Panel
                </h1>

                <div className="mt-16 md:mt-0 space-y-2">

                    <NavLink to="/admin/projects" onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded ${isActive ? "bg-blue-600" : "hover:bg-gray-800"}`
                        }>
                        📁 Projects
                    </NavLink>

                    <NavLink to="/admin/certificates" onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded ${isActive ? "bg-blue-600" : "hover:bg-gray-800"}`
                        }>
                        📜 Certificates
                    </NavLink>

                    <NavLink to="/admin/skills" onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded ${isActive ? "bg-blue-600" : "hover:bg-gray-800"}`
                        }>
                        ⚡ Skills
                    </NavLink>

                    <NavLink to="/admin/qualification" onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded ${isActive ? "bg-blue-600" : "hover:bg-gray-800"}`
                        }>
                        🎓 Qualification
                    </NavLink>

                    <NavLink to="/admin/users" onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded ${isActive ? "bg-blue-600" : "hover:bg-gray-800"}`
                        }>
                        👤 User Info
                    </NavLink>

                </div>

                <button
                    onClick={() => {
                        localStorage.removeItem("isAdminLoggedIn");
                        navigate("/AdminLoginPage");
                    }}
                    className="mt-6 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg"
                >
                    Logout
                </button>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 md:hidden z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className="flex-1 md:ml-72 pt-16 md:pt-10 p-6 md:p-10 bg-gray-950 min-h-screen text-white">
                <Outlet />
            </div>

        </div>
    );
};

export default AdminLayout;