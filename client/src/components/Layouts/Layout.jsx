import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'


function Layout({ children }) {
    return (
        <div className='body-wrapper'>
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    )
}

export default Layout