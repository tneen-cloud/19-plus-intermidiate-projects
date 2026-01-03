import { useState } from 'react'
import './App.css'

function App() {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Project 1', description: 'Description here', image: '📱' },
    { id: 2, title: 'Project 2', description: 'Description here', image: '💻' }
  ])
  const [formData, setFormData] = useState({ title: '', description: '', image: '📱' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title && formData.description) {
      setProjects([...projects, { id: Date.now(), ...formData }])
      setFormData({ title: '', description: '', image: '📱' })
    }
  }

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id))
  }

  return (
    <div className="cms">
      <h1>Portfolio CMS</h1>
      <div className="content">
        <div className="form-section">
          <h2>Add New Project</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Project Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
            <select
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
            >
              <option value="📱">📱</option>
              <option value="💻">💻</option>
              <option value="🌐">🌐</option>
              <option value="🎨">🎨</option>
            </select>
            <button type="submit">Add Project</button>
          </form>
        </div>
        <div className="projects-section">
          <h2>Projects ({projects.length})</h2>
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-icon">{project.image}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <button onClick={() => deleteProject(project.id)} className="delete-btn">Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

