import React from "react";
import myImage from "../assets/pexels-pixabay-265072.jpg";
import styles from "./HomePage.module.css";
import Navigation from "./Navigation";

const myStyles = {
  backgroundImage: `url(${myImage})`,
  height: "100vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const HomePage = () => {
  return (
    <>
      <Navigation />
      <div className="w3-auto w3-text-white" style={myStyles}>
        <div className={styles.overlay}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="w3-center" style={{ margin: "200px 400px" }}>
            <h2>
              <b>Welcome to trust certify</b>
            </h2>
            <p>
              TrustCertify is a decentralized system for issuing, managing, and
              verifying academic certificates. Institutions can issue and revoke
              certificates, students can manage their credentials, and verifiers
              can authenticate them securely on the blockchain.
            </p>
            {/* <a
              href="verify-certificate.html"
              className="cta-button w3-button"
              style={{ backgroundColor: "#2c3e50" }}
            >
              Verify a Certificate
            </a> */}
          </div>
        </div>
      </div>

      {/* <section style={myStyles}>
        <h2>Introduction</h2>
        <p>TrustCertify is a decentralized system for issuing, managing, and verifying academic certificates. Institutions can issue and revoke certificates, students can manage their credentials, and verifiers can authenticate them securely on the blockchain.</p>
        <a href="verify-certificate.html" className="cta-button">Verify a Certificate</a>
    </section> */}

      <footer>
        <p>TrustCertify&copy; 2025</p>
      </footer>
    </>
  );
};

export default HomePage;
