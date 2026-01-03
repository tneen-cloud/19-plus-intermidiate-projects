import { useState } from 'react'
import './App.css'

function App() {
  const [posts, setPosts] = useState([
    { id: 1, author: 'John Doe', content: 'Just finished a great project!', likes: 42, comments: 5 },
    { id: 2, author: 'Jane Smith', content: 'Beautiful sunset today 🌅', likes: 128, comments: 12 }
  ])
  const [newPost, setNewPost] = useState('')

  const addPost = () => {
    if (newPost.trim()) {
      setPosts([{
        id: Date.now(),
        author: 'You',
        content: newPost,
        likes: 0,
        comments: 0
      }, ...posts])
      setNewPost('')
    }
  }

  const likePost = (id) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  return (
    <div className="dashboard">
      <h1>Social Media Dashboard</h1>
      <div className="stats">
        <div className="stat-card">
          <h3>Posts</h3>
          <p>{posts.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Likes</h3>
          <p>{posts.reduce((sum, p) => sum + p.likes, 0)}</p>
        </div>
        <div className="stat-card">
          <h3>Total Comments</h3>
          <p>{posts.reduce((sum, p) => sum + p.comments, 0)}</p>
        </div>
      </div>
      <div className="new-post">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button onClick={addPost}>Post</button>
      </div>
      <div className="posts-feed">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <strong>{post.author}</strong>
            </div>
            <div className="post-content">{post.content}</div>
            <div className="post-actions">
              <button onClick={() => likePost(post.id)}>❤️ {post.likes}</button>
              <button>💬 {post.comments}</button>
              <button>🔗 Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

