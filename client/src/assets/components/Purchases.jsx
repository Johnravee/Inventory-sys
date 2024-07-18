import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axios from 'axios'

function Purchases() {
  const [validated, setValidated] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [products, setProducts] = useState([])
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    fetchProducts()
    fetchCustomers()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/salesproduct')

      if (response.status === 200) {
        const data = response.data
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products', error)
    }
  }

  const fetchCustomers = async () => {

      try {
        const response = await axios.get('http://localhost:3000/api/allcustomers')

        if(response.status === 200){
          const data = response.data
          setCustomers(data)
        }

      } catch (error) {
        console.error("Error fetching customer ", error)
      }
    }
  
//* handle form submit
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
  }

//*handle product selected price
  const handleProductChange = (event) => {
    const productId = event.target.value

    setSelectedProduct(productId)

    const selectedProduct = products.find((product) => product.id === parseInt(productId))
    if (selectedProduct) {
      setPrice(selectedProduct.price.toString())
    }
  }

  const handleCustomerChange = (event) => {
    const customerId = event.target.value

    setSelectedCustomer(customerId)

  }


  //* Quantity
  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value

    setQuantity(newQuantity)

    const priceOfSelectedProduct = products.find((product) => product.id === parseInt(selectedProduct))

    if (newQuantity === '' || parseInt(newQuantity) === 0) {
      setPrice(priceOfSelectedProduct.price.toString())
      return
    }

    const parsedPrice = parseInt(price)
    const parsedQuantity = parseInt(newQuantity)

    const totalAmount = parsedPrice * parsedQuantity

    setPrice(totalAmount.toString())
  }

  return (
    <div className="border border-primary p-3" style={{ maxWidth: '50%' }}>
      <h5 className="fw-bold mb-3"><i className="bi bi-grid-3x3-gap"></i> ORDER FORM</h5>
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
                  <option key={product.id} value={product.id}>
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
                  <option key={customer.id} value={customer.id}>
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
  )
}

export default Purchases
