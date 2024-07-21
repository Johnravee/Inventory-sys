import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import Tableloader from '../shared/Tableloader'
import Papa from 'papaparse'

function Purchases() {
  const [pending, setPending] = useState(false)
  const [validated, setValidated] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [products, setProducts] = useState([])
  const [customers, setCustomers] = useState([])
  const [orderLists, setOrderLists] = useState([])
  const [csvData, setCsvData] = useState([])

  useEffect(() => {
    fetchProducts()
    fetchCustomers()
    fetchOrders()
    
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/salesproduct')

      if (response.status === 200) {
        const data = response.data
        setProducts(data)
      }
    } catch (error) {
      setProducts([])
    }
  }

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/allcustomers')

      if (response.status === 200) {
        const data = response.data
        setCustomers(data)
      }
    } catch (error) {
      setCustomers([])
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/orderlists')

      if (response.status === 200) {
        const data = response.data
        setOrderLists(data)
        setCsvData(formatCsvData(data))
      }
    } catch (error) {
      setOrderLists([])
    }
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  const form = e.currentTarget

  if (form.checkValidity() === false) {
    e.stopPropagation()
    setValidated(true)
  } else {
    const formData = {
      customer: selectedCustomer,
      product: selectedProduct,
      qty: quantity,
      billnum: generateBillNum(),
      amount: price,
    }

    try {
      const response = await axios.post('http://localhost:3000/api/buyproduct', formData)

      if (response.status === 201) {
        resetForm()
        setValidated(false)
        fetchOrders()
      }
    } catch (error) {
      console.error('Error submitting form', error)
    }
  }
};

  const resetForm = () => {
    setSelectedProduct('')
    setSelectedCustomer('')
    setQuantity('')
    setPrice('')
    setValidated(false) 
  }

  const handleProductChange = (event) => {
    const productName = event.target.value
    setSelectedProduct(productName)

    const selectedProduct = products.find((product) => product.name === productName)
    if (selectedProduct) {
      setPrice(selectedProduct.price.toString())
    }
  }

  const handleCustomerChange = (event) => {
    const customerId = event.target.value
    setSelectedCustomer(customerId)
  }

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value
    setQuantity(newQuantity)

    const priceOfSelectedProduct = products.find((product) => product.name === selectedProduct)

    if (newQuantity === '' || parseInt(newQuantity) === 0) {
      setPrice(priceOfSelectedProduct.price.toString())
      return
    }

    const parsedPrice = parseInt(price)
    const parsedQuantity = parseInt(newQuantity)

    const totalAmount = parsedPrice * parsedQuantity

    setPrice(totalAmount.toString())
  }

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

  const columns = [
    {
      name: 'Customer',
      selector: (row) => row.customer,
      sortable: true,
    },
    {
      name: 'Product',
      selector: (row) => row.ordered_product,
      sortable: true,
    },
    {
      name: 'Qty',
      selector: (row) => row.qty,
      sortable: true,
    },
    {
      name: 'Bill # ',
      selector: (row) => row.bill_num,
      sortable: true,
    },
    {
      name: 'Total amount',
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: 'Date',
      selector: (row) => new Date(row.created_at).toLocaleString(),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ),
    },
  ]

  const handleClearSearch = () => {}

const handleDownloadCSV = () => {
  const csv = Papa.unparse(csvData, { header: true });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'orders.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  const formatCsvData = (data) => {
    return data.map(({ id , ...restdata }) => ({
        ...restdata,
    }))

  
}

const handleFilter = (e) =>{
        const value = e.target.value
        if(value.length === 0){
            fetchOrders()
        }else{
            const filter = orderLists.filter(row => row.customer.toLowerCase().includes(value.toLowerCase()))
            setOrderLists(filter)
            setCsvData(formatCsvData(filter))
        }
        
    }


  const handleDelete = async (row) =>{
    try {
            const data = {id : row.id}
            const response = await axios.delete('http://localhost:3000/api/deleteorder', {data})

            if(response.status === 200){
                fetchOrders()
            }
            
        } catch (error) {
            console.error(`Unexpected error: ${error}`)
        }

  }
  

  const generateBillNum = () => {
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let billNum = ''

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * alphanumeric.length)
        billNum += alphanumeric[randomIndex]
    }

    return billNum
}

  return (
    <div className='w-100 h-auto bg-secondary-subtle d-flex justify-content-start align-items-start flex-column'>
      <div className="border border-primary p-3 m-5 bg-white p-4" style={{ maxWidth: '50%' }}>
        <h5 className="fw-bold mb-3">
          <i className="bi bi-grid-3x3-gap"></i> ORDER FORM
        </h5>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Product</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-gear"></i>
                </span>
                <Form.Select
                  required
                  value={selectedProduct}
                  onChange={handleProductChange}
                  aria-label="Select Product"
                >
                  <option value="">Please select product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please select a product.</Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustomCustomer">
              <Form.Label>Customer</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-person"></i>
                </span>
                <Form.Select
                  required
                  value={selectedCustomer}
                  onChange={handleCustomerChange}
                  aria-label="Select Customer"
                >
                  <option value="">Please select customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.name}>
                      {customer.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please select a customer.</Form.Control.Feedback>
              </div>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Quantity</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-cart"></i>
                </span>
                <Form.Control
                  type="text"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  required
                  aria-describedby="inputGroupPrepend"
                />
                <Form.Control.Feedback type="invalid">Please enter quantity.</Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustomPrice">
              <Form.Label>Price</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-currency-dollar"></i>
                </span>
                <Form.Control
                  type="text"
                  placeholder="Price"
                  value={price}
                  readOnly
                  aria-describedby="inputGroupPrepend"
                />
              </div>
            </Form.Group>
          </Row>

          <Button type="submit">Submit form</Button>
        </Form>
      </div>

      <div className="table w-100">
        <div className="list m-5 border-3 border-top border-primary">
          <DataTable
            title="ORDERS"
            columns={columns}
            data={orderLists}
            progressPending={pending}
            progressComponent={<Tableloader />}
            fixedHeader
            fixedHeaderScrollHeight="400px"
            theme="default"
            dense
            subHeader
            subHeaderAlign="right"
            subHeaderComponent={
              <div className="d-flex h-auto">
                <div className="input-group input-group-md">
                  <input
                    type="text"
                    className="form-control"
                    id="searchInput"
                    placeholder="Filter by customer "
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
      </div>
    </div>
  )
}

export default Purchases
