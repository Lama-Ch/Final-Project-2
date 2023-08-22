import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null); // User object
	const [token, setToken] = useState(null); // JWT token

	const setUserLoggedIn = (userData, authToken) => {
		setUser(userData);
		setToken(authToken);
	};

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
