function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0${hours}";
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0${minutes}";
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = day.getDate();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];

  let forecastHTML = ` <div class="row">`;
  days.forEach(function (forecastDay.index) {
    if (index<6){
    forecastHTML =
      forecastHTML +
      `
     <div class="col-2">
                <div class="weather-forecast-date">i{formatDay
                $(forecastDay.dt)}
                </div>
                ${index}
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" 
                alt=""
                width="36"/>
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">
                ${Math.round(forecastDay.temp.max)}"</span>
                <span class="weather-forecast-temperature-min">
                
                 ${Math.round(forecastDay.temp.min)}"
                 </span>
</div>
              </div>
            
          
    `;
      }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "4c13efb242fa19ea8b668c307bf38b0b";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=i{coordinates.lat}&lon=i{coordinates.lon}&appid=i{apiKey}&units=metric";
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}d@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
function searchCity(city) {
  let apiKey = "4c13efb242fa19ea8b668c307bf38b0b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function search(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

searchCity("Yaounde");
