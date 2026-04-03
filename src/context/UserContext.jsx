import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({
        name: "Priya Sharma",
        memberSince: "Oct 2023",
        membership: "PREMIUM GOLD MEMBER",
        avatar: "https://i.pravatar.cc/100"
    });

    const updateUser = (newData) => {
        setUser(prev => ({ ...prev, ...newData }));
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, updateUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};