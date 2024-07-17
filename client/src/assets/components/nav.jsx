import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Cookie from 'js-cookie'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Nav() {

    const [userData, setUserData] = useState()

    useEffect(()=>{
          async function getUser(){
            try {
                const token = Cookie.get("c_user")
                const requestBody = {tokenData : token }


                const response = await axios.post('http://localhost:3000/api/getaccount', {requestBody})
                
                const userLastname = response.data.user.lastname
                
                setUserData(userLastname)
            } catch (error) {
                console.error(`Error ${error}`)  
            }
            
           
          }


          getUser()
    },[])

  return (
    <Navbar className="bg-success border-bottom border-2 border-success">
      <Container>
        <Navbar.Brand className='fw-bold  text-white'>INVENTORY</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className='fw-bold  text-white'>
            Signed in as : {userData}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Nav
