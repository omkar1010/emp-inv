import { useState } from 'react'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Login></Login>

    </>
  ) 
}

export default App
