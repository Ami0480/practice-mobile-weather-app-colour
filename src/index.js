function showElement(response) {
  let searchCity = document.querySelector("#city");
  searchCity.innerHTML = response.data.name;
}

function displayCity(city) {
  let apiKey = "d1193959d2d841ec7555416d715716a6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showElement);
}

function searchForCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");

  displayCity(searchInput.value);
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", searchForCity);
