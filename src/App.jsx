import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './assets/css/style.css'


import Index from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Index />
    </>
  )
}

export default App
