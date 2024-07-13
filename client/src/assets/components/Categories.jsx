import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Sidebar from './sidebar'
import Tableloader from '../shared/Tableloader'
import Papa from 'papaparse'
import CategoryModal from '../shared/CategoryModal'
import Nav from './nav'
import axios from 'axios'

function Categories() {
    const [pending, setPending] = useState(true)
    const [rows, setRows] = useState()
    const [csvData, setCsvData] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [clickedRow, setClickedRow] = useState({ id: '', Category: '' })
    const [errorHandler, setErrorHandler] = useState(null)
    const [successNotifier, setSuccessNotifier] = useState(false)
   

    //* side effect
    useEffect(() => {
        fetchData()
    }, [])



    //* Handle csv format
    const formatCsvData = (data) => {
        return data.map(({ id, ...restdata }) => restdata)
    }


    //* datatable 
    const columns = [
        {
            name: 'Categories',
            selector: row => row.Category,
            sortable: true
        },
        {
            name: 'Actions',
            cell: row => (
                <div>
                    <button className='btn btn-primary btn-sm me-2' onClick={() => handleEdit(row)}><i className="bi bi-pencil-square"></i></button>
                    <button className='btn btn-danger btn-sm' onClick={() => handleDelete(row)}><i className="bi bi-trash"></i></button>
                </div>
            ),
        }
    ]

    const handleDelete = async (row) => {
        try {
            const data = row
            const response = await axios.delete('http://localhost:3000/api/deletecategory', {data})
            .then(res =>{
                if(res.status === 200){
                    fetchData()
                }
            })
            .catch(err =>{
                setErrorHandler(err.data.response.error)
            })
            
        } catch (error) {
            console.error(`Unexpected error: ${error}`)
        }
    }


    const handleEdit = (row) => {
        setClickedRow(row)
        setModalShow(true)
    }

    //* CSV download handler
    const handleDownloadCSV = () => {
        const csv = Papa.unparse(csvData)
        const blob = new Blob([csv], { type: 'text/csvcharset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.setAttribute('href', url)
        link.setAttribute('download', 'categories.csv')
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    //* Styles for DataTable
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

    //* Handle add category
    const handleCategory = async (e) => {
        e.preventDefault()
       

        const categoryInput = document.querySelector('.categoryinput')

       if(!categoryInput.value.length > 0) setErrorHandler('No input data.')
       else{
            const categoryName = e.target.categoryname.value

                try {
                    const response = await axios.post("http://localhost:3000/api/category", { categoryName })

                    if (response.status === 200) {
                        setSuccessNotifier(true)
                        setErrorHandler(null)
                        fetchData()
                        categoryInput.value = ''
                    }
                } catch (error) {
                    setErrorHandler(error.response.data.error)
                    setSuccessNotifier(false)
                }
           }
    }

    

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/getallcategories")
            const data = response.data

            setRows(data)
            setCsvData(formatCsvData(data))
            setPending(false)
        } catch (error) {
            setErrorHandler('Failed to fetch categories')
            setPending(false)
        }
    }


    const handleFilter = (e) =>{
        const value = e.target.value
        if(value.length === 0){
            fetchData()
        }else{
            const filter = rows.filter(row => row.Category.toLowerCase().includes(value.toLowerCase()))
            setRows(filter)
            setCsvData(formatCsvData(filter))
        }
        
    }
    


    const handleClearSearch = () =>{
       document.querySelector('#searchInput').value = ''
       fetchData() 
    }

    return (
        <div className='w-100 d-flex justify-content-center'>
            <div className="new w-50 h-auto">
                <div className="card m-5">
                    <h5 className="card-header fw-bold"><i className="bi bi-grid-3x3-gap"></i> ADD CATEGORY</h5>
                    <div className="card-body">
                        {errorHandler && (
                            <div className="alert alert-danger" role="alert">
                                {errorHandler}
                            </div>
                        )}
                        {successNotifier && (
                            <div className="alert alert-success" role="alert">
                                <p className='text-dark fw-bold'>ADDED SUCCESSFULLY</p>
                            </div>
                        )}
                        <form onSubmit={handleCategory}>
                            <div className="input-group input-group-sm mb-3">
                                <input type="text" name='categoryname' className="categoryinput form-control" placeholder="Username" />
                            </div>
                            <button type="submit" className='btn btn-primary btn-sm'>ADD CATEGORY</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="table w-50">
                <div className="list m-5 border">
                    <DataTable
                        title="ALL CATEGORIES"
                        columns={columns}
                        data={rows}
                        progressPending={pending}
                        progressComponent={<Tableloader />}
                        fixedHeader
                        fixedHeaderScrollHeight='400px'
                        theme='default'
                        dense
                        subHeader
                        subHeaderAlign='right'
                        subHeaderComponent={
                            <div className="d-flex h-auto">
                                <div className="input-group input-group-md">
                                    <input type="text" className="form-control" id='searchInput' placeholder='Filter by category' onChange={handleFilter} />
                                    <button className="input-group-text btn btn-primary" onClick={handleClearSearch}>Clear</button>
                                    <button className='input-group-text btn btn-success' onClick={handleDownloadCSV}><i className="bi bi-download"></i></button>
                                </div>
                            </div>
                        }
                        highlightOnHover
                        customStyles={customStyles}
                        pagination
                        responsive
                    />
                </div>
            </div>
            <CategoryModal 
            show={modalShow} 
            onHide={() => setModalShow(false)} 
            categoryname={clickedRow.Category} 
            categoryid={clickedRow.id}
            fetchData={fetchData}
             />
        </div>
    )
}

export default Categories
