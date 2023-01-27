'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
	<article class="country ${className}">
		<img class="country__img" src="${data.flags.png}" />
		<div class="country__data">
		  <h3 class="country__name">${data.name.common}</h3>
		  <h4 class="country__region">${data.region}</h4>
		  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
        1
      )}M people</p>
		  <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
		  <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0].name
      }</p>
	  </div>
  </article>
	`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = '1';//in the finaly method
};

// Error function:
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////
// OLD way - XML HTTP request:
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     console.log(this.responseText);
//     // [data] - destructuring to object
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     console.log(Object.values(data.currencies)[0].name);
//     const html = `
//   <article class="country">
//   	<img class="country__img" src="${data.flags.png}" />
//   	<div class="country__data">
// 		<h3 class="country__name">${data.name.common}</h3>
// 		<h4 class="country__region">${data.region}</h4>
// 		<p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
//       1
//     )}M people</p>
// 		<p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
// 		<p class="country__row"><span>💰</span>${
//       Object.values(data.currencies)[0].name
//     }</p>
//     </div>
// </article>
//   `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = '1';
//   });
// };
// getCountryData('ukraine');
// getCountryData('poland');
// // getCountryData('portugal');

//////////////////////////////////////
// GET data with callback hell

// const renderCountry = function (data, className = '') {
//   const html = `
// 	<article class="country ${className}">
// 		<img class="country__img" src="${data.flags.png}" />
// 		<div class="country__data">
// 		  <h3 class="country__name">${data.name.common}</h3>
// 		  <h4 class="country__region">${data.region}</h4>
// 		  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
//         1
//       )}M people</p>
// 		  <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
// 		  <p class="country__row"><span>💰</span>${
//         Object.values(data.currencies)[0].name
//       }</p>
// 	  </div>
//   </article>
// 	`;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = '1';
// };

// const getCountryAndNeighbour = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     console.log(this.responseText);
//     // [data] - destructuring to object
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     console.log(Object.values(data.currencies)[0].name);
//     // Render country 1
//     renderCountry(data);

//     // Get neighbour country (2)
//     const neighbour = data.borders?.[0];
//     console.log(neighbour);

//     if (!neighbour) return;

//     // AJAX call neighbour country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };
// getCountryAndNeighbour('ukraine');
// // getCountryAndNeighbour('poland');
// // getCountryAndNeighbour('portugal');
// // getCountryAndNeighbour('usa');n

// /////////////////////////////////
// //  callback hell
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 second passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4second passed');
//         setTimeout(() => {
//           console.log('5 second passed');
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

/////////////////////////////////////
// modern way of getting data
// fetch API

// // old
// const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

// modern:

const request = fetch(`https://restcountries.com/v3.1/name/portugal`);
console.log(request); //Promise {
// 	[[Prototype]]:Promise
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: Response}

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response); //object with some data, includes url, status, headers, body(with string(data)) etc.
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// without console.log:
const getCountryData = function (country) {
  // country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(
      // 2callback: then( 1. when there is internet connection, 2. when there is no internet connection)
      response => response.json()
      // err => alert(err)- zamiast tego - globalnie
    )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;
      // country 2
      console.log(neighbour);
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(
      response => response.json()
      // err => alert(err) - zamiast tego - globalnie
    )
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 🛑🛑🛑`);
      renderError(`Something went wrong 🛑🛑🛑 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = '1';
    });

  //script.js:195 TypeError: Failed to fetch
};

btn.addEventListener('click', function () {
  getCountryData('ukraine');
  // jeśli nie ma internetu i nie mamy przechwyconego błędu:
  //Uncaught (in promise) TypeError: NetworkError when attempting to fetch resource.
  // Zablokowano żądanie do zasobu innego pochodzenia: zasady „Same Origin Policy” nie pozwalają wczytywać zdalnych zasobów z „https://restcountries.com/v3.1/name/portugal” (nieudane żądanie CORS). Kod stanu: (null).
});
