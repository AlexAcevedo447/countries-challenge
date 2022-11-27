//Views handler
class Components {
    list = document.getElementById('root');
    imageCountry = document.getElementById('country-bar-img')
    attributesContainer = document.getElementById('attributes');
    attributeContainer = document.getElementById('attribute');
    childList = document.getElementById("card");

    constructor() {
    }

    sortCountriesFunction = (a, b) => {
        if (a.name.common < b.name.common) return -1;
        if (a.name.common > b.name.common) return 1;
        return 0;
    }

    /**
     * saves in localStorage cardComponents states
     * @param {Array<T>} json - countries to traverse
     * @param {string} propertyName - property name that will be used to handle to get the countries state.
     * @param {string} varName - variable that will save traversed countries
     */



    renderCountryCards(countries) {
        this.list.innerHTML += countries.sort(this.sortCountriesFunction).map(this.countryCardComponent)
    }

    renderFilteredCountryCardsByRegion = (filteredByRegionCountries) => {
        this.list.innerHTML += filteredByRegionCountries.map(this.countryCardComponent);
    }

    renderFilteredCountryCardsByName = (filteredByNameCountry) => {
        this.list.innerHTML += filteredByNameCountry.map(this.countryCardComponent);
    }

    countriesNotFound(filter) {
        alert(`Objects that contains "${filter}" were not found`);
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    restartRenderedComponents(parentNode) {
        parentNode.innerHTML = "";
    }

    renderCountryPropertiesList = (parentNode, country) => {
        const values = Object.values(country);
        const keys = Object.keys(country);
        console.log(country);

        if (this.imageCountry instanceof HTMLImageElement) {
            this.imageCountry.src = country.flags.svg;
        }

        for (var i = 0; i < keys.length; i++) {

            parentNode.innerHTML += `<li id="attribute">${this.traverseObjectsAndArrays(keys[i], i)}: ${this.traverseObjectsAndArrays(values[i], i)}</li>`;
        }
    }

    renderDetailsComponent = (country) => {
        this.list.innerHTML += this.detailsComponent(country);
    }

    //recursive function
    traverseObjectsAndArrays(object, i) {
        const keys = Object.keys(object);
        const values = Object.values(object);
        const obj = this.validateTypeOfObj;
        if (obj(object, Object)) {
            return keys.map((key, index) => {
                if (values[i]) {
                    return this.traverseObjectsAndArrays(values[index], index);
                }
                return `<ul><li>${key}: ${values[index]}</li></ul>`;
            })
        }
        if (obj(object, Array)) {
            return keys.map((key, index) => {
                if (values[i]) {
                    return this.traverseObjectsAndArrays(values[index], index);
                }
                return `<ul><li>${key}: ${values[index]}</li></ul>`
            })
        }
        if (obj(object, String)) {
            return object;
        } else {
            return object;
        }

    }

    validateTypeOfObj(object, type) {
        if (object) {
            return Object.getPrototypeOf(object).isPrototypeOf(type);
        } else {
            return null;
        }
    }

    countryCardComponent = (country) => {
        return `
        <div class="card1">
            <div class="card1__front">
                <h1 class="card1__text">${country.name.common}</h1>
            </div>
            <div class="card1__back">
                <div class="card1__info--img">
                    <img src="${country.flags.png}" loading="lazy" alt="${country.name.common}'s flag" class="card1__img">
                </div>
                <div class="card1__info--content">
                    <h1 class="card1__title">${country.capital}</h1>
                    <p class="card1__subtitle">${country.population} people</p>
                    <p class="card1__subtitle">${country.continents}</p>
                    <a class="card1__link" href="#_details_${country.area}">View more...</a>
                </div>
            </div>
        </div>
        `
    }

    detailsComponent = (country) =>{
        console.log(country)
        const { name, flags, capital, independent, borders, languages, timezones, continents, population } = country;
        return `
        <div class="details">
            <h2 class="details-title">
                ${name.common}'s details
            </h2>
            <div class="details-content">
                <div class="details-card">
                    <img src="${flags.png}" class="details-img"/>
                </div>
                <span class="separator"></span>
                <div class="details-card">
                    <div class="details-card__content">
                        <p>Name: ${name.common}</p>
                        <p>Capital(s): ${capital ? capital.map(capital=>capital) : 'Undefined'}</p>
                        <p>Independent: ${independent ? 'Yes' : 'No'}</p>
                        <p>Borders: ${borders ? borders.map(b=>b) : 'Not defined'}</p>
                    </div>
                </div>
                <span class="separator"></span>
                <div class="details-card">
                    <div class="details-card__content">
                        <p>Languages: ${languages ? Object.values(languages).map(l=>l) : 'Not defined'}</p>
                        <p>Time zone: ${timezones[0]}</p>
                        <p>Region: ${continents.map(c=>c)}</p>
                        <p>Population: ${population} people</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

export {
    Components
}