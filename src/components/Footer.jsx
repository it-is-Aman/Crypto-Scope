import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-end items-center gap-3">
                <span>Made with</span>
                <a
                    href="https://www.coingecko.com/en/api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" text-blue-400 hover:text-blue-700"
                >
                    CoinGecko API
                </a>
            </div>
        </footer>
    )
}

export default Footer