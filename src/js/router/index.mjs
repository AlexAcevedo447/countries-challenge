import { CountryFetcher } from "../api_fetch/countries.mjs";
//Router handler
const routerFunction = async (hash, countryObj = new CountryFetcher()) => {
    const [, method, filter] = hash.split('_');

    switch (method) {
        case "home":
            setTimeout(() => { countryObj.renderAllCountryCards() }, 1000);
            break;
        case "search":
            const strings = filter.split('%20');
            setTimeout(() => { countryObj.renderFilteredByNameCountryCards(strings[0]) }, 1000);
            break;
        case "filter":
            setTimeout(() => { countryObj.renderFilteredByRegionCountryCards(filter) }, 1000);
            break;
        case "details":
            setTimeout(() => { countryObj.renderDetailsComponent(filter) }, 1000);
            break;
        default:
            break;
    }
}

export {
    routerFunction
}