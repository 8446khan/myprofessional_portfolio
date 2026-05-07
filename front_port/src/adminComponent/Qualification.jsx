import React, { useState, useEffect } from "react";
import axios from "axios";

const Qualification = () => {

    const API = "http://127.0.0.1:5000";

    const [formdata, setFormdata] = useState({
        degree: "",
        college: "",
        year: ""
    });

    const [qualification, setQualification] = useState([]);

    const changeHandler = (e) => {

        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        });

    };

    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                `http://127.0.0.1:5000/add_qualification`,
                formdata
            );

            alert("Qualification saved successfully ✅");

            getQualification();

            setFormdata({
                degree: "",
                college: "",
                year: ""
            });

        }
        catch (error) {

            console.log(error);
            alert("Error saving qualification ❌");

        }

    };

    const deleteQualification = async (id) => {

        const confirmDelete =
            window.confirm("Delete this qualification?");

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `http://127.0.0.1:5000/delete_qualification/${id}`
            );

            alert("Deleted successfully ✅");

            getQualification();

        }
        catch (error) {

            console.log(error);
            alert("Delete failed ❌");

        }

    };

    const getQualification = async () => {

        try {

            const res = await axios.get(
                `http://127.0.0.1:5000/get_qualification`
            );

            setQualification(res.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        getQualification();

    }, []);

    return (

        <div className="bg-gray-900 p-6 rounded-lg">

            <h2 className="text-xl mb-4">
                Add Qualification
            </h2>

            <form onSubmit={submitHandler}>

                <input
                    type="text"
                    name="degree"
                    value={formdata.degree}
                    onChange={changeHandler}
                    placeholder="Degree"
                    className="block w-full p-2 mb-2 bg-gray-800 text-white"
                    required
                />

                <input
                    type="text"
                    name="college"
                    value={formdata.college}
                    onChange={changeHandler}
                    placeholder="College"
                    className="block w-full p-2 mb-2 bg-gray-800 text-white"
                    required
                />

                <input
                    type="text"
                    name="year"
                    value={formdata.year}
                    onChange={changeHandler}
                    placeholder="Year"
                    className="block w-full p-2 mb-2 bg-gray-800 text-white"
                    required
                />

                <button
                    type="submit"
                    className="bg-yellow-500 px-4 py-2 mt-2 hover:bg-yellow-600 text-black font-semibold"
                >
                    Add Qualification
                </button>

            </form>

            <div className="mt-6">

                <h2 className="text-xl mb-4 capitalize">
                    Uploaded Qualification
                </h2>

                <div className="border-t border-white mb-5"></div>

                {qualification.length === 0 && (

                    <p className="text-gray-400">
                        No qualification added yet
                    </p>

                )}

                {qualification.map((q) => (

                    <div
                        key={q.id}
                        className="bg-gray-800 p-3 mb-2 rounded flex justify-between items-center"
                    >

                        <div>

                            <h3 className="font-bold">

                                <span className="text-green-500 capitalize">

                                    {q.degree}

                                </span>

                            </h3>

                            <p className="capitalize text-sm">

                                {q.college}

                            </p>

                            <p className="text-gray-400 text-sm">

                                {q.year}

                            </p>

                        </div>

                        <button
                            onClick={() =>
                                deleteQualification(q.id)
                            }
                            className="bg-red-500 px-3 py-1 text-sm rounded hover:bg-red-700"
                        >
                            Remove
                        </button>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default Qualification;