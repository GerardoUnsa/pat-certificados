import React, { useState } from "react"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validated, setValidated] = useState(false)

    async function registrarUsuario(email, password) {
        const infoUser = await createUserWithEmailAndPassword(auth, email, password).then((userF) => {
            return userF
        }) // Registrar usuario y obtener info del mismo

        console.log(infoUser.user.uid)
        //const docuRef = doc(db, `usuarios/${infoUser.user.uid}`) // Definir documento a la coleccion 'usuarios'
        //setDoc(docuRef, {correo: email, rol: rol}) // Subir documento
    }

    const handleSubmit = (e) => {
        const form = e.currentTarget
        e.preventDefault()

        if (form.checkValidity() === true) {
            registrarUsuario(email, password)
        } else {
            e.stopPropagation()
        }
  
        setValidated(true)
      }

    return (
        <div className="container py-3">            
            <form className='row g-3 needs-validation' validated={validated} onSubmit={handleSubmit}>
                <h1 className="px-0">Registro de Usuario</h1>
                <div className="mb-3 px-0">
                    <label htmlFor="validationCustom01" className="form-label">Email</label>
                    <input 
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3 px-0">
                    <label htmlFor="validationCustom02" className="form-label">Contraseña</label>
                    <input 
                        type="password"
                        className="form-control"
                        id="validationCustom02"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3 px-0">
                    <div className="col px-0">
                        <button className="btn btn-primary w-100" type="submit">Crear Cuenta</button>
                    </div>
                </div>

            </form>
            <p className="mt-3">
                Ya estas registrado? <a href="/login">Inicia Sesion</a>
            </p>
        </div>
    )
}
