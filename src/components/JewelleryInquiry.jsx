import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import BookingModal from "./BookingModal";

import API from "../api/axiosInstance";
import { JewelleryInquiryAPI } from "../api/api";

export default function JewelleryInquiry() {

    const [showBooking, setShowBooking] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            name: "",
            // phone: "+91",
            email: user?.email || "",   // ✅ auto fill
            description: ""
        }
    });

    useEffect(() => {
        if (showBooking) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // cleanup (important)
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showBooking]);

    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);

    // DROPZONE FUNCTION
    const onDrop = useCallback((acceptedFiles) => {
        const uploaded = acceptedFiles[0];

        if (uploaded) {
            setFile(uploaded);
            setPreview(URL.createObjectURL(uploaded));
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [],
            "application/pdf": []
        },
        maxSize: 5000000
    });

    // REMOVE IMAGE
    const removeImage = () => {
        setPreview(null);
        setFile(null);
    };

    const [loading, setLoading] = useState(false);

    // SUBMIT
    const onSubmit = async (data) => {

        // OPTIONAL: loading state (recommended)
        // setLoading(true);

        try {
            const formData = new FormData();

            formData.append("customer_name", data.name);
            formData.append("phone_number", "+91" + data.phone);
            formData.append("email", data.email);
            formData.append("description", data.description);

            formData.append("date", data.date);
            formData.append("time_slot", data.time_slot);
            formData.append("appointment_type", data.appointment_type);

            if (file) {
                formData.append("reference_photo", file);
            }

            const response = await API.post(
                JewelleryInquiryAPI(),
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            const result = response.data;

            console.log("API Response:", result);

            alert(result.message || "Appointment booked successfully!");

            // reset only on success
            reset();
            setPreview(null);
            setFile(null);

        } catch (error) {
            console.error("Axios Error:", error);

            if (error.response) {
                alert(error.response.data?.message || "Server error");
            } else if (error.request) {
                alert("No response from server");
            } else {
                alert("Something went wrong!");
            }

        } finally {
            // ALWAYS runs (success or error)

            console.log("API call finished");

            // OPTIONAL cleanup
            // setLoading(false);
        }
    };
    return (
        <div className="py-16 md:py-20 xl:py-24 bg-black px-4 flex justify-center">

            <div className="w-full max-w-3xl bg-[#140703] border border-gray-700 rounded-xl p-8 shadow-lg mt-7 md:mt-0">

                <h2 className="text-white text-2xl font-semibold mb-6">
                    Customize Jewellery Inquiry
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

                    <input type="hidden" {...register("date", { required: true })} />
                    <input type="hidden" {...register("time_slot", { required: true })} />

                    {/* NAME + PHONE */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* NAME */}
                        <div>
                            <label className="text-gray-300 text-sm">
                                Customer Name *
                            </label>

                            <input
                                type="text"
                                placeholder="John Doe"
                                {...register("name", {
                                    required: "Customer name is required"
                                })}
                                className="w-full mt-1 bg-[#1a0b05] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 outline-none"
                            />

                            {errors.name && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* PHONE */}
                        <div>
                            <label className="text-gray-300 text-sm">
                                Phone Number *
                            </label>

                            <div className="flex mt-1">
                                {/* FIXED +91 */}
                                <span className="bg-[#1a0b05] border border-gray-700 px-4 py-3 text-gray-400 rounded-l-lg">
                                    +91
                                </span>

                                {/* INPUT */}
                                <input
                                    type="tel"
                                    maxLength={10}
                                    placeholder="**********"

                                    onInput={(e) => {
                                        e.target.value = e.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 10);
                                    }}

                                    {...register("phone", {
                                        required: "Phone required",
                                        pattern: {
                                            value: /^[6-9]\d{9}$/,
                                            message: "Enter valid 10-digit number"
                                        }
                                    })}
                                    className="w-full bg-[#1a0b05] border border-gray-700 rounded-r-lg px-4 py-3 text-white focus:border-orange-500 outline-none"
                                />
                            </div>

                            {errors.phone && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                    </div>

                    {/* EMAIL */}
                    <div>

                        <label className="text-gray-300 text-sm">
                            Email Address *
                        </label>

                        <input
                            type="email"
                            placeholder="email@example.com"
                            {...register("email", {
                                required: "Enter valid email address",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Enter valid email address"
                                }
                            })} readOnly
                            className="w-full mt-1 bg-[#1a0b05] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 outline-none"
                        />

                        {errors.email && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}

                    </div>

                    {/* IMAGE UPLOAD */}
                    <div>

                        <label className="text-gray-300 text-sm">
                            Reference Photo (Optional)
                        </label>

                        <div
                            {...getRootProps()}
                            className="mt-2 border-2 border-dashed border-gray-700 hover:border-orange-500 rounded-lg p-10 text-center cursor-pointer hover:bg-[#1a0b05] flex flex-col items-center justify-center"
                        >

                            <input {...getInputProps()} />

                            {preview ? (

                                <div className="relative">

                                    <img
                                        src={preview}
                                        alt="preview"
                                        className="max-h-48 rounded-lg object-contain"
                                    />

                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                                    >
                                        ✕
                                    </button>

                                </div>

                            ) : isDragActive ? (

                                <p className="text-orange-400">
                                    Drop the file here...
                                </p>

                            ) : (

                                <p className="text-gray-400">
                                    Click to upload or drag and drop
                                    <br />
                                    PNG, JPG, PDF (max. 5MB)
                                </p>

                            )}

                        </div>

                    </div>

                    {/* DESCRIPTION */}
                    <div>

                        <label className="text-gray-300 text-sm">
                            Design Description *
                        </label>

                        <textarea
                            rows="4"
                            placeholder="Describe the jewellery design..."
                            {...register("description", {
                                required: "Description is required"
                            })}
                            className="w-full mt-1 bg-[#1a0b05] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 outline-none"
                        />

                        {errors.description && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.description.message}
                            </p>
                        )}

                    </div>

                    {/* SUBMIT */}
                    <button disabled={loading}
                        type="button"
                        onClick={() => setShowBooking(true)}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition cursor-pointer"
                    >
                        {loading ? "Submitting..." : "Book an Appointment →"}
                    </button>

                </form>

            </div>

            <BookingModal
                isOpen={showBooking}
                onClose={() => setShowBooking(false)}
                onConfirm={(date, time) => {
                    setValue("date", date.toISOString().split("T")[0]);
                    setValue("time_slot", time);
                    setShowBooking(false);

                    handleSubmit(onSubmit)(); // 🔥 THIS LINE ADD
                }}
            />

        </div>
    );
}