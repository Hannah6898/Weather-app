

function currentDate (date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let day = days[date.getDay()];
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let month = months[date.getMonth()];
  let todayDate = date.getDate();
let getDate = document.querySelector("#date");
return (getDate.innerHTML = (`${day} ${todayDate} ${month}`));
}


function currentHour (date) {
let hour = date.getHours();
let mintues = date.getMinutes();
let nowHour = document.querySelector("#hour");
if (hour <12) {
return(nowHour.innerHTML = (`0${hour}:${mintues}`));
} else {
return(nowHour.innerHTML = (`${hour}:${mintues}`));
}
}

let formatDate = document.querySelector("#date");
formatDate.innerHTML = currentDate(new Date());

let formatHour = document.querySelector("#hour");
formatHour.innerHTML = currentHour(new Date());



function searchCity(city) {
let apiKey = "9949a4027ac8b116bb6aff55d501ba46";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showWeather);
}

function submitCity (event) {
event.preventDefault();
let city = document.querySelector("#city-text").value;
searchCity(city);
}

let searchNewCity = document.querySelector("#search-form");
searchNewCity.addEventListener("submit", submitCity);



function showWeather (response) {
console.log(response);
document.querySelector("#city").innerHTML = response.data.name; 
document.querySelector("#now-temperature").innerHTML = (`${Math.round(response.data.main.temp)}°`);
document.querySelector("#min-temp").innerHTML = (`${Math.round(response.data.main.temp_min)}°`);
document.querySelector("#max-temp").innerHTML = (`${Math.round(response.data.main.temp_max)}°`);
document.querySelector("#feels-like").innerHTML = (`${Math.round(response.data.main.feels_like)}°`);
document.querySelector("#humidity").innerHTML = (`${Math.round(response.data.main.humidity)}%`);
document.querySelector("#wind-speed").innerHTML = (`${Math.round(response.data.wind.speed)} m/s`);
document.querySelector("#description").innerHTML =response.data.weather[0].description;
document.querySelector("#weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
document.querySelector("#weather-icon").setAttribute("alt", response.data.weather[0].description);
}


function showCurrentPosition (event) {
  event.preventDefault();
 navigator.geolocation.getCurrentPosition(searchLocation); 
}

function searchLocation (position) {
let lat = position.coords.latitude;
let long = position.coords.longitude;
let apiKey = "9949a4027ac8b116bb6aff55d501ba46";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showWeather);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click",showCurrentPosition);

searchCity("London");