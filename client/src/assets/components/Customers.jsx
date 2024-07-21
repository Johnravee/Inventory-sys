import React, { useEffect, useState } from 'react';
import Tableloader from '../shared/Tableloader'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import Papa from 'papaparse'
import EditCustomerModal from '../shared/EditCustomerModal';

const Customers = () => {

  const [pending, setPending] = useState(true)
  const [rows, setRows] = useState([])
  const [formData, setFormData] = useState({
                                            name : '',
                                            email: '',
                                            contact: ''
                                          })
  const [successNotifier, setSuccessNotifies] = useState(false)
  const [errorNotifier, setErrorNotifier] = useState(false)
  const [csvData, setCsvData] = useState([])
  const [editCustomerModal, setEditCustomerModal] = useState(false)
  const [clickedRow, setClickedRow] = useState({})

  useEffect(()=>{
    fetchData()
  },[])

  const handleForm = async (e) =>{
    e.preventDefault()

    const formToSend = formData

    try {
      const response = await axios.post('http://localhost:3000/api/newcustormer', formToSend)

      if(response.status === 201){
        fetchData()
        setFormData({
                    name : '',
                    email: '',
                    contact: ''
                  })
        setSuccessNotifies(true)
        setErrorNotifier(false)
      }else{
        setErrorNotifier(true)
        setSuccessNotifies(false)
      }

    } catch (error) {
      console.error("Error add new customer", error)
    }
  }

  const handleEdit = (row) =>{
    setClickedRow(row)
    setEditCustomerModal(true)
  }

  const handleDelete = async (row) => {
    const data = {id : row.id}
 

    try {
      const response = await axios.delete('http://localhost:3000/api/deletecustomer', {data})

      if(response.status === 200){
        fetchData()
      }
    } catch (error) {
      console.error("Error deleting details customer", error)
    }
  }

  const handleInput = (e) =>{
    const {value, name } = e.target
    setFormData({ ...formData ,[name]: value })

  }


  const handleClearSearch = () => {
    document.querySelector('#searchInput').value = ''
    fetchData() 
  }

 
  const handleFilter = (e) =>{
            const value = e.target.value
            if(value.length === 0){
                fetchData()
            }else{
                const filter = rows.filter(row => row.name.toLowerCase().includes(value.toLowerCase()))
                setRows(filter)
                setCsvData(formatCsvData(filter ))
            }
  }


  //* Handle csv format
    const formatCsvData = (data) => {
        return data.map(({ id, ...restdata }) => restdata)
    }

        //* CSV download handler
    const handleDownloadCSV = () => {
        const csv = Papa.unparse(csvData)
        const blob = new Blob([csv], { type: 'text/csvcharset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.setAttribute('href', url)
        link.setAttribute('download', 'customerlist.csv')
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


  //* datatable 
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Contact #',
            selector: row => row.contact,
            sortable: false
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


  
    const fetchData = async () =>{
      try {
        const response = await axios.get('http://localhost:3000/api/allcustomers')

        if(response.status === 200){
          const data = response.data
          setRows(data)
          setCsvData(formatCsvData(data))
          setPending(false)
        }

      } catch (error) {
       setCsvData([])
       setRows([])
        setPending(false)
      }
    }
    
    return (
         <div className='w-100 h-auto d-flex justify-content-center bg-secondary-subtle flex-column'>
            <div className="new w-50 h-auto">
                <div className="p-3 bg-white m-5 border-top border-3 border-primary">
                    <h5 className="fw-bold mb-3"><i className="bi bi-grid-3x3-gap"></i> NEW CUSTOMER</h5>
                    <div className="card-body">
                        {errorNotifier && (
                            <div className="alert alert-danger" role="alert">
                                FAILED TO ADD NEW CUSTOMER
                            </div>
                        )}
                        {successNotifier && (
                            <div className="alert alert-success" role="alert">
                                <p className='text-dark fw-bold'>ADDED SUCCESSFULLY</p>
                            </div>
                        )}
                        <form onSubmit={handleForm}>
                            <div className="input-group input-group-sm mb-3">
                                <input type="text" name='name' value={formData.name} onChange={handleInput} className="name form-control" placeholder="Name" required />
                            </div>
                            <div className="input-group input-group-sm mb-3">
                                <input type="email" name='email' value={formData.email} onChange={handleInput} className="email form-control" placeholder="Email" required />
                            </div>
                            <div className="input-group input-group-sm mb-3">
                                <input type="text" name='contact' value={formData.contact}  onChange={handleInput} className="contact form-control" placeholder="Contact" required />
                            </div>
                            <button type="submit" className='btn btn-primary btn-sm'>ADD CUSTOMER</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="table w-100 ">
                <div className="list m-5 border-3  border-top border-primary">
                    <DataTable
                        title="CUSTOMERS"
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
                                    <button className='input-group-text btn btn-success fw-bold' onClick={handleDownloadCSV}><i className="bi bi-download pe-2"></i>CSV</button>
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
            <EditCustomerModal
            show={editCustomerModal}
            onHide={()=> setEditCustomerModal(false)}
            fetchData={fetchData}
            Data={clickedRow}
            />          
        </div>
    );
};

export default Customers;
