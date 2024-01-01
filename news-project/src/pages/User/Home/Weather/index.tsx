import { useState, useEffect } from "react";
import "./index.css";
import SearchIcon from "@mui/icons-material/Search";
import "../index.module.scss";
import { Col, Row } from "antd";
const Weather = () => {
  const apiKey = "97ed86b99fdcf738c7a080e0fa9fde20";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

  const [city, setCity] = useState("Baku");
  const [weatherData, setWeatherData] = useState({
    name: "",
    main: { temp: 0, humidity: 0 },
    wind: { speed: 0 },
    weather: [{ main: "" }],
  });

  const searchWeather = async () => {
    try {
      const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    searchWeather();
  }, []);

  return (
    <>
      <Row>
        <div className="weather-card">
          <div className="search">
            <input
              type="search"
              placeholder="enter city name"
              spellCheck="false"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={searchWeather}>
              <SearchIcon />
            </button>
          </div>
          <div className="weather">
            <h2
              style={{
                margin: "20px 0px",
              }}
            >
              Weather
            </h2>
            <h1 className="temp">{Math.round(weatherData.main.temp)}°C</h1>
            <h2 className="city">{weatherData.name}</h2>
            <div className="details">
              <div style={{ display: "flex" }} className="col">
                <img
                  className="humi"
                  src="https://static-00.iconduck.com/assets.00/humidity-icon-2048x1675-xxsge5os.png"
                  alt="Humidity Icon"
                />
                <div className="info">
                  <p className="humidity">{weatherData.main.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/136/136712.png"
                  alt="Wind Speed Icon"
                />
                <div className="info">
                  <p className="wind">{weatherData.wind.speed} km/h</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </>
  );
};

export default Weather;
