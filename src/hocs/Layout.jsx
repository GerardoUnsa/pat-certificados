import React from 'react'
import { Navbar, Footer } from '../components'

const Layout = (props) => {

    return (
        <div>
            <Navbar />
            {props.children}
            <Footer />
        </div>
    )
}

export default Layout