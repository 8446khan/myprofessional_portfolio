import axios from "axios";
import React, { useState, useEffect } from "react";

const Projects = () => {
    const [projects, setProjects] = useState([]);

    const [formdata, setFormdata] = useState({
        title: "",
        description: "",
        url: "",
    });

    const changeHandler = (e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        });
    };

    const fetchdata = async () => {
        try {
            const res = await axios.get(
                "https://myprofessional-portfolio-1.onrender.com/viewprojects"
            );
            setProjects(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://myprofessional-portfolio-1.onrender.com/projects",
                formdata
            );

            console.log(response.data);
            alert("saved successfully");

            setFormdata({
                title: "",
                description: "",
                url: "",
            });

            fetchdata();

        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        fetchdata();
    }, []);

    const deleteproject = async (id) => {
        const isconfirm = window.confirm(
            "Are you sure! want to delete project"
        );

        if (!isconfirm) return;

        try {
            await axios.delete(
                `https://myprofessional-portfolio-1.onrender.com/projects_delete/${id}`
            );

            setProjects(
                projects.filter((p) => p.id !== id)
            );

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="bg-gray-900 p-6 rounded-lg my-6">
                <form onSubmit={submitHandler}>
                    <h2 className="text-xl mb-4">
                        Add Project
                    </h2>

                    <input
                        name="title"
                        required
                        value={formdata.title}
                        onChange={changeHandler}
                        className="block capitalize w-full p-2 mb-2 bg-gray-800"
                        placeholder="Title"
                    />

                    <input
                        value={formdata.description}
                        required
                        onChange={changeHandler}
                        name="description"
                        className="block w-full p-2 mb-2 bg-gray-800"
                        placeholder="Description"
                    />

                    <input
                        value={formdata.url}
                        required
                        onChange={changeHandler}
                        name="url"
                        className="block w-full p-2 mb-2 bg-gray-800"
                        placeholder="URL"
                    />

                    <button className="bg-blue-600 px-4 py-2 mt-2">
                        Add Project
                    </button>
                </form>
            </div>

            <div className="space-y-2">
                <h2 className="text-xl mb-4 capitalize">
                    uploaded projects
                </h2>

                <div className="border-t border-white mb-5"></div>

                {projects.map((user) => (
                    <div
                        key={user.id}
                        className="bg-gray-900 p-4 rounded-lg flex flex-row justify-between"
                    >
                        <div>
                            <p>
                                <b>Title:</b>
                                <span className="text-md capitalize">
                                    {" "}
                                    {user.title}
                                </span>
                            </p>

                            <a href={user.url}>
                                <b>URL:</b>
                                <span className="text-green-600 hover:text-orange-400">
                                    {" "}
                                    {user.url}
                                </span>
                            </a>

                            <p>
                                <b>Description:</b>
                                <span className="text-gray-400 capitalize text-sm">
                                    {" "}
                                    {user.description}
                                </span>
                            </p>
                        </div>

                        <div>
                            <button
                                onClick={() =>
                                    deleteproject(user.id)
                                }
                                className="bg-green-400 text-white capitalize text-sm border-none rounded-sm p-2 hover:bg-orange-600"
                            >
                                remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Projects;