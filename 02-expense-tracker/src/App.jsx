import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('expenses')) || [])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('food')

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (description && amount) {
      const newExpense = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        category,
        date: new Date().toLocaleDateString()
      }
      setExpenses([...expenses, newExpense])
      setDescription('')
      setAmount('')
    }
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <div className="summary">
        <div className="total">
          <h2>Total Expenses</h2>
          <p className="amount">${totalExpenses.toFixed(2)}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.01"
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="entertainment">Entertainment</option>
          <option value="bills">Bills</option>
          <option value="other">Other</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>
      <div className="expenses-list">
        <h2>Recent Expenses</h2>
        {expenses.length === 0 ? (
          <p className="empty">No expenses yet</p>
        ) : (
          expenses.map(expense => (
            <div key={expense.id} className="expense-item">
              <div className="expense-info">
                <h3>{expense.description}</h3>
                <p className="expense-meta">{expense.category} • {expense.date}</p>
              </div>
              <div className="expense-amount">
                ${expense.amount.toFixed(2)}
                <button onClick={() => deleteExpense(expense.id)} className="delete-btn">×</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App

