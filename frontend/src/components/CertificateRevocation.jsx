import React from 'react'
import styles from "./CertificateRevocation.module.css";

const CertificateRevocation = () => {
  return (
    <>
       <div className={styles.container}>
        <h1>Certificate Revocation and Appeals</h1>
        <form action="/submit-request" method="post" >
            
            <div className="form_section">
                <label for="certificateId">Certificate ID</label>
                <input type="text" id="certificateId" name="certificateId" required/>
            </div>
            
            <div className="form_section">
                <label for="revocationReason">Reason for Revocation</label>
                <textarea id="revocationReason" name="revocationReason" required></textarea>
            </div>
            
            <div className="form_section">
                <label for="appealDescription">Appeal Description</label>
                <textarea id="appealDescription" name="appealDescription" required></textarea>
            </div>
            
            <div className="upload_section">
                <label for="supportingDocuments">Upload Supporting Documents (optional)</label>
                <input type="file" id="supportingDocuments" name="supportingDocuments" accept=".pdf,.jpg,.png,.docx"/>
            </div>
            
            <div className="form-section">
                <button type="submit">Submit Request</button>
            </div>
        </form>
    </div>
    </>
  );
};

export default CertificateRevocation;