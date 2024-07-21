import DataTable from "react-data-table-component"
import axios from "axios"
import Tableloader from "../shared/Tableloader"
import { useState, useEffect } from "react"
import AddSupplierModal from "../shared/AddSupplierModal"
import Badge from 'react-bootstrap/Badge'
import Papa from 'papaparse'
import SupplierEditModal from "../shared/SupplierEditModal"

function Suppliers() {
  const [pending, setPending] = useState(false)
  const [rows, setRows] = useState([])
  const [addSupplierModal, setSupplierModal] = useState(false)
  const [csvData, setCsvData] = useState()
  const [editSupplierModal, setEditSupplierModal] = useState(false)
  const [clickedRow, setClickedRow] = useState({})


 
  useEffect(() => {
    fetchData()
  }, []) 

  const fetchData = async () =>{
    try {
            const response = await axios.get("http://localhost:3000/api/allsuppliers")
            const data = response.data

            setRows(data)
            setCsvData(formatCsvData(data))
            setPending(false)
        } catch (error) {
            setRows([])
            setPending(false)
            setCsvData([])
        }
  }

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status === 'Active' ? <Badge bg="success">Active</Badge> : <Badge bg="secondary">Inactive</Badge>,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(row)}>
            <i className="bi bi-pencil-square"></i>
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ),
    },
  ]

  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
        },
      },
    },
  }


  const handleAddSupplier = () => {
        setSupplierModal(true)
    }

    const handleFilter = (e) =>{
         const value = e.target.value
        if(value.length === 0){
            fetchData()
        }else{
            const filter = rows.filter(row => row.name.toLowerCase().includes(value.toLowerCase()))
            setRows(filter)
            setCsvData(formatCsvData(filter))
        }
    }


    const handleDownloadCSV = () => {
        const csv = Papa.unparse(csvData)
        const blob = new Blob([csv], { type: 'text/csvcharset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.setAttribute('href', url)
        link.setAttribute('download', 'suppliers.csv')
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

      //* Handle csv format
    const formatCsvData = (data) => {
        return data.map(({ id, ...restdata }) => restdata)
    }

    const handleClearSearch = () =>{
       document.querySelector('#searchInput').value = ''
       fetchData() 
    }

    const handleEdit = (row) =>{
      setClickedRow(row)
      setEditSupplierModal(true)
    }

    const handleDelete = async (row) =>{
      const data = {id : row.id}


      try {
         const response = await axios.delete('http://localhost:3000/api/deletesupplier', {data})

         if(response.status === 200){
          fetchData()
         }
          


      } catch (error) {
        console.error("Error deleting supplier", error);
      }
    }


  return (
    <div className="w-100 h-auto bg-secondary-subtle d-flex justify-content-start align-items-start">
      <div className=" w-100 border-top border-3 border-primary m-3">
        <DataTable
          title="SUPPLIERS"
          columns={columns}
          data={rows}
          progressPending={pending}
          progressComponent={<Tableloader />}
          fixedHeader
          fixedHeaderScrollHeight="450px"
          theme="default"
          dense
          subHeader
          subHeaderAlign="right"
          subHeaderComponent={
            <div className="d-flex h-auto">
              <div className="input-group input-group-md">
                <button className="input-group-text btn btn-success fw-medium me-1" onClick={handleAddSupplier}>
                  <i className="bi bi-plus-square pe-2"></i>Add Supplier
                </button>
                <input
                  type="text"
                  className="form-control"
                  id="searchInput"
                  placeholder="Filter by name"
                  onChange={handleFilter}
                />
                <button className="input-group-text btn btn-primary" onClick={handleClearSearch}>
                  Clear
                </button>
                <button className="input-group-text btn btn-success fw-bold" onClick={handleDownloadCSV}>
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

      <AddSupplierModal 
      show={addSupplierModal}
      onHide={() => setSupplierModal(false)}
      fetchData={fetchData}
      />

      <SupplierEditModal
      show={editSupplierModal}
      onHide={() => setEditSupplierModal(false)}
      Data={clickedRow}
      fetchData={fetchData}
      />
    </div>
  )
}

export default Suppliers
