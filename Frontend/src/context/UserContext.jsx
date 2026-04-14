import React, { createContext, useState, useMemo, useContext } from "react";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch {
            return null;
        }
    });

    const [token, setToken] = useState(
        () => localStorage.getItem("token") || null,
    );

    // 1. Added the login function your SignIn page is calling
    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", userToken); // Store token too!
    };

    // 2. Standardized Logout/Clear
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const value = useMemo(
        () => ({
            user,
            token,
            login, // Now SignIn.jsx can find this!
            logout,
            updateUser: login, // Alias for convenience
            isAuthenticated: !!user,
        }),
        [user, token],
    );

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export default UserProvider;
