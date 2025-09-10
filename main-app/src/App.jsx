import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import './App.css'
import './index.css';
import {Footer, Component2} from './components/Footer';
import Card from './students/components/Card';
import Hooks from "./students/apps/ciclo_de_vida/Hooks"

function App() {
  const [count, setCount] = useState(0)

  let user = {};

  return (
    <>
      <Header />
      <Hooks />
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
