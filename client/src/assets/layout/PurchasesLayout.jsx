//*Components
import Sidebar from '../components/sidebar'
import Nav from '../components/nav'
import Purchases from '../components/Purchases'

function PurchasesLayout() {
  return (
    <div className='w-100 h-100 d-flex flex-column'>
           <Nav />
        

        <div className="wrapper w-100  d-flex flex-row">
            <Sidebar />
            <Purchases />
        </div>
    </div>
  )
}

export default PurchasesLayout
