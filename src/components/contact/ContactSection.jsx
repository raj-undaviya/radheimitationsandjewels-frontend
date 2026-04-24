import { useForm } from "react-hook-form";
import { useState } from "react";
import contactHero from "../../assets/images/contacthero.png";
import book1 from "../../assets/images/book1.png";
// import consultImg from "../../assets/images/consult.jpg";

export default function ContactSection() {

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        alert("Message Sent!");
        reset();
    };

    const subjects = [
        "Vault Acquisition",
        "Custom Jewelry",
        "General Inquiry"
    ];

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Vault Acquisition");

    const handleSelect = (value) => {
        setSelected(value);
        setValue("subject", value); // react-hook-form
        setOpen(false);
    };


    return (
        <div className="bg-black text-white">
            <div className="max-w-7xl mx-auto">

                {/* ================= HERO ================= */}
                <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">

                    <img
                        src={contactHero}
                        className="absolute inset-0 w-full h-full object-cover scale-105"
                    />

                    <div className="absolute inset-0 bg-black/70 backdrop-blur-[3px]" />

                    <div className="relative z-10 px-6 max-w-3xl">
                        <h1 className="text-3xl md:text-5xl font-serif text-orange-400 drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                            Connect with Excellence
                        </h1>

                        <p className="text-gray-300 mt-4 text-sm md:text-base">
                            Experience the hallmark of digital craftsmanship. Our concierge team is ready
                            to guide you through the Radhe heritage.
                        </p>
                    </div>

                </section>

                {/* ================= FORM + INFO ================= */}
                <section className="px-6 md:px-20 py-20 grid md:grid-cols-2 gap-6">

                    {/* LEFT FORM */}
                    <div className="border border-[#1a1a1a] p-8 bg-[#0a0a0a]">

                        <h2 className="text-2xl font-serif text-orange-400 mb-4">
                            Send a Message
                        </h2>

                        <p className="text-gray-500 text-sm mb-6">
                            Inquiries regarding bespoke commissions and vault acquisitions.
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                            <div className="grid md:grid-cols-2 gap-4">

                                <div>
                                    <input
                                        {...register("name", { required: "Name required" })}
                                        placeholder="Your fullname"
                                        className="input-style"
                                    />
                                    {errors.name && <p className="error">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <input
                                        {...register("email", {
                                            required: "Email required",
                                            pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: "Invalid email"
                                            }
                                        })}
                                        placeholder="email@address.com"
                                        className="input-style"
                                    />
                                    {errors.email && <p className="error">{errors.email.message}</p>}
                                </div>

                            </div>

                            <div className="relative">
                                <p className="text-xs text-gray-400 mb-2">Subject</p>

                                {/* SELECT BOX */}
                                <div
                                    onClick={() => setOpen(!open)}
                                    className="input-style flex justify-between items-center cursor-pointer"
                                >
                                    <span className="text-gray-300 text-sm">{selected}</span>
                                    <span className={`text-orange-400 transition ${open ? "rotate-180" : ""}`}>
                                        ▾
                                    </span>
                                </div>

                                {/* DROPDOWN */}
                                {open && (
                                    <div className="absolute w-full mt-2 bg-[#0a0a0a] border border-[#1a1a1a] z-50">

                                        {subjects.map((item) => (
                                            <div
                                                key={item}
                                                onClick={() => handleSelect(item)}
                                                className="px-4 py-2 text-sm text-gray-400 hover:bg-orange-400/10 hover:text-orange-400 cursor-pointer transition">
                                                {item}
                                            </div>
                                        ))}

                                    </div>
                                )}

                                {/* HIDDEN INPUT */}
                                <input
                                    type="hidden"
                                    {...register("subject", { required: "Subject is required" })}
                                    value={selected}
                                />

                                {/* ERROR */}
                                {errors.subject && (
                                    <p className="text-red-400 text-xs mt-2">
                                        {errors.subject.message}
                                    </p>
                                )}
                            </div>

                            <textarea
                                {...register("message", { required: "Message required" })}
                                rows="4"
                                placeholder="How may we assist you today?"
                                className="input-style"
                            />
                            {errors.message && <p className="error">{errors.message.message}</p>}

                            <button className="bg-orange-400 text-black px-6 py-3 text-sm font-semibold hover:bg-orange-500 transition">
                                Transmit Inquiry
                            </button>

                        </form>
                    </div>

                    {/* RIGHT INFO */}
                    <div className="border border-[#1a1a1a] p-8 bg-[#111111]">

                        <h3 className="text-xl font-serif text-orange-400 mb-6">
                            The Flagship Boutique
                        </h3>

                        <div className="space-y-5 text-gray-400 text-sm">

                            <div>
                                <p className="text-orange-400">📍 Radhe Heritage Heights</p>
                                <p>12th Obsidian Avenue</p>
                                <p>Surat, Gujarat 395007</p>
                            </div>

                            <div>
                                <p className="text-orange-400">⏰ Operating Hours</p>
                                <p>Mon – Sat: 11:00 AM – 8:00 PM</p>
                                <p>Sunday: Appointment Only</p>
                            </div>

                            <div>
                                <p className="text-orange-400">📞 Direct Line</p>
                                <p>+91 261 400 8000</p>
                            </div>

                        </div>
                    </div>

                </section>

                {/* ================= CONSULTATION ================= */}
                <section className="px-6 md:px-20 py-16">

                    <div className="grid md:grid-cols-2 border border-[#1a1a1a] overflow-hidden">

                        {/* LEFT */}
                        <div className="p-6 md:p-10 bg-black flex flex-col justify-center">

                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-orange-400 
                            mb-4 leading-tight">
                                Book a Private Consultation
                            </h2>

                            <p className="text-gray-400 text-sm md:text-base mb-6 leading-relaxed max-w-md">
                                Our master jewelers offer exclusive sessions for clients seeking
                                bespoke creations. Secure a dedicated hour in our high-security showroom.
                            </p>

                            <div className="flex justify-center md:justify-start gap-3 sm:gap-4 flex-wrap">

                                <button className="bg-orange-400 text-black px-4 sm:px-5 py-2 text-xs sm:text-sm hover:bg-orange-500 transition">
                                    In-Person Viewing
                                </button>

                                <button className="border border-orange-400 text-orange-400 
                                px-4 sm:px-5 py-2 text-xs sm:text-sm hover:bg-orange-400 hover:text-black transition">
                                    Virtual Showcase
                                </button>

                            </div>

                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="h-62.5 sm:h-75 md:h-auto">
                            <img
                                src={book1}
                                className="w-full h-full object-cover"
                            />
                        </div>

                    </div>

                </section>

            </div>
        </div>
    );
}