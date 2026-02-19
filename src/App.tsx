import { Routes, Route } from 'react-router-dom'

import Login from './screens/Login'
import Home from './screens/Home'


function App() {
  return (
    <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
    </Routes>
  )
}
export default App