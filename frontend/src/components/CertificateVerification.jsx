import React from "react";
import styles from "./certificateVerification.module.css";
import Navigation from "./Navigation";

const CertificateVerification = () => {
  return (
    <>
    <Navigation />
      <div className={styles.container}>
        <h2>Certificate Verification</h2>
        <p>Enter the Certificate ID to verify its authenticity.</p>
        <input type="text" id="certificateId" placeholder="Enter Certificate ID" />
        <button onclick="verifyCertificate()">Verify</button>
        <p id="result"></p>
    </div>
    </>
  );
};

export default CertificateVerification;
