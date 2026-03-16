import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function JewelleryInquiry() {

    const onDrop = useCallback((acceptedFiles) => {
        console.log("Uploaded file:", acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [],
            "application/pdf": []
        },
        maxSize: 5000000
    });

    return (
        // <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="py-16 md:py-20 xl:py-24 bg-black px-4 flex justify-center">

            <div className="w-full max-w-3xl bg-[#140703] border border-gray-700 rounded-xl p-8 shadow-lg mt-7 md:mt-0">

                <h2 className="text-white text-2xl font-semibold mb-6">
                    Customize Jewellery Inquiry
                </h2>

                <form className="space-y-5">

                    {/* Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="text-gray-300 text-sm">
                                Customer Name *
                            </label>

                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full mt-1 bg-[#1a0b05] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                            />
                        </div>

                        <div>
                            <label className="text-gray-300 text-sm">
                                Phone Number *
                            </label>

                            <input
                                type="text"
                                placeholder="+1 (555) 000-0000"
                                className="w-full mt-1 bg-[#1a0b05] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                            />
                        </div>

                    </div>


                    {/* Email */}
                    <div>
                        <label className="text-gray-300 text-sm">
                            Email Address *
                        </label>

                        <input
                            type="email"
                            placeholder="email@example.com"
                            className="w-full mt-1 bg-[#1a0b05] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                        />
                    </div>


                    {/* Drag and Drop Upload */}
                    <div>

                        <label className="text-gray-300 text-sm">
                            Reference Photo (Optional)
                        </label>

                        <div
                            {...getRootProps()}
                            className="mt-2 border-2 border-dashed border-gray-700 hover:border-orange-500 rounded-lg p-10 text-center cursor-pointer hover:bg-[#1a0b05]"
                        >
                            <input {...getInputProps()} />

                            {isDragActive ? (
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


                    {/* Description */}
                    <div>
                        <label className="text-gray-300 text-sm">
                            Design Description *
                        </label>

                        <textarea
                            rows="4"
                            placeholder="Describe the type of jewellery, materials, and any specific details..."
                            className="w-full mt-1 bg-[#1a0b05] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                        />
                    </div>


                    {/* Button */}
                    <button
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Book an Appointment →
                    </button>

                </form>

            </div>
        </div>
    );
}