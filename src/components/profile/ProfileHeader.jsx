import { useState, useRef, useEffect } from "react";

export default function ProfileHeader() {

    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const fileRef = useRef();

    // ✅ Load user from localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
    }, []);

    // ✅ Sync name when user loads
    useEffect(() => {
        if (user) {
            setName(user.name || "");
        }
    }, [user]);

    // ✅ Update user
    const updateUser = (data) => {
        const updatedUser = { ...user, ...data };

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        window.dispatchEvent(new Event("userUpdated")); // 🔥 sync globally
    };

    // HANDLE IMAGE UPLOAD
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);

        updateUser({ avatar: imageUrl });
    };

    const handleSave = () => {
        if (!name.trim()) {
            alert("Name cannot be empty");
            return;
        }

        updateUser({ name });
        setEditing(false);
    };

    // ✅ Prevent crash if user not loaded
    if (!user) return null;

    return (
        <div className="bg-[#1c0f09] p-4 sm:p-5 rounded-xl border border-[#ffffff10]">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                {/* LEFT SIDE */}
                <div className="flex items-center gap-3 sm:gap-4">

                    {/* AVATAR */}
                    <div
                        onClick={() => fileRef.current.click()}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-orange-500 overflow-hidden cursor-pointer hover:opacity-80"
                    >
                        <img
                            src={user.avatar || "https://i.pravatar.cc/100"}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* HIDDEN INPUT */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />

                    {/* TEXT */}
                    <div className="leading-tight">

                        {editing ? (
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-black text-white border border-gray-700 px-2 py-1 rounded w-full text-sm sm:text-base"
                            />
                        ) : (
                            <h2 className="text-base sm:text-lg font-semibold">
                                Welcome back,
                                <span className="block sm:inline sm:ml-1">
                                    {user.name}
                                </span>
                            </h2>
                        )}

                        <p className="text-xs sm:text-sm text-orange-400 mt-1">
                            {user.membership} <br className="sm:hidden" />
                            • Member since {user.memberSince}
                        </p>

                    </div>
                </div>

                {/* BUTTON */}
                {editing ? (
                    <button
                        onClick={handleSave}
                        className="bg-green-500 px-4 py-2 rounded-md text-sm hover:bg-green-600 w-full sm:w-auto"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={() => setEditing(true)}
                        className="bg-orange-500 px-4 py-2 rounded-md text-sm hover:bg-orange-600 w-full sm:w-auto"
                    >
                        Edit Profile
                    </button>
                )}

            </div>
        </div>
    );
}