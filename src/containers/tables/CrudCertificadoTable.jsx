import { db } from '../../firebase'
import { collection, doc, deleteDoc } from "firebase/firestore"

const CrudCertificadoTable = ({ certificados }) => {

  const deleteCertificado = async (certificadoId) => {
           
     // Entramos al bloque para crear un documento
      try {           
            const colRef = collection(db, 'certificados')
            await deleteDoc(doc(colRef, certificadoId))
            console.log("Document delete from firestore successful ")
      } catch (e) {
          console.error("Error deleting document: ", e);
      }

  }
  
  const handleDelete = (e, certificadoId) => {
    e.preventDefault()
    deleteCertificado(certificadoId)
  }
  
  return (
    <div className="font-weight-light">
      <table className="table table-striped table-dark">
        
        <tbody>
          {certificados.map((certificado) => (
            <tr key={certificado.id}>
              <th>{certificado.Name}</th>
              <th>{certificado.Url}</th>
              <th>
                <a href={`/editUsuario/${certificado.id}`} className="nav-link text-white">                        
                    <button type="button" className="btn btn-warning"><i className="bi bi-pencil-square"></i></button>
                </a>
              </th>
              <th>
                <button onClick={(e) => handleDelete(e, certificado.id)} type="button" className="btn btn-danger"><i className="bi bi-trash-fill"></i></button>
              </th>
            </tr>
          ))}
        </tbody>
      
      </table>
    </div>
  )
}
  
export default CrudCertificadoTable