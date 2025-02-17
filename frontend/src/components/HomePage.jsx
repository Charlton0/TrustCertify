import React from 'react'
import myImage from "../assets/pexels-pixabay-265072.jpg";
import styles from "./HomePage.module.css"
import Navigation from './Navigation';

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
     <Navigation />

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