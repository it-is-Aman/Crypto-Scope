import React from 'react'
import { Link } from 'react-router-dom'


function Header() {
    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-indigo-300">Crypto-Scope</h1>
                <div className="space-x-4">
                    <Link to="/" className="text-gray-300 hover:text-white">Dashboard</Link>
                    <Link to="/trending" className="text-gray-300 hover:text-white">Trending</Link>
                    <Link to="/saved" className="text-gray-300 hover:text-white">Saved</Link>
                </div>
            </div>
        </nav>
    )
}

export default Header