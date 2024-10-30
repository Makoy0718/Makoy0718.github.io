const apiKey = "0f54f17f486b800eec1432086f01651e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const suggestionsContainer = document.querySelector(".suggestions");

const weatherIcon = document.querySelector(".weather-icon");
const weatherIcons = {
    Clear: "../images/clear.png",
    Clouds: "../images/clouds.png",
    Drizzle: "../images/drizzle.png",
    Mist: "../images/mist.png",
    Rain: "../images/rain.png",
    Snow: "../images/snow.png"
};

// Array de ciudades de ejemplo
let cities = ["Mérida", "Ciudad de México", "Guadalajara", "Monterrey", "Tijuana", "Cancún", "Puebla", "León", "Querétaro"];

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weatherCondition = data.weather[0].main;
        weatherIcon.src = weatherIcons[weatherCondition] || "../images/mist.png";

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Mostrar sugerencias de ciudad
function showSuggestions(value) {
    suggestionsContainer.innerHTML = ""; // Limpiar sugerencias anteriores
    if (value) {
        const filteredCities = cities.filter(city => city.toLowerCase().startsWith(value.toLowerCase())); // Filtrar ciudades
        filteredCities.forEach(city => {
            const suggestion = document.createElement("div");
            suggestion.textContent = city;
            suggestion.classList.add("suggestion");
            suggestion.addEventListener("click", () => {
                searchBox.value = city; // Establecer el valor del input con la ciudad seleccionada
                suggestionsContainer.innerHTML = ""; // Limpiar las sugerencias
                checkWeather(city); // Llamar a la función para buscar el clima
            });
            suggestionsContainer.appendChild(suggestion); // Añadir la sugerencia al contenedor
        });
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

// Evento para mostrar sugerencias al escribir
searchBox.addEventListener("input", () => {
    showSuggestions(searchBox.value);
});
