// ui.js - View Logic
import { DOM } from './dom.js';

export const UI = {
    // 1. Render the main card
    renderCard: (country) => {
        // Handle cases where languages or capital might be missing
        const languages = country.languages 
            ? Object.values(country.languages).join(', ') 
            : 'N/A';
        
        const capital = country.capital 
            ? country.capital[0] 
            : 'N/A';

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
        DOM.resultContainer.innerHTML = html;
    },

    // 2. Render error message
    renderError: (message) => {
        DOM.resultContainer.innerHTML = `
            <div class="error-message">
                <p>⚠️ ${message}</p>
            </div>
        `;
    },

    // 3. Render loading spinner/text
    renderLoading: () => {
        DOM.resultContainer.innerHTML = `<p>Searching database...</p>`;
    },

    // 4. Fill the autocomplete list
    renderAutocomplete: (countries) => {
        // Sort alphabetically for better UX
        countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        
        const options = countries.map(c => `<option value="${c.name.common}">`).join('');
        DOM.countryList.innerHTML = options;
    }
};