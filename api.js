// api.js - Handles all network requests

const BASE_URL = 'https://restcountries.com/v3.1';

// Endpoint 1: Search by name
async function fetchCountryData(countryName) {
    const url = `${BASE_URL}/name/${countryName}?fullText=true`;
    try {
        const response = await fetch(url);
        
        // Custom error handling for 404 (Not Found)
        if (!response.ok) {
            throw new Error(`Country not found (${response.status})`);
        }
        
        const data = await response.json();
        return data[0]; // The API returns an array, we want the first item
    } catch (error) {
        throw error; // Re-throw to be handled by the controller
    }
}

// Endpoint 2: Get all names (for autocomplete)
async function fetchAllCountryNames() {
    const url = `${BASE_URL}/all?fields=name`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to load list');
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Could not fetch autocomplete data", error);
        return [];
    }
}