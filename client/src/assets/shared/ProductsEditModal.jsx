import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import axios from 'axios'

function ProductsEditModal(props) {
  const { show, onHide, Data, fetchData } = props

  
  const [file, setFile] = useState(null)
  const [fileToStore, setFileToStore] = useState(null)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    stocks: '',
    price: '',
    status: '',
    image: ''
  })



  useEffect(() => {
    if (Data) {
      setFormData({
        id: Data.id || '',
        name: Data.name || '',
        category: Data.category || '',
        stocks: Data.stocks || '',
        price: Data.price || '',
        status: Data.status || '',
        image: Data.image || ''
      })
    }
  }, [Data])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      const reader = new FileReader()
      setFileToStore(selectedFile)
      reader.onloadend = () => {
        setFile(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    

    try {
      const formDataToSend = {
        productId: formData.id,
        productName: formData.name,
        productImage: fileToStore ? fileToStore : null,
        category: formData.category,
        productStocks: formData.stocks,
        productPrice: formData.price,
        status: formData.status
      }

   
    

      const response = await axios.put('http://localhost:3000/api/updateproduct', formDataToSend, {
        headers: {
        'Content-Type': 'multipart/form-data',
      }
      })



      if(response.status === 200){

        fetchData()
        onHide()
      }

      onHide()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleFormSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-uppercase">
            <i className="bi bi-pencil-square me-1"></i>
            <span>Edit Product</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} className="mb-3 d-flex align-items-center">
            <Col lg={9}>
              <Form.Control
                type="text"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                className="inputs productID"
                hidden
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex align-items-center">
            <Form.Label column lg={3}>
              Product Name
            </Form.Label>
            <Col lg={9}>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="inputs"
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex align-items-center">
            <Form.Label column lg={3}>
              Product Stocks
            </Form.Label>
            <Col lg={9}>
              <Form.Control
                type="text"
                name="stocks"
                value={formData.stocks}
                onChange={handleInputChange}
                className="inputs productStocks"
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex align-items-center">
            <Form.Label column lg={3}>
              Price
            </Form.Label>
            <Col lg={9}>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="inputs text-success fw-bolder productPrice"
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex align-items-center">
            <Form.Label column lg={3}>
              Category
            </Form.Label>
            <Col lg={9}>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="inputs"
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex align-items-center">
            <Form.Label column lg={3}>
              Status
            </Form.Label>
            <Col lg={9}>
              <Form.Select
                aria-label="Default select example"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="inputs"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex align-items-center">
            <Form.Label column lg={3}>
              Image
            </Form.Label>
            <Col lg={9}>
              <Form.Control type="file" name='image' onChange={handleImageChange} className="mt-2" />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex align-items-center justify-content-evenly">
            <Form.Label column lg={3} className="fw-bold">
              Image preview
            </Form.Label>
            <Col lg={9} className="d-flex align-items-center flex-column">
              <div className="d-flex align-items-center">
                <Image
                  className="modalProductImage"
                  src={file ? file : `data:image/*;base64,${formData.image}`}
                  alt="product image"
                  fluid
                  style={{ width: '130px', height: '130px', objectFit: 'cover', padding: '5px' }}
                  thumbnail
                />
              </div>
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" type="submit" className="updateProduct">
            Save changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default ProductsEditModal
