import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { StyleSheetManager } from 'styled-components'

// Import components
import Login from './assets/components/login'
import Sidebar from './assets/components/sidebar'
import Dashboard from './assets/components/dashboard'
import PrivateRoutes from './assets/private/PrivateRoutes'

//*Layouts
import CategoryLayout from './assets/layout/CategoryLayout'

const SidebarDashboard = () => {
    return (
        <div className='w-100 d-flex justify-content-center'>
            <Sidebar />
            <Dashboard />
        </div>
    )
}

function App() {
    return (
        <Router>
            <StyleSheetManager shouldForwardProp={(prop) => prop !== 'align'}>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/" element={<SidebarDashboard />} />
                        <Route path="/Categories" element={<CategoryLayout />} />
                    </Route>
                </Routes>
            </StyleSheetManager>
        </Router>
    )
}

export default App
