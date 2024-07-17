import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import axios from 'axios'

function AddSupplierModal(props) {
    const { show, onHide, fetchData } = props

    const [formData, setFormData] = useState()

    const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }


    const handleFormSubmit =  async (e) =>{
         e.preventDefault()

        try {
            const formDataToSend = formData

            const response = await axios.post('http://localhost:3000/api/addnewsupplier', formDataToSend)

            if(response.status === 200){
                onHide()    
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
            <span>New Suppliers</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} className="mb-3 d-flex align-items-center">
            <Col lg={9}>
              <Form.Control
                type="text"
                name="id"
                onChange={handleInputChange}
                hidden
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex align-items-center">
            <Form.Label column lg={3}>
              Supplier Name
            </Form.Label>
            <Col lg={9}>
              <Form.Control
                type="text"
                name="name"
                onChange={handleInputChange}

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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                value={formData ? formData.status : 'Active'}
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

export default AddSupplierModal
