import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

function EditCustomerModal(props) {
    const { show, onHide, fetchData, Data } = props

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        contact: ''
    })

    useEffect(() => {
        if (Data) {
            setFormData({
                id: Data.id || '',         
                name: Data.name || '',     
                email: Data.email || '',   
                contact: Data.contact || '' 
            })
        }
    }, [Data])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit =  async (e) => {
        e.preventDefault()

        const formToSend = formData

      try {
        const response = await axios.put('http://localhost:3000/api/updatecustomer', formToSend)

        if(response.status === 200){
            fetchData()
            onHide()
        }
      } catch (error) {
         console.error("Error editing customer details", error)
      }


    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Enter Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formId">
                        <Form.Control type="text" placeholder="Enter ID" name="id" value={formData.id} onChange={handleInputChange} hidden />
                    </Form.Group>

                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" name="name" value={formData.name} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" name="email" value={formData.email} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formContact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control type="text" placeholder="Enter Contact Number" name="contact" value={formData.contact} onChange={handleInputChange} />
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" className="updateProduct">
                            Save changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditCustomerModal
