//*Components
import Dashboard from "../components/dashboard"
import Sidebar from '../components/sidebar'
import Nav from '../components/nav'

function DashboardLayout() {
  return (
     <div className='w-100 h-100 d-flex flex-column'>
           <Nav />
        

        <div className="wrapper w-100 d-flex flex-row">
            <Sidebar />
            <Dashboard />
        </div>
    </div>
  )
}

export default DashboardLayout
