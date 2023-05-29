import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Home, Certificados } from './containers'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/certificados' element={<Certificados/>}/>
      </Routes>
    </Router>
  )
}

export default App