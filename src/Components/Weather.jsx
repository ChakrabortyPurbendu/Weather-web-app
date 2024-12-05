import './Weather.css';
import searchicon from '../assets/search.png';
import clear from '../assets/clear.png';
import cloud from '../assets/cloud.png';
import drizzle from '../assets/drizzle.png';
import humidity from '../assets/humidity.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import wind from '../assets/wind.png';
import { useEffect, useState } from 'react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    location: '',
    humidity: null,
    windSpeed: null,
    icon: clear, // Default icon
  });

  const [city, setCity] = useState('');

  const allicons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      console.log(data);

      const icon = allicons[data.weather[0].icon] || clear;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    search('London');
  }, []);

  const handleSearch = () => {
    if (city) search(city);
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img src={searchicon} alt="Search" onClick={handleSearch} />
      </div>

      <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
      <p className="temperature">
        {weatherData.temperature !== null ? `${weatherData.temperature}°C` : '--'}
      </p>
      <p className="location">{weatherData.location || 'Loading...'}</p>

      <div className="weather-data">
        <div className="col">
          <img src={humidity} alt="Humidity Icon" />
          <div>
            <p>{weatherData.humidity !== null ? `${weatherData.humidity}%` : '--'}</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind} alt="Wind Icon" />
          <div>
            <p>{weatherData.windSpeed !== null ? `${weatherData.windSpeed} m/s` : '--'}</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
