import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";
import axiosInstance from "../utilities/axiosInstance";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

// --- Helper Components ---

function Profile({ user, onEdit, onToggleAvailability }) {
    const formatDate = (dateString) => {
        if (!dateString) return "No donations yet";
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };
    return (
        <div className="view-container flex-1 max-w-6xl mx-auto w-full p-4 lg:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-white rounded-xl shadow-sm border border-red-50">
                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-slate-900 text-3xl font-bold tracking-tight">
                            {user.name}
                        </h1>
                        <p className="text-[#ea2a33] text-lg font-semibold mt-1">
                            Blood Group: {user.bloodGroup}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-slate-500 text-sm">
                            <span className="material-symbols-outlined text-sm">
                                location_on
                            </span>
                            <span>{user.location || "Location not set"}</span>
                        </div>
                    </div>
                </div>
                <button
                    className="flex min-w-35 cursor-pointer items-center justify-center gap-2 rounded-lg h-12 px-6 bg-[#ea2a33] text-white text-sm font-bold shadow-lg hover:bg-[#ea2a33]/90 transition-all"
                    onClick={onEdit}
                >
                    <span className="material-symbols-outlined text-lg">
                        edit
                    </span>
                    <span>Edit Profile</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="flex flex-col gap-3 rounded-xl p-6 bg-white border border-red-50">
                    <p className="text-slate-500 text-sm font-medium">
                        Last Donation
                    </p>
                    <p className="text-slate-900 text-2xl font-extrabold">
                        {formatDate(user.lastDonatedTime)}
                    </p>
                </div>

                <div className="flex flex-col gap-3 rounded-xl p-6 bg-white border border-red-50">
                    <p className="text-slate-500 text-sm font-medium">
                        Availability Status
                    </p>
                    <div className="flex items-center justify-between">
                        <span
                            className={`font-bold ${user.currentlyAvailable ? "text-green-600" : "text-slate-400"}`}
                        >
                            {user.currentlyAvailable
                                ? "Available Now"
                                : "Unavailable"}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={user.currentlyAvailable || false}
                                onChange={(e) =>
                                    onToggleAvailability(e.target.checked)
                                }
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EditProfile({ user, onBack, onUpdateSuccess }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        location: user?.location || "",
        lastDonation: user?.lastDonatedTime
            ? user.lastDonatedTime.split("T")[0]
            : "",
        phoneNumber: user?.phoneNumber || "",
    });

    const handleSave = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.put(
                `/api/v1/donor/update/${user.id}`,
                {
                    name: formData.name,
                    location: formData.location,
                    lastDonatedTime: formData.lastDonation, // Match backend key
                    phoneNumber: formData.phoneNumber,
                },
            );
            if (response.data.success) {
                await Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Your profile has been updated successfully.",
                    timer: 2000,
                    showConfirmButton: false,
                });
                onUpdateSuccess();
                onBack();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: error.response?.data?.message || "Something went wrong",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-[#f8f6f6] p-3 pt-18 flex justify-center w-full min-h-screen">
            <Helmet>
                <title>My Profile | BloodConnect</title>
                <meta
                    name="description"
                    content="Manage your BloodConnect donor profile. Update your blood group, current location, and donation availability to help those in need."
                />
            </Helmet>
            <div className="max-w-3xl w-full grid gap-6 bg-white p-8 rounded-xl shadow-sm h-fit">
                <h1 className="text-2xl font-bold">Edit Profile</h1>
                <div className="grid gap-4">
                    <label className="text-sm font-semibold">Full Name</label>
                    <input
                        className="border p-2 rounded"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                    />

                    <label className="text-sm font-semibold">Location</label>
                    <input
                        className="border p-2 rounded"
                        value={formData.location}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                location: e.target.value,
                            })
                        }
                    />

                    <label className="text-sm font-semibold">
                        Last Donation Date
                    </label>
                    <input
                        type="date"
                        className="border p-2 rounded"
                        value={formData.lastDonation}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                lastDonation: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={onBack}
                        className="text-gray-500 font-bold"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </main>
    );
}

// --- Main Dashboard ---

function Dashboard() {
    const [isEditing, setIsEditing] = useState(false);
    const [poiData, setPoiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user: contextUser } = useUser();

    const fetchUserData = useCallback(async () => {
        if (!contextUser?.phoneNumber) return;
        try {
            setLoading(true);
            // Calling by Phone Number (POI) as requested
            const response = await axiosInstance.get(
                `/api/v1/donor/${contextUser.id}`,
            );
            if (response.data.success) {
                setPoiData(response.data.user);
            }
        } catch (error) {
            console.error("Fetch error", error);
        } finally {
            setLoading(false);
        }
    }, [contextUser?.id]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);
    
    const handleToggleAvailability = async (status) => {
        try {
            const response = await axiosInstance.put(
                `/api/v1/donor/update/${contextUser.id}`,
                {
                    phoneNumber: poiData.phoneNumber,
                    currentlyAvailable: status,
                    lastDonatedTime:poiData.lastDonatedTime
                },
            );
            
            if (response.data.success) {
                setPoiData((prev) => ({ ...prev, currentlyAvailable: status }));
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: `Status: ${status ? "Available" : "Unavailable"}`,
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        } catch (err) {
            Swal.fire("Error", "Could not update status", "error");
        }
    };

    if (loading)
        return (
            <div className="h-screen flex items-center justify-center font-bold">
                Loading POI Data...
            </div>
        );

    return (
        <div className="bg-[#f8f6f6] min-h-screen">
            <Navbar />
            {isEditing ? (
                <EditProfile
                    user={poiData}
                    onBack={() => setIsEditing(false)}
                    onUpdateSuccess={fetchUserData}
                />
            ) : (
                <Profile
                    user={poiData}
                    onEdit={() => setIsEditing(true)}
                    onToggleAvailability={handleToggleAvailability}
                />
            )}
        </div>
    );
}

export default Dashboard;
