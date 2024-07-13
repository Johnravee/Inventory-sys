import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function CategoryModal(props) {
    const { show, onHide, categoryname, categoryid, fetchData } = props
    
    const [categoryName, setCategoryName] = useState(categoryname)
    const [categoryId, setCategoryId] = useState(categoryid)

    // Update state when props change
    useEffect(() => {
        setCategoryName(categoryname)
        setCategoryId(categoryid)
    }, [categoryname, categoryid])

    const handleCategoryNameChange = (e) => {
        setCategoryName(e.target.value)
    }

    const handleCategoryIdChange = (e) => {
        setCategoryId(e.target.value)
    }

    const handleForm = async (e) =>{
        e.preventDefault()
        const response = await axios.put('http://localhost:3000/api/updatecategory', {categoryId, categoryName})
        .then(res => {
            if(res.status === 200){
                onHide()
                fetchData()
            }
        })
        .catch(err =>{
            console.error('axios error', err);
        })
        }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="small"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    EDIT CATEGORY
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleForm}>
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" 
                    id="floatingInput" 
                    value={categoryName}
                    onChange={handleCategoryNameChange} />
                    <label htmlFor="floatingInput">Category</label>
                  </div>

                    
                    <input
                        type="text"
                        name="categoryid"
                        id=""
                        className='form-control'
                        value={categoryId}
                        onChange={handleCategoryIdChange}
                        hidden
                    />
                    <button type="submit" className='btn btn-primary btn-sm'>Update</button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn btn-danger' onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CategoryModal
