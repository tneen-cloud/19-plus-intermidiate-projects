import { useState } from 'react'
import './App.css'

function App() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState({})
  const [selectedDate, setSelectedDate] = useState(null)
  const [eventText, setEventText] = useState('')

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const addEvent = () => {
    if (selectedDate && eventText.trim()) {
      const dateKey = selectedDate.toDateString()
      setEvents({
        ...events,
        [dateKey]: [...(events[dateKey] || []), eventText]
      })
      setEventText('')
    }
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  return (
    <div className="calendar-app">
      <h1>Calendar App</h1>
      <div className="calendar-header">
        <button onClick={prevMonth}>←</button>
        <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button onClick={nextMonth}>→</button>
      </div>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="day-header">{day}</div>
        ))}
        {Array(firstDayOfMonth).fill(null).map((_, i) => (
          <div key={`empty-${i}`} className="day empty"></div>
        ))}
        {Array(daysInMonth).fill(null).map((_, i) => {
          const day = i + 1
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
          const dateKey = date.toDateString()
          const dayEvents = events[dateKey] || []
          return (
            <div
              key={day}
              className={`day ${selectedDate?.toDateString() === dateKey ? 'selected' : ''}`}
              onClick={() => setSelectedDate(date)}
            >
              {day}
              {dayEvents.length > 0 && <div className="event-dot"></div>}
            </div>
          )
        })}
      </div>
      {selectedDate && (
        <div className="event-section">
          <h3>Events for {selectedDate.toLocaleDateString()}</h3>
          <div className="add-event">
            <input
              type="text"
              value={eventText}
              onChange={(e) => setEventText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addEvent()}
              placeholder="Add event..."
            />
            <button onClick={addEvent}>Add</button>
          </div>
          <div className="events-list">
            {(events[selectedDate.toDateString()] || []).map((event, i) => (
              <div key={i} className="event-item">{event}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App

