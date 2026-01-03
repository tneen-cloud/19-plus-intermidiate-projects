import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)

  const getLocation = () => {
    setLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ lat: latitude, lng: longitude })
          // Simulate weather fetch
          setTimeout(() => {
            setWeather({
              temp: Math.floor(Math.random() * 30) + 10,
              condition: 'Sunny',
              humidity: 65,
              icon: '☀️'
            })
            setLoading(false)
          }, 1000)
        },
        () => {
          alert('Unable to retrieve location')
          setLoading(false)
        }
      )
    } else {
      alert('Geolocation not supported')
      setLoading(false)
    }
  }

  return (
    <div className="weather-geo">
      <h1>Weather App with Geolocation</h1>
      <div className="content">
        {!location ? (
          <div className="get-location">
            <p>Click the button to get your location and weather</p>
            <button onClick={getLocation} disabled={loading}>
              {loading ? 'Loading...' : 'Get My Location'}
            </button>
          </div>
        ) : (
          <div className="weather-info">
            <div className="location-info">
              <h2>📍 Your Location</h2>
              <p>Latitude: {location.lat.toFixed(4)}</p>
              <p>Longitude: {location.lng.toFixed(4)}</p>
            </div>
            {weather && (
              <div className="weather-card">
                <div className="weather-icon">{weather.icon}</div>
                <div className="temperature">{weather.temp}°C</div>
                <div className="condition">{weather.condition}</div>
                <div className="humidity">Humidity: {weather.humidity}%</div>
              </div>
            )}
            <button onClick={getLocation} className="refresh-btn">Refresh</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

