import { useState } from "react";
import Navbar from "../components/Navbar";
import axiosInstance from "../utilities/axiosInstance.js";
import { API_PATHS } from "../utilities/apiPath.js";

function Finddonor() {
    const [location, setlocation] = useState("");
    const [blood, setblood] = useState("");
    // 1. Added all blood types
    const items = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);

const fetchDonors = async () => {
    try {
        setLoading(true);
        const path = API_PATHS.FIND_DONOR.FIND;
        
        const response = await axiosInstance.get(path, {
            params: { bloodGroup: blood, location:location.toLowerCase() },
        });

        // Ensure we default to an empty array if donors is missing
        setDonors(response.data.donors || []);
    } catch (error) {
        // If the backend returns 404, it means "No donors found", not a system crash
        if (error.response && error.response.status === 404) {
            setDonors([]);
        } else {
            console.error("Error fetching donors:", error);
            alert("Connection error. Please try again.");
        }
    } finally {
        setLoading(false);
    }
};

    function handleSubmit() {
        if (blood === "") {
            alert("Please Select Blood Group");
        } else {
            fetchDonors();
        }
    }

    function dateConvertion(donationDate) {
        if (!donationDate) return "N/A";
        const date = new Date(donationDate);
        const options = { day: "numeric", month: "long", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }
    

    return (
        <>
            <Navbar />
            <main className="bg-[#f8f6f6] min-h-screen w-full">
                <div className="max-w-6xl mx-auto p-4 md:p-8">
                    <div className="grid gap-2 mb-6">
                        <h1 className="text-3xl font-extrabold text-black">
                            Find a Life-Saver
                        </h1>
                        <h2 className="text-slate-600">
                            Every drop counts. Search for eligible donors in
                            your vicinity
                        </h2>
                    </div>

                    <div className="grid p-3 gap-4 bg-white rounded-xl shadow-sm md:grid-cols-12 md:p-5">
                        <div className="md:col-span-4">
                            <h3 className="text-[12px] text-slate-500 mb-1 font-bold">
                                BLOOD GROUP
                            </h3>
                            <div className="relative w-full rounded-lg">
                                <select
                                    className="w-full pl-10 h-10 outline-0 ring-1 ring-slate-200 border-slate-200 bg-slate-50 text-slate-900 focus:ring-red-600 rounded-lg"
                                    value={blood}
                                    onChange={(e) => setblood(e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="">Select Group</option>
                                    {items.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                                <span className="material-symbols-outlined text-red-500 absolute top-2 left-2">
                                    opacity
                                </span>
                            </div>
                        </div>

                        <div className="md:col-span-6">
                            <h3 className="text-[12px] text-slate-500 mb-1 font-bold">
                                LOCATION
                            </h3>
                            <div className="relative w-full rounded-lg">
                                <input
                                    className="w-full pl-10 h-10 outline-0 ring-1 ring-slate-200 border-slate-200 bg-slate-50 text-slate-900 focus:ring-red-600 rounded-lg placeholder-slate-400"
                                    type="text"
                                    placeholder="Enter location"
                                    value={location}
                                    onChange={(e) =>
                                        setlocation(e.target.value)
                                    }
                                    disabled={loading}
                                />
                                <span className="material-symbols-outlined text-red-500 absolute top-2 left-2">
                                    location_on
                                </span>
                            </div>
                        </div>

                        <div className="flex items-end md:col-span-2">
                            <button
                                className="w-full h-10 bg-red-600 hover:bg-[#ea2a33]/90 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-[#ea2a33]/20 disabled:opacity-50"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                <span className="material-symbols-outlined">
                                    search
                                </span>
                                {loading ? "Searching..." : "Search"}
                            </button>
                        </div>
                    </div>

                    {donors.length === 0 && !loading ? (
                        <div className="mt-12 text-center">
                            <h2 className="text-slate-500 text-lg">
                                No donors found. Try searching with different
                                criteria.
                            </h2>
                        </div>
                    ) : (
                        <div className="mt-8">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="font-bold text-xl">
                                    Donors near you ({donors.length})
                                </h1>
                                <button className="material-symbols-outlined text-red-600 bg-white p-1.5 rounded-lg ring-slate-200 ring-1 hover:bg-slate-50">
                                    sort
                                </button>
                            </div>

                            {/* Updated Grid: Map removed, list is now full width or 2-columns */}
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {donors.map((item) => (
                                    <div
                                        key={item._id || item.phoneNumber} // Use a unique ID from your DB here
                                        className="bg-white rounded-xl flex flex-col p-5 shadow-sm ring-1 ring-slate-200 hover:ring-red-500 transition-all"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <span className="text-xl font-bold block">
                                                    {item.name}
                                                </span>
                                                <h2 className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                                                    <span className="material-symbols-outlined text-sm">
                                                        location_on
                                                    </span>
                                                    {item.location}
                                                </h2>
                                            </div>
                                            <span className="text-red-600 px-3 py-1 font-bold bg-red-50 rounded-full text-sm border border-red-100">
                                                {item.bloodGroup}
                                            </span>
                                        </div>

                                        <div className="my-4 pt-4 border-t border-slate-50">
                                            <h2 className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                                                Last Donation
                                            </h2>
                                            <h3 className="text-sm font-semibold text-slate-700">
                                                {dateConvertion(
                                                    item.lastDonatedTime,
                                                )}
                                            </h3>
                                        </div>

                                        {/* 3. Real Call Functionality */}
                                        <a
                                            href={`tel:${item.phoneNumber}`}
                                            className="mt-auto w-full text-sm h-10 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
                                        >
                                            <span className="material-symbols-outlined text-lg">
                                                call
                                            </span>
                                            Call Donor
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

export default Finddonor;
