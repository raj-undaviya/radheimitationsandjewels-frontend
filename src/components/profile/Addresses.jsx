import { useState } from "react";
import { MapPin, CheckCircle } from "lucide-react";

export default function Addresses() {

    const [addresses, setAddresses] = useState([
        {
            id: 1,
            title: "Home",
            text: "402, Radiant Heights, Diamond Road, Surat, Gujarat - 395003",
            isDefault: true
        },
        {
            id: 2,
            title: "Office",
            text: "Radhe Imitations HQ, Sector 4, Gandhinagar, Gujarat - 382010",
            isDefault: false
        }
    ]);

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    // ADD ADDRESS
    const handleAdd = () => {
        if (!title.trim() || !text.trim()) return;

        const newAddress = {
            id: Date.now(),
            title,
            text,
            isDefault: false
        };

        setAddresses(prev => [...prev, newAddress]);
        setTitle("");
        setText("");
        setShowForm(false);
    };

    // DELETE
    const handleDelete = (id) => {
        setAddresses(prev => prev.filter(a => a.id !== id));
    };

    // SET DEFAULT
    const setDefault = (id) => {
        setAddresses(prev =>
            prev.map(addr => ({
                ...addr,
                isDefault: addr.id === id
            }))
        );
    };

    return (
        <div className="bg-[#1c0f09] p-5 rounded-2xl border border-[#ffffff10]">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold flex items-center gap-2">
                    <MapPin size={18} className="text-orange-400" />
                    Saved Addresses
                </h3>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-[#2a1208] hover:bg-[#3a1a0c] text-orange-400 px-3 py-1 rounded-md text-sm"
                >
                    + Add New
                </button>
            </div>

            {/* FORM */}
            {showForm && (
                <div className="mb-5 space-y-3">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title (Home / Office)"
                        className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm"
                    />

                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Full Address"
                        className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm"
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={handleAdd}
                            className="bg-orange-500 px-4 py-2 rounded-lg text-sm font-medium"
                        >
                            Save
                        </button>

                        <button
                            onClick={() => setShowForm(false)}
                            className="bg-gray-700 px-4 py-2 rounded-lg text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* ADDRESS GRID */}
            <div className="grid md:grid-cols-2 gap-4">

                {addresses.map((addr) => (
                    <div
                        key={addr.id}
                        onClick={() => setDefault(addr.id)}
                        className={`relative p-5 rounded-xl border cursor-pointer transition
                        ${addr.isDefault
                                ? "border-orange-500 bg-[#2a1208]"
                                : "border-[#ffffff10] hover:border-orange-400"
                            }`}
                    >

                        {/* CHECK ICON */}
                        {addr.isDefault && (
                            <CheckCircle
                                size={20}
                                className="absolute top-4 right-4 text-orange-400"
                            />
                        )}

                        {/* TITLE */}
                        <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{addr.title}</h4>

                            {addr.isDefault && (
                                <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-0.5 rounded">
                                    DEFAULT
                                </span>
                            )}
                        </div>

                        {/* ADDRESS */}
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {addr.text}
                        </p>

                        {/* ACTIONS */}
                        <div className="flex gap-4 mt-4 text-sm">
                            <button className="text-gray-400 hover:text-white">
                                Edit
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(addr.id);
                                }}
                                className="text-red-400 hover:text-red-500"
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}       