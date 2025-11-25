// app.js - Main controller

const searchBtn = document.getElementById('search-btn');
const countryInput = document.getElementById('country-input');

// 1. Initialize: Load the autocomplete list (Endpoint 2)
window.addEventListener('DOMContentLoaded', async () => {
    const countries = await fetchAllCountryNames();
    renderAutocomplete(countries);
});

// 2. Handle Search
const handleSearch = async () => {
    const query = countryInput.value.trim();
    
    if (!query) {
        renderError("Please enter a country name.");
        return;
    }

    renderLoading();

    try {
        // Call the API function
        const countryData = await fetchCountryData(query);
        // Call the UI function
        renderCountryCard(countryData);
    } catch (error) {
        renderError(error.message);
    }
};

// Event Listener for Click
searchBtn.addEventListener('click', handleSearch);

// Event Listener for "Enter" key
countryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});