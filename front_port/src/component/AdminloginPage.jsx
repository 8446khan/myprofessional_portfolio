import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminLoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "https://myprofessional-portfolio-1.onrender.com/Adminlogin",
                { username, password }
            );
            console.log(res)
            if (res.data.success) {
                localStorage.setItem("admin", "true");
                window.location.href = "/admin";
            } else {
                setMsg("❌ Invalid credentials");
            }
        } catch (err) {
            setMsg("❌ Server error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-96">
                <h2 className="text-2xl font-bold text-white text-center mb-6">
                    Admin Login
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition"
                    >
                        Login
                    </button>

                    <p className="text-red-400 text-center">{msg}</p>
                </form>

                <p className="text-white text-center">Change creadential: <Link className="hover:text-orange-300 text-green-300" to="/admin/ChangeAdminCredentials">
                    Set Admin credential

                </Link></p>
            </div>
        </div>
    );
};

export default AdminLoginPage;