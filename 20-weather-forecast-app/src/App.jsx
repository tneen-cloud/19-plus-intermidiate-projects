import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('London')
  const [forecast] = useState([
    { day: 'Today', temp: 22, condition: 'Sunny', icon: '☀️' },
    { day: 'Tomorrow', temp: 18, condition: 'Cloudy', icon: '☁️' },
    { day: 'Wed', temp: 20, condition: 'Rainy', icon: '🌧️' },
    { day: 'Thu', temp: 24, condition: 'Sunny', icon: '☀️' },
    { day: 'Fri', temp: 19, condition: 'Cloudy', icon: '☁️' }
  ])

  return (
    <div className="forecast-app">
      <h1>Weather Forecast App</h1>
      <div className="city-selector">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
      </div>
      <div className="current-weather">
        <h2>{city}</h2>
        <div className="current-temp">{forecast[0].temp}°C</div>
        <div className="current-condition">{forecast[0].condition}</div>
        <div className="current-icon">{forecast[0].icon}</div>
      </div>
      <div className="forecast-list">
        <h3>5-Day Forecast</h3>
        <div className="forecast-items">
          {forecast.map((day, index) => (
            <div key={index} className="forecast-item">
              <div className="forecast-day">{day.day}</div>
              <div className="forecast-icon">{day.icon}</div>
              <div className="forecast-temp">{day.temp}°C</div>
              <div className="forecast-condition">{day.condition}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App

