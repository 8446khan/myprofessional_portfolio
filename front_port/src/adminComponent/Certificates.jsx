import React, { useState, useEffect } from "react";
import axios from "axios";

const Certificates = () => {

    // Form State
    const [formdata, setFormdata] = useState({
        name: "",
        issuer: "",
        image: null
    });

    // Certificate List
    const [certificates, setCertificates] = useState([]);

    // Handle Input Change
    const changeHandler = (e) => {

        if (e.target.name === "image") {
            setFormdata({
                ...formdata,
                image: e.target.files[0]
            });
        } else {
            setFormdata({
                ...formdata,
                [e.target.name]: e.target.value
            });
        }
    };

    // Submit Form
    const submitHandler = async (e) => {

        e.preventDefault();

        const data = new FormData();

        data.append("name", formdata.name);
        data.append("issuer", formdata.issuer);
        data.append("image", formdata.image);

        try {

            await axios.post(
                "http://localhost:5000/addcertificate",
                data
            );

            fetchCertificates();

            // Reset form
            setFormdata({
                name: "",
                issuer: "",
                image: null
            });

        } catch (error) {
            console.log(error);
        }
    };

    // Fetch Certificates
    const fetchCertificates = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/viewcertificate"
            );

            setCertificates(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCertificates();
    }, []);

    // Delete Certificate
    const deleteCertificate = async (id) => {

        try {

            await axios.delete(
                `http://localhost:5000/deletecertificate/${id}`
            );

            fetchCertificates();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="space-y-4">

            {/* Form */}
            <div className="bg-gray-900 p-6 rounded-lg">

                <h2 className="text-xl mb-4">
                    Add Certificate
                </h2>

                <form onSubmit={submitHandler}>

                    <input
                        type="text"
                        name="name"
                        value={formdata.name}
                        onChange={changeHandler}
                        placeholder="Name"
                        className="block w-full p-2 mb-2 bg-gray-800"
                    />

                    <input
                        type="text"
                        name="issuer"
                        value={formdata.issuer}
                        onChange={changeHandler}
                        placeholder="Issuer"
                        className="block w-full p-2 mb-2 bg-gray-800"
                    />

                    <input
                        type="file"
                        name="image"
                        onChange={changeHandler}
                        className="block w-full p-2 mb-2 bg-gray-800"
                    />

                    <button
                        type="submit"
                        className="bg-green-600 px-4 py-2 mt-2"
                    >
                        Add Certificate
                    </button>

                </form>

            </div>

            {/* View Certificates */}

            {certificates.map((cert) => (

                <div
                    key={cert.id}
                    className="bg-gray-900 p-4 rounded-lg"
                >

                    <p>
                        <b>Name:</b> {cert.name}
                    </p>

                    <p>
                        <b>Issuer:</b> {cert.issuer}
                    </p>

                    <p>
                        <b>Date:</b> {cert.date}
                    </p>

                    {/* Image */}
                    {cert.image && (

                        <img
                            src={`http://localhost:5000/uploads/${cert.image}`}
                            alt="certificate"
                            className="w-40 mt-2 rounded"
                        />

                    )}

                    <button
                        onClick={() =>
                            deleteCertificate(cert.id)
                        }
                        className="bg-red-600 px-3 py-1 mt-2"
                    >
                        Delete
                    </button>

                </div>

            ))}

        </div>
    );
};

export default Certificates;