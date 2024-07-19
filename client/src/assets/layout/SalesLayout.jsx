//*Components
import Sidebar from '../components/sidebar'
import Nav from '../components/nav'
import Sales from '../components/Sales'

function SalesLayout() {
  return (
    <div className='w-100 h-100 d-flex flex-column'>
           <Nav />
        

        <div className="wrapper w-100  d-flex flex-row">
            <Sidebar />
            <Sales />
        </div>
    </div>
  )
}

export default SalesLayout
