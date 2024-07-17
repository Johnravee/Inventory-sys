import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { StyleSheetManager } from 'styled-components'

// Import components
import Login from './assets/components/login'
import PrivateRoutes from './assets/private/PrivateRoutes'
import Suppliers from './assets/components/Suppliers'

//*Layouts
import CategoryLayout from './assets/layout/CategoryLayout'
import DashboardLayout from './assets/layout/DashboardLayout'
import ProductLayout from './assets/layout/ProductLayout'
import SuppliersLayout from './assets/layout/SuppliersLayout'

function App() {
    return (
        <Router>
            <StyleSheetManager shouldForwardProp={(prop) => prop !== 'align'}>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/test' element={<Suppliers />} />
                    {/*Private components or Secured Components */}
                    <Route element={<PrivateRoutes />}>
                        <Route path="/" element={<DashboardLayout />} />
                        <Route path="/Categories" element={<CategoryLayout />} />
                        <Route path="/products" element={<ProductLayout />} />
                         <Route path="/suppliers" element={<SuppliersLayout />} />
                    </Route>
                </Routes>
            </StyleSheetManager>
        </Router>
    )
}

export default App
