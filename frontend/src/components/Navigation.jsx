import React from 'react'
import styles from "./HomePage.module.css"
import { Link } from 'react-router-dom'



const Navigation = () => {
  return (
    <div className='w3-bar w3-top w3-text-white w3-padding' style={{backgroundColor: '#2c3e50'}}>
        <span className='w3-large w3-spaced'>Trust Certify</span>
        <div className="w3-right">
        <Link to='/certificate-issuance' className='w3-bar-item'>Issue Certificate</Link>
        <Link to='/certificate-verification' className='w3-bar-item'>verify certificate</Link>
        <Link to='/certificate-transfer' className='w3-bar-item'>Transfer certificate</Link>
        <Link to='/revocation-appeal' className='w3-bar-item'>Appeal Revocation</Link>
        <Link to='/certificate-revocation' className='w3-bar-item'>Revoke Certificate</Link>
        </div>
        
    </div>
    
  )
}

export default Navigation