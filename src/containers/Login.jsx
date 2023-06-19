import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        const form = e.currentTarget
        e.preventDefault()

        if (form.checkValidity() === true) {
            signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } else {
            e.stopPropagation()
        }

      }

    return (
        <div className="container py-3">
            <form className='row g-3 needs-validation' onSubmit={handleSubmit}>
                <h1 className="px-0">Inicio de Sesion</h1>
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
                        <button className="btn btn-primary w-100" type="submit">Iniciar Sesion</button>
                    </div>
                </div>

            </form>
        </div>
    )
}
