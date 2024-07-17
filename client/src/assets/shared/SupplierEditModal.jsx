import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import axios from 'axios'

function SupplierEditModal(props) {

  const { show, onHide, Data, fetchData } = props

  const [formData, setFormData] = useState({
    id : '',
    name: '',
    email: '',
    contact: '',
    address: '',
    status: ''
  })

  const handleInputChange = (e) =>{
    const { value, name } = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    if(Data){
        setFormData({
                    id : Data.id || '',
                    name: Data.name || '',
                    email: Data.email || '',
                    contact: Data.contact || '',
                    address: Data.address || '',
                    status: Data.status || ''
                  })
    }
  },[Data])

  const handleFormSubmit = async (e) =>{
    e.preventDefault()

    try {
      const response = await axios.put('http://localhost:3000/api/editsupplier', formData)
      
      if(response.status === 200){
        fetchData()
        onHide()
      }

    } catch (error) {
      console.error("Failed to update supplier", error);
    }
  }



  return (
   <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleFormSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-uppercase">
            <i className="bi bi-pencil-square me-1"></i>
            <span>Edit Supplier</span>
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
              Email
            </Form.Label>
            <Col lg={9}>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="inputs productStocks"
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex align-items-center">
            <Form.Label column lg={3}>
              Contact
            </Form.Label>
            <Col lg={9}>
              <Form.Control
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="inputs productStocks"
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex align-items-center">
            <Form.Label column lg={3}>
              Address
            </Form.Label>
            <Col lg={9}>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
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
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
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

export default SupplierEditModal
