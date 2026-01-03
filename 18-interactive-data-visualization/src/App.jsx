import { useState } from 'react'
import './App.css'

function App() {
  const [data] = useState([
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 80 },
    { label: 'Mar', value: 45 },
    { label: 'Apr', value: 90 },
    { label: 'May', value: 70 },
    { label: 'Jun', value: 100 }
  ])

  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className="data-viz">
      <h1>Interactive Data Visualization</h1>
      <div className="chart-container">
        <div className="chart">
          {data.map((item, index) => (
            <div key={index} className="bar-container">
              <div
                className="bar"
                style={{ height: `${(item.value / maxValue) * 100}%` }}
                title={`${item.label}: ${item.value}`}
              >
                <span className="bar-value">{item.value}</span>
              </div>
              <div className="bar-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="stats">
        <div className="stat">
          <h3>Total</h3>
          <p>{data.reduce((sum, d) => sum + d.value, 0)}</p>
        </div>
        <div className="stat">
          <h3>Average</h3>
          <p>{(data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(1)}</p>
        </div>
        <div className="stat">
          <h3>Max</h3>
          <p>{maxValue}</p>
        </div>
        <div className="stat">
          <h3>Min</h3>
          <p>{Math.min(...data.map(d => d.value))}</p>
        </div>
      </div>
    </div>
  )
}

export default App

