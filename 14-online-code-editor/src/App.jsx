import { useState } from 'react'
import './App.css'

function App() {
  const [code, setCode] = useState('function hello() {\n  console.log("Hello, World!");\n}')
  const [output, setOutput] = useState('')
  const [language, setLanguage] = useState('javascript')

  const runCode = () => {
    try {
      if (language === 'javascript') {
        const result = eval(code)
        setOutput(result !== undefined ? String(result) : 'Code executed successfully')
      } else {
        setOutput('Code execution for ' + language + ' is simulated')
      }
    } catch (error) {
      setOutput('Error: ' + error.message)
    }
  }

  const clearCode = () => {
    setCode('')
    setOutput('')
  }

  return (
    <div className="code-editor">
      <h1>Online Code Editor</h1>
      <div className="editor-header">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
        <div className="editor-actions">
          <button onClick={runCode}>Run</button>
          <button onClick={clearCode}>Clear</button>
        </div>
      </div>
      <div className="editor-container">
        <textarea
          className="code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here..."
        />
        <div className="output-container">
          <h3>Output</h3>
          <div className="output">{output || 'Output will appear here...'}</div>
        </div>
      </div>
    </div>
  )
}

export default App

