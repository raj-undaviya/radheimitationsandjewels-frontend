import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

import API from "../api/axiosInstance";
import { JewelleryInquiryAPI } from "../api/api";

export default function JewelleryInquiry() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            name: "",
            phone: "+91",
            email: "",
            description: ""
        }
    });

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

                            <input
                                type="text"
                                placeholder="9876543210"
                                {...register("phone", {
                                    required: "Phone required",
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message: "Enter valid 10-digit number"
                                    }
                                })}
                                className="w-full mt-1 bg-[#1a0b05] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 outline-none"
                            />

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
                            })}
                            className="w-full mt-1 bg-[#1a0b05] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 outline-none"
                        />

                        {errors.email && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}

                    </div>


                    {/* DATE + TIME + TYPE */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {/* DATE */}
                        <div>
                            <label className="text-gray-300 text-sm">
                                Appointment Date *
                            </label>

                            <input
                                type="date"
                                {...register("date", { required: "Date is required" })}
                                className="w-full mt-1 bg-[#1a0b05] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 outline-none"
                            />

                            {errors.date && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.date.message}
                                </p>
                            )}
                        </div>

                        {/* TIME SLOT */}
                        <div>
                            <label className="text-gray-300 text-sm">
                                Time Slot *
                            </label>

                            <select
                                {...register("time_slot", { required: "Time slot is required" })}
                                className="w-full mt-1 bg-[#1a0b05] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 outline-none"
                            >
                                <option value="">Select Time</option>
                                <option value="11:40 AM">11:40 AM</option>
                                <option value="12:00 PM">12:00 PM</option>
                                <option value="01:00 PM">01:00 PM</option>
                            </select>

                            {errors.time_slot && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.time_slot.message}
                                </p>
                            )}
                        </div>

                        {/* APPOINTMENT TYPE */}
                        <div>
                            <label className="text-gray-300 text-sm">
                                Appointment Type *
                            </label>

                            <select
                                {...register("appointment_type", { required: "Type is required" })}
                                className="w-full mt-1 bg-[#1a0b05] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 outline-none"
                            >
                                <option value="">Select Type</option>
                                <option value="virtual">Virtual</option>
                                <option value="in-store">In Store</option>
                            </select>

                            {errors.appointment_type && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.appointment_type.message}
                                </p>
                            )}
                        </div>

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
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition"
                    >
                        {loading ? "Submitting..." : "Book an Appointment →"}
                    </button>

                </form>

            </div>

        </div>
    );
}