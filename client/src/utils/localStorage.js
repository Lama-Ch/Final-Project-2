//storage mechanism for the browser, to save all keys and data for the browser.
export const saveAuthToken = (token) => {
	localStorage.setItem('authToken', token);
};

export const getStoredAuthToken = () => {
	return localStorage.getItem('authToken');
};

export const removeStoreAuthToken = () => {
	localStorage.removeItem('authToken');
};

