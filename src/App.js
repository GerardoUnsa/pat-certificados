import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Layout } from './hocs'

import { Home, Certificados,CertificadPuestaTierra } from './containers'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/admin/certificados' element={<Certificados/>}/>
          <Route path='/admin/certificadoPuestaTierra' element={<CertificadPuestaTierra/>}/>
        </Routes>
      </Layout>
    </Router>
  )
}

export default App