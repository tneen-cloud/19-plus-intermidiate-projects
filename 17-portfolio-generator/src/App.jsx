import { useState } from 'react'
import './App.css'

function App() {
  const [portfolio, setPortfolio] = useState({
    name: 'John Doe',
    title: 'Web Developer',
    bio: 'Passionate developer creating amazing web experiences',
    skills: ['React', 'JavaScript', 'CSS'],
    projects: []
  })
  const [newProject, setNewProject] = useState({ name: '', description: '' })

  const addProject = () => {
    if (newProject.name && newProject.description) {
      setPortfolio({
        ...portfolio,
        projects: [...portfolio.projects, { id: Date.now(), ...newProject }]
      })
      setNewProject({ name: '', description: '' })
    }
  }

  return (
    <div className="portfolio-gen">
      <h1>Portfolio Generator</h1>
      <div className="content">
        <div className="form-section">
          <h2>Edit Portfolio</h2>
          <input
            type="text"
            placeholder="Your Name"
            value={portfolio.name}
            onChange={(e) => setPortfolio({...portfolio, name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Your Title"
            value={portfolio.title}
            onChange={(e) => setPortfolio({...portfolio, title: e.target.value})}
          />
          <textarea
            placeholder="Bio"
            value={portfolio.bio}
            onChange={(e) => setPortfolio({...portfolio, bio: e.target.value})}
          />
          <div className="add-project">
            <h3>Add Project</h3>
            <input
              type="text"
              placeholder="Project Name"
              value={newProject.name}
              onChange={(e) => setNewProject({...newProject, name: e.target.value})}
            />
            <textarea
              placeholder="Description"
              value={newProject.description}
              onChange={(e) => setNewProject({...newProject, description: e.target.value})}
            />
            <button onClick={addProject}>Add Project</button>
          </div>
        </div>
        <div className="preview-section">
          <h2>Preview</h2>
          <div className="portfolio-preview">
            <h1>{portfolio.name}</h1>
            <h2>{portfolio.title}</h2>
            <p>{portfolio.bio}</p>
            <div className="skills">
              <h3>Skills</h3>
              {portfolio.skills.map((skill, i) => (
                <span key={i} className="skill-tag">{skill}</span>
              ))}
            </div>
            <div className="projects">
              <h3>Projects</h3>
              {portfolio.projects.map(project => (
                <div key={project.id} className="project-item">
                  <h4>{project.name}</h4>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

