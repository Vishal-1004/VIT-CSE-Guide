import React from 'react'
import "./Contactus.css";
import {Link} from 'react-router-dom'

const Contactus = () => {
  return (
    <div className='my-5'>
      <div className='container'><h1 className="h1-style-contactus">Contact Us</h1></div>
      <div className='contactsection'>
          <div className='contactimg'>
              <img className='contactimage' src="./assets/contactus.png" alt="" srcset="" />
          </div>
          <div className='contactdes'>
              <p className="contactpara lead text-lg text-dark">
                We're here to assist you! If you have any questions or need assistance, please feel free to reach out to us.<br /><br />
            </p>
            <button type="submit" className="btn btn-primary btn-lg">
                <Link className='contactusbtn' to='/contact'>Send Message ✉</Link>
            </button>
          </div>
      </div>
    </div>
  )
}

export default Contactus
