import Products from "../components/Products"
import Nav from "../components/nav"
import Sidebar from "../components/sidebar"

function ProductLayout() {
  return (
    <div className='w-100 h-100 d-flex flex-column'>
           <Nav />
        

        <div className="wrapper w-100  d-flex flex-row">
            <Sidebar />
            <Products />
        </div>
    </div>
  )
}

export default ProductLayout
