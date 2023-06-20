import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore"
import { db, auth } from '../firebase'

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function registrarUsuario(email, password) {
        // Registrar usuario y obtener info del mismo
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userF) => {
            const docuRef = doc(db, `usuarios/${userF.user.uid}`) // Definir documento a la coleccion 'usuarios'
            setDoc(docuRef, {correo: email, uid: userF.user.uid, admin: true}) // Subir documento
            navigate('/login')
        })
        .catch(() => {
            alert("Correo con cuenta existente")
        })
    }

    const handleSubmit = (e) => {
        const form = e.currentTarget
        e.preventDefault()

        if (form.checkValidity() === true) {
            registrarUsuario(email, password)                                  
        } else {
            e.stopPropagation()
        }
      }

    return (
        <div className="container py-3">            
            <form className='row g-3 needs-validation' onSubmit={handleSubmit}>
                <h1 className="px-0">Registro de Usuario</h1>
                <div className="mb-3 px-0">
                    <label htmlFor="validationCustom01" className="form-label">Email</label>
                    <input 
                        type="email"
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
                        autoComplete="on"
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
                Ya estas registrado? <a href="/login">Iniciar Sesion</a>
            </p>
        </div>
    )
}
