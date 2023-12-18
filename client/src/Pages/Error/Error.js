import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className='container' style={{maxHeight:"100vh"}}>
        <div className="d-flex justify-content-center mt-3">
            <img
                style={{ maxHeight:"80vh", width:"80%" }} 
                src="./assets/error.jpg" alt="Error" 
            />
        </div>
    </div>
  )
}

export default Error
