import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

//component called AuthProvider
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null); // User object
	const [token, setToken] = useState(null); // JWT token

// Function to set user data and token when user logs in
	const setUserLoggedIn = (userData, authToken) => {
		setUser(userData);
		setToken(authToken);
	};
// Function to log out the user by resetting user and token
	const logout = () => {
		setUser(null);
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{ user, token, setUserLoggedIn, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
