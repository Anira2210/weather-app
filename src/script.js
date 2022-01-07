function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0` + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0` + minutes;
  }
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row mt-4">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt="" class="forecast-icon" />
      <div>
        <span class="forecast-maximum-temp">${Math.round(
          forecastDay.temp.max
        )}°</span
        ><span class="forecast-minimum-temp">  ${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "66c2f30e54854e19ab4716b39d0f033f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeatherCondition(response) {
  let temp = Math.round(response.data.main.temp);
  celciusTemp = Math.round(response.data.main.temp);
  document.querySelector("#degree").innerHTML = temp;
  document.querySelector(
    "#city-location"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°C`;
  celciusTempFeelsLike = Math.round(response.data.main.feels_like);
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  let tempMax = Math.round(response.data.main.temp_max);
  document.querySelector("#temp-max").innerHTML = `${tempMax}°C`;
  celciusTempMax = Math.round(response.data.main.temp_max);

  let tempMin = Math.round(response.data.main.temp_min);
  document.querySelector("#temp-min").innerHTML = `${tempMin}°C`;
  celciusTempMin = Math.round(response.data.main.temp_min);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "66c2f30e54854e19ab4716b39d0f033f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input").value;
  searchCity(city);
}

function tempToCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrLink.classList.remove("active");

  document.querySelector("#degree").innerHTML = celciusTemp;
}

function tempToFahr(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrLink.classList.add("active");

  let fahrTemp = Math.round((celciusTemp * 9) / 5 + 32);
  document.querySelector("#degree").innerHTML = fahrTemp;
}

function tempToFahrMax(event) {
  event.preventDefault();

  let tempMaxFahr = Math.round((celciusTempMax * 9) / 5 + 32);
  document.querySelector("#temp-max").innerHTML = `${tempMaxFahr}°F`;
}

function tempToCelciusMax(event) {
  event.preventDefault();
  let tempMaxCelcius = celciusTempMax;
  document.querySelector("#temp-max").innerHTML = `${tempMaxCelcius}°C`;
}

function feelsLikeTempToFahr(event) {
  event.preventDefault();
  let feelsLikeFahr = Math.round((celciusTempFeelsLike * 9) / 5 + 32);
  document.querySelector("#feels-like").innerHTML = `${feelsLikeFahr}°F`;
}

function feelsLikeTempToCelcius(event) {
  event.preventDefault();
  let feelsLikeCelcius = Math.round(celciusTempFeelsLike);
  document.querySelector("#feels-like").innerHTML = `${feelsLikeCelcius}°C`;
}

let celciusTemp = null; //global variable
let celciusTempMax = null; //global variable
let celciusTempMin = null; //global variable
let celciusTempFeelsLike = null; //global variable

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("click", handleSubmit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", tempToCelcius);

let celciusLinkMax = document.querySelector("#celcius-link");
celciusLinkMax.addEventListener("click", tempToCelciusMax);

let celciusLinkFeel = document.querySelector("#celcius-link");
celciusLinkFeel.addEventListener("click", feelsLikeTempToCelcius);

let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", tempToFahr);

let fahrLinkMax = document.querySelector("#fahr-link");
fahrLinkMax.addEventListener("click", tempToFahrMax);

let fahrLinkFeel = document.querySelector("#fahr-link");
fahrLinkFeel.addEventListener("click", feelsLikeTempToFahr);

searchCity("Berlin");

//Current Location Button
function searchLocation(position) {
  let apiKey = "66c2f30e54854e19ab4716b39d0f033f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let locationButton = document.querySelector("#button-current-location");
locationButton.addEventListener("click", getCurrentLocation);
