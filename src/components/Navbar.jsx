import React, { useState } from 'react'

export default function Navbar(props) {
    //const { user, admin } = props
    const user = true

    return (
        <header className="p-2 bg-dark bg-gradient">
            <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-check-fill" viewBox="0 0 16 16">
                        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>
                    </svg>
                </a>
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="/" className="nav-link px-2 text-white">Inicio</a></li>
                    {user ?
                    <li className="flex-shrink-0 dropdown" style={{cursor: 'pointer'}}>
                        <div className="nav-link px-2 link-danger dropdown-toggle d-block" data-bs-toggle="dropdown" aria-expanded="false">Admin</div>
                        <ul className="dropdown-menu text-small shadow">
                            <li><a className="dropdown-item" href="/admin/certificados">Certificados</a></li>
                            <li><a className="dropdown-item" href="/admin/certificadoPuestaTierra">Certificado Puesta Tierra</a></li>
                            <li><a className="dropdown-item" href="/admin/usuarios">Usuarios</a></li>
                        </ul>
                    </li>
                    :                    
                    <li></li>}
                </ul>
                <div className="text-end">
                    
                        {user ? 
                        <div className="flex-shrink-0 dropdown">
                            <div className="d-block link-white text-decoration-none dropdown-toggle text-light" style={{cursor: 'pointer'}} data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="/img/userImage.png" alt="mdo" width={32} height={32} className="rounded-circle" />
                            </div>
                            <ul className="dropdown-menu text-small shadow">
                                <li><div className="dropdown-item">{user.email}</div></li>
                                {user ? <li><a className="dropdown-item" href="/registro">Registrar Usuario</a></li> : <li></li>}
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/">Sign out</a></li>
                            </ul>
                        </div>
                        : 
                        <a href="/login" className="nav-link px-2 text-white">
                            <button type="button" className="btn btn-warning me-2">Login</button>
                        </a>
                        }
                </div>
            </div>
            </div>
        </header>
    )
}