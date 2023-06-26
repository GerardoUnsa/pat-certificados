
import React, { useState, useEffect } from "react"
import { CrudCertificadosTable } from "./tables"
import { db, storage } from "../firebase"
import { collection, getDocs, query, doc, addDoc, updateDoc, where } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

export default function Upload() {
    const [searchValue, setSearchValue] = useState("")
    const [code, setCode] = useState("")
    const [tipe, setTipe] = useState([])
    const [certificadosFiltrados, setCertificadosFiltrados] = useState([])
    const [certificados, setCertificados] = useState([])
    const [file, setFile] = useState("")
    const [percent, setPercent] = useState(0)
    const [error, setError] = useState(null)

    /* Agregar Certificado PDF */
  const addTodo = async (url  , name) => {
     // Entramos al bloque para crear un documento
        try {

          var cert = ""
            if (tipe === "2"){
              // Buscamos si existe un documento para el file que subimos
               
                cert = "certificados_Ilum"
            } else {
              
               cert = "certificados"
            }
            const colRef = collection(db, cert);
            const result = await getDocs(query(colRef, where('Code', '==', code)));

            console.log("Document exist  ? =  ", result);
            //De no existir creamos uno
            if (result.empty){

                const docRef = await addDoc(collection(db, cert), {
                "Created":  new Date().toLocaleString(),
                "Modified" : new Date().toLocaleString(),
                "Url": url,
                "Code" : code,
                "Name": name,
                });
                console.log("Document written with ID: ", docRef.id);
            }else{
                 //De haber uno , modificamos el existente para actualizar la url, puesto eso cambiara al reemplazarse
                console.log("Preview document:  ", result.docs[0]);
                await updateDoc(doc(colRef, String(result.docs[0].id)), {
                "Modified" : new Date().toLocaleString(),
                "Url": url,
                })
            }
            alert("Docuemento subido!");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
}

function handleChange(event) {
    setFile(event.target.files[0]);
}

const handleUpload = () => {
    if (!file) {
        alert("Por favor, sube un documento primero!");
    }
    if (code ===""){
        alert("Por favor, ingrese un codigo!");
    }
    if (tipe ===""){
      alert("Por favor, ingrese un Tipo de documento!");
  }
    const storageRef = ref(storage, `/files/${file.name}`);
    
    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on("state_changed", (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // update progress
        setPercent(percent);
        }, (err) => console.log(err),
        () => { // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        
            console.log(url);
            addTodo(url,file.name );
            
        })
    })
}
  /* ****************** */

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
          <div className="row row-cols-1 text-center d-flex justify-content-center" style={{ marginTop:60 }}>
    
            <div className="col-md-4">          
              <div className="d-grid">
                <div className="custom-input-file btn btn-warning">
                  <input type="file" onChange={handleChange} accept="/image/*" className="input-file" />
                    Seleccionar Archivo PDF
                </div>

                <div class="col-md-6 mb-3">
                    <label htmlFor="Color" className="form-label">Code</label>
                    <input 
                      type="text"
                      className="form-control"
                      id="Color"
                      value={code}
                      onChange={e => setCode(e.target.value)}
                    />
                </div>
                <div class="col-md-8 mb-3">
                  <select class="form-select" aria-label="Tipo del documento"
                  value={tipe}
                  onChange={e => setTipe(e.target.value)}
                  >
                    <option value="1">Certificado Puesta a Tierra</option>
                    <option value="2">Certificado Iluminacion</option>
                    <option value="3">Certificado </option>
                  </select>

                </div>
                <button onClick={handleUpload} type='file' className="btn btn-dark p-2">
                  <i className="bi bi-cloud-arrow-up-fill me-2" />
                      Subir
                </button>
              </div>
              <div className="progress mb-3">
                <div className="progress-bar" role="progressbar" style={{width: `${percent}%`}} aria-valuenow={percent}>{percent}%</div>
              </div>
            </div>                
    
          
          </div>
        </div>
      );
}