function getWeather() {
  const city = document.getElementById("cityInput").value;
  const conditionEl = document.getElementById("condition");

  if (!city) return;

  const apiKey = "16a3bdae4ae60bb319d967fabc0becde";

  conditionEl.innerText = "Syncing weather signals... 🌍";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then(res => res.json())
    .then(data => {

      if (data.cod !== 200) {
        throw new Error(data.message || "City not found");
      }

      const realData = {
        city: data.name,
        temp: Math.round(data.main.temp),
        condition: data.weather[0].main.toLowerCase(),
        feelsLike: data.main.feels_like
      };

      updateUI(realData);
    })
    .catch(err => {
      showError(err.message);
    });
}


/* 🧠 UI update */
function updateUI(data) {
  document.getElementById("city").innerText = data.city;
  document.getElementById("temp").innerText = data.temp + "°C";

  const moodText = getMoodText(data.condition, data.temp);

  document.getElementById("condition").innerText =
    `${data.condition} • feels like ${Math.round(data.feelsLike)}°C 🌡️\n${moodText}`;

  setTheme(data.condition);
}


/* 🎨 PREMIUM THEME ENGINE - Dynamic Background Switching */
function setTheme(condition) {
  const body = document.body;
  
  // Remove all existing theme classes
  body.classList.remove('sunny-theme', 'rainy-theme', 'cloudy-theme', 'cold-theme');
  
  // Normalize condition string
  const normalizedCondition = condition.toLowerCase();
  
  // Determine theme based on weather condition
  if (
    normalizedCondition.includes('rain') || 
    normalizedCondition.includes('drizzle') ||
    normalizedCondition.includes('thunderstorm')
  ) {
    body.classList.add('rainy-theme');
  } 
  else if (
    normalizedCondition.includes('cloud') || 
    normalizedCondition.includes('overcast')
  ) {
    body.classList.add('cloudy-theme');
  } 
  else if (
    normalizedCondition.includes('clear') || 
    normalizedCondition.includes('sunny') ||
    normalizedCondition.includes('bright')
  ) {
    body.classList.add('sunny-theme');
  } 
  else if (
    normalizedCondition.includes('fog') || 
    normalizedCondition.includes('mist') ||
    normalizedCondition.includes('haze') ||
    normalizedCondition.includes('smoke')
  ) {
    body.classList.add('cold-theme');
  } 
  else {
    // Default fallback
    body.classList.add('cold-theme');
  }
}


/* 🌦️ emotional weather layer */
function getMoodText(condition, temp) {
  if (condition.includes("rain")) {
    return "Feels like a quiet rainy moment — perfect for slowing down 🌧️";
  }

  if (condition.includes("clear") && temp > 25) {
    return "Feels like warm sunlight on your skin ☀️";
  }

  if (condition.includes("clear")) {
    return "Feels like a calm, open sky kind of day 🌤️";
  }

  if (condition.includes("cloud")) {
    return "Feels like a soft, thoughtful afternoon ☁️";
  }

  if (condition.includes("fog") || condition.includes("mist")) {
    return "Feels like a mysterious, misty morning 🌫️";
  }

  return "Feels like a shifting sky with unknown stories 🌫️";
}


/* ❌ error handling */
function showError(message) {
  document.getElementById("city").innerText = "⚠️ Oops";
  document.getElementById("temp").innerText = "--°C";
  document.getElementById("condition").innerText = message;

  // Set to cold-theme as default error state
  document.body.classList.remove('sunny-theme', 'rainy-theme', 'cloudy-theme', 'cold-theme');
  document.body.classList.add('cold-theme');
}

/* 🚀 enter to search */
document
  .getElementById("cityInput")
  .addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
      getWeather();
    }

});

/* 🌍 Initialize default theme on page load */
document.addEventListener("DOMContentLoaded", function() {
  document.body.classList.add("cold-theme");
});