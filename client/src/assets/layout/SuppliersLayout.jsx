import Suppliers from "../components/Suppliers"
import Nav from "../components/nav"
import Sidebar from "../components/sidebar"

function SuppliersLayout() {
  return (
    <div className='w-100 h-100 d-flex flex-column'>
           <Nav />
        

        <div className="wrapper w-100  d-flex flex-row">
            <Sidebar />
            <Suppliers />
        </div>
    </div>
  )
}

export default SuppliersLayout
