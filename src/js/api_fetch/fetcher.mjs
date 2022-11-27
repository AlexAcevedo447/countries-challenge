import { Components } from '../dinamic_render/components.mjs'
//Data retriever
class Fetcher {
    //Dependencies
    componentObj;
    //Properties
    data;
    #countryApiUrl;
    

    constructor() {
        //Dependencies
        this.componentObj = new Components();
        //Properties
        this.#countryApiUrl = 'https://restcountries.com/v3.1/';
        this.data = localStorage.getItem('initialStateCountries');
    }

    _get = async (urlFragment, headers) => {
        const json = JSON.parse(this.data);
        try {
            if(!this.data){

                const response = await fetch(this.#countryApiUrl + urlFragment, {
                    method: "GET",
                    headers: headers ? headers : undefined
                })
                const countries = await response.json();
                //Saving initial state data
                localStorage.setItem('initialStateCountries', JSON.stringify(countries));
                
                return json;
            }

            return json;
        } catch (error) {
            throw error;
        }

        
    }

    _filterByRegion = (region) => {
        if(this.data){
            const countries = JSON.parse(this.data).sort(this.componentObj.sortCountriesFunction).filter(country => country.region.includes(region));
            if(region){
                localStorage.setItem(`initialState${region}Countries`,JSON.stringify(countries))
                return countries;
            }
        }else{
            return [];
        }
    }

    _filterByName = (name)=>{
        if(this.data){
            const countries = JSON.parse(this.data).sort(this.componentObj.sortCountriesFunction).filter(country => country.name.common.includes(name));
            if(name){
                return countries;
            }
        }else{
            return [];
        }
    }

    _filterByCCA2(cca2){
        console.log(cca2)
        if (cca2 && this.data) {
            return JSON.parse(this.data).filter(country => country.cca2.includes(cca2))[0];
        } else {
            alert('Filter must not be empty');
            return [];
        }
    }
    _getOneByArea = (area) => {
        if(this.data){
            const country = JSON.parse(this.data).sort(this.componentObj.sortCountriesFunction).filter(country => country.area.toString() === area);
            if(area){
                return country;
            }
        }else{
            return [];
        }
    }
}

export{
    Fetcher
}