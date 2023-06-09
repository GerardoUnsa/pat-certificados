import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Layout } from './hocs'

import { 
  Home,
  Login,
  Signup,
  Post_Certificado,
  Post_CPT,
  Manage_Certificados,
  Manage_CPT,
  Post_Certificado_Iluminacion,
  Upload,
  Manage_CI
} from './containers'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/admin/post_certificado' element={<Post_Certificado/>}/>
          <Route path='/admin/post_cpt' element={<Post_CPT/>}/>
          <Route path='/admin/post_cilum' element={<Post_Certificado_Iluminacion/>}/>
          <Route path='/admin/manage/certificados' element={<Manage_Certificados/>}/>
          <Route path='/admin/manage/cpt' element={<Manage_CPT/>}/>
          <Route path='/admin/manage/ci' element={<Manage_CI/>}/>
          <Route path='/admin/upload/certificado' element={<Upload/>}/>       
        </Routes>
      </Layout>
    </Router>
  )
}

export default App