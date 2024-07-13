import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import logo from '../img/llogo.png'
import banner1 from '../img/banner.jpg'
import banner2 from '../img/banner2.jpg'
import banner3 from '../img/banner3.jpg'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Cookie from 'js-cookie'


export default function Login() {
    const navigate = useNavigate()
    const [err, setError] = useState(null)
    const [serverMsg, setServerMsg] = useState(null)

   
    const logoStyle = {
        height: '200px',
        width: '200px'
    }

    const shadow = {
        boxShadow: '0px 2px 11px -2px rgba(199,199,199,0.75)',
        WebkitBoxShadow: '0px 2px 11px -2px rgba(199,199,199,0.75)',
        MozBoxShadow: '0px 2px 11px -2px rgba(199,199,199,0.75)',
    }

    const [currentImgIndex, setImgIndex] = useState(0)
    const banners = [banner1, banner2, banner3]

    //*image slider
    useEffect(() => {
        const interval = setInterval(() => {
            setImgIndex(prevImgIndex => (prevImgIndex + 1) % banners.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [banners.length])

    const [displayedPage, setDisplay] = useState(true)
    const [recoverPage, setRecoverUI] = useState(false)

    const recoverAcc = () => {
        setRecoverUI(true)
        setDisplay(false) // Hide login and register forms
    }

    const backToLogin = () => {
        setDisplay(true) // Show login and register forms
        setRecoverUI(false) // Hide password recovery form
    }

    const createNew = () => {
        setDisplay(false) // Hide login form
        setRecoverUI(false) // Hide password recovery form
    }


    
    const handleRegistration = async (e) =>{
         e.preventDefault()
         const firstname = e.target.firstname.value
         const lastname = e.target.lastname.value
         const email = e.target.email.value
         const password = e.target.password.value

        const response = await axios.post('http://localhost:3000/api/sign_up', {firstname, lastname, email, password})
        .then(res => 
            {
                if(res.status === 201) {
                  
                   
                    setServerMsg(res.data.message)

                    setTimeout(()=>{ location.reload() },2000)
                }
                    
            })
        .catch(err =>{
            console.log('====================================');
            console.log("Unexpected error", err);
            console.log('====================================');
            setError(err.response.data.error)
        })
    }

     const handleLogin = async (e) => {
        e.preventDefault();
        const loginEmail = e.target.loginEmail.value;
        const loginPassword = e.target.loginPassword.value;


            const response = await axios.post('http://localhost:3000/api/login', {
                loginEmail,
                loginPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
            .then(respo => {
                if(respo.data && respo.status === 202){
                    location.reload()
                }else{
                    navigate('/login')
                }
            })
            .catch(err =>{
                setError(err.response.data.error)
                
            })
            
        
    };

    //*Side effect
      useEffect(() => {
        const token = Cookie.get('c_user')
        if (token) {
            navigate('/')
        }
    }, [navigate])


    return (
        <>
        
            <div className="d-flex justify-content-center align-items-center bg-white vh-100 w-100">
                <div className="wrapper bg-white h-auto w-50 d-flex flex-row" style={shadow}>
                    <div className="logo w-50 h-auto ">
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                            <img src={banners[currentImgIndex]} className="card-img-top h-100 w-100" alt="..."  />
                        </div>
                    </div>

                    {displayedPage ? (
                        //*Login Form
                        <div className="login d-flex justify-content-center align-items-center w-50 h-100 bg-white p-2">
                            <div className='w-75'>
                                <div className="w-100 d-flex justify-content-center mt-1">
                                    <img src={logo} className="card-img-top m-2" alt="..." style={logoStyle} />
                                </div>

                                
                                {err ? (
                                    <div className="alert alert-danger" role="alert">
                                     {err}
                                    </div>) 
                                    : null
                                }

                                <form onSubmit={handleLogin}>
                                    <div className="input-group input-group-sm mb-3">
                                        <input type="email" className="form-control" placeholder="Email" name='loginEmail' />
                                    </div>

                                    <div className="input-group input-group-sm mb-3 ">
                                        <input type="password" className="form-control" placeholder="Password" name='loginPassword' />
                                    </div>

                                    <div className="w-100 d-flex justify-content-center mt-2 ">
                                        <button type='submit' className='btn btn-dark w-100'>
                                            LOG IN
                                        </button>
                                    </div>
                                </form>

                                <div className="w-100 d-flex justify-content-center mt-3">
                                    <a className="text-decoration-none text-sm" onClick={recoverAcc}>
                                        <p className="text-center text-muted">Forgot password?</p>
                                    </a>
                                </div>

                                <div className="w-100 d-flex justify-content-center align-items-center mt-2">
                                    <p className="text-center text-muted fw-bold text-sm">
                                        Don't have an account?

                                        <button type="button" className="btn btn-outline-dark ms-2" onClick={createNew}>
                                            Create
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {!displayedPage && !recoverPage ? (
                        //*Register Form
                        <div className="register d-flex justify-content-center align-items-center w-50 h-100 bg-white p-1">
                            <div className='w-75'>
                                <div className="w-100 d-flex justify-content-end align-items-end mt-2 ">
                                    <button className='btn btn-outline-danger w-0' onClick={backToLogin}>
                                        ⛌
                                    </button>
                                </div>

                                <div className="w-100 d-flex justify-content-center mt-3">
                                    <img src={logo} className="card-img-top" alt="..." style={logoStyle} />
                                </div>

                                 {err ? (
                                    <div className="alert alert-danger" role="alert">
                                     {err}
                                    </div>) 
                                    : null
                                }

                                {serverMsg ? (
                                    <div className="alert alert-success" role="alert">
                                     {serverMsg}
                                    </div>) : null}

                                <form onSubmit={handleRegistration}>
                                    <div className="input-group input-group-sm mb-3">
                                        <input type="text" className="form-control" placeholder="Firstname" name='firstname' required />
                                    </div>

                                    <div className="input-group input-group-sm mb-3">
                                        <input type="text" className="form-control" placeholder="Lastname" name='lastname' required />
                                    </div>

                                    <div className="input-group input-group-sm mb-3">
                                        <input type="email" className="form-control" placeholder="Email" name='email' required />
                                    </div>

                                    <div className="input-group input-group-sm mb-3">
                                        <input type="password" className="form-control" placeholder="Password" name='password' required />
                                    </div>

                                    <div className="w-100 d-flex justify-content-center mt-2 ">
                                        <button type='submit' className='btn btn-dark w-100'>
                                            SIGN UP
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : null}

                    {recoverPage ? (
                        //* Password Recovery Form
                        <div className="recover d-flex justify-content-center align-items-center w-50 h-100 bg-white p-1">
                            <div className='w-75'>
                                <div className="w-100 d-flex justify-content-end align-items-end mt-2 ">
                                    <button className='btn btn-outline-danger w-0' onClick={backToLogin}>
                                        ⛌
                                    </button>
                                </div>

                                <div className="w-100 d-flex justify-content-center mt-3">
                                    <img src={logo} className="card-img-top m-2" alt="..." style={logoStyle} />
                                </div>

                                <form>
                                    <div className="input-group input-group-sm mb-3">
                                        <input type="email" className="form-control" placeholder="Email" name='recoverEmail' />
                                    </div>

                                    <div className="w-100 d-flex justify-content-center mt-5 ">
                                        <button className='btn btn-dark w-100'>
                                            RECOVER
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : null}

                </div>
            </div>
        </>
    )
}
