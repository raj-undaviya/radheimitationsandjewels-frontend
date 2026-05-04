import { useState, useEffect } from "react";
import { MapPin, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import API from "../../api/axiosInstance";
import {
    AddAddressAPI,
    UpdateAddressAPI,
    DeleteAddressAPI,
    GetAddressesAPI
} from "../../api/api";

export default function Addresses() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            label: "",
            full_name: "",
            phone: "",
            address_line: "",
            city: "",
            state: "",
            pincode: "",
            country: "India"
        }
    });

    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [loading, setLoading] = useState(false);

    // 🔥 FETCH ADDRESSES
    const fetchAddresses = async () => {
        try {
            const res = await API.get(GetAddressesAPI());

            const list = Array.isArray(res.data.data)
                ? res.data.data
                : [res.data.data];

            setAddresses(
                list.map(a => ({
                    id: a.id,
                    title: a.label,
                    text: a.address_line,
                    isDefault: a.is_default
                }))
            );
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    // 🔥 SUBMIT (ADD + EDIT)
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            if (editingAddress) {
                await API.patch(UpdateAddressAPI(editingAddress.id), data);
            } else {
                await API.post(AddAddressAPI(), {
                    ...data,
                    is_default: false
                });
            }

            fetchAddresses();
            reset();
            setEditingAddress(null);
            setShowForm(false);

        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    // 🔥 EDIT
    const handleEdit = (addr) => {
        setEditingAddress(addr);

        reset({
            label: addr.title,
            full_name: "",
            phone: "",
            address_line: addr.text,
            city: "",
            state: "",
            pincode: "",
            country: "India"
        });

        setShowForm(true);
    };

    // 🔥 DELETE
    const handleDelete = async (id) => {
        try {
            await API.delete(DeleteAddressAPI(id));
            fetchAddresses();
        } catch (err) {
            console.error(err);
        }
    };

    // 🔥 SET DEFAULT
    const setDefault = async (id) => {
        try {
            await API.patch(UpdateAddressAPI(id), { is_default: true });

            const others = addresses.filter(a => a.id !== id);

            await Promise.all(
                others.map(a =>
                    API.patch(UpdateAddressAPI(a.id), { is_default: false })
                )
            );

            fetchAddresses();
        } catch (err) {
            console.error(err);
        }
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
                    className="bg-[#2a1208] text-orange-400 px-3 py-1 rounded-md text-sm"
                >
                    + Add New
                </button>
            </div>

            {/* 🔥 FORM */}
            {showForm && (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mb-6 bg-[#140a05] p-6 rounded-2xl border border-[#ffffff10] space-y-5"
                >

                    {/* ROW 1 */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Label</label>
                            <input
                                {...register("label", { required: "Label required" })}
                                placeholder="Home / Office"
                                className="inputField"
                            />
                            {errors.label && <p className="error">{errors.label.message}</p>}
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Full Name</label>
                            <input
                                {...register("full_name", { required: "Name required" })}
                                placeholder="John Doe"
                                className="inputField"
                            />
                            {errors.full_name && <p className="error">{errors.full_name.message}</p>}
                        </div>
                    </div>

                    {/* ADDRESS */}
                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">Full Address</label>
                        <textarea
                            {...register("address_line", { required: "Address required" })}
                            placeholder="Flat 101, Apartment..."
                            className="inputField h-20 resize-none"
                        />
                    </div>

                    {/* PHONE */}
                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">Phone</label>
                        <input
                            {...register("phone", {
                                required: "Phone required",
                                pattern: { value: /^[0-9]{10}$/, message: "Invalid phone" }
                            })}
                            placeholder="9876543210"
                            className="inputField"
                        />
                        {errors.phone && <p className="error">{errors.phone.message}</p>}
                    </div>

                    {/* CITY / STATE / PIN */}
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">City</label>
                            <input {...register("city", { required: true })} className="inputField" />
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">State</label>
                            <input {...register("state", { required: true })} className="inputField" />
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Pincode</label>
                            <input {...register("pincode", { required: true })} className="inputField" />
                        </div>
                    </div>

                    {/* COUNTRY */}
                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">Country</label>
                        <input value="India" disabled className="inputField opacity-70" />
                    </div>

                    {/* BUTTONS */}
                    <div className="flex justify-end gap-3 pt-3">
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                setShowForm(false);
                                setEditingAddress(null);
                            }}
                            className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-sm font-medium shadow-lg shadow-orange-500/20"
                        >
                            {loading ? "Saving..." : editingAddress ? "Update" : "Save"}
                        </button>
                    </div>

                </form>
            )}

            {/* ADDRESS GRID */}
            <div className="grid md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                    <div
                        key={addr.id}
                        onClick={() => setDefault(addr.id)}
                        className={`relative p-5 rounded-xl border cursor-pointer
                        ${addr.isDefault ? "border-orange-500 bg-[#2a1208]" : "border-[#ffffff10]"}`}
                    >

                        {addr.isDefault && (
                            <CheckCircle size={20} className="absolute top-4 right-4 text-orange-400" />
                        )}

                        <h4 className="font-semibold">{addr.title}</h4>

                        <p className="text-gray-400 text-sm mt-2">
                            {addr.text}
                        </p>

                        <div className="flex gap-4 mt-4 text-sm">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(addr);
                                }}
                                className="text-gray-400 hover:text-white"
                            >
                                Edit
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(addr.id);
                                }}
                                className="text-red-400"
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