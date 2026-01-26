import './App.css'
import { useState } from 'react'
import {Counter} from './Components/Counter'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <Counter/>
      </div>
    
    </>
  )
}

export default App
