import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css"

const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box");
const list = document.querySelector(".country-list")
// fetchCountries(input.value)

input.addEventListener("input", debounce(onInputCountryName, DEBOUNCE_DELAY));

function onInputCountryName() {
    if (input.value.trim() !== "") {
        fetchCountries(input.value.trim()).then(data => {
            if (data?.length > 10) {
                return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
            if (data?.length > 1 && data?.length < 10) {
                list.innerHTML = '';
                return list.insertAdjacentHTML("beforeend", createCountryList(data))
            }
            if (data?.length === 1) {
                list.innerHTML = "";
                return list.insertAdjacentHTML('beforeend', createOneCountryInfo(data))
            }
        }).catch((err) => {
        Notiflix.Notify.failure('Oops, there is no country with that name')
    })
    }

    return list.innerHTML = "";
}

function createCountryList(arr) {
     return arr.reduce((acc, { flags, name }) => acc + 
    `<li class="country-item">
     <img class="img" src="${flags.svg}" alt="flag" width = 50 > 
     <p class="country-text">${name.official}</p>
    </li>`, "");
}

function createOneCountryInfo(arr) {
    const languages = Object.values(arr[0].languages)
    return arr.reduce((acc, { flags, name, capital, population }) => acc + 
    `<li class="one-country-item">
     <img class="img img__center" src="${flags.svg}" alt="flag" width = "100px">
     <p class="one-country-text one-country-text__first-element">${name.official}</p>
     <p class="one-country-text">Capital: <span class="one-country-info">${capital}</span></p>
     <p class="one-country-text">Population: <span class="one-country-info">${population}</span></p>
     <p class="one-country-text">Languages: <span class="one-country-info">${languages}</span></p>
    </li>`, "")
}
