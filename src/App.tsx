import { useState } from 'react'

import './App.scss'

function App() {

  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Supaship.io</h1>
      <div className="container py-4 px-3 mx-auto card">
        <button className="btn btn-primary" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  )

}

export default App
