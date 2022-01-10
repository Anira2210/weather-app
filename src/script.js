//defines the current time
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

function formatDateSun(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0` + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0` + minutes;
  }

  return `${hours}:${minutes}`;
}

//defines the weekdays for the forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
  return days[day];
}

//changes background image depending if day or night
function changeBackgroundColor(response) {
  let icon = response.data.weather[0].icon;
  let outerBox = document.querySelector("#outer-box");

  if (
    icon === "01n" ||
    icon === "02n" ||
    icon === "04n" ||
    icon === "09n" ||
    icon === "10n" ||
    icon === "11n" ||
    icon === "13n" ||
    icon === "50n"
  ) {
    document.querySelector("#outer-box").style.backgroundImage =
      "url('images/sky-night.jpg')";
    outerBox.classList.add("night-mode");
  } else {
    document.querySelector("#outer-box").style.backgroundImage =
      "url('images/sky-day.jpg')";
    outerBox.classList.remove("night-mode");
  }
}

// 5. Forecast function - loops through the forecast HTML part and displays the forecast
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row m-3">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2 forecast-day">
      <div class="forecast-date">${formatDay(forecastDay.dt)}</div> 
      <img src="images/${
        forecastDay.weather[0].icon
      }.png" alt="" class="forecast-icon" />
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

// 4. Forecast API: gets forecast data from openweather and calls the function that displays the forecast
function getForecast(coordinates) {
  let apiKey = "66c2f30e54854e19ab4716b39d0f033f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//3. defines all the HTML elements and displays it- calls the forecast functions
function showWeatherCondition(response) {
  console.log(response.data);
  let temp = document.querySelector("#degree");
  let city = document.querySelector("#city-location");
  let condition = document.querySelector("#condition");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let pressure = document.querySelector("#pressure");
  let currentDate = document.querySelector("#current-date");
  let feelsLikeTemp = document.querySelector("#feels-like");
  let weatherIcon = document.querySelector("#weather-icon");

  temp.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  condition.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  pressure.innerHTML = response.data.main.pressure;

  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  feelsLikeTemp.innerHTML = `${Math.round(response.data.main.feels_like)}°C`;

  weatherIcon.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );

  celciusTemp = Math.round(response.data.main.temp); //defines global variable at the bottom
  celciusTempFeelsLike = Math.round(response.data.main.feels_like); //defines global variable at the bottom

  changeBackgroundColor(response);

  getForecast(response.data.coord);
}

//2. gets the current weather info from OpenWeather via API - calls the show weather function
function searchCity(city) {
  let apiKey = "66c2f30e54854e19ab4716b39d0f033f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherCondition);
}

//1. sets the location, calls weather API function
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
let celciusTempFeelsLike = null; //global variable

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", tempToCelcius);

let celciusLinkFeel = document.querySelector("#celcius-link");
celciusLinkFeel.addEventListener("click", feelsLikeTempToCelcius);

let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", tempToFahr);

let fahrLinkFeel = document.querySelector("#fahr-link");
fahrLinkFeel.addEventListener("click", feelsLikeTempToFahr);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

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

//photo day https://www.pexels.com/de-de/@snapwire

//photo night Foto von tommy haugsveen von Pexels
