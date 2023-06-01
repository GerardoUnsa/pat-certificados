import React, { useState } from 'react'

export default function Navbar(props) {
    //const { user, admin } = props
    const user = true

    return (
        <header className="p-2 bg-dark bg-gradient">
            <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                <svg className="bi me-2" width={40} height={32} role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap" /></svg>
                </a>
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="/" className="nav-link px-2 text-white">Inicio</a></li>
                    {user ?
                    <li className="flex-shrink-0 dropdown" style={{cursor: 'pointer'}}>
                        <div className="nav-link px-2 link-danger dropdown-toggle d-block" data-bs-toggle="dropdown" aria-expanded="false">Admin</div>
                        <ul className="dropdown-menu text-small shadow">
                            <li><a className="dropdown-item" href="/admin/certificados">Certificados</a></li>
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