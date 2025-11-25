

// Get specific country data
export async function fetchCountryData(countryName) {
    // We add fullText=true to avoid partial matches (e.g. searching "Ind" -> India)
    const url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Country not found or API error (${response.status})`);
        }
        
        const data = await response.json();
        return data[0]; // API returns an array, we want the first object
    } catch (error) {
        throw error;
    }
}

// Get all country names for the dropdown list
export async function fetchAllCountryNames() {
    const url = `https://restcountries.com/v3.1/all?fields=name`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to load list');
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Autocomplete error:", error);
        return [];
    }
}