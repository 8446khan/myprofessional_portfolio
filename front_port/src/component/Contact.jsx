import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Contact = () => {

    const [formdata, setFormdata] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://myprofessional-portfolio-1.onrender.com/userformdata",
                formdata
            );

            console.log(response.data);
            alert("Message sent successfully!");

            // reset form
            setFormdata({
                name: "",
                email: "",
                message: ""
            });

        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    };


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://myprofessional-portfolio-1.onrender.com/Viewuserinfo"
                );

                console.log(response.data);

            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong!");
            }
        };

        fetchData();

    }, []);

    return (
        <section id="contact" className="py-20 bg-black text-white px-4">

            <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-center mb-10"
            >
                Contact Me 📩
            </motion.h2>

            <motion.form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto bg-white/10 p-6 rounded-2xl flex flex-col gap-5"
            >


                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formdata.name}
                    required
                    onChange={handleChange}
                    className="p-3 rounded-xl bg-white/10 border"
                />


                <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    value={formdata.email}
                    onChange={handleChange}
                    className="p-3 rounded-xl bg-white/10 border"
                />


                <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="4"
                    required
                    value={formdata.message}
                    onChange={handleChange}
                    className="p-3 rounded-xl bg-white/10 border resize-none"
                />


                <button
                    type="submit"
                    className="bg-purple-600 py-3 rounded-xl font-semibold"
                >
                    Send Message 🚀
                </button>

            </motion.form>

        </section>
    );
};

export default Contact;