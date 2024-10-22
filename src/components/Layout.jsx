import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'
import Header from './Header'

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout   