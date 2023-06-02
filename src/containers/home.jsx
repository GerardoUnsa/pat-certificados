import React, {useState, useEffect} from 'react'
import {db} from '../firebase'

export default function Home() {
  const [certificados, setCertificados] = useState([])
  const [error, setError] = useState(null)

  useEffect(
    () => {
      const manualF = db.collection('certificados').onSnapshot(
        snapshot => {
          setCertificados(snapshot.docs.map(d => ({id: d.id, ...d.data()}) ))
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
      
      <div className="col">
        <form className='row'>
          <div className="input-group">
            <input
              type="text"
              className="searchBarInput form-control form-control-dark w-100"
              //value={searchValue}
              //onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Buscar certificado"
            />
          </div>
        </form>
      </div>

      <div className="pt-3 row row-cols-1 row-cols-md-3 mb-3 text-center">
        {certificados.map((value, index) => (
          <div className="col" key={`${value.id}`}>
            <div className="card mb-4 rounded-3 shadow-sm">
              <div className="card-header p-0">
                <a rel="noreferrer" href={`/manualVirtual/${value.id}`}>
                  <img src={`https://qrickit.com/api/qr.php?d=<link>&addtext=Zortrax+M300+Dual&txtcolor=000000&fgdcolor=000000&bgdcolor=FFFFFF&qrsize=500&t=p&e=m`} className="card-img-top" alt={index} />
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
    </div>
  )
}