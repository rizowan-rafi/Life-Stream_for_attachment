import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const AboutUs = () => {
    return (
        <div className="bg-[#f8f6f6] min-h-screen">
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="bg-white py-20 px-6 border-b border-slate-100">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-red-600 font-bold uppercase text-sm tracking-widest mb-3">
                                Our Story
                            </p>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                                Every Drop Tells a{" "}
                                <span className="text-red-600">Story</span> of
                                Hope.
                            </h1>
                            <p className="text-gray-600 mt-6 text-lg leading-relaxed">
                                We believe that no life should be lost due to a
                                lack of access to blood. Our platform was born
                                out of a simple idea: to create a digital bridge
                                where compassion meets urgency, connecting those
                                who want to give with those who need it most.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    to="/signup"
                                    className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-200 text-center"
                                >
                                    Join the Mission
                                </Link>
                                <Link
                                    to="/find-donor"
                                    className="bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition text-center"
                                >
                                    Request Assistance
                                </Link>
                            </div>
                        </div>

                        {/* UPDATED IMAGE CONTAINER */}
                        <div className="relative flex justify-center">
                            <div className="w-full max-w-md aspect-square bg-red-50 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                                <img
                                    src="https://c8.alamy.com/comp/2GGGKT3/heart-symbol-with-the-text-donate-blood-save-lives-2GGGKT3.jpg"
                                    alt="Blood Donation Heart"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            {/* Decorative blood drop icon floating */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl hidden md:block">
                                <span className="material-symbols-outlined text-red-600 text-4xl animate-pulse">
                                    bloodtype
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values Section */}
                <section className="py-20 px-6">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-black text-slate-900">
                            Why We Exist
                        </h2>
                        <p className="text-gray-500 mt-4 text-lg">
                            In moments of crisis, searching for blood shouldn't
                            be an additional burden. We strive to make the
                            process transparent, fast, and local.
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
                        <div className="group bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 text-center">
                            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600 transition-colors">
                                <span className="material-symbols-outlined text-3xl text-red-600 group-hover:text-white">
                                    volunteer_activism
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                Pure Altruism
                            </h3>
                            <p className="text-gray-500 leading-relaxed">
                                Our community is built on the selfless act of
                                giving. We celebrate voluntary donors who give
                                without expecting anything in return.
                            </p>
                        </div>

                        <div className="group bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 text-center">
                            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600 transition-colors">
                                <span className="material-symbols-outlined text-3xl text-red-600 group-hover:text-white">
                                    bolt
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                Rapid Response
                            </h3>
                            <p className="text-gray-500 leading-relaxed">
                                By removing intermediaries, we allow families to
                                contact donors instantly, saving precious
                                minutes when they matter most.
                            </p>
                        </div>

                        <div className="group bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 text-center">
                            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600 transition-colors">
                                <span className="material-symbols-outlined text-3xl text-red-600 group-hover:text-white">
                                    groups
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                Community First
                            </h3>
                            <p className="text-gray-500 leading-relaxed">
                                We believe in the power of the collective.
                                Together, we form a safety net that protects our
                                neighbors and loved ones.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Commitment Section */}
                <section className="py-20 px-6 bg-slate-900 text-white rounded-t-[4rem]">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-black mb-8 italic text-red-500">
                            "The gift of blood is the gift of life."
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10">
                            Our commitment goes beyond technology. We are
                            committed to spreading awareness, debunking myths
                            about blood donation, and fostering a culture where
                            giving blood is seen as a regular and vital part of
                            civic duty.
                        </p>
                        <div className="flex justify-center gap-6">
                            <span className="material-symbols-outlined text-red-500 text-4xl">
                                favorite
                            </span>
                            <span className="material-symbols-outlined text-red-500 text-4xl">
                                shield_with_heart
                            </span>
                            <span className="material-symbols-outlined text-red-500 text-4xl">
                                handshake
                            </span>
                        </div>
                    </div>
                </section>

                {/* Simple CTA */}
                <section className="py-20 px-6 text-center">
                    <h2 className="text-3xl font-black text-slate-900 mb-6">
                        Will you be the next hero?
                    </h2>
                    <Link
                        to="/become-a-donor"
                        className="inline-block bg-red-600 text-white px-12 py-4 rounded-2xl font-bold hover:bg-red-700 transition shadow-lg"
                    >
                        Create Your Donor Profile
                    </Link>
                </section>
            </main>

            <footer className="py-12 border-t border-slate-200 text-center text-slate-400 text-sm">
                <div className="mb-4">
                    <span className="font-bold text-slate-900">Life-Saver</span>{" "}
                    Blood Network
                </div>
                &copy; {new Date().getFullYear()} All rights reserved.
            </footer>
        </div>
    );
};

export default AboutUs;
