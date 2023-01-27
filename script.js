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
  countriesContainer.style.opacity = '1';
  //in the finaly method
};

// Error function:
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
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

// const request = fetch(`https://restcountries.com/v3.1/name/portugal`);
// console.log(request); //Promise {
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
// const getCountryData = function (country) {
//   // country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})!`);
//       }
//       return response.json();
//       // 2callback: then( 1. when there is internet connection, 2. when there is no internet connection)
//       // response => response.json();
//       // err => alert(err)- zamiast tego - globalnie
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];

//       // error 2(400)
//       const neighbour = 'srgsdgsg';

//       if (!neighbour) return;
//       // country 2
//       console.log(neighbour);
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(
//       response => {
//         // error 2(400)
//         if (!response.ok) {
//           throw new Error(`Country not found (${response.status})!`);
//           // Something went wrong 🛑🛑🛑 Country not found (400)!. Try again!
//         }
//         return response.json();
//       }
//       // err => alert(err) - zamiast tego - globalnie
//     )
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 🛑🛑🛑`);
//       renderError(`Something went wrong 🛑🛑🛑 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = '1';
//     });

//   //script.js:195 TypeError: Failed to fetch
// };

// btn.addEventListener('click', function () {
//   getCountryData('ukraine');

//   // jeśli nie ma internetu i nie mamy przechwyconego błędu:
//   //Uncaught (in promise) TypeError: NetworkError when attempting to fetch resource.
//   // Zablokowano żądanie do zasobu innego pochodzenia: zasady „Same Origin Policy” nie pozwalają wczytywać zdalnych zasobów z „https://restcountries.com/v3.1/name/portugal” (nieudane żądanie CORS). Kod stanu: (null).
// });
// // getCountryData('dhhdr');
// // 404 error
// // jeśli nie ma przechwytywania takiego typu błędu, to wywoła się:
// // Cannot read properties of undefined (reading 'flags'). Try again!

// // getCountryData('dhhdr');

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})!`);
    return response.json();
  });
};

const getCountryData = function (country) {
  // country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      // console.log(data[0].borders);
      const neighbour = data[0].borders?.[0];
      //  err 3  - no neighbour
      console.log(neighbour);
      // error 2 - status:400(not correct country as neighbour)
      // const neighbour = 'srgsdgsg';
      // if (!neighbour) return;
      if (!neighbour) throw new Error('No neighbour found');

      // country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.log(err);
      console.error(`${err} 🛑🛑🛑`);
      renderError(`Something went wrong 🛑🛑🛑 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = '1';
    });
};

// btn.addEventListener('click', function () {
// getCountryData('ukraine');
// });

// no neighbour - error 3
// getCountryData('australia');
// getCountryData('usa');

//////////////////////////////////////////////////
// CHALLENGE 1:

// THERE IS ONE PROBLEM WITH THIS API, THERE IS ONLY ONE FREE CALL FOR ONE COORDINATS(IN OTHER CASE YOU MUST TO PAY FOR IT) OR SOME ANOTHER BUG

// const whereAmI = function (lat, lng) {
//   // const url = `https://geocode.xyz/52.508,13.381?geoit=json`
//   // const url = `https://geocode.xyz/${lat},${lng}?geoit=json`;

//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res => {
//       // console.log(res);

//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);

//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 🛑`));
// };
// // whereAmI(52.508, 13.381);
// // whereAmI(19.037, 72.873);
// // whereAmI(-33.933, 18.474);

// whereAmI(-33.733, 18.464);

////////////////////////////////////
//  THE EVENT LOOP IN PRACTICE

// console.log('tEST START');
// setTimeout(() => {
//   console.log('0 sec timer');
// }, 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });
// console.log('Test end');
// // Order:
// tEST START
// Test end
//  Resolved promise 1
// ....waiting
// Resolved promise 1
// 0 sec timer

////////////////////////////////////
// // Building a simple (own)promise
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening');

//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       // fullfiled promise
//       resolve('You WIN🍷');
//     } else {
//       //error
//       reject(new Error('You lost your money🤖'));
//     }
//   }, 2000);
// });
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('4 second passed');
//     return wait(1);
//   })
//   .then(() => console.log('5 sec passed'));

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

// fullfield - wykona się odrazu
// Promise.resolve('abc').then(x => console.log(x));
// // error - wykona się odrazu
// Promise.reject('abc').catch(x => console.error(x));

////////////////////////////////////
// Promisifying the Geolocation API

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),

//     //   err => {
//     //     return reject(err);
//     //     // GeolocationPositionError {code: 1, message: 'User denied Geolocation'}
//     //   }
//     // );

//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then(resolve => console.log(resolve));
// .catch(err => console.error(err));

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);

//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 🛑`));
// };

// // whereAmI(52.508, 13.381);
// btn.addEventListener('click', whereAmI);

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };
// // ///////////////////////////////////////
// // Coding challenge #2:
// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise((resolve, reject) => {
//     const newImg = document.createElement('img');
//     newImg.src = imgPath;

//     newImg.addEventListener('load', function () {
//       imgContainer.appendChild(newImg);
//       resolve(newImg);
//     });
//     newImg.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };
// let currImg;
// createImage('./img/img-1.jpg')
//   .then(img => {
//     currImg = img;
//     console.log('Image 1 load');
//     return wait(2);
//   })
//   .then(() => {
//     currImg.style.display = 'none';
//     return createImage('./img/img-2.jpg');
//   })
//   .then(img => {
//     currImg = img;
//     console.log('Image 2 load');
//     return wait(2);
//   })
//   .then(() => {
//     currImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// //////////////////////////////////////////////
// Consuming promises with Async/Await

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// const whereAmI = async function () {
//   // Geolocation
//   const pos = await getPosition();
//   const { latitude: lat, longitude: lng } = pos.coords;

//   // Reverse geocoding
//   const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//   const dataGeo = await resGeo.json();
//   console.log(dataGeo);

//   // country data
//   // instead of using the old way:
//   // fetch(`https://restcountries.com/v3.1/name/${country}`).then(resp => {
//   //   console.log(resp);
//   // });
//   const res = await fetch(
//     `https://restcountries.com/v3.1/name/${dataGeo.country}`
//   );
//   const data = await res.json();

//   renderCountry(data[0]);
// };
// whereAmI();
// console.log('First');

///////////////////////////////////////
//try...catch

// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
//   // x = 3; - err
// } catch (err) {
//   alert(err.message);
// }
const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();

    renderCountry(data[0]);
  } catch (err) {
    console.error(err);
    renderError(`${err.message}`);
  }
};
whereAmI();
