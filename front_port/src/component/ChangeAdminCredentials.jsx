import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ChangeAdminCredentials = () => {
    const [oldUsername, setOldUsername] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "https://myprofessional-portfolio-1.onrender.com/change-admin",
                {
                    oldUsername,
                    oldPassword,
                    newUsername,
                    newPassword
                }
            );

            console.log(res.data)
            if (res.data.success) {
                setMsg("✅ Credentials updated successfully");

                localStorage.removeItem("admin");

                setTimeout(() => {
                    navigate("/AdminLoginPage")

                }, 1500);

            } else {
                setMsg("❌ Old credentials are incorrect");
            }
        } catch (err) {
            console.log(err)
            setMsg("❌ Server error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-96">
                <h2 className="text-2xl font-bold text-white text-center mb-6">
                    Change Admin Credentials
                </h2>

                <form onSubmit={handleChange} className="space-y-4">

                    <input
                        type="text"
                        required
                        placeholder="Old Username"
                        className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setOldUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        required
                        placeholder="Old Password"
                        className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setOldPassword(e.target.value)}
                    />

                    <input
                        type="text"
                        required
                        placeholder="New Username"
                        className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500"
                        onChange={(e) => setNewUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        required
                        placeholder="New Password"
                        className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold transition"
                    >
                        Update Credentials
                    </button>

                    <p className="text-red-400 text-center">{msg}</p>

                </form>
            </div>
        </div>
    );
};

export default ChangeAdminCredentials;