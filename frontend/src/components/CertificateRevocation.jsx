import React from 'react'
import styles from "./CertificateRevocation.module.css";
import Navigation from './Navigation';

const CertificateRevocation = () => {
  return (
    <>
    <Navigation />
        <div className={styles.container}>
        <h1>Certificate Revocation</h1>
        <form action="/revoke-certificate" method="post">
            <label for="certificateId">Certificate ID:</label>
            <input type="text" id="certificateId" name="certificateId" required/>

            <label for="revocationReason">Reason for Revocation:</label>
            <textarea id="revocationReason" name="revocationReason" required></textarea>

            <button type="submit">Submit Revocation</button>
        </form>
    </div>
    </>
  );
};

export default CertificateRevocation;