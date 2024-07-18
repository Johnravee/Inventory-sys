import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import Tableloader from '../shared/Tableloader'
import ProductsEditModal from '../shared/ProductsEditModal'
import AddProductModal from '../shared/AddProductModal'
import Badge from 'react-bootstrap/Badge'
import Papa from 'papaparse'

function Products() {
    const [pending, setPending] = useState(true)
    const [rows, setRows] = useState([])
    const [editModalShow, setEditModalShow] = useState(false)
    const [addModalShow, setAddModalShow] = useState(false)
    const [clickedRow, setClickedRow] = useState({})
    const [csvFIle, setCSVFile] = useState()
    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        fetchData()
        fetchCategory()
    }, [])

    async function fetchData() {
        try {
            const response = await axios.get("http://localhost:3000/api/getproducts")
            if (response.status === 200) {
                const data = response.data
                setRows(data)
                setCSVFile(formatCsvData(data))
            } else {
                console.error('Failed to fetch products. Status:', response.status)
            }
        } catch (error) {
            console.error('Failed to fetch products:', error.message)
        } finally {
            setPending(false)
        }
    }

    const handleEdit = (row) => {
        setClickedRow(row)
        setEditModalShow(true)
    }

    const handleAddProduct = () => {
        setAddModalShow(true)
    }

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Image',
            cell: row => (
                <img
                    src={`data:image/*;base64,${row.image}`}
                    alt={row.name}
                    style={{ width: '130px', height: '130px', objectFit: 'cover', padding: '5px' }}
                />
            ),
        },
        { 
            name: 'Category',
            selector: row => row.category,
            sortable: true
        },
        {
            name: 'Stocks',
           selector: row => (
                                parseInt(row.stocks) < 20 ? 
                                <span className="badge bg-danger">{row.stocks}</span> : 
                                <span className="badge bg-success">{row.stocks}</span>
                            ),
            sortable: true
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true
        },
        {
            name: 'Status',
            selector: row => row.status === 'Active' ? <Badge bg="success">Active</Badge> : <Badge bg="secondary">Inactive</Badge>,
            sortable: true
        },
        {
            name: 'Actions',
            cell: row => (
                <div>
                    <button className='btn btn-primary btn-sm me-2' onClick={() => handleEdit(row)}>
                        <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className='btn btn-danger btn-sm' onClick={() => handleDelete(row)}>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            ),
        }
    ]

    const customStyles = {
        header: {
            style: {
                minHeight: '56px',
            },
        },
        headRow: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
            },
        },
        headCells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                },
            },
        },
        cells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                },
            },
        },
    }

   const handleDownloadCSV = () => {
    const formattedData = formatCsvData(csvFIle)
    const csv = Papa.unparse(formattedData,{header : true})
    const blob = new Blob([csv], { type: 'text/csvcharset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', 'products.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}


 const formatCsvData = (data) => {

    return data.map(({ id, image , ...restdata }) => ({
        ...restdata,
    }))
}


const handleFilter = (e) =>{
        const value = e.target.value
        if(value.length === 0){
            fetchData()
        }else{
            const filter = rows.filter(row => row.name.toLowerCase().includes(value.toLowerCase()))
            setRows(filter)
            setCSVFile(formatCsvData(filter))
        }
        
    }

     const handleClearSearch = () =>{
       document.querySelector('#searchInput').value = ''
       fetchData() 
    }

     const handleDelete = async (row) => {
        try {
            const data = {id : row.id}
            const response = await axios.delete('http://localhost:3000/api/deleteproduct', {data})

            if(response.status === 200){
                fetchData()
            }
            
        } catch (error) {
            console.error(`Unexpected error: ${error}`)
        }
    }

    const fetchCategory = async () =>{
        try {
            const response = await axios.get("http://localhost:3000/api/getallcategories")
            const data = response.data
            setCategories(data)
         
            
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
        }

    return (
        <div className='w-100 h-auto bg-secondary-subtle d-flex justify-content-start align-items-start'>
            <div className=' w-100 border-top border-3 border-primary m-3'>
                <DataTable
                title="PRODUCTS"
                columns={columns}
                data={rows}
                progressPending={pending}
                progressComponent={<Tableloader />}
                fixedHeader
                fixedHeaderScrollHeight='450px'
                theme='default'
                dense
                subHeader
                subHeaderAlign='right'
                subHeaderComponent={
                    <div className="d-flex h-auto">
                        <div className="input-group input-group-md">
                            <button className='input-group-text btn btn-success fw-medium me-1' onClick={handleAddProduct}>
                                <i className="bi bi-plus-square pe-2"></i>Add Product
                            </button>
                            <input type="text" className="form-control" id='searchInput' placeholder='Filter by name' onChange={handleFilter}/>
                            <button className="input-group-text btn btn-primary" onClick={handleClearSearch}>Clear</button>
                            <button className='input-group-text btn btn-success fw-bold' onClick={handleDownloadCSV}>
                                <i className="bi bi-download pe-2"></i>CSV
                            </button>
                        </div>
                    </div>
                }
                highlightOnHover
                customStyles={customStyles}
                pagination
                responsive
            />
            </div>

            <ProductsEditModal 
            show={editModalShow} 
            onHide={() => { setEditModalShow(false) }} 
            Data={clickedRow} 
            fetchData={fetchData}
            />

            <AddProductModal 
            show={addModalShow} 
            onHide={() => setAddModalShow(false)}
            fetchData={fetchData}
            categories={categories}
            />
        </div>
    )
}

export default Products
