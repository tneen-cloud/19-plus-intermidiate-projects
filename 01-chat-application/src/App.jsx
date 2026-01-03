import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to the chat!', sender: 'system', time: new Date() }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        time: new Date()
      }
      setMessages([...messages, newMessage])
      setInputMessage('')
      
      // Simulate bot response
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          text: `You said: "${inputMessage}"`,
          sender: 'bot',
          time: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      }, 1000)
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Chat Application</h1>
        <div className="status">Online</div>
      </div>
      <div className="messages-container">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-time">
                {message.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="input-container" onSubmit={handleSend}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  )
}

export default App

