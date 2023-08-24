// get HTML elements
const input = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
const weatherImg = document.querySelector('.weather-img');
const temp = document.querySelector('.temperature');
const weatherResults = document.querySelector('.weather-results');
const weather = document.querySelector('.weather');
const cityLocation = document.querySelector('.city-location');
const humidityValue = document.querySelector('.humidity-value');
const windValue = document.querySelector('.wind-value');
const notFound = document.querySelector('.not-found');

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
    const name = data.name;
    const humidity= data.main.humidity;
    const weatherTemp = data.main.temp - 273.15;
    const description = data.weather[0].description;
    const windSpeed = data.wind.speed * 3.6;
    const country = data.sys.country;

    // set DOM elements from the API
    cityLocation.textContent = `${name}, ${country}`;
    weather.textContent = description;
    temp.textContent = `${weatherTemp.toFixed(1)}°C`;
    humidityValue.textContent = `${humidity}%`;
    windValue.textContent = `${windSpeed.toFixed(1)} km/h`;
    if (description.includes('clear')) {
      weatherImg.src = './weather images/clear.png';
    } else if (description.includes('cloud')) {
      weatherImg.src = './weather images/clouds.png';
    } else if (description.includes('clear')) {
      weatherImg.src = './weather images/clear.png';
    } else if (description.includes('snow')) {
      weatherImg.src = './weather images/snow.png';
    } else if (description.includes('drizzle')) {
      weatherImg.src = './weather images/drizzle.png';
    } else if (description.includes('mist')) {
      weatherImg.src = './weather images/mist.png';
    } else {
      weatherImg.src = './weather images/rain.png';
    }

    // show weather box
    showWeatherBox();
  })

  // catch error
  .catch(() => {
    hideWeatherBox();
  })
}

function showWeatherBox() {
  weatherResults.style.display = 'block';
  notFound.style.display = 'none';
}

function hideWeatherBox() {
  weatherResults.style.display = 'none';
  notFound.style.display = 'block';
}