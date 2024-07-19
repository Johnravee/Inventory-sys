import axios from "axios"
import { useEffect, useState } from "react"


export default function Dashboard(){

    const [categoryCount, setCategoryCount] = useState(0)
    const [productCount, setProductCount] = useState(0)
    const [recentAddProduct, setRecentAddedProduct] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [popularProducts, setPopularProducts] = useState([])
    const [allSales, setAllSales] = useState(0)

    //* side effects
    useEffect(() =>{
        countCategories()
        countProducts()
        recentAddedProduct()
        activeSuppliers()
        popularProd()
        overallSales()
    },[])

    const countCategories = async () =>{
        try {
            const response = await axios.get('http://localhost:3000/api/totalcategory')

            setCategoryCount(response.data.categories)
        } catch (error) {
            console.error(`Unexpected Error: ${error}`);
        }
    }


    const countProducts = async () =>{
        try {
            const response = await axios.get('http://localhost:3000/api/totalproduct')
            const data = response.data.totalProduct
        
            setProductCount(data)

        } catch (error) {
            console.error(`Unexpected Error: ${error}`);
        }
    }

    const recentAddedProduct = async () =>{
        try {
            const response = await axios.get('http://localhost:3000/api/recentlyaddproduct')
            const data = response.data
        
           setRecentAddedProduct(data)

 
      

        } catch (error) {
            console.error(`Unexpected Error: ${error}`);
        }
    }

    const activeSuppliers = async () =>{
        try {
            const response = await axios.get('http://localhost:3000/api/activesuppliers')
            const data = response.data
           setSuppliers(data)
        } catch (error) {
            console.error(`Unexpected Error: ${error}`);
        }
    }

    const popularProd = async () =>{
        try {
            const response = await axios.get('http://localhost:3000/api/popularproduct')
            const data = response.data
           setPopularProducts(data)
        } catch (error) {
            console.error(`Unexpected Error: ${error}`);
        }
    }

    const overallSales = async () =>{
        try {
            const response = await axios.get('http://localhost:3000/api/overallsales')
            const data = response.data[0].sales
           setAllSales(data)
        } catch (error) {
            console.error(`Unexpected Error: ${error}`);
        }
    }



    return(
        <>
            <div className="wrapper w-100 h-auto bg-secondary-subtle">
                <div className="wrapper-monitor w-100 d-flex justify-content-evenly pt-4 pb-4 flex-wrap">
                    <div className="monitor w-25  d-flex justify-content-evenly align-items-center p-4 bg-white rounded-1 m-1 flex-wrap text-dark shadow border-start border-primary border-end  border-4">
                        <div className="monitor-logo">
                            <h1><i className="bi bi-people"></i></h1>
                        </div>
                        <div className="monitor-context d-flex align-items-center flex-column">
                            <h1 className="counter">{categoryCount}</h1>
                            <h5 className="monitor-title">Categories</h5>
                        </div>
                    </div>

                    <div className="monitor w-25  d-flex justify-content-evenly align-items-center p-4 bg-white rounded-1 m-1 flex-wrap text-dark shadow border-start border-warning border-end border-4">
                        <div className="monitor-logo">
                            <h1><i className="bi bi-people"></i></h1>
                        </div>
                        <div className="monitor-context d-flex align-items-center flex-column">
                            <h1 className="counter">{productCount}</h1>
                            <h5 className="monitor-title">Products</h5>
                        </div>
                    </div>

                    <div className="monitor w-25  d-flex justify-content-evenly align-items-center p-4 bg-white rounded-1 m-1 flex-wrap text-dark shadow border-start border-success border-end  border-4">
                        <div className="monitor-logo">
                            <h1><i className="bi bi-people"></i></h1>
                        </div>
                        <div className="monitor-context d-flex align-items-center flex-column">
                            <h1 className="counter">{allSales}</h1>
                            <h5 className="monitor-title">Sales</h5>
                        </div>
                    </div>
                </div>    

                <div className="Card-wrapper w-100 d-flex justify-content-evenly p-2 flex-wrap">
                   <div className="bg-white p-4 border-top border-3 border-success">
                        <h5 className="border-bottom border-2 pb-2"><i className="bi bi-grid-3x3-gap"></i> RECENTLY ADDED PRODUCTS</h5>
                        <div className="card-body">
                            <table className="table table-responsive">
                            <thead>
                                <tr>

                                <th scope="col">Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Stocks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentAddProduct.map(element => (
                                    <tr key={element.id}>
                                        <td >{element.name}</td>
                                        <td className="text-wrap">{element.category}</td>
                                        <td>{element.stocks < 20 ?
                                                <span className="badge bg-danger">{element.stocks}</span>
                                                :
                                                <span className="badge bg-success">{element.stocks}</span> 
                                            }
                                         </td>
                                    </tr>
                                ))}
                               
                            </tbody>
                            </table>
                        </div>
                    </div>

                     <div className="bg-white p-4 border-top border-3 border-success">
                        <h5 className="border-bottom border-2 pb-2"><i className="bi bi-grid-3x3-gap"></i> POPULAR PRODUCTS</h5>
                        <div className="card-body">
                            <table className="table">
                            <thead>
                                <tr>

                                <th scope="col">Product</th>
                                <th scope="col">Sales</th>
                                </tr>
                            </thead>
                            <tbody>
                                {popularProducts.map(element => (
                                    <tr key={element.id}>
                                        <td >{element.ordered_product}</td>
                                        <td className="text-wrap">{element.sales}</td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>

                     <div className="bg-white p-4 border-top border-3 border-success">
                        <h5 className="border-bottom border-2 pb-2"><i className="bi bi-grid-3x3-gap"></i>ACTIVE SUPPLIERS</h5>
                        <div className="card-body">
                            <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                  {suppliers.map(element => (
                                    <tr key={element.id}>
                                        <td >{element.name}</td>
                                        <td className="text-wrap">{element.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>    
        </>
    )
}