// get HTML elements
const input = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
const weatherImg = document.querySelector('.weather-img');
const temp = document.querySelector('.temperature');
const weather = document.querySelector('.weather');
const cityLocation = document.querySelector('.city-location');
const humidityValue = document.querySelector('.humidity-value');
const windValue = document.querySelector('.wind-value');

// API key
const API_key = '';

// add event listener
searchBtn.addEventListener('click', () => {
    const city = input.value;
    if (city) {
        getWeatherData(city);
    } else {
        alert('Please enter a city name');
    }
});

// get weather data
function getWeatherData(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const { name } = data;
    const { humidity, temp, } = data.main;
    const { description, icon } = data.weather[0];
    const { speed } = data.wind;

    // set DOM elements from the API
    weatherImg.src = `https://openweathermap.org/img/wn/${icon}.png`;
    cityLocation.textContent = name;
    weather.textContent = description;
    temp.textContent = Math.round(temp - 273.15);
    humidityValue.textContent = `${humidity}%`;
    windValue.textContent = `${speed} km/h`;
  });
}