import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

export default function Navbar(props) {
    const { user } = props

    return (
        <header className="p-2 bg-dark bg-gradient">
            <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    {user ?
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-person-check-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        </svg>
                    }
                </a>
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    {user ? 
                        <li>
                            <div className="nav-link px-2 text-white disabled">{user.email.toUpperCase()}
                            </div>
                        </li>
                        :
                        <></>
                    }
                    <li><a href="/" className="nav-link px-2 text-white">Inicio</a></li>
                    {user ?
                        <li className="flex-shrink-0 dropdown" style={{cursor: 'pointer'}}>
                            <div className="nav-link px-2 link-danger dropdown-toggle d-block" data-bs-toggle="dropdown" aria-expanded="false">Admin</div>
                            <ul className="dropdown-menu text-small shadow">
                                <li><a className="dropdown-item" href="/admin/manage/certificados">Certificados</a></li>
                                <li><a className="dropdown-item" href="/admin/manage/cpt">Certificado Puesta Tierra</a></li>
                                <li><a className="dropdown-item" href="/admin/users">Usuarios</a></li>
                            </ul>
                        </li>
                        :
                        <li></li>
                    }
                </ul>
                <div className="text-end">
                    
                        {user ? 
                        <div className="flex-shrink-0 dropdown">
                            <div className="d-block link-white text-decoration-none dropdown-toggle text-light" style={{cursor: 'pointer'}} data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="/img/userImage.png" alt="mdo" width={32} height={32} className="rounded-circle" />
                            </div>
                            <ul className="dropdown-menu text-small shadow">                                
                                <li><a className="dropdown-item" href="/signup">Registrar Usuario</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a onClick={() => signOut(auth)} className="dropdown-item" href="/">Cerrar Sesion</a></li>
                            </ul>
                        </div>
                        :
                        <a href="/login" className="nav-link text-white">
                            <button type="button" className="btn btn-danger me-2">Iniciar Sesión</button>                        
                        </a>
                        }
                </div>
            </div>
            </div>
        </header>
    )
}