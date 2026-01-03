import { useState } from 'react'
import './App.css'

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const locations = [
    { id: 1, name: 'New York', lat: 40.7128, lng: -74.0060, population: '8.3M', country: 'USA' },
    { id: 2, name: 'London', lat: 51.5074, lng: -0.1278, population: '9.0M', country: 'UK' },
    { id: 3, name: 'Tokyo', lat: 35.6762, lng: 139.6503, population: '13.9M', country: 'Japan' },
    { id: 4, name: 'Paris', lat: 48.8566, lng: 2.3522, population: '2.1M', country: 'France' }
  ]

  return (
    <div className="maps-app">
      <h1>Interactive Maps with Data</h1>
      <div className="content">
        <div className="map-container">
          <div className="map">
            {locations.map(loc => (
              <div
                key={loc.id}
                className="marker"
                style={{ left: `${(loc.lng + 180) / 360 * 100}%`, top: `${(90 - loc.lat) / 180 * 100}%` }}
                onClick={() => setSelectedLocation(loc)}
              >
                📍
              </div>
            ))}
          </div>
        </div>
        <div className="locations-list">
          <h2>Locations</h2>
          {locations.map(loc => (
            <div
              key={loc.id}
              className={`location-item ${selectedLocation?.id === loc.id ? 'active' : ''}`}
              onClick={() => setSelectedLocation(loc)}
            >
              <h3>{loc.name}</h3>
              <p>{loc.country}</p>
            </div>
          ))}
        </div>
        {selectedLocation && (
          <div className="location-details">
            <h2>{selectedLocation.name}</h2>
            <div className="detail">
              <span>Country:</span>
              <span>{selectedLocation.country}</span>
            </div>
            <div className="detail">
              <span>Population:</span>
              <span>{selectedLocation.population}</span>
            </div>
            <div className="detail">
              <span>Coordinates:</span>
              <span>{selectedLocation.lat}, {selectedLocation.lng}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

