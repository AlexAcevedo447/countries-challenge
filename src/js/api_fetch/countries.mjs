import {Fetcher} from './fetcher.mjs'
import {Components} from '../dinamic_render/components.mjs'
//Country views and data handler
class CountryFetcher {
    fetcherObject 
    componentObj;
    listNode;
    childrenList;
    childrenLength;

    constructor() {
        // Dependencies
        this.componentObj = new Components();
        this.fetcherObject = new Fetcher();
        this.listNode = this.componentObj.list;
    }

    async justGetAllCountries(){
        return await this.fetcherObject._get('all',)
    }

    renderAllCountryCards = async () => {
        this.componentObj.restartRenderedComponents(this.listNode)
        const countries = await this.fetcherObject._get('all');
        this.componentObj.renderCountryCards(countries);
        return countries;
    }

    renderFilteredByRegionCountryCards = (continent) => {
        const modifiedContinent = this.componentObj.capitalizeFirstLetter(continent);
        const countries = this.fetcherObject._filterByRegion(modifiedContinent);
        this.componentObj.restartRenderedComponents(this.listNode);
        if (!countries || countries === undefined || countries.length === 0) {
            setTimeout(()=>{
                this.componentObj.countriesNotFound(modifiedName);
            },1000)
            location.hash = '_home';
            this.renderAllCountryCards()
            return;
        }
        
        this.componentObj.renderFilteredCountryCardsByRegion(countries,modifiedContinent);
    }

    renderFilteredByNameCountryCards = (name) => {
        const modifiedName = this.componentObj.capitalizeFirstLetter(name);
        const countries = this.fetcherObject._filterByName(modifiedName);
        this.componentObj.restartRenderedComponents(this.listNode);
        if (!countries || countries === undefined || countries.length === 0) {
            setTimeout(()=>{
                this.componentObj.countriesNotFound(modifiedName);
            },1000)
            location.hash = '_home';
            this.renderAllCountryCards();
            return;
        }

        this.componentObj.renderFilteredCountryCardsByName(countries);
    }

    renderDetailsComponent = async (name) => {
        const country = await this.justGetByArea(name);
        this.componentObj.restartRenderedComponents(this.listNode);
        this.componentObj.renderDetailsComponent(country);
    }

    justFilterByRegion = (region) => {
        const modifiedRegion = this.componentObj.capitalizeFirstLetter(region);
        const countries = this.fetcherObject._filterByRegion(modifiedRegion);
        return countries;
    }

    justFilterByName = (name) => {
        const country = this.fetcherObject._filterByName(name);
        localStorage.setItem("country",JSON.stringify(country));
        return country;
    }

    justGetByArea = async (area) => {
        const country = this.fetcherObject._getOneByArea(area)[0];
        return country;
    }
}

export {
    CountryFetcher
}