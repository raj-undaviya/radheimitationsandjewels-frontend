import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Camera, UploadCloud, X } from "lucide-react";

import API from "../../api/axiosInstance";
import { UpdateCustomerAPI, DeleteCustomerAPI } from "../../api/api";

export default function ProfileHeader() {
    const [dragActive, setDragActive] = useState(false);
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const fileRef = useRef();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // LOAD USER
    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            const storedUser = JSON.parse(localStorage.getItem("user"));

            if (storedUser) {
                setUser(storedUser);
                setPreview(storedUser.profile_image || "");

                reset({
                    username: storedUser.username || "",
                    first_name: storedUser.first_name || "",
                    last_name: storedUser.last_name || "",
                    email: storedUser.email || "",
                    password: ""
                });
            }

            setLoading(false);
        }, 500);
    }, [reset]);

    // IMAGE VALIDATION
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Only image files allowed");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image must be less than 2MB");
            return;
        }

        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
        toast.success("Image selected");
    };

    // DRAG EVENTS
    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        if (file) handleImageChange({ target: { files: [file] } });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    // CLOUDINARY UPLOAD
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_preset");

        try {
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
                { method: "POST", body: formData }
            );

            const data = await res.json();

            console.log("Cloudinary Response:", data); // 👈 ADD THIS

            if (!data.secure_url) {
                toast.error("Upload failed");
                return null;
            }

            return data.secure_url;

        } catch (err) {
            console.error(err);
            toast.error("Image upload failed");
            return null;
        }
    };

    // SUBMIT
    const onSubmit = async (data) => {
        try {
            setLoading(true);

            let imageUrl = preview;

            if (selectedFile) {
                const uploaded = await uploadImage(selectedFile);
                if (uploaded) imageUrl = uploaded;
            }

            const payload = {
                ...data,
                password: data.password || "Test@123",
                role: "customer",
                phonenumber: user.phonenumber,
                is_staff: false,
                profile_image: imageUrl
            };

            await API.put(UpdateCustomerAPI(user.id), payload);

            const updatedUser = {
                ...user,
                ...data,
                profile_image: imageUrl
            };

            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));

            toast.success("Profile updated");

        } catch {
            toast.error("Update failed");
        } finally {
            setLoading(false);
            setEditing(false);
        }
    };

    // DELETE
    const handleDelete = async () => {
        if (!window.confirm("Delete account?")) return;

        try {
            setLoading(true);

            await API.delete(DeleteCustomerAPI(user.id));

            localStorage.removeItem("user");
            toast.success("Account deleted");

            setTimeout(() => {
                window.location.href = "/login";
            }, 1200);

        } catch {
            toast.error("Delete failed");
        } finally {
            setLoading(false);
        }
    };

    // SKELETON

    // SKELETON
    if (loading && !user) {
        return (
            <div className="bg-black px-4 py-8">

                <div className="w-full">

                    <div className="bg-[#1c0f09] rounded-2xl border border-[#2a2a2a] shadow-xl p-6 sm:p-8 animate-pulse">

                        {/* HEADER SKELETON */}
                        <div className="bg-[#2a1208] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                            {/* LEFT */}
                            <div className="flex flex-col items-center sm:flex-row gap-4 w-full">

                                {/* AVATAR */}
                                <div className="w-20 h-20 rounded-full bg-gray-700 shrink-0"></div>

                                {/* TEXT */}
                                <div className="flex flex-col gap-2 w-full sm:w-auto items-center sm:items-start">

                                    <div className="h-4 bg-gray-700 rounded w-40"></div>
                                    <div className="h-3 bg-gray-700 rounded w-32"></div>
                                    <div className="h-3 bg-gray-700 rounded w-24"></div>

                                </div>

                            </div>

                            {/* BUTTON */}
                            <div className="h-10 bg-gray-700 rounded w-full sm:w-28"></div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="bg-black px-4 py-8">

            {/* MAIN CONTAINER */}
            <div className="w-full">

                <div className="bg-[#1c0f09] rounded-2xl border border-[#2a2a2a] shadow-xl p-6 sm:p-8">

                    {/* RESPONSIVE HEADER FIX */}
                    <div className="bg-linear-to-r from-[#2a1208] to-[#3a1a0c] rounded-2xl p-5 sm:px-6 sm:py-5 shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                        {/* TOP SECTION (MOBILE STACK) */}
                        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-4 text-center sm:text-left">

                            {/* AVATAR */}
                            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-4">

                                {/* AVATAR UPLOAD AREA */}
                                <div
                                    onClick={() => fileRef.current.click()}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    className={`relative w-20 h-20 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 cursor-pointer group transition
        ${dragActive ? "border-orange-500 bg-orange-500/10" : "border-white/20"}`}
                                >
                                    <img
                                        src={
                                            preview ||
                                            user?.profile_image ||
                                            "https://i.pravatar.cc/150"
                                        }
                                        className="w-full h-full object-cover"
                                    />

                                    {/* HOVER OVERLAY */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-xs transition">
                                        <Camera size={16} />
                                        Change
                                    </div>
                                </div>

                                {/* HIDDEN INPUT */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileRef}
                                    onChange={handleImageChange}
                                    hidden
                                />

                                {/* REMOVE BUTTON */}
                                {/* {preview && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreview("");
                                            setSelectedFile(null);
                                        }}
                                        className="flex items-center gap-1 text-xs text-red-400 hover:underline"
                                    >
                                        <X size={14} />
                                        Remove
                                    </button>
                                )} */}
                            </div>

                            {/* TEXT */}
                            <div className="flex flex-col items-center sm:items-start">

                                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white leading-tight">
                                    Welcome back, {user.first_name}
                                </h2>

                                {/* BADGE */}
                                <span className="mt-2 bg-orange-500/20 text-orange-400 px-3 py-1 rounded-md font-medium text-xs">
                                    PREMIUM GOLD MEMBER
                                </span>

                                {/* DATE */}
                                <span className="text-gray-400 text-xs mt-1">
                                    Member since Oct 2023
                                </span>

                            </div>
                        </div>

                        {/* BUTTON */}
                        <button
                            onClick={() => setEditing(true)}
                            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg text-sm font-semibold shadow-md cursor-pointer"
                        >
                            Edit Profile
                        </button>

                    </div>

                    {/* FORM */}

                    {editing && (
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-6">

                            {/* USERNAME */}
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">Username</label>
                                <input
                                    {...register("username", { required: "Required" })}
                                    disabled={!editing}
                                    className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                                />
                                {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>}
                            </div>

                            {/* FIRST NAME */}
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">First Name</label>
                                <input
                                    {...register("first_name", { required: "Required" })}
                                    disabled={!editing}
                                    className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 focus:border-orange-500"
                                />
                                {errors.first_name && <p className="text-red-400 text-xs mt-1">{errors.first_name.message}</p>}
                            </div>

                            {/* LAST NAME */}
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">Last Name</label>
                                <input
                                    {...register("last_name")}
                                    disabled={!editing}
                                    className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2"
                                />
                            </div>

                            {/* EMAIL */}
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">Email</label>
                                <input
                                    {...register("email", { required: "Required" })}
                                    disabled={!editing}
                                    className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2"
                                />
                                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                            </div>

                            {/* PASSWORD */}
                            <div className="md:col-span-2">
                                <label className="text-sm text-gray-400 mb-1 block">Password</label>
                                <input
                                    type="password"
                                    {...register("password")}
                                    disabled={!editing}
                                    className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2"
                                />
                            </div>

                            {/* BUTTONS */}
                            <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 mt-3">

                                {editing ? (
                                    <button
                                        type="submit"
                                        className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-medium"
                                    >
                                        {loading ? "Saving..." : "Save"}
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setEditing(true)}
                                        className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-medium"
                                    >
                                        Edit Profile
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-medium"
                                >
                                    Delete
                                </button>

                            </div>

                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}