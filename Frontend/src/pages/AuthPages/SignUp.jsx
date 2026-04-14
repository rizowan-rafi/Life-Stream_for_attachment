import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar"; // Navbar is imported here
import axiosInstance from "../../utilities/axiosInstance";
import { sendOTP } from "../../services/firebaseAuthService";
import { API_PATHS } from "../../utilities/apiPath";
import Swal from "sweetalert2";
const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        phone: "",
        bloodGroup: "",
        address: "",
        lastDonation: "",
        terms: false,
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (!formData.name || !formData.phone || !formData.password) {
                throw new Error("Please fill in all required fields");
            }

            if (!formData.terms) {
                throw new Error("Please agree to terms and conditions");
            }

            
            
            const phoneNumber = formData.phone
            const registrationResponse = await axiosInstance.post(
                API_PATHS.AUTH.REGISTRATION,
                {
                    name: formData.name,
                    phoneNumber: formData.phone,
                    password: formData.password,
                    bloodGroup: formData.bloodGroup || "O+",
                    location: formData.address.toLowerCase() || "not specified",
                },
            );
if (registrationResponse?.data?.success) {
    // Save to session storage using the correct keys from formData
    sessionStorage.setItem("signupData", JSON.stringify(formData));
    // sessionStorage.setItem("phoneNumber", phoneNumber); // FIXED HERE

    Swal.fire({
        position: "center",
        icon: "success",
        title:
            "Registration Successful!Please login",
        showConfirmButton: false,
        timer: 1500,
    });

    // Wait for the alert to show briefly before navigating
    setTimeout(() => {
        navigate("/signin");
    }, 1500);
}
            

        } catch (err) {
            // Logic fix: display actual backend message if it exists
            const msg =
                err.response?.data?.message ||
                err.message ||
                "Failed to register.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f8f6f6] min-h-screen">
            {/* 1. Navbar added here */}
            <Navbar />

            <main className="py-12 px-6">
                <div className="max-w-140 mx-auto">
                    {/* Hero Section */}
                    <div className="mb-8">
                        <p className="text-red-600 font-bold uppercase text-sm">
                            Join the mission
                        </p>

                        <h1 className="text-4xl font-black mt-2 text-slate-900">
                            Become a Donor
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Your small contribution can save up to three lives.
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form
                        className="flex flex-col gap-6"
                        onSubmit={handleSubmit}
                    >
                        {/* Name */}
                        <div>
                            <label className="text-sm font-bold text-slate-900">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-red-200 rounded-xl py-3 px-4 mt-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="text-sm font-bold text-slate-900">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="01XXXXXXXXX"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full border border-red-200 rounded-xl py-3 px-4 mt-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                We'll send an OTP to this number
                            </p>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-bold text-slate-900">
                                Password *
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength="8"
                                className="w-full border border-red-200 rounded-xl py-3 px-4 mt-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Minimum 8 characters
                            </p>
                        </div>

                        {/* Blood Group */}
                        <div>
                            <label className="text-sm font-bold text-slate-900">
                                Blood Group
                            </label>
                            <select
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleChange}
                                className="w-full border border-red-200 rounded-xl py-3 px-4 mt-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                            >
                                <option value="">Select Blood Group</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="text-sm font-bold text-slate-900">
                                Address
                            </label>
                            <textarea
                                name="address"
                                rows="3"
                                placeholder="Enter your address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full border border-red-200 rounded-xl py-3 px-4 mt-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                            />
                        </div>

                        {/* Checkbox */}
                        <label className="flex gap-2 text-sm text-gray-600">
                            <input
                                type="checkbox"
                                name="terms"
                                checked={formData.terms}
                                onChange={handleChange}
                                required
                                className="w-4 h-4 rounded border-red-200 accent-red-600"
                            />
                            I agree to the Terms and Conditions *
                        </label>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Sending OTP..." : "Register as Donor"}
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            Already registered?{" "}
                            <Link
                                to="/login"
                                className="text-red-600 font-bold hover:underline"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </form>
                </div>
            </main>

            {/* reCAPTCHA Container */}
            <div id="recaptcha-container"></div>
        </div>
    );
};

export default SignUp;
