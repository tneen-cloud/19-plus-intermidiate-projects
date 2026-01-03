import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [sessionType, setSessionType] = useState('work')
  const [sessions, setSessions] = useState(0)

  useEffect(() => {
    let interval = null
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1)
      }, 1000)
    } else if (time === 0) {
      setIsRunning(false)
      if (sessionType === 'work') {
        setSessions(sessions + 1)
        setSessionType('break')
        setTime(5 * 60) // 5 minute break
      } else {
        setSessionType('work')
        setTime(25 * 60) // 25 minute work
      }
    }
    return () => clearInterval(interval)
  }, [isRunning, time, sessionType, sessions])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const reset = () => {
    setIsRunning(false)
    setTime(25 * 60)
    setSessionType('work')
  }

  return (
    <div className="pomodoro">
      <h1>Pomodoro Timer</h1>
      <div className="timer-display">
        <div className={`time ${sessionType}`}>{formatTime(time)}</div>
        <div className="session-type">{sessionType === 'work' ? 'Work Session' : 'Break Time'}</div>
      </div>
      <div className="controls">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={reset}>Reset</button>
      </div>
      <div className="stats">
        <div className="stat">
          <h3>Completed Sessions</h3>
          <p>{sessions}</p>
        </div>
      </div>
    </div>
  )
}

export default App

