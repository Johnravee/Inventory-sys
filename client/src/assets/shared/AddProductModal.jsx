import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import axios from 'axios'
import logo from '../img/llogo.png'

function AddProductModal(props) {
  const { show, onHide, fetchData } = props

  const [productImage, setProductImage] = useState(logo)
  const [file, setFile] = useState(null)
  const [formData, setFormData] = useState()

  const handleInputChange = (e) => {
    const { value, name } = e.target
    setFormData({ ...formData, [name]: value })


  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProductImage(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleFormSubmit = async (e) => {
  e.preventDefault()

  try {
     formData['image'] = file
    const formDataToSend = formData

    const response = await axios.post('http://localhost:3000/api/addnewproduct', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if(response.status === 201){
      onHide()
      setProductImage(logo)
      fetchData(  )
    }


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
            <span>New Product</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} className="mb-3 d-flex align-items-center">
            <Form.Label column lg={3}>
              Product Name
            </Form.Label>
            <Col lg={9}>
              <Form.Control
                type="text"
                name="productName"
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
                type="number"
                name="productStocks"         
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
                name="productPrice"
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
                value={formData ? formData.status : 'Active'}
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
              <Form.Control type="file" onChange={handleImageChange} className="mt-2" required />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex align-items-center">
            <Form.Label column lg={3} className="fw-bold">
              Image preview
            </Form.Label>
            <Col lg={9} className="d-flex align-items-center flex-column">
              <div className="d-flex align-items-center">
                <Image
                  className="modalProductImage"
                  src={productImage}
                  alt="product image"
                  fluid
                  style={{ maxWidth: '200px', maxHeight: '200px' }}
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

export default AddProductModal
