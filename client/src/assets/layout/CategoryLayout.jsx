//*Components
import Categories from '../components/Categories'
import Sidebar from '../components/sidebar'
import Nav from '../components/nav'
function CategoryLayout() {
  return (
    <div className='w-100 h-100 d-flex'>
        <Sidebar />

        <div className="wrapper w-100 d-flex flex-column">
            <Nav />
            <Categories />
        </div>
    </div>
  )
}

export default CategoryLayout
