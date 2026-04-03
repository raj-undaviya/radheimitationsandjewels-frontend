import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function JewelleryInquiry() {

    const [form, setForm] = useState({
        name: "",
        phone: "+91",
        email: "",
        description: ""
    });

    const [errors, setErrors] = useState({});
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

    // FORM CHANGE
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // REMOVE IMAGE
    const removeImage = () => {
        setPreview(null);
        setFile(null);
    };

    // VALIDATION
    const validate = () => {

        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Customer name is required";
        }

        const phoneRegex = /^\+91[6-9]\d{9}$/;

        if (!phoneRegex.test(form.phone)) {
            newErrors.phone = "Enter valid Indian number (+91XXXXXXXXXX)";
        }

        if (!form.email.includes("@")) {
            newErrors.email = "Enter valid email address";
        }

        if (!form.description.trim()) {
            newErrors.description = "Description is required";
        }

        return newErrors;
    };

    // SUBMIT
    const handleSubmit = (e) => {

        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        console.log("Form Data:", form);
        console.log("Uploaded File:", file);

        alert("Inquiry Submitted Successfully!");

        setErrors({});
    };

    return (
        <div className="py-16 md:py-20 xl:py-24 bg-black px-4 flex justify-center">

            <div className="w-full max-w-3xl bg-[#140703] border border-gray-700 rounded-xl p-8 shadow-lg mt-7 md:mt-0">

                <h2 className="text-white text-2xl font-semibold mb-6">
                    Customize Jewellery Inquiry
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* NAME + PHONE */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* NAME */}
                        <div>
                            <label className="text-gray-300 text-sm">
                                Customer Name *
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full mt-1 bg-[#1a0b05] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 outline-none"
                            />

                            {errors.name && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.name}
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
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="+919876543210"
                                className="w-full mt-1 bg-[#1a0b05] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 outline-none"
                            />

                            {errors.phone && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.phone}
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
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="email@example.com"
                            className="w-full mt-1 bg-[#1a0b05] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 outline-none"
                        />

                        {errors.email && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.email}
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
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe the jewellery design..."
                            className="w-full mt-1 bg-[#1a0b05] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 outline-none"
                        />

                        {errors.description && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.description}
                            </p>
                        )}

                    </div>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Book an Appointment →
                    </button>

                </form>

            </div>

        </div>
    );
}