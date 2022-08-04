// export function fetchCountries(name) {
//     return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,name,capital,population,flags,languages`)
//         .then(response => response.json());
// }

// export function fetchCountries(name) {
//     return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,name,capital,population,flags,languages`)
//         .then(response => {
//             if (!response.ok) {
//       throw new Error(response.status);
//     } response.json() });
// }

export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,name,capital,population,flags,languages`)
        .then(response => {
            if (!response.ok) {
            throw Error(`is not ok: ` + response.status);
        }
    return response.json();
        })
}