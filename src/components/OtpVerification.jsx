import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaGem } from "react-icons/fa";

export default function OtpVerification() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef([]);
    const navigate = useNavigate();

    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d+$/.test(pasteData)) return;

        const newOtp = pasteData.split("");
        setOtp(newOtp);

        newOtp.forEach((digit, i) => {
            if (inputsRef.current[i]) {
                inputsRef.current[i].value = digit;
            }
        });
    };

    const handleSubmit = () => {
        const finalOtp = otp.join("").trim();

        console.log("Final OTP:", finalOtp);

        if (finalOtp.length !== 6) {
            alert("Enter complete OTP");
            return;
        }

        if (finalOtp === "123456") {
            navigate("/status", { state: { status: "success", flow: "forgot" } });
        } else {
            navigate("/status", { state: { status: "error", flow: "forgot" } });
        }
    };

    const isComplete = otp.every((d) => d !== "");

    return (
        <div className="w-full max-w-md sm:max-w-lg bg-[#2a140c] rounded-2xl sm:rounded-3xl 
p-5 sm:p-8 shadow-2xl border border-[#3b2017]">

            {/* Icon */}
            <div className="flex justify-center mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full 
          border border-orange-500 transition duration-300 
          hover:scale-110 hover:shadow-[0_0_20px_rgba(255,165,0,0.6)]">

                    <FaGem className="text-orange-400 text-lg sm:text-xl transition duration-300 
            hover:rotate-0 hover:scale-110" />
                </div>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-3xl font-bold text-center text-white mb-2">
                OTP Verification
            </h2>

            <p className="text-xs sm:text-sm text-gray-400 text-center mb-5 sm:mb-6 leading-relaxed">
                A 6-digit verification code has been sent to your registered mobile number for{" "}
                <span className="text-orange-500 font-medium">
                    Radhe Imitations & Jewels
                </span>
            </p>

            {/* OTP Inputs */}
            <div
                className="flex justify-center gap-1.5 sm:gap-3 mb-5 sm:mb-6"
                onPaste={handlePaste}
            >
                {otp.map((digit, i) => (
                    <input
                        key={i}
                        ref={(el) => (inputsRef.current[i] = el)}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        className="w-9 h-9 sm:w-12 sm:h-12 text-center text-white text-sm sm:text-lg 
rounded-md bg-[#1c0f09] border border-[#3b2017] 
focus:border-orange-500 focus:outline-none transition"
                    />
                ))}
            </div>

            {/* Button */}
            <button
                onClick={handleSubmit}
                disabled={!isComplete}
                className={`w-full py-2.5 sm:py-3 rounded-lg font-semibold transition
                ${isComplete
                        ? "bg-linear-to-r from-orange-400 to-orange-600 text-white"
                        : "bg-gray-500 text-gray-300 cursor-not-allowed"}`}
            >
                Verify Code →
            </button>

            {/* Resend */}
            <p className="text-gray-400 text-center text-xs sm:text-sm mt-4">
                Didn’t receive the code?{" "}
                <span className="text-orange-500 cursor-pointer hover:underline">
                    Resend Code
                </span>
            </p>
        </div>
    );
}