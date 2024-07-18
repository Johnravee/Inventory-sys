//* Components
import Sidebar from "../components/sidebar"
import Nav from "../components/nav"
import Customers from "../components/Customers"

function CustomersLayout() {
  return (
    <div className='w-100 h-100 d-flex flex-column'>
           <Nav />
        

        <div className="wrapper w-100 d-flex flex-row">
            <Sidebar />
            <Customers />
        </div>
    </div>
  )
}

export default CustomersLayout
