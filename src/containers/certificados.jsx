import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { Document } from '../assets'
import PizZipUtils from 'pizzip/utils/index.js'
import { saveAs } from 'file-saver'
import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

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
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            
            value={propietario}
            onChange={e => setPropietario(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>RUC</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="RUC"
           
            value={ruc}
            onChange={e => setRuc(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
       
      </Row>
      <Col>
      <Form.Label>Sistemas</Form.Label>
      {sistemas.map((data,i) => {
          return (
            <Row className='mt-3' key={i}>
              <Col xs={4}>
                <Form.Group controlId="formSistemas">
                  
                  <Form.Control 
                  required
                  type="text" 
                  placeholder="01 Sistema" 
                  name="sistema"
                  value={data.sistema} 
                  onChange={event => handleChangeSistema(i,event)}/>
                </Form.Group>
              </Col>

            </Row>
          )
        })
      }
      </Col>
      <Col className='pt-3 d-flex justify-content-between'>
      <Button variant="warning" onClick={handleAddFields}>Add More</Button>
      <Button variant="danger" onClick={handleRemoveFields}>Remove</Button>
    </Col>
      <Button type="submit">Submit form</Button>
    </Form></div>
  )
}