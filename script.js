'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// OLD way - XML HTTP request:
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    console.log(this.responseText);
    // [data] - destructuring to object
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    console.log(Object.values(data.currencies)[0].name);
    const html = `
  <article class="country">
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
  });
};
getCountryData('ukraine');
getCountryData('poland');
// getCountryData('portugal');