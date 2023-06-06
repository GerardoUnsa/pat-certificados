import React, { useState, useEffect } from "react"
import { CrudCertificadosTable } from "./tables"
import { db } from '../firebase'

export default function CrudCertificados() {
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
              console.log(err, 'home')
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
            <div className="row row-cols-1 text-center">

                <div className="col-md-4">          
                    <div className="d-grid">
                        <a className="btn btn-warning" href="/admin/certificados">Crear Certificado</a>
                    </div>
                </div>                

                {
                error ?
                    <div>
                        Error (Server caido o backend buggeado)
                    </div>
                :
                    <div className="col-md-8">
                        <form className="searchBar" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input
                                type="text"
                                className="searchBarInput form-control form-control-dark w-100 rounded-0 border-0"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Buscar usuario"
                                />
                            </div>
                        </form>
                        <CrudCertificadosTable certificados={certificadosFiltrados} />
                    </div>
                }
                
            </div>
        </div>
    )
}