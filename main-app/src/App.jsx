import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import './App.css'
import {Footer, Component2} from './components/Footer';
import Card from './students/components/Card';

function App() {
  const [count, setCount] = useState(0)

  let user = {};

  return (
    <>
      <Header />
      <Card />
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <Component2 />
      <Footer />
      
    </>
  )
}

export default App
