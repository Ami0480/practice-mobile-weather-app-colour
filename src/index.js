function showElement(response) {
  console.log(response.data);
  let searchCity = document.querySelector("#city");
  let temperatureElement = document.querySelector("#current-temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let dt = response.data.dt;
  let timezone = response.data.timezone;
  let date = new Date((dt + timezone) * 1000);
  let iconElement = document.querySelector("#icon");
  let iconCode = response.data.weather[0].icon;
  let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  searchCity.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(date);
  iconElement.src = iconUrl;
  iconElement.alt = response.data.weather[0].description;
}

function formatDate(date) {
  let hour = date.getUTCHours();
  let minute = date.getUTCMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getUTCDay()];

  if (hour < 10) hour = `0${hour}`;
  if (minute < 10) minute = `0${minute}`;

  return `${day} ${hour}:${minute}`;
}

function forecastShowElement(response) {
  let forecastList = response.data.list;

  let dailyForecast = forecastList.filter((forecast) =>
    forecast.dt_txt.includes("12:00:00")
  );

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = "";

  dailyForecast.forEach((forecast) => {
    let date = new Date(forecast.dt * 1000);
    let day = date.toLocaleDateString("en-AU", { weekday: "short" });
    let icon = forecast.weather[0].icon;
    icon = icon.replace("n", "d");
    let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    let description = forecast.weather[0].description;

    forecastElement.innerHTML += `
    <div class="forecast-details">
     <div class="day">${day}</div>
     <img src="${iconUrl}" class="forecast-icon" />
     <div class="description">${description}
    </div>`;
  });
}

function displayCity(city) {
  let currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let forecastWeatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(currentWeatherApiUrl).then(showElement);
  axios.get(forecastWeatherApiUrl).then(forecastShowElement);
}

function searchForCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");

  displayCity(searchInput.value);
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", searchForCity);

displayCity("Perth");
