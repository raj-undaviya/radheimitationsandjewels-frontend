import { useState } from "react";

export default function Addresses() {

    const [addresses, setAddresses] = useState([
        {
            id: 1,
            title: "Home",
            text: "402, Diamond Road, Surat"
        },
        {
            id: 2,
            title: "Office",
            text: "Gandhinagar, Gujarat"
        }
    ]);

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    // ADD ADDRESS
    const handleAdd = () => {
        if (!title.trim() || !text.trim()) {
            alert("Please fill all fields");
            return;
        }

        const newAddress = {
            id: Date.now(),
            title,
            text
        };

        setAddresses(prev => [...prev, newAddress]);

        // reset
        setTitle("");
        setText("");
        setShowForm(false);
    };

    // DELETE ADDRESS
    const handleDelete = (id) => {
        setAddresses(prev => prev.filter(a => a.id !== id));
    };

    return (
        <div className="bg-[#1c0f09] p-5 rounded-xl border border-[#ffffff10]">

            {/* HEADER */}
            <div className="flex justify-between mb-4 items-center">
                <h3 className="font-semibold">Saved Addresses</h3>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="text-orange-400 text-sm"
                >
                    + Add New
                </button>
            </div>

            {/* ADD FORM */}
            {showForm && (
                <div className="mb-4 space-y-2">

                    <input
                        type="text"
                        placeholder="Title (Home / Office)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-sm"
                    />

                    <textarea
                        placeholder="Full Address"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-sm"
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={handleAdd}
                            className="bg-orange-500 px-3 py-1 rounded text-sm"
                        >
                            Save
                        </button>

                        <button
                            onClick={() => setShowForm(false)}
                            className="bg-gray-700 px-3 py-1 rounded text-sm"
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            )}

            {/* ADDRESS LIST */}
            <div className="grid sm:grid-cols-2 gap-4 text-sm">

                {addresses.map((addr) => (
                    <div
                        key={addr.id}
                        className="border border-[#ffffff10] p-3 rounded-md relative hover:border-orange-500 transition"
                    >

                        <h4 className="font-semibold">{addr.title}</h4>

                        <p className="text-gray-400 mt-1">
                            {addr.text}
                        </p>

                        {/* DELETE */}
                        <button
                            onClick={() => handleDelete(addr.id)}
                            className="absolute top-2 right-2 text-red-400 text-xs hover:text-red-500"
                        >
                            Delete
                        </button>

                    </div>
                ))}

            </div>

        </div>
    );
}