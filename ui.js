// ui.js - Updates the HTML
import { DOM } from './dom.js';

export const UI = {
    renderCard: (country) => {
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
        DOM.resultContainer.innerHTML = html;
    },

    renderError: (message) => {
        DOM.resultContainer.innerHTML = `<div class="error-message">⚠️ ${message}</div>`;
    },

    renderLoading: () => {
        DOM.resultContainer.innerHTML = `<p>Loading data...</p>`;
    },

    renderAutocomplete: (countries) => {
        const options = countries.map(c => `<option value="${c.name.common}">`).join('');
        DOM.countryList.innerHTML = options;
    }
};