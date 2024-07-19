import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

export default function Sidebar() {
    const navigate = useNavigate()

  const handleLoggingout = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/loggingout', {
                withCredentials: true, 
            })

            if (response.status === 200) {
                navigate('/login')
            }
        } catch (err) {
            console.error("Logging out error", err)
            console.log('Error response:', err.response)
        }
    }

    return (
        <aside className="col-auto vh-100 w-25 d-flex bg-dark align-items-center flex-column border-end shadow-sm sticky-top pe-3">
            <div className="list-group w-100 d-flex justify-content-evenly rounded-0 link-offset-1-hover">
                <Link to="/" className="list-group-item list-group-item-action p-3 bg-dark text-white border-0">
                    <i className="bi bi-speedometer2 m-2"></i>
                    <span className="m-1 fs-6 fw-bold">Dashboard</span>
                </Link>

                <Link to="/Categories" className="list-group-item list-group-item-action p-3 border-0 bg-dark text-white">
                    <i className="bi bi-boxes m-2"></i>
                    <span className="m-1 fs-6 fw-bold">Categories</span>
                </Link>

                <Link to="/products" className="list-group-item list-group-item-action p-3 border-0 bg-dark text-white">
                    <i className="bi bi-ui-checks-grid m-2"></i>
                    <span className="m-1 fs-6 fw-bold">Products</span>
                </Link>

                <Link to="/suppliers" className="list-group-item list-group-item-action p-3 border-0 bg-dark text-white">
                    <i className="bi bi-truck m-2"></i>
                    <span className="m-1 fs-6 fw-bold">Suppliers</span>
                </Link>

                <Link to="/customers" className="list-group-item list-group-item-action p-3 border-0 bg-dark text-white">
                    <i className="bi bi-people-fill m-2"></i>
                    <span className="m-1 fs-6 fw-bold">Customers</span>
                </Link>


                <Link to="/purchases" className="list-group-item list-group-item-action p-3 border-0 bg-dark text-white">
                    <i className="bi bi-handbag m-2"></i>
                    <span className="m-1 fs-6 fw-bold">Purchases</span>
                </Link>

                <Link to="/sales" className="list-group-item list-group-item-action p-3 border-0 bg-dark text-white">
                    <i className="bi bi-printer m-2"></i>
                    <span className="m-1 fs-6 fw-bold">Sales</span>
                </Link>

                <button className="list-group-item list-group-item-action p-3 border-0 bg-dark text-danger" onClick={handleLoggingout}>
                    <i className="bi bi-door-closed-fill m-2"></i>
                    <span className="m-1 fs-6 fw-bold">Logout</span>
                </button>
            </div>
        </aside>
    )
}
