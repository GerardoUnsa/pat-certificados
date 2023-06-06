import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Layout } from './hocs'

import { Home, Certificados, CertificadPuestaTierra, CrudCertificado, CrudCertificadPuestaTierra } from './containers'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/admin/certificados' element={<Certificados/>}/>
          <Route path='/admin/certificadoPuestaTierra' element={<CertificadPuestaTierra/>}/>
          <Route path='/admin/crud/certificados' element={<CrudCertificado/>}/>
          <Route path='/admin/crud/certificadoPuestaTierra' element={<CrudCertificadPuestaTierra/>}/>          
        </Routes>
      </Layout>
    </Router>
  )
}

export default App