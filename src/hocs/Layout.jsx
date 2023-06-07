import React from 'react'
import { Navbar, Footer } from '../components'

const Layout = (props) => {

    return (
        <div className='customizedContainer'>
            <Navbar />
            <div className='containerContent'>
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout