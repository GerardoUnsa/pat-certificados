import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { PuestaTierra } from '../assets'
import PizZipUtils from 'pizzip/utils/index.js'
import { saveAs } from 'file-saver'
import { useState } from 'react'


export default function Post_CPT() {
    const [validated, setValidated] = useState(false)
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [categoria, setCategoria] = useState('')

    const [tabla1, setTabla1] = useState([
      { spat: '',
        medicion: '',
        hora: '',
        ubicacion: '',
        observacion: '',
      }
    ])

    const handleChangeTable1 = (index,event) => {
        const values = [...tabla1]
        const updatedValue = event.target.name;
        values[index][updatedValue] = event.target.value;
        setTabla1(values)
      }
  
      const handleAddFields = () => {
        const values = [...tabla1]
        values.push({
            spat: '',
            medicion: '',
            hora: '',
            ubicacion: '',
            observacion: '',
        })
        setTabla1(values)
      }
    
      const handleRemoveFields = () => {
        const values = [...tabla1]
        if(values.length > 1)  values.pop()
        setTabla1(values)
      }
      
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
          PuestaTierra,
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
              Marca: marca,
              Modelo: modelo,
              Categoria:categoria,
              Tabla1: tabla1
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
    
          <form className='row g-3 needs-validation' validated={validated} onSubmit={handleSubmit}>
    
            <div className="mb-3 px-0">
              <label htmlFor="validationCustom01" className="form-label">Marca</label>
              <input 
                type="text"
                className="form-control"
                id="validationCustom01"
                value={marca}
                onChange={e => setMarca(e.target.value)}
                required
              />
            </div>
    
            <div className="mb-3 px-0">
              <label htmlFor="validationCustom02" className="form-label">Modelo</label>
              <input 
                type="text"
                className="form-control"
                id="validationCustom02"
                value={modelo}
                onChange={e => setModelo(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 px-0">
              <label htmlFor="validationCustom02" className="form-label">Categoria</label>
              <input 
                type="text"
                className="form-control"
                id="validationCustom02"
                value={categoria}
                onChange={e => setCategoria(e.target.value)}
                required
              />
            </div>            
            
            <div className="container">
              <div className="row py-3 border">
                <div className="col-md-4" id="col-sistemas">
                  <label  className="form-label">Tabla 1 </label>
                  {tabla1.map((data,i) => {
                    return (
                      <div className="row" key={i}>
                        <div className="col pt-3">
                          <label htmlFor="Spat" className="form-label">Sistema</label>
                          <input
                            className="form-control"                    
                            type="text" 
                            id="Spat"
                            placeholder="Spat" 
                            name="spat"
                            value={tabla1.spat} 
                            onChange={event => handleChangeTable1(i,event)}
                            required
                          />
                          <input
                            className="form-control"                    
                            type="text" 
                            placeholder="medicion" 
                            name="medicion"
                            value={tabla1.medicion} 
                            onChange={event => handleChangeTable1(i,event)}
                            required
                          />                          
                          <input
                            className="form-control"                    
                            type="time" 
                            placeholder="hora" 
                            name="hora"
                            value={tabla1.hora} 
                            onChange={event => handleChangeTable1(i,event)}
                            required
                          />
                          <input
                            className="form-control"                    
                            type="text" 
                            placeholder="Ubicacion" 
                            name="ubicacion"
                            value={tabla1.ubicacion} 
                            onChange={event => handleChangeTable1(i,event)}
                            required
                          />
                          <input
                            className="form-control"                    
                            type="text" 
                            placeholder="Observaciones" 
                            name="observacion"
                            value={tabla1.observacion} 
                            onChange={event => handleChangeTable1(i,event)}
                            required
                          />
                        </div>
                    </div>
                    )
                  })}
                </div>

                <div className="col">
                  <button onClick={handleAddFields} type="button" className="btn btn-info w-100">Agregar campo</button>
                  <button onClick={handleRemoveFields} type="button" className="btn btn-danger w-100">Eliminar campo</button>
                </div>
              </div>
    
              <div className="row pt-3">
                <div className="col px-0">
                  <button className="btn btn-primary w-100" type="submit">Generar documento</button>
                </div>
              </div>     
            </div>
    
          </form>
        
        </div>
      )
}
