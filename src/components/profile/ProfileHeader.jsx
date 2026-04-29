import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import API from "../../api/axiosInstance";
import { UpdateCustomerAPI, DeleteCustomerAPI } from "../../api/api";

export default function ProfileHeader() {

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
                setPreview(storedUser.avatar || "");

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

        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
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

            const updatedUser = { ...user, ...data, avatar: imageUrl };

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
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-[#1c0f09] p-6 rounded-2xl animate-pulse">

                    <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto mb-4"></div>

                    <div className="h-4 bg-gray-700 rounded w-40 mx-auto mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-24 mx-auto mb-6"></div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="h-10 bg-gray-700 rounded"></div>
                        <div className="h-10 bg-gray-700 rounded"></div>
                        <div className="h-10 bg-gray-700 rounded"></div>
                        <div className="h-10 bg-gray-700 rounded"></div>
                    </div>

                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="bg-black px-4 py-8">

            {/* MAIN CONTAINER */}
            <div className="max-w-3xl mx-auto">

                <div className="bg-[#1c0f09] rounded-2xl border border-[#2a2a2a] shadow-xl p-6 sm:p-8">

                    {/* HEADER */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">

                        <div
                            onClick={() => fileRef.current.click()}
                            className="w-24 h-24 rounded-full border-4 border-orange-500 overflow-hidden cursor-pointer hover:scale-105 transition"
                        >
                            <img
                                src={preview || "https://i.pravatar.cc/150"}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileRef}
                            onChange={handleImageChange}
                            hidden
                        />

                        <div className="text-center sm:text-left">
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                {user.first_name} {user.last_name}
                            </h2>

                            <p className="text-sm text-gray-400 break-all">
                                {user.email}
                            </p>
                        </div>

                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">

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

                </div>
            </div>
        </div>
    );
}