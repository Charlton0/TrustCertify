import React from 'react'
import styles from "./HomePage.module.css"
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <header>
    <h1>Welcome to TrustCertify</h1>
    <nav>
            <ul>
                <li><Link to="/certificate-issuance">Issue Certificate</Link></li>
                <li><a href="verify-certificate.html">Verify Certificate</a></li>
                <li><a href="transfer-certificate.html">Transfer Certificate</a></li>
                <li><a href="appeal-revocation.html">Appeal Revocation</a></li>
                <li><a href="revoke-certificate.html">Revoke Certificate</a></li>
            </ul>
        </nav>
</header>
    
  )
}

export default Navigation