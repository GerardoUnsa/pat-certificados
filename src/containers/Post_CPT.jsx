import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { PuestaTierra } from '../assets'
import PizZipUtils from 'pizzip/utils/index.js'
import { saveAs } from 'file-saver'
import { useState } from 'react'


export default function Post_CPT() {
     const [validated, setValidated] = useState(false)
  // DATOS DEL CLIENTE
    const [nombre, setNombre] = useState('')
    const [ruc, setRuc] = useState('')
    const [telefono, setTelefono] = useState('')
    const [fecha, setFecha] = useState('')
    const [lugar, setLugar] = useState('')

    
    // EQUIPO UTILIZADO
   
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [tipo, setTipo] = useState('')
    const [calibrado, setCalibrado] = useState('')
    const [categoria, setCategoria] = useState('')
    const [rango, setRango] = useState('')
    const [frecuencias, setFrecuencias] = useState('')
    
    // CERTIFICADO N° SPAT 001.20/PSE
    //Tabla 1
    const [tabla1, setTabla1] = useState([
      { 
        spat: '',
        medicion: '',
        hora: '',
        ubicacion: '',
        observacion: '', 
       
      }
    ])
    //Tabla 2
    const [pozo, setPozo] = useState('')
    const [material, setMaterial] = useState('')
    const [plg, setPlg] = useState('')
    const [l, setL] = useState('')
    const [tipoIns, setTipoIns] = useState('')
    const [color, setColor] = useState('')
    const [s, setS] = useState('')


    const medicion = 2

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
          console.log('Values table 1 : ', tabla1)
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
              Institucion:nombre ,
              RUC:ruc,
              Telefono:telefono,
              Fecha:fecha,
              Lugar:lugar,

          
              Marca: marca,
              Modelo: modelo,
              Tipo:tipo,
              Calibrado:calibrado,
              Categoria:categoria,
              rango:rango,
              Frecuencias:frecuencias,
             

              Pozo:pozo,
              material:material,
              plg:plg,
              L:l,
              TipoInst:tipoIns,
              S:s,
              Color:color,

              medicion: medicion,

              Tabla1: tabla1,


              


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
                <label htmlFor="validationCustom01" className="form-label">Institucion</label>
                <input 
                  type="text"
                  className="form-control"
                  id="validationCustom01"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  required
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
                  required
                />
              </div> 
              <div class="col-md-4 mb-3">
                <label htmlFor="Telefono" className="form-label">Telefono</label>
                <input 
                  type="text"
                  className="form-control"
                  id="Telefono"
                  value={telefono}
                  onChange={e => setTelefono(e.target.value)}
                  required
                />
              </div> 
            </div>
            <div class="form-row">
              <div class="col-md-4 mb-3">
                  <label htmlFor="Fecha" className="form-label">Fecha</label>
                  <input 
                    type="text"
                    className="form-control"
                    id="Fecha"
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                    required
                  />
              </div>
              <div class="col-md-4 mb-3">
                  <label htmlFor="Lugar" className="form-label">Lugar</label>
                  <input 
                    type="text"
                    className="form-control"
                    id="Lugar"
                    value={lugar}
                    onChange={e => setLugar(e.target.value)}
                    required
                  />
              </div>
            </div>

            <h2>Equipo Utilizado</h2>
            <div class="form-row">
              <div className="col-md-4 mb-3">
                <label htmlFor="Marca" className="form-label">Marca</label>
                <input 
                  type="text"
                  className="form-control"
                  id="Marca"
                  value={marca}
                  onChange={e => setMarca(e.target.value)}
                  required
                />
              </div>
      
              <div className="col-md-4 mb-3">
                <label htmlFor="Modelo" className="form-label">Modelo</label>
                <input 
                  type="text"
                  className="form-control"
                  id="Modelo"
                  value={modelo}
                  onChange={e => setModelo(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="Tipo" className="form-label">Tipo</label>
                <input 
                  type="text"
                  className="form-control"
                  id="Tipo"
                  value={tipo}
                  onChange={e => setTipo(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="Calibrado" className="form-label">Calibrado</label>
                <input 
                  type="text"
                  className="form-control"
                  id="Calibrado"
                  value={calibrado}
                  onChange={e => setCalibrado(e.target.value)}
                  required
                />
              </div>


                   
            </div>

            <div class="form-row">
              <div className="col-md-4 mb-3">
                <label htmlFor="Categoria" className="form-label">Categoria</label>
                <input 
                  type="text"
                  className="form-control"
                  id="Categoria"
                  value={categoria}
                  onChange={e => setCategoria(e.target.value)}
                  required
                />
              </div> 
              <div className="col-md-4 mb-3">
                <label htmlFor="Rango" className="form-label">Rango</label>
                <input 
                  type="text"
                  className="form-control"
                  id="Rango"
                  value={rango}
                  onChange={e => setRango(e.target.value)}
                  required
                />
              </div>        
              <div className="col-md-4 mb-3">
                <label htmlFor="frecuencias" className="form-label">Frecuencias</label>
                <input 
                  type="text"
                  className="form-control"
                  id="frecuencias"
                  value={frecuencias}
                  onChange={e => setFrecuencias(e.target.value)}
                  required
                />
              </div>   

            </div>


            <div className="container">
              <div className="row py-3 border">
                <div className="col" id="col-sistemas">
                  <label  className="form-label">Tabla 1 </label>
                  {tabla1.map((data,i) => {
                    return (
                      
                      <div class="form-col" key={i}> 
                      <h5> Sistema {i+1}</h5>
                        <div class="form-row">
                            <div className="col-md-4 mb-3">
                            <label htmlFor="Spat" className="form-label">Spat</label>
                            <input 
                              type="text"
                              className="form-control"
                              id="Spat"
                              placeholder="spat" 
                              name="spat"
                              value={tabla1.spat} 
                              onChange={event => handleChangeTable1(i,event)}
                              required
                            />
                          </div> 

                          <div className="col-md-4 mb-3">
                            <label htmlFor="Medicion" className="form-label">Medicion</label>
                            <input
                              className="form-control"                    
                              type="text" 
                              id="Medicion"
                              placeholder="medicion" 
                              name="medicion"
                              value={tabla1.medicion} 
                              onChange={event => handleChangeTable1(i,event)}
                              required
                            />   
                          </div>                       
                          
                          <div className="col-md-4 mb-3">
                            <label htmlFor="Hora" className="form-label">Hora</label>
                            <input
                              className="form-control"                    
                              type="time" 
                              id="Hora"
                              placeholder="hora" 
                              name="hora"
                              value={tabla1.hora} 
                              onChange={event => handleChangeTable1(i,event)}
                              required
                            />
                          </div>
                        </div>

                        <div class="form-row">
                          <div className="col-md-4 mb-3">
                            <label htmlFor="ubicacion" className="form-label">Ubicacion</label>
                            <input
                              className="form-control"                    
                              type="text"
                              id= "ubicacion" 
                              placeholder="Ubicacion" 
                              name="ubicacion"
                              value={tabla1.ubicacion} 
                              onChange={event => handleChangeTable1(i,event)}
                              required
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <label htmlFor="observacion" className="form-label">observacion</label>
                              <input
                              className="form-control"                    
                              type="text" 
                              id= "observacion"
                              placeholder="Observaciones" 
                              name="observacion"
                              value={tabla1.observacion} 
                              onChange={event => handleChangeTable1(i,event)}
                              required
                            />
                          </div>
                        </div>

                                                 
            
                    </div>
                    )
                  })}
                </div>
              </div>
               <div className="col">
                  <button onClick={handleAddFields} type="button" className="btn btn-info w-100">Agregar campo</button>
                  <button onClick={handleRemoveFields} type="button" className="btn btn-danger w-100">Eliminar campo</button>
                </div>
               <h3>Puesta a tierra</h3>
                <div class="form-row">
                 
                  <div class="col-md-4 mb-3">
                    <label htmlFor="Pozo" className="form-label">Pozo</label>
                    <input 
                      type="text"
                      className="form-control"
                      id="Pozo"
                      value={pozo}
                      onChange={e => setPozo(e.target.value)}
                    />
                  </div>
                  <div class="col-md-4 mb-3">
                    <label htmlFor="Material " className="form-label">Material </label>
                    <input 
                      type="text"
                      className="form-control"
                      id="Material "
                      value={material}
                      onChange={e => setMaterial(e.target.value)}
                    />
                  </div>
                  <div class="col-md-4 mb-3">
                    <label htmlFor="plg" className="form-label">PLG</label>
                    <input 
                      type="text"
                      className="form-control"
                      id="plg"
                      value={plg}
                      onChange={e => setPlg(e.target.value)}
                    />
                  </div>
                </div>


                <div class="form-row">
                  <div class="col-md-3 mb-3">
                    <label htmlFor="Longitud" className="form-label">Longitud</label>
                    <input 
                      type="text"
                      className="form-control"
                      id="Longitud"
                      value={l}
                      onChange={e => setL(e.target.value)}
                    />
                  </div>
                  <div class="col-md-3 mb-3">
                    <label htmlFor="TipoInst " className="form-label">Tipo de instalación  </label>
                    <input 
                      type="text"
                      className="form-control"
                      id="TipoInst "
                      value={tipoIns}
                      onChange={e => setTipoIns(e.target.value)}
                    />
                  </div>
                  <div class="col-md-3 mb-3">
                    <label htmlFor="S" className="form-label">Coductor</label>
                    <input 
                      type="text"
                      className="form-control"
                      id="S"
                      value={s}
                      onChange={e => setS(e.target.value)}
                    />
                  </div>
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
