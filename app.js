// app.js - Main Controller
import { DOM } from './dom.js';
import { UI } from href='./ui.js';
import { fetchCountryData, fetchAllCountryNames } from './api.js';

// 1. Initialize: Load the list of countries for autocomplete
window.addEventListener('DOMContentLoaded', async () => {
    const countries = await fetchAllCountryNames();
    UI.renderAutocomplete(countries);
});

// 2. Main Search Logic
const handleSearch = async () => {
    const query = DOM.countryInput.value.trim();
    
    // Validation: Don't search if empty
    if (!query) {
        UI.renderError("Please enter a country name.");
        return;
    }

    UI.renderLoading();

    try {
        const countryData = await fetchCountryData(query);
        UI.renderCard(countryData);
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