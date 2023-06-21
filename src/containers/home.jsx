import React, {useState, useEffect} from 'react'
import { db } from '../firebase'

const HomeCertificados = ({ certificados }) => {
  return (
    <div className="pt-3 row row-cols-1 row-cols-md-4 mb-3 text-center">
        {certificados.map((value, index) => (
          <div className="col" key={`${value.id}`}>
            <div className="card mb-4 rounded-3 shadow-sm">
              <div className="card-header p-0">
                {/* <a rel="noreferrer" href={`/certificado/${value.id}`}> */}
                <a rel="noreferrer" href={value.Url}>
                  <img src={`https://qrickit.com/api/qr.php?d=${value.Url}&addtext=Zortrax+M300+Dual&txtcolor=000000&fgdcolor=000000&bgdcolor=FFFFFF&qrsize=500&t=p&e=m`} className="card-img-top" alt={index} />
                </a>                    
              </div>
              <div className="card-body">
                <h5 className="card-title">{value.Name}</h5>                
                <p className="card-text"><small className="text-muted">Creado el {value.Created}</small></p>
                <a target={'_blank'} rel="noreferrer" href={`${value.Url}`} className="btn btn-danger m-1">MANUAL PDF</a>
              </div>
            </div>
          </div>
        ))}
      </div>
  )
}

export default function Home() {
  const [searchValue, setSearchValue] = useState("")
  const [certificados, setCertificados] = useState([])
  const [certificadosFiltrados, setCertificadosFiltrados] = useState([])
  const [error, setError] = useState(null)

  const filtrarCertificados = () => {
    if (searchValue === "") {
      setCertificadosFiltrados(certificados)
      return ;
    }
    const certFiltrados = certificados.filter((certificado) =>
      certificado.Name.toLowerCase().includes(searchValue.toLowerCase())
    )
    setCertificadosFiltrados(certFiltrados)
  }

  const handleSubmit = e => {
    e.preventDefault()
    filtrarCertificados()
  }

  useEffect(
    () => {
      const manualF = db.collection('certificados').onSnapshot(
        snapshot => {
          setCertificados(snapshot.docs.map(d => ({id: d.id, ...d.data()}) ))
          setCertificadosFiltrados(snapshot.docs.map(d => ({id: d.id, ...d.data()}) ))
        },
        err => {
          if (err !== null) {
            //console.log(err, 'home')
            setError(true)
          }
        }
      )
      return () => manualF()
    },
    [setCertificados]
  )

  return (
    <div className="container py-3">
      
      <div className="col">
        <form className='row' onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="searchBarInput form-control form-control-dark w-100 rounded-pill"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Buscar certificado"
            />
          </div>
        </form>
      </div>
      <HomeCertificados certificados={certificadosFiltrados} />
      
    </div>
  )
}