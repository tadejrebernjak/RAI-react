import React, { createContext, useContext, useEffect, useState } from "react";
import { checkToken } from "./api/userService";

interface UserProviderProps {
    children: React.ReactNode;
}

interface UserContextType {
    username: string | null;
    setUserData: (username: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [username, setUsername] = useState<string | null>(null);

    const setUserData = (username: string | null) => {
        setUsername(username);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const { error, data } = await checkToken();

            if (error) {
                localStorage.removeItem("token");
                return;
            }

            const { username } = data;
            setUserData(username);
        };

        const token = localStorage.getItem("token");
        if (token) {
            fetchUser();
        }
    }, []);

    return (
        <UserContext.Provider value={{ username, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};
