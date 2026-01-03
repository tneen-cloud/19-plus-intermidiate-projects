import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [stocks, setStocks] = useState([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175.50, change: 2.5 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.30, change: -1.2 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: 3.1 }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(stocks.map(stock => ({
        ...stock,
        price: stock.price + (Math.random() - 0.5) * 2,
        change: stock.change + (Math.random() - 0.5) * 0.5
      })))
    }, 2000)
    return () => clearInterval(interval)
  }, [stocks])

  return (
    <div className="stock-tracker">
      <h1>Stock Market Tracker</h1>
      <div className="stocks-list">
        {stocks.map(stock => (
          <div key={stock.symbol} className="stock-card">
            <div className="stock-header">
              <div>
                <h3>{stock.symbol}</h3>
                <p>{stock.name}</p>
              </div>
              <div className={`price-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                {stock.change >= 0 ? '↑' : '↓'} {Math.abs(stock.change).toFixed(2)}%
              </div>
            </div>
            <div className="stock-price">${stock.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

