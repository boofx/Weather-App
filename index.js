let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let hour = now.getHours();
if (hour < 10) {
  minute = `0${hour}`;
}
let minute = new Date().getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let p = document.querySelector("#day-time");
p.innerHTML = `${day} ${date} ${month}, ${hour}:${minute}`;

function showTempData(response) {
  let cityName = document.querySelector("h1.main-city");
  cityName.innerHTML = response.data.name;
  let icon = document.querySelector("#main-img");
  icon.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png"
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  celsius = response.data.main.temp;

  let currentTemperature = document.querySelector("#current-temp");
  currentTemperature.innerHTML = Math.round(celsius);
  document.querySelector("#min").innerHTML = `Min: ${Math.round(
    response.data.main.temp_min
  )}°C`;
  document.querySelector("#max").innerHTML = ` | Max: ${Math.round(
    response.data.main.temp_max
  )}°C`;
  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )} %`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function search(city) {
  let apiKey = "bc0b0c73f0c3380ab48613cc0c13531d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTempData);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name");
  search(city.value);
}

function retrievePosition(position) {
  let apiKey = "bc0b0c73f0c3380ab48613cc0c13531d";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTempData);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let fahrenheitTemp = (celsius * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemperature = document.querySelector("#current-temp");
  currentTemperature.innerHTML = Math.round(celsius);
}

function showPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", showPosition);

let form = document.querySelector("#your-city");
form.addEventListener("submit", handleSubmit);

let celsius = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Melbourne");
