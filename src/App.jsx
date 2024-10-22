import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Trending from './components/Trending'
import Saved from './components/Saved'
import CoinDetails from './components/CoinDetails'
import Layout from './components/Layout'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route path="" element={<Dashboard />} />
                    <Route path="/trending" element={<Trending />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/coin/:coinId" element={<CoinDetails />} />
                </Route>
            </Routes>
        </Router >
    )
}

export default App