import { useState } from 'react'
import './App.css'

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'First Post', content: 'This is my first blog post', date: new Date().toLocaleDateString() }
  ])
  const [formData, setFormData] = useState({ title: '', content: '' })
  const [editingId, setEditingId] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title && formData.content) {
      if (editingId) {
        setPosts(posts.map(p => p.id === editingId ? {...p, ...formData} : p))
        setEditingId(null)
      } else {
        setPosts([...posts, { id: Date.now(), ...formData, date: new Date().toLocaleDateString() }])
      }
      setFormData({ title: '', content: '' })
    }
  }

  const editPost = (post) => {
    setFormData({ title: post.title, content: post.content })
    setEditingId(post.id)
  }

  const deletePost = (id) => {
    setPosts(posts.filter(p => p.id !== id))
  }

  return (
    <div className="blog-cms">
      <h1>Blog CMS</h1>
      <div className="content">
        <div className="form-section">
          <h2>{editingId ? 'Edit Post' : 'New Post'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Post Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            <textarea
              placeholder="Post Content"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows="10"
              required
            />
            <button type="submit">{editingId ? 'Update' : 'Publish'}</button>
            {editingId && (
              <button type="button" onClick={() => {setEditingId(null); setFormData({title: '', content: ''})}}>
                Cancel
              </button>
            )}
          </form>
        </div>
        <div className="posts-section">
          <h2>Posts ({posts.length})</h2>
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p className="date">{post.date}</p>
              <p className="content">{post.content}</p>
              <div className="actions">
                <button onClick={() => editPost(post)}>Edit</button>
                <button onClick={() => deletePost(post.id)} className="delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App

