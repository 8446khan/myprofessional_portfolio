import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("projects");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");

    if (!isLoggedIn) {
        navigate("/adminlogin");
        return null;
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    "https://myprofessional-portfolio-1.onrender.com/Viewuserinfo"
                );

                setUsers(res.data);
            } catch (error) {
                console.log("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        if (activeTab === "userInfo") {
            fetchUsers();
        }
    }, [activeTab]);

    const menuItem = (name, label) => (
        <button
            onClick={() => setActiveTab(name)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200
            ${activeTab === name
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
        >
            {label}
        </button>
    );

    const Input = (props) => (
        <input
            {...props}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );

    const Card = ({ children }) => (
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg">
            {children}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-950 text-white flex">

            <div className="w-72 bg-black p-6 space-y-3 border-r border-gray-800">
                <h1 className="text-2xl font-bold mb-8 text-blue-500">
                    Admin Panel
                </h1>

                {menuItem("projects", "📁 Projects")}
                {menuItem("certificates", "📜 Certificates")}
                {menuItem("skills", "⚡ Skills")}
                {menuItem("qualification", "🎓 Qualification")}
                {menuItem("userInfo", "👤 User Information")}

                <button
                    onClick={() => {
                        localStorage.removeItem("isAdminLoggedIn");
                        navigate("/adminlogin");
                    }}
                    className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                >
                    Logout
                </button>
            </div>

            <div className="flex-1 p-10">

                {activeTab === "projects" && (
                    <Card>
                        <h2 className="text-2xl font-semibold mb-6">Add Project</h2>
                        <div className="space-y-4">
                            <Input placeholder="Project Title" />
                            <Input placeholder="Description" />
                            <Input placeholder="Project URL" />
                        </div>
                        <button className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg">
                            Add Project
                        </button>
                    </Card>
                )}

                {activeTab === "certificates" && (
                    <Card>
                        <h2 className="text-2xl font-semibold mb-6">Add Certificate</h2>
                        <div className="space-y-4">
                            <Input placeholder="Certificate Name" />
                            <Input placeholder="Issuer" />
                            <Input placeholder="Image URL" />
                        </div>
                        <button className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg">
                            Add Certificate
                        </button>
                    </Card>
                )}

                {activeTab === "skills" && (
                    <Card>
                        <h2 className="text-2xl font-semibold mb-6">Add Skill</h2>
                        <div className="space-y-4">
                            <Input placeholder="Skill Name" />
                            <select className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700">
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </div>
                        <button className="mt-6 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg">
                            Add Skill
                        </button>
                    </Card>
                )}

                {activeTab === "qualification" && (
                    <Card>
                        <h2 className="text-2xl font-semibold mb-6">Add Qualification</h2>
                        <div className="space-y-4">
                            <Input placeholder="Degree" />
                            <Input placeholder="College" />
                            <Input placeholder="Year" />
                        </div>
                        <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg">
                            Add Qualification
                        </button>
                    </Card>
                )}

                {activeTab === "userInfo" && (
                    <div className="space-y-6">

                        {loading ? (
                            <p className="text-gray-400">Loading users...</p>
                        ) : users.length === 0 ? (
                            <p className="text-gray-400">No users found...</p>
                        ) : (
                            users.map((user, index) => (
                                <div
                                    key={index}
                                    className="w-full bg-gray-900 border border-gray-800 p-5 rounded-2xl shadow-lg"
                                >
                                    <h3 className="text-lg font-semibold text-blue-400 mb-3">
                                        👤 {user.name}
                                    </h3>
                                    <p className="text-sm text-gray-300">
                                        Email: {user.email}
                                    </p>
                                    <p className="text-sm text-gray-300 mt-2">
                                        Message: {user.message}
                                    </p>
                                    <div className="mt-4 text-xs text-gray-400 flex gap-6 flex-wrap">
                                        <p>Date: {user.date}</p>
                                        <p>Day: {user.day}</p>
                                        <p>Time: {user.time}</p>
                                    </div>
                                </div>
                            ))
                        )}

                    </div>
                )}

            </div>
        </div>
    );
};

export default AdminDashboard;