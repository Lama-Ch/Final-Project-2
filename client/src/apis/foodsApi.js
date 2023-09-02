// Import the API_URL constant from the constants file
import { API_URL } from '../utils/constants';


// Function to fetch a list of meals of a certain food type
export const listedMealsService = (foodType, authToken) => {
	// Initialize headers with the Content-Type
	const headers = {
		'Content-Type': 'application/json',
	};

	if (authToken) {
		headers['Authorization'] = `Bearer ${authToken}`;
	}
		// Send a GET request to the API endpoint with the provided food type
	return fetch(`${API_URL}/foods/others-listing/${foodType}`, {
		method: 'GET',
		headers: headers,
	});
};
// Function to fetch the posted foods of a certain food type by the authenticated user
export const myPostedFoodsService = (foodType, authToken) => {

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${authToken}`,
	};
	// Send a GET request to the API endpoint for the user's posted foods
	return fetch(`${API_URL}/foods/my-listings/${foodType}`, {
		method: 'GET',
		headers: headers,
	});
};
// Function to fetch details about a specific food item by its ID
export const foodByIdService = (foodId, authToken) => {

	const headers = {
		'Content-Type': 'application/json',
	};

	if (authToken) {
		headers['Authorization'] = `Bearer ${authToken}`;
	}
	// Send a GET request to the API endpoint for the specified food ID
	return fetch(`${API_URL}/foods/${foodId}`, {
		method: 'GET',
		headers: headers,
	});
};
// Function to add a new food item
export const addFoodsService = (data, authToken) => {

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${authToken}`,
	};
	// Send a POST request to the API endpoint to add a new food item
	return fetch(`${API_URL}/foods/`, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(data),
	});
};
