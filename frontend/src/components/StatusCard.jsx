import { FaCheck, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function StatusCard({ status = "success", flow }) {
    const navigate = useNavigate();

    const isSuccess = status === "success";

    useEffect(() => {
        if (status === "success") {
            setTimeout(() => {
                if (flow === "forgot") {
                    navigate("/reset-password");
                } else {
                    navigate("/collections");
                }
            }, 2000);
        }
    }, [status, flow, navigate]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md sm:max-w-lg bg-[#2a140c] rounded-2xl sm:rounded-3xl 
      p-6 sm:p-8 shadow-2xl border border-[#3b2017] text-center"
        >

            {/* Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-4"
            >
                <div className={`w-14 h-14 flex items-center justify-center rounded-full border relative
          ${isSuccess ? "border-orange-500" : "border-red-500"}`}>

                    {/* Glow */}
                    <div className={`absolute inset-0 rounded-full blur-md animate-pulse
            ${isSuccess ? "bg-orange-500/20" : "bg-red-500/20"}`}></div>

                    {isSuccess ? (
                        <FaCheck className="text-orange-400 text-xl relative z-10" />
                    ) : (
                        <FaTimes className="text-red-400 text-xl relative z-10" />
                    )}
                </div>
            </motion.div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {isSuccess ? "Success" : "Verification Failed"}
            </h2>

            {/* Subtitle */}
            <p className={`text-sm mb-2 ${isSuccess ? "text-orange-400" : "text-red-400"}`}>
                {isSuccess ? "Welcome to the Inner Circle" : "Invalid OTP Entered"}
            </p>

            {/* Description */}
            <p className="text-gray-400 text-xs sm:text-sm mb-6 leading-relaxed">
                {isSuccess
                    ? "Your account has been successfully created. You now have exclusive access to our collections."
                    : "The OTP you entered is incorrect. Please try again or request a new code."}
            </p>

            {/* Buttons */}
            {isSuccess ? (
                <>
                    <button
                        onClick={() =>
                            flow === "forgot"
                                ? navigate("/reset-password")
                                : navigate("/collections")
                        }
                        className="w-full py-3 rounded-lg font-semibold bg-linear-to-r from-orange-400 to-orange-600 text-white mb-3"
                    >
                        {flow === "forgot" ? "Reset Password →" : "Explore Collections"}
                    </button>

                    <button
                        onClick={() => navigate("/profile")}
                        className="w-full py-3 rounded-lg bg-[#1c0f09] border border-[#3b2017] text-gray-300"
                    >
                        Go to Profile
                    </button>
                </>
            ) : (
                <>
                    <button
                        onClick={() => navigate("/otp")}
                        className="w-full py-3 rounded-lg font-semibold bg-linear-to-r from-red-400 to-red-600 text-white mb-3"
                    >
                        Resend OTP
                    </button>

                    {/* <button
                        className="w-full py-3 rounded-lg bg-[#1c0f09] border border-[#3b2017] text-gray-300"
                    >
                        
                    </button> */}
                </>
            )}

            {/* Footer */}
            <div className="border-t border-[#3b2017] my-5"></div>

            <p className="text-gray-500 text-xs">
                Need help?{" "}
                <span className="text-orange-500 cursor-pointer hover:underline">
                    Contact Support
                </span>
            </p>
        </motion.div>
    );
}