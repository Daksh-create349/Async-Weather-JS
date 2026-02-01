const btn = document.getElementById("btn");
const result = document.getElementById("result");
const citySelect = document.getElementById("city");


const cities = {
  delhi: { name: "Delhi", lat: 28.6139, lon: 77.2090 },
  mumbai: { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
  london: { name: "London", lat: 51.5074, lon: -0.1278 },
  newyork: { name: "New York", lat: 40.7128, lon: -74.0060 },
  tokyo: { name: "Tokyo", lat: 35.6895, lon: 139.6917 }
};

btn.addEventListener("click", async () => {
  const cityKey = citySelect.value;

  if (!cityKey) {
    result.textContent = "Please select a city";
    return;
  }

  const city = cities[cityKey];

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`
    );

    const data = await response.json();
    const temp = data.current_weather.temperature;
    const wind = data.current_weather.windspeed;

    result.textContent =
      `Weather in ${city.name}:
Temperature: ${temp}°C
Wind Speed: ${wind} km/h`;

  } catch (error) {
    result.textContent = "Error fetching weather data";
  }
});