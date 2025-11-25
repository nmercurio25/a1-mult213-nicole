// app.js - Main Controller
import { DOM } from './dom.js';
import { UI } from './ui.js';
import { fetchCountryData, fetchAllCountryNames } from './api.js';

// 1. Initialize: Load the list of countries for autocomplete
window.addEventListener('DOMContentLoaded', async () => {
    const countries = await fetchAllCountryNames();
    UI.renderAutocomplete(countries);
});

// 2. Main Search Logic
const handleSearch = async () => {
    const query = DOM.countryInput.value.trim();
    // NEW: Get the value (convert string to integer)
    const factCount = parseInt(DOM.factCountInput.value) || 3; // Default to 3 if empty

    // Validation
    if (!query) {
        UI.renderError("Please enter a country name.");
        return;
    }
    
    // Validate number range (keep it between 1 and 10)
    if (factCount < 1 || factCount > 10) {
        UI.renderError("Please choose between 1 and 10 facts.");
        return;
    }

    UI.renderLoading();

    try {
        const countryData = await fetchCountryData(query);
        // NEW: Pass the factCount to the render function
        UI.renderCard(countryData, factCount); 
    } catch (error) {
        UI.renderError(error.message);
    }
};

// 3. Event Listeners
DOM.searchBtn.addEventListener('click', handleSearch);

// Allow pressing "Enter" key to search
DOM.countryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});