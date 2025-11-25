// ui.js - View Logic
import { DOM } from './dom.js';

export const UI = {
    // 1. Render the main card
    renderCard: (country, factCount) => { // Accept factCount argument
        const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
        const capital = country.capital ? country.capital[0] : 'N/A';
        const currency = country.currencies ? Object.values(country.currencies)[0].name : 'N/A';

        // CREATE A POOL OF 10 FACTS
        const availableFacts = [
            `It is located in the <strong>${country.region}</strong> region.`,
            `The subregion is <strong>${country.subregion || 'N/A'}</strong>.`,
            `The official currency is the <strong>${currency}</strong>.`,
            `People drive on the <strong>${country.car.side}</strong> side of the road.`,
            `The internet domain ending is <strong>${country.tld ? country.tld[0] : 'N/A'}</strong>.`,
            `The total land area is <strong>${country.area.toLocaleString()} km²</strong>.`,
            `It shares borders with <strong>${country.borders ? country.borders.length : 0}</strong> other countries.`,
            `The start of the week is considered <strong>${country.startOfWeek}</strong>.`,
            `The demonym for citizens is <strong>${country.demonyms?.eng?.m || 'N/A'}</strong>.`,
            `One of its timezones is <strong>${country.timezones ? country.timezones[0] : 'N/A'}</strong>.`
        ];

        // Slice the array to get only the number of facts the user asked for
        const selectedFacts = availableFacts.slice(0, factCount);

        // Turn those facts into HTML list items (<li>)
        const factsHTML = selectedFacts.map(fact => `<li>${fact}</li>`).join('');

        const html = `
            <div class="country-card">
                <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
                <h2>${country.name.common}</h2>
                
                <div class="country-info">
                    <p><strong>🏛 Capital:</strong> ${capital}</p>
                    <p><strong>🗣 Languages:</strong> ${languages}</p>
                    <p><strong>👥 Population:</strong> ${country.population.toLocaleString()}</p>
                </div>

                <hr style="margin: 15px 0; border: 0; border-top: 1px solid #eee;">
                
                <h3>📝 ${factCount} Quick Facts</h3>
                <ul style="text-align: left; padding-left: 20px; color: #555;">
                    ${factsHTML}
                </ul>
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