import { useState } from 'react'
import './App.css'

function App() {
  const [trips, setTrips] = useState([])
  const [formData, setFormData] = useState({ destination: '', date: '', notes: '' })

  const addTrip = () => {
    if (formData.destination && formData.date) {
      setTrips([...trips, { id: Date.now(), ...formData }])
      setFormData({ destination: '', date: '', notes: '' })
    }
  }

  const deleteTrip = (id) => {
    setTrips(trips.filter(trip => trip.id !== id))
  }

  return (
    <div className="travel-planner">
      <h1>Travel Planner</h1>
      <div className="add-trip">
        <h2>Plan a Trip</h2>
        <input
          type="text"
          placeholder="Destination"
          value={formData.destination}
          onChange={(e) => setFormData({...formData, destination: e.target.value})}
        />
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
        />
        <textarea
          placeholder="Notes"
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
        />
        <button onClick={addTrip}>Add Trip</button>
      </div>
      <div className="trips-list">
        <h2>Upcoming Trips ({trips.length})</h2>
        {trips.length === 0 ? (
          <p className="empty">No trips planned yet</p>
        ) : (
          trips.map(trip => (
            <div key={trip.id} className="trip-card">
              <div className="trip-icon">✈️</div>
              <div className="trip-info">
                <h3>{trip.destination}</h3>
                <p className="trip-date">{trip.date}</p>
                {trip.notes && <p className="trip-notes">{trip.notes}</p>}
              </div>
              <button onClick={() => deleteTrip(trip.id)} className="delete-btn">Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App

