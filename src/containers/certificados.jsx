import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { Document } from '../assets'
import PizZipUtils from 'pizzip/utils/index.js'
import { saveAs } from 'file-saver'
import { useState } from 'react';


export default function Certificados() {

    const [validated, setValidated] = useState(false);
    const [propietario, setPropietario] = useState('');
    const [ruc, setRuc] = useState('');

    const [sistemas, setSistemas] = useState([
      { sistema:''}
    ]);

    const handleChangeSistema = (index,event) => {
      const values = [...sistemas];
     
      values[index].sistema=event.target.value
  
      setSistemas(values)
    }

    const handleAddFields = () => {
      const values = [...sistemas];
      values.push({sistema:''})
      setSistemas(values);
    };
  
    const handleRemoveFields = () => {
      const values = [...sistemas];
      if(values.length > 1)  values.pop();
      setSistemas(values);
    };

      const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
    
        if (form.checkValidity() === false) {
          event.stopPropagation();
        } else {
          generateDocument();
        }
        setValidated(true);
      };
    function loadFile(url, callback) {
        PizZipUtils.getBinaryContent(url, callback);
      }
    const generateDocument = () => {
        loadFile(
          Document,
          function (error, content) {
            if (error) {
              throw error;
            }
            var zip = new PizZip(content);
            var doc = new Docxtemplater(zip, {
              paragraphLoop: true,
              linebreaks: true,
            });
            doc.setData({
              Propietario: propietario,
              RUC: ruc,
              sistemas: sistemas
            });
            try {
              // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
              doc.render();
            } catch (error) {
              // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
              function replaceErrors(key, value) {
                if (value instanceof Error) {
                  return Object.getOwnPropertyNames(value).reduce(function (
                    error,
                    key
                  ) {
                    error[key] = value[key];
                    return error;
                  },
                  {});
                }
                return value;
              }
              console.log(JSON.stringify({ error: error }, replaceErrors));
      
              if (error.properties && error.properties.errors instanceof Array) {
                const errorMessages = error.properties.errors
                  .map(function (error) {
                    return error.properties.explanation;
                  })
                  .join('\n');
                console.log('errorMessages', errorMessages);
                // errorMessages is a humanly readable message looking like this :
                // 'The tag beginning with "foobar" is unopened'
              }
              throw error;
            }
            var out = doc.getZip().generate({
              type: 'blob',
              mimeType:
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            }); //Output the document using Data-URI
           saveAs(out, 'output.docx');
            
            
          
          }
        );
      };


  return (
    <div>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
      <form class="row g-3 needs-validation" novalidate validated={validated} onSubmit={handleSubmit}>
        <div class="col-md-4">
          <label for="validationCustom01" class="form-label">First name</label>
          <input 
            type="text" 
            class="form-control" 
            id="validationCustom01" 
            value={propietario}
            onChange={e => setPropietario(e.target.value)}
            required
            />
          <div class="valid-feedback">
            Looks good!
          </div>
        </div>
        <div class="col-md-4">
          <label for="validationCustom02" class="form-label">Last name</label>
          <input 
            type="text" 
            class="form-control" 
            id="validationCustom02" 
            required
            value={ruc}
            onChange={e => setRuc(e.target.value)}
          />
          <div class="valid-feedback">
            Looks good!
          </div>
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
                  onChange={event => handleChangeSistema(i,event)}/>
              </div>
            </div>
          )
        })
      }
      </div>
      <div class="pt-3 d-flex justify-content-between"> 
        <button class="warning"  onClick={handleAddFields}>Add More</button>
        <button class="danger" onClick={handleRemoveFields}>Remove</button>
      </div>
        <div class="col-12">
          <button class="btn btn-primary" type="submit">Submit form</button>
        </div>
      </form>
    
    
    </div>
  )
}