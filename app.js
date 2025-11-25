// app.js - Main Controller
import { DOM } from './dom.js';
import { UI } from './ui.js';
import { fetchCountryData, fetchAllCountryNames } from './api.js';

// 1. Initialize Autocomplete
window.addEventListener('DOMContentLoaded', async () => {
    const countries = await fetchAllCountryNames();
    UI.renderAutocomplete(countries);
});

// 2. Search Logic
const handleSearch = async () => {
    const query = DOM.countryInput.value.trim();
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
DOM.countryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});