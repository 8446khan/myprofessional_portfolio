import React, { useEffect, useState } from "react";
import axios from "axios";

const UserInfo = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState(""); // search state

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/Viewuserinfo"
                );
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, []);

    // Filter users based on search
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.message.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-4">

            {/* Search Input 🔍 */}
            <input
                type="text"
                placeholder="Search by name, email or message..."
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* User List */}
            {filteredUsers.map((user, index) => (
                <div
                    key={index}
                    className="bg-gray-900 p-4 rounded-lg"
                >
                    <p>
                        <b>Name:</b>
                        <span className="text-green-600 capitalize">
                            {" "}
                            {user.name}
                        </span>
                    </p>

                    <p>
                        <b>Email:</b>
                        <a href={`mailto:${user.email}`}>
                            <span className="text-orange-400 hover:text-green-500">
                                {user.email}
                            </span>
                        </a>
                    </p>

                    <p>
                        <b>Message:</b> {user.message}
                    </p>

                    <p>
                        <b>Date:</b> {user.date}
                    </p>

                    <p>
                        <b>Day:</b> {user.day}
                    </p>

                    <p>
                        <b>Time:</b> {user.time}
                    </p>
                </div>
            ))}

            {/* No Result Message */}
            {filteredUsers.length === 0 && (
                <p className="text-red-500 text-center">
                    No users found 🚫
                </p>
            )}

        </div>
    );
};

export default UserInfo;