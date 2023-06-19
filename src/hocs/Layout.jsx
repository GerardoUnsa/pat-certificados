import { useState, useEffect } from 'react'
import { Navbar, Footer } from '../components'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

const Layout = (props) => {
    const [user, setUser] = useState(null)

    useEffect(
        () => {
          const setUserRol = onAuthStateChanged(auth, (userF) => {
            if (userF) {
              const userData = {
                uid: userF.uid,
                email: userF.email,
              }
              setUser(userData)          
            }
          })
          return () => { // https://johnwcassidy.medium.com/firebase-authentication-hooks-and-context-d0e47395f402
            setUserRol()
          }
        }, [])

    return (
        <div className='customizedContainer'>
            <Navbar user={user} />
            <div className='containerContent'>
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout