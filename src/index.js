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
    `<li>
     <img src="${flags.svg}" alt="flag" width = 50> <p>${name.official}</p>
    </li>`, "");
}

function createOneCountryInfo(arr) {
    const languages = Object.values(arr[0].languages)
    return arr.reduce((acc, { flags, name, capital, population }) => acc + 
    `<li>
     <img src="${flags.svg}" alt="flag" width = "100px">
     <p>${name.official}</p>
     <p>Capital: ${capital}</p>
     <p>Population: ${population}</p>
     <p>Languages: ${languages}</p>
    </li>`, "")
}
