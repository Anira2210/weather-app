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

function showWeatherCondition(response) {
  let temp = Math.round(response.data.main.temp);
  document.querySelector("#degree").innerHTML = `${temp}°`;

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

  document
    .querySelector("#large-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  let tempMax = Math.round(response.data.main.temp_max);
  document.querySelector("#temp-max").innerHTML = `${tempMax}°C`;

  let tempMin = Math.round(response.data.main.temp_min);
  document.querySelector("#temp-min").innerHTML = `${tempMin}°C`;

  function tempToCelcius(event) {
    event.preventDefault();
    document.querySelector("#degree").innerHTML = `${temp}°`;
  }

  let celciusLink = document.querySelector("#celcius-link");
  celciusLink.addEventListener("click", tempToCelcius);

  function tempToFahr(event) {
    event.preventDefault();
    let fahrTemp = Math.round((temp * 9) / 5 + 32);
    document.querySelector("#degree").innerHTML = `${fahrTemp}°`;
  }

  // function tempToFahrMax(event) {
  // event.preventDefault();
  //let tempMaxFahr = Math.round((tempMax * 9) / 5 + 32);
  //document.querySelector("#temp-max").innerHTML = `${tempMaxFahr}°F`; }

  let fahrLink = document.querySelector("#fahr-link");
  fahrLink.addEventListener("click", tempToFahr);
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
searchForm.addEventListener("click", handleSubmit);

let locationButton = document.querySelector("#button-current-location");
locationButton.addEventListener("click", getCurrentLocation);

searchCity("Berlin");
