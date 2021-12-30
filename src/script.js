//Time and Date

let now = new Date();

let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0` + minutes;
}

let currentDate = `${day}, ${hour}:${minutes}`;

let dateTime = document.querySelector("#current-date");
dateTime.innerHTML = currentDate;

//Search Engine
//display location

function searchCity(city) {
  let apiKey = "66c2f30e54854e19ab4716b39d0f033f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inlineFormInputGroupUsername").value;
  searchCity(city);
}

function showWeatherCondition(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  document.querySelector(
    "#city-location"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#degree").innerHTML = `${temp}°`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;

  function celciusUnit(event) {
    event.preventDefault();
    document.querySelector("#degree").innerHTML = `${temp}°`;
  }

  let celciusLink = document.querySelector("#celcius-link");
  celciusLink.addEventListener("click", celciusUnit);

  function fahrUnit(event) {
    event.preventDefault();
    let fahrTemp = Math.round((temp * 9) / 5 + 32);
    document.querySelector("#degree").innerHTML = `${fahrTemp}°`;
  }
  let fahrLink = document.querySelector("#fahr-link");
  fahrLink.addEventListener("click", fahrUnit);
}

//Current Location Button
function searchLocation(position) {
  console.log(position);

  let apiKey = "66c2f30e54854e19ab4716b39d0f033f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("#button-current-location");
locationButton.addEventListener("click", getCurrentLocation);

searchCity("Berlin");
