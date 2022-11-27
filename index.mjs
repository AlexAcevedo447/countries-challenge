import { routerFunction } from './src/js/router/index.mjs'
import { CountryFetcher } from './src/js/api_fetch/countries.mjs'
//App init
export class Index {
    countryObj;
    searchForm;
    countryName;
    searchForm;
    selectedItems;
    selectedItem;
    constructor() {
        // Dependencies
        this.countryObj = new CountryFetcher();
        // Properties
        this.searchForm = document.getElementById('search-form');
        this.countryName = document.getElementsByName('country-name')[0];
        this.selectedItem = document.getElementsByName('selected-continent')[0];
        this.selectItems = document.getElementsByName('select-item');
        this.windowListeners();
        this.componentListeners();
    }

    windowListeners = () => {
        window.addEventListener('load', async () => {
            await this.getAllData()
        })

        window.addEventListener('hashchange', () => {
            routerFunction(location.hash);
        })
    }

    componentListeners = () => {
        this.searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            var data = new FormData(event.target).get('country-name');
            this.filterByName(data);
        })

        //adding new listener to custom select
        this.selectItems.forEach(element=>{
            element.addEventListener('click',async (e)=>{
                this.selectedItem.value = e.target.textContent;
                if(e.target.textContent === "All"){
                    await this.getAllData()
                }else{
                    this.filterByRegion(e.target.textContent);
                }
            })
        })
    }

    filterByRegion = (region) => {
        location.hash = '_filter_'+region;
        routerFunction(location.hash);
    }

    filterByName = (name) => {
        location.hash = '_search_'+name;
        routerFunction(location.hash);
    }

    getAllData = async () => {
        location.hash='_home';
        routerFunction(location.hash);
    }
}


new Index()


// const btn_filtrar = document.getElementById('btn_filtrar')

// searchForm.addEventListener('submit',(event)=>{
//     event.preventDefault();
//     filterByRegion(filtro.value);
// })

// const filterOneCountry = (cca2)=>{
//     const countryObj = new CountryFetcher();
//     countryObj.justGetOne(cca2);
// }


// const allCountries= ()=>{
//     const countryObj = new CountryFetcher();
//     countryObj.renderAllCountryCards()
// }

// setTimeout(()=>{
//     allCountries();
// },1000)