import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { Document } from '../assets'
import PizZipUtils from 'pizzip/utils/index.js'
import { saveAs } from 'file-saver'
import { useState } from 'react'


export default function Certificados() {

    const [validated, setValidated] = useState(false)
    const [propietario, setPropietario] = useState('')
    const [ruc, setRuc] = useState('')

    const [sistemas, setSistemas] = useState([
      { sistema: ''}
    ])

    const handleChangeSistema = (index,event) => {
      const values = [...sistemas]
     
      values[index].sistema=event.target.value
  
      setSistemas(values)
    }

    const handleAddFields = () => {
      const values = [...sistemas]
      values.push({sistema:''})
      setSistemas(values)
    }
  
    const handleRemoveFields = () => {
      const values = [...sistemas]
      if(values.length > 1)  values.pop()
      setSistemas(values)
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
        Document,
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
            Propietario: propietario,
            RUC: ruc,
            sistemas: sistemas
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

        <div className="mb-3">
          <label htmlFor="validationCustom01" className="form-label">Nombre</label>
          <input 
            type="text"
            className="form-control"
            id="validationCustom01"
            value={propietario}
            onChange={e => setPropietario(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="validationCustom02" className="form-label">RUC</label>
          <input 
            type="text"
            className="form-control"
            id="validationCustom02"
            value={ruc}
            onChange={e => setRuc(e.target.value)}
            required
          />
        </div>

        <div class="col-md-4" id="col-sistemas">
          <label  class="form-label">Sistemas</label>
          {sistemas.map((data,i) => {
            return (
              <div class="row" key={i}>
              <div class="col" xs={4}>
                <input
                  required
                  type="text" 
                  placeholder="01 Sistema" 
                  name="sistema"
                  value={data.sistema} 
                  onChange={event => handleChangeSistema(i,event)}
                />
              </div>
            </div>
            )
          })}
        </div>
        
        <div className="container">
          <div className="row pt-3">
            <div className="col">
              <button onClick={handleAddFields} className="btn btn-info w-100">Add More</button>
            </div>
            <div className="col">
              <button onClick={handleRemoveFields} className="btn btn-danger w-100">Remove</button>
            </div>
          </div>

          <div className="row pt-3">
            <div className="col">
              <button class="btn btn-primary w-100" type="submit">Submit form</button>
            </div>
          </div>     
        </div>

      </form>
    
    </div>
  )
}