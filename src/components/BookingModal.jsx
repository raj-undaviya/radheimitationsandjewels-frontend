import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import API from "../api/axiosInstance";
import { getTimeSlotsAPI } from "../api/api";

export default function BookingModal({ isOpen, onClose, onConfirm }) {

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState("");

    const [slots, setSlots] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);

    const allSlots = [...new Set([...slots, ...bookedSlots])];

    const [loading, setLoading] = useState(false);

    const fetchSlots = async (selectedDate) => {
        try {
            setLoading(true);

            const formattedDate = selectedDate.toISOString().split("T")[0];
            const res = await API.get(getTimeSlotsAPI(formattedDate));

            setSlots(res.data.available_slots);
            setBookedSlots(res.data.booked_slots);

        } catch (err) {
            console.log("ERROR:", err);
        } finally {
            setLoading(false);
        }
    };

    const isPastTime = (slot) => {
        const now = new Date();

        const selected = new Date(date);
        const [time, modifier] = slot.split(" ");
        let [hours, minutes] = time.split(":");

        if (hours === "12") hours = "00";
        if (modifier === "PM") hours = parseInt(hours) + 12;

        selected.setHours(hours);
        selected.setMinutes(minutes);

        return selected < now;
    };

    useEffect(() => {
        fetchSlots(date);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl p-6 w-[380px] relative shadow-xl">

                {/* CLOSE */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 text-lg"
                >
                    ✕
                </button>

                <h2 className="text-xl font-bold mb-2">
                    Book a Consultation
                </h2>

                <p className="text-sm text-gray-500 mb-4">
                    Select your preferred date & time
                </p>

                {/* CALENDAR */}
                <Calendar
                    onChange={(d) => {
                        setDate(d);
                        fetchSlots(d);
                    }}
                    value={date}
                    minDate={new Date()}
                />

                {/* TIME SLOTS */}
                <div className="mt-4">
                    <p className="text-sm font-medium mb-2">
                        Available Time Slots
                    </p>


                    <div className="grid grid-cols-3 gap-2">

                        {loading ? (
                            <p className="text-gray-400 text-sm">Loading slots...</p>
                        ) : allSlots.length === 0 ? (
                            <p className="text-gray-400 text-sm">No slots available</p>
                        ) : (
                            allSlots.map((t) => {

                                const isBooked = bookedSlots.includes(t);
                                const isPast = isPastTime(t);

                                return (
                                    <button
                                        key={t}
                                        disabled={isBooked || isPast}
                                        onClick={() => setTime(t)}
                                        className={`p-2 rounded-lg text-sm border font-medium transition
                        ${isBooked
                                                ? "bg-red-500 text-white cursor-not-allowed"
                                                : isPast
                                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                                    : time === t
                                                        ? "bg-green-600 text-white"
                                                        : "bg-green-100 text-green-700 hover:bg-green-200"
                                            }`}
                                    >
                                        {t}
                                    </button>
                                );
                            })
                        )}

                    </div>

                </div>

                {/* CONFIRM */}
                <button
                    onClick={() => {
                        if (!date || !time) {
                            alert("Select date & time");
                            return;
                        }

                        if (bookedSlots.includes(time)) {
                            alert("This slot is already booked");
                            return;
                        }

                        onConfirm(date, time);
                    }}
                    className="w-full mt-5 bg-orange-600 text-white py-3 rounded-lg"
                >
                    Confirm Booking
                </button>

            </div>
        </div>
    );
}