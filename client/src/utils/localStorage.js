// Function to save an authentication token to localStorage
export const saveAuthToken = (token) => {
	localStorage.setItem('authToken', token);
};
// Function to get the stored authentication token from localStorage
export const getStoredAuthToken = () => {
	return localStorage.getItem('authToken');
};
// Function to remove the stored authentication token from localStorage
export const removeStoreAuthToken = () => {
	localStorage.removeItem('authToken');
};

