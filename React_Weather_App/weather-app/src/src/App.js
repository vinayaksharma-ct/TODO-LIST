import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null); 
  const [error, setError] = useState("");
  const [display, setDisplay] = useState("");
  const [unit, setUnit] = useState("C");
  const [forecastData, setForecastData] = useState([]);
  const [favoriteCities, setFavoriteCities] = useState([]); 
  const api_key = "e83398a7584c49c798d185606250901";
  const currentUrl = "http://api.weatherapi.com/v1/current.json";
  const forecastUrl = "http://api.weatherapi.com/v1/forecast.json";

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favoriteCities")) || [];
    setFavoriteCities(savedFavorites);
  }, []);

  const fetch = async (e, cityName = city) => {
    if (e) e.preventDefault(); 
    setError(""); 
    setWeatherData(null); 
    setForecastData([]);
    setDisplay(cityName); 

    try {
      const response = await axios.get(currentUrl, {
        params: {
          key: api_key, 
          q: cityName, 
        },
      });
      setWeatherData({
        temperature: response.data.current.temp_c,
        condition: response.data.current.condition.text,
        icon: response.data.current.condition.icon,
        temperatureF: response.data.current.temp_f,
        humidity: response.data.current.humidity,
      });
      const forecastResponse = await axios.get(forecastUrl, {
        params: {
          key: api_key,
          q: cityName,
          days: 5,
        },
      });
      setForecastData(forecastResponse.data.forecast.forecastday);
    } catch (err) {
      setError("City not found.");
    }
  };

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  const saveFavoriteCity = () => {
    if (city && !favoriteCities.includes(city)) {
      const updatedFavorites = [...favoriteCities, city];
      setFavoriteCities(updatedFavorites);
      localStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites)); 
    }
  };

  const removeFavoriteCity = (cityToRemove) => {
    const updatedFavorites = favoriteCities.filter((fav) => fav !== cityToRemove);
    setFavoriteCities(updatedFavorites);
    localStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Weather App</h1>
      <form onSubmit={fetch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>
      {display && <p>Weather for: {display}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weatherData && (
        <div>
          <p>
            Temperature:{" "}
            {unit === "C"
              ? `${weatherData.temperature}°C`
              : `${weatherData.temperatureF}°F`}
          </p>
          <p>Condition: {weatherData.condition}</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <img src={weatherData.icon} alt={weatherData.condition} />
          <button onClick={toggleUnit}>
            Switch to {unit === "C" ? "Fahrenheit" : "Celsius"}
          </button>
          <button onClick={saveFavoriteCity}>Save as Favorite</button>
        </div>
      )}
      {forecastData.length > 0 && (
        <div>
          <h2>5-Day Weather Forecast</h2>
          {forecastData.map((day) => (
            <div key={day.date} style={{ marginBottom: "10px" }}>
              <p><strong>{day.date}</strong></p>
              <p>
                Max Temp:{" "}
                {unit === "C"
                  ? `${day.day.maxtemp_c}°C`
                  : `${day.day.maxtemp_f}°F`}
              </p>
              <p>
                Min Temp:{" "}
                {unit === "C"
                  ? `${day.day.mintemp_c}°C`
                  : `${day.day.mintemp_f}°F`}
              </p>
              <p>Condition: {day.day.condition.text}</p>
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
              />
            </div>
          ))}
        </div>
      )}
      {favoriteCities.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Your Favorite Cities</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {favoriteCities.map((fav) => (
              <li key={fav} style={{ marginBottom: "10px" }}>
                <span>{fav}</span>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => fetch(null, fav)}
                >
                  Show Weather
                </button>
                <button
                  style={{ marginLeft: "10px", color: "red" }}
                  onClick={() => removeFavoriteCity(fav)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
