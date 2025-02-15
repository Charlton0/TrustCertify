import React from 'react'
import myImage from "../assets/pexels-pixabay-265072.jpg";
import styles from "./HomePage.module.css"

const myStyles = {
    backgroundImage: `url(${myImage})`,
    backgroundSize: "cover",
    bacgroundPosition: "center",
    width: "100vw",
    height: "100vh",
    backgroundRepeat: "no-repeat"
}

const HomePage = () => {
  return (
    <>
     <header>
        <h1>Welcome to TrustCertify</h1>
        <nav>
            <ul>
                <li><a href="issue-certificate.html">Issue Certificate</a></li>
                <li><a href="verify-certificate.html">Verify Certificate</a></li>
                <li><a href="transfer-certificate.html">Transfer Certificate</a></li>
                <li><a href="appeal-revocation.html">Appeal Revocation</a></li>
                <li><a href="revoke-certificate.html">Revoke Certificate</a></li>
            </ul>
        </nav>
    </header>

    <section style={myStyles}>
        <h2>Introduction</h2>
        <p>TrustCertify is a decentralized system for issuing, managing, and verifying academic certificates. Institutions can issue and revoke certificates, students can manage their credentials, and verifiers can authenticate them securely on the blockchain.</p>
        <a href="verify-certificate.html" className="cta-button">Verify a Certificate</a>
    </section>
    
    <footer>
        <p>TrustCertify&copy; 2025</p>
    </footer>
    </>
  )
}

export default HomePage;