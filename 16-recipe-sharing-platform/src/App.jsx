import { useState } from 'react'
import './App.css'

function App() {
  const [recipes, setRecipes] = useState([
    { id: 1, name: 'Pasta Carbonara', ingredients: ['Pasta', 'Eggs', 'Bacon'], time: '30 min' },
    { id: 2, name: 'Chicken Curry', ingredients: ['Chicken', 'Curry', 'Coconut'], time: '45 min' }
  ])
  const [formData, setFormData] = useState({ name: '', ingredients: '', time: '' })

  const addRecipe = () => {
    if (formData.name && formData.ingredients) {
      setRecipes([...recipes, {
        id: Date.now(),
        name: formData.name,
        ingredients: formData.ingredients.split(',').map(i => i.trim()),
        time: formData.time
      }])
      setFormData({ name: '', ingredients: '', time: '' })
    }
  }

  return (
    <div className="recipe-platform">
      <h1>Recipe Sharing Platform</h1>
      <div className="add-recipe">
        <h2>Share a Recipe</h2>
        <input
          type="text"
          placeholder="Recipe Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input
          type="text"
          placeholder="Ingredients (comma separated)"
          value={formData.ingredients}
          onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
        />
        <input
          type="text"
          placeholder="Cooking Time"
          value={formData.time}
          onChange={(e) => setFormData({...formData, time: e.target.value})}
        />
        <button onClick={addRecipe}>Share Recipe</button>
      </div>
      <div className="recipes-grid">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.name}</h3>
            <div className="recipe-time">⏱️ {recipe.time}</div>
            <div className="ingredients">
              <strong>Ingredients:</strong>
              <ul>
                {recipe.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

