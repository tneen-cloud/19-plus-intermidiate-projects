import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('London')
  const [weather, setWeather] = useState({
    temp: 22,
    condition: 'Sunny',
    humidity: 65,
    wind: 15,
    icon: '☀️'
  })

  const cities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney']

  const handleCityChange = (selectedCity) => {
    setCity(selectedCity)
    // Simulate weather data
    const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Snowy']
    const icons = ['☀️', '☁️', '🌧️', '❄️']
    const random = Math.floor(Math.random() * conditions.length)
    setWeather({
      temp: Math.floor(Math.random() * 30) + 10,
      condition: conditions[random],
      humidity: Math.floor(Math.random() * 40) + 50,
      wind: Math.floor(Math.random() * 20) + 5,
      icon: icons[random]
    })
  }

  return (
    <div className="dashboard">
      <h1>Weather Dashboard</h1>
      <div className="city-selector">
        {cities.map(c => (
          <button
            key={c}
            className={city === c ? 'active' : ''}
            onClick={() => handleCityChange(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="weather-card">
        <div className="weather-header">
          <h2>{city}</h2>
          <div className="weather-icon">{weather.icon}</div>
        </div>
        <div className="temperature">{weather.temp}°C</div>
        <div className="condition">{weather.condition}</div>
        <div className="weather-details">
          <div className="detail">
            <span className="label">Humidity</span>
            <span className="value">{weather.humidity}%</span>
          </div>
          <div className="detail">
            <span className="label">Wind Speed</span>
            <span className="value">{weather.wind} km/h</span>
          </div>
        </div>
      </div>
      <div className="forecast">
        <h3>5-Day Forecast</h3>
        <div className="forecast-items">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
            <div key={day} className="forecast-item">
              <div className="forecast-day">{day}</div>
              <div className="forecast-icon">☀️</div>
              <div className="forecast-temp">{20 + i}°C</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App

