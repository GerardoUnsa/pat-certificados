import React from 'react'
import { Navbar } from '../components'

const Layout = (props) => {

    return (
        <div>
            <Navbar />
            {props.children}
        </div>
    )
}

export default Layout