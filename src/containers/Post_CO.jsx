import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { Iluminacion } from '../assets'
import PizZipUtils from 'pizzip/utils/index.js'
import { saveAs } from 'file-saver'
import { useState } from 'react'


export default function Post_Certificado_Iluminacion() {

     const [validated, setValidated] = useState(false)
    // DATOS DEL CLIENTE
      const [nombre, setNombre] = useState('')
      const [ruc, setRuc] = useState('')
      const [ubicacion, setUbicacion] = useState('')
      const [fecha, setFecha] = useState('')
      const [codigo, setCodigo] = useState('')

    // Caracteristicas
      const [tipo, setTipo] = useState('')
      const [leds, setLeds] = useState('')
      const [autonomia, setAutonomia] = useState('')
      const [area, setArea] = useState('')
      const [color, setColor] = useState('')
      const [bateria, setBateria] = useState('')
      const [Estructura, setEstructura] = useState('')
      const [otros, setOtro] = useState('')


      const handleSubmit = (event) => {
        const form = event.currentTarget
        event.preventDefault()
        
        if (form.checkValidity() === false) {
          event.stopPropagation()
        } else {
          generateDocument()
        }
  
        setValidated(true)
      }
      function loadFile(url, callback) {
        PizZipUtils.getBinaryContent(url, callback)
      }
      const generateDocument = () => {
        loadFile(
          Iluminacion,
          function (error, content) {
            if (error) {
              throw error
            }
            var zip = new PizZip(content)
            var doc = new Docxtemplater(zip, {
              paragraphLoop: true,
              linebreaks: true,
            })
            doc.setData({
              Nombre: nombre,
              Ruc: ruc,
              Ubicacion:ubicacion,
              Fecha:fecha,
              Codigo:codigo,

              Tipo: tipo,
              Leds:leds,
              Autonomia:autonomia,
              Area:area,
              Color:color,
              Bateria:bateria,
              Estructura:Estructura,
              otros:otros,




            
            })
            
            try {
              // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
              doc.render()
  
            } catch (error) {
              // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
              function replaceErrors(key, value) {
                if (value instanceof Error) {
                  return Object.getOwnPropertyNames(value)
                  .reduce(
                    function (error,key) {
                      error[key] = value[key]
                      return error
                    },
                    {}
                  )
                }
                return value
              }
  
              console.log(JSON.stringify({ error: error }, replaceErrors))
              
              if (error.properties && error.properties.errors instanceof Array) {
                const errorMessages = error.properties.errors
                .map(function (error) {
                  return error.properties.explanation
                })
                .join('\n')
                console.log('errorMessages', errorMessages)
                // errorMessages is a humanly readable message looking like this :
                // 'The tag beginning with "foobar" is unopened'
              }
              
              throw error
            }
            
            var out = doc.getZip().generate({
              type: 'blob',
              mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            }) //Output the document using Data-URI
            
            saveAs(out, 'output.docx')          
          }
        )
      }

      

    return (
        
        <div className="container py-3">

          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
          <form className='row g-3 needs-validation' validated={validated} onSubmit={handleSubmit}>
            <h2>Datos del cliente</h2>
            <div class="form-row">
                <div class="col-md-4 mb-3">
                    <label htmlFor="Codigo" className="form-label">Codigo</label>
                    <input 
                      type="text"
                      className="form-control"
                      id="Codigo"
                      value={codigo}
                      onChange={e => setCodigo(e.target.value)}
                    />
                </div>
                <div class="col-md-4 mb-3">
                    <label htmlFor="Nombre" className="form-label">Nombre</label>
                    <input 
                      type="text"
                      className="form-control"
                      id="Nombre"
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div class="col-md-4 mb-3">
                    <label htmlFor="RUC" className="form-label">RUC</label>
                    <input 
                      type="text"
                      className="form-control"
                      id="RUC"
                      value={ruc}
                      onChange={e => setRuc(e.target.value)}
                    />
                </div>
            </div>

            <div class="form-row">
                <div class="col-md-4 mb-3">
                    <label htmlFor="Ubicación" className="form-label">Ubicación</label>
                    <input 
                      type="text"
                      className="form-control"
                      id="Ubicación"
                      value={ubicacion}
                      onChange={e => setUbicacion(e.target.value)}
                    />
                </div>
                <div class="col-md-4 mb-3">
                    <label htmlFor="Fecha" className="form-label">Fecha</label>
                    <input 
                      type="date"
                      className="form-control"
                      id="Fecha"
                      value={fecha}
                      onChange={e => setFecha(e.target.value)}
                    />
                </div>
                
            </div>
            <h2>Caracteristicas</h2>

            <div class="form-row">
                <div class="col-md-3 mb-3">
                    <label htmlFor="Tipo" className="form-label">Tipo</label>
                    <input 
                      type="text"
                      className="form-control"
                      id="Tipo"
                      value={tipo}
                      onChange={e => setTipo(e.target.value)}
                    />
                </div>
                <div class="col-md-3 mb-3">
                    <label htmlFor="Leds" className="form-label">Leds</label>
                    <input 
                      type="text"
                      className="form-control"
                      id="Leds"
                      value={leds}
                      onChange={e => setLeds(e.target.value)}
                    />
                </div>
                <div class="col-md-3 mb-3">
                    <label htmlFor="Autonomía" className="form-label">Autonomía</label>
                    <input 
                      type="text"
                      className="form-control"
                      id="Autonomía"
                      value={autonomia}
                      onChange={e => setAutonomia(e.target.value)}
                    />
                </div>
                <div class="col-md-3 mb-3">
                    <label htmlFor="Area" className="form-label">Area cubierta</label>
                    <input 
                      type="text"
                      className="form-control"
                      id="Area"
                      value={area}
                      onChange={e => setArea(e.target.value)}
                    />
                </div>
            </div>


            <div class="form-row">
                <div class="col-md-3 mb-3">
                    <label htmlFor="Color" className="form-label">Color</label>
                    <input 
                      type="text"
                      className="form-control"
                      id="Color"
                      value={color}
                      onChange={e => setColor(e.target.value)}
                    />
                </div>
                <div class="col-md-3 mb-3">
                    <label htmlFor="Batería" className="form-label">Batería</label>
                    <input 
                      type="text"
                      className="form-control"
                      id="Batería"
                      value={bateria}
                      onChange={e => setBateria(e.target.value)}
                    />
                </div>
                <div class="col-md-6 mb-3">
                    <label htmlFor="Estructura" className="form-label">Estructura</label>
                    <input 
                      type="text"
                      className="form-control"
                      id="Estructura"
                      value={Estructura}
                      onChange={e => setEstructura(e.target.value)}
                    />
                </div>
      
            </div>
            <div class="form-row">
              <div class="col-md-8 mb-3">
                    <label htmlFor="Otras" className="form-label">Otras características</label>
                    <input 
                      type="text"
                      className="form-control"
                      id="Otras"
                      value={otros}
                      onChange={e => setOtro(e.target.value)}
                    />
                </div>

            </div>
            <div className="row pt-3">
                <div className="col px-0">
                  <button className="btn btn-primary w-100" type="submit">Generar documento</button>
                </div>
              </div>     

          </form>

        </div>
    )
}
