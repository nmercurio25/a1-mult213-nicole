// ui.js - Handles DOM updates

const resultContainer = document.getElementById('result-container');
const datalist = document.getElementById('country-list');

// Function to render the success card
const renderCountryCard = (country) => {
    // Extract languages from the object (e.g., {eng: "English", fra: "French"})
    const languages = country.languages 
        ? Object.values(country.languages).join(', ') 
        : 'N/A';
    
    const capital = country.capital ? country.capital[0] : 'N/A';

    const html = `
        <div class="country-card">
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
            <h2>${country.name.common}</h2>
            <div class="country-info">
                <p><strong>🏛 Capital:</strong> ${capital}</p>
                <p><strong>🗣 Languages:</strong> ${languages}</p>
                <p><strong>👥 Population:</strong> ${country.population.toLocaleString()}</p>
            </div>
        </div>
    `;
    
    resultContainer.innerHTML = html;
};

// Function to render errors
const renderError = (message) => {
    resultContainer.innerHTML = `
        <div class="error-message">
            <p>⚠️ ${message}</p>
        </div>
    `;
};

// Function to show a loading state
const renderLoading = () => {
    resultContainer.innerHTML = `<p>Loading data...</p>`;
};

// Function to populate the autocomplete list
const renderAutocomplete = (countries) => {
    // Create an option tag for every country found
    const options = countries.map(c => `<option value="${c.name.common}">`).join('');
    datalist.innerHTML = options;
};