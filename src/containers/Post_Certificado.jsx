import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { Document } from '../assets'
import PizZipUtils from 'pizzip/utils/index.js'
import { saveAs } from 'file-saver'
import { useState } from 'react'


export default function Post_Certificado() {

    const [validated, setValidated] = useState(false)
    const [propietario, setPropietario] = useState('')
    const [ruc, setRuc] = useState('')
    const [direccion, setDireccion] = useState('')
    const [fecha, setFecha] = useState('')
    var cantZonas = ''
    var cantZonas2 = ''

    const [sistemas, setSistemas] = useState([
      { sistema: ''}
    ])

    const [zonas, setZonas] = useState([
      { 
        zona: '',
        detector : ''
      }
    ])    

    const handleChangeSistema = (index,event) => {
      const values = [...sistemas]
      values[index].sistema = event.target.value
  
      setSistemas(values)
    }

    const handleChangeZonas= (index,event) => {
      const values = [...zonas]
      const updatedValue = event.target.name;
      values[index][updatedValue] = event.target.value;
      setZonas(values)
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

    const handleAddFieldsZone = () => {
      const values = [...zonas]
      values.push({
        sistema:'',
        detector: 0,
      })
      setZonas(values)
    }

    const handleSubmit = (event) => {
      const form = event.currentTarget
      event.preventDefault()
      
      if (form.checkValidity() === false) {
        event.stopPropagation()

      } else {
        var aux = 0
        for (let i = 0; i<zonas.length; i++){
          zonas[i].zona = "Zona " + (i +1) + ": " + zonas[i].zona
          aux += Number(zonas[i].detector)
          if ( Number(zonas[i].detector) > 1){
            zonas[i].detector = zonas[i].detector + " detectores"
          } else {
            zonas[i].detector = zonas[i].detector + " detector"
          }              
        }
        
        if ( aux > 1){
          cantZonas = aux + " zonas"
          cantZonas2 = aux + " zonas de operacion"
          
        } else{
          cantZonas = aux + " zona"
          cantZonas2 = aux + " zona de operacion"
        }
        
        generateDocument()
      }

      setValidated(true)
    }

    const handleRemoveFieldsZone = () => {
      const values = [...zonas]
      if(values.length > 1)  values.pop()
      setZonas(values)
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
            Ubicacion: direccion,
            Fecha: fecha,
            sistemas: sistemas,
            zonas: zonas,
            cantZonas: cantZonas,
            cantZonas2 : cantZonas2,

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
          <label htmlFor="validationCustom01" className="form-label">Propietario</label>
          <input 
            type="text"
            className="form-control"
            id="validationCustom01"
            value={propietario}
            onChange={e => setPropietario(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 px-0">
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
        <div className="mb-3 px-0">
          <label htmlFor="validationCustom03" className="form-label">Direccion</label>
          <input 
            type="text"
            className="form-control"
            id="validationCustom03"
            value={direccion}
            onChange={e => setDireccion(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 px-0">
          <label htmlFor="validationCustom04" className="form-label">Fecha</label>
          <input  
            type="text"
            className="form-control"
            id="validationCustom04"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
            required
          />
        </div>        
        
        <div className="container">
          <div className="row py-3 border">

            <div className="col" id="col-sistemas">
              <label  className="form-label">Sistema de detección de Incendios </label>
              {sistemas.map((data,i) => {
                return (
                  <div className="row" key={i}>
                    <div className="col">
                    <label htmlFor="sistemaInput" className="form-label">Sistema  {i +1}</label>
                      <input
                        id = "sistemaInput"
                        className="form-control"                    
                        type="text" 
                        placeholder="01 Sistema" 
                        name="sistema"
                        value={data.sistema} 
                        onChange={event => handleChangeSistema(i,event)}
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
          
          <div className="row py-3 border">

            <div className="col" id="col-zonificacion">
              <label  className="form-label">Zonificacion de detección de Incendios  </label>
              {zonas.map((data,i) => {
                return (
                  <div className="row" key={i}>
                    <div className="col">
                     <label htmlFor="zonainput" className="form-label">Zona {i +1}</label>
                      <input
                        id= "zonainput"
                        className="form-control"                    
                        type="text" 
                        placeholder="Sala de espera" 
                        name="zona"
                        value={data.zona} 
                        onChange={event => handleChangeZonas(i,event)}
                        required
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="detectorinput" className="form-label">N° Detectores</label>
                      <input
                        id = "detectorinput"
                        className="form-control"                    
                        type="number" 
                        placeholder="01" 
                        name="detector"
                        value={data.detector} 
                        onChange={event => handleChangeZonas(i,event)}
                        required
                      />
                    </div>
                </div>
                )
              })}
            </div>

            <div className="col">
              <button onClick={handleAddFieldsZone} type="button" className="btn btn-info w-100">Agregar campo</button>
              <button onClick={handleRemoveFieldsZone} type="button" className="btn btn-danger w-100">Eliminar campo</button>
            </div>
          </div>

          

          <div className="row pt-3">
            <div className="col px-0">
              <button className="btn btn-primary w-100" type="submit">Generar Documento</button>
            </div>
          </div>
        </div>

      </form>
    
    </div>
  )
}