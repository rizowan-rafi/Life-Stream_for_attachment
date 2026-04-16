import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axiosInstance from "../../utilities/axiosInstance";
import { API_PATHS } from "../../utilities/apiPath";
import { useUser } from "../../context/UserContext";
import Swal from "sweetalert2"; // Added SweetAlert2
import { Helmet } from "react-helmet-async";

const SignIn = () => {
    const navigate = useNavigate();
    const { login } = useUser();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (!phoneNumber || !password) {
                throw new Error("Please enter phone number and password");
            }

            // Format phone number
            let formattedPhone = phoneNumber.trim();

            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                phoneNumber: formattedPhone,
                password: password,
            });

            // Debug: see exactly what the backend sends

            if (response.data.token) {
                // --- Added SweetAlert Success Toast ---
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                });

                await Toast.fire({
                    icon: "success",
                    title: "Signed in successfully",
                });

                login(response.data.user, response.data.token);
                navigate("/dashboard");
            } else {
                throw new Error(
                    response.data.message || "Login failed. No token received.",
                );
            }
        } catch (err) {
            console.error("Full Error Object:", err);

            const errorMsg =
                err.response?.data?.message ||
                err.message ||
                "An error occurred during login.";

            setError(errorMsg);

            // --- Added SweetAlert Error Alert ---
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: errorMsg,
                confirmButtonColor: "#dc2626", // Matching your red-600 theme
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Helmet>
                <title>Sign In | BloodConnect</title>
                <meta
                    name="description"
                    content="Access your BloodConnect account to manage your donor profile, update availability, or view your donation history."
                />
            </Helmet>
            <Navbar />
            <div className="bg-[#f8f6f6] min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-110 bg-white p-8 rounded-2xl shadow-md">
                    {/* Welcome Section */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">🩸</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 text-center">
                            Welcome Back
                        </h1>
                        <p className="text-slate-500 text-sm mt-2 text-center">
                            Sign in to your donor account
                        </p>
                    </div>

                    {/* Error Alert (Optional: You can keep this or remove it since Swal also shows the error) */}
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Sign In Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Phone Number Input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-700 text-sm font-semibold">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                placeholder="01XXXXXXXXX or +8801XXXXXXXXX"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label className="text-slate-700 text-sm font-semibold">
                                    Password
                                </label>
                                <a
                                    href="#"
                                    className="text-red-600 text-xs font-bold hover:underline"
                                >
                                    Forgot?
                                </a>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? "👁️" : "👁️‍🗨️"}
                                </button>
                            </div>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition mt-6 disabled:bg-red-400 disabled:cursor-not-allowed"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-slate-500 text-sm">
                            Don't have an account?
                            <Link
                                to="/become-a-donor"
                                className="text-red-600 font-bold hover:underline ml-1"
                            >
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
