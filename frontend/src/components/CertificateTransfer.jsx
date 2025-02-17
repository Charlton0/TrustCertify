import React from 'react'
import styles from "./certificateTransfer.module.css";
import Navigation from './Navigation';

const CertificateTransfer = () => {
  return (
    <>
    <Navigation />
        <div className={StyleSheet.container}>
        <h1>Certificate Ownership Transfer</h1>
        <form action="/submit-transfer-request" method="post" enctype="multipart/form-data"/>
        
            <div className={styles.form_group}>
                <label for="certificateId">Certificate ID</label>
                <input type="text" id="certificateId" name="certificateId" required/>
            </div>
            
                 <div className={styles.form_group}>
                <label for="currentOwnerName">Current Owner's Name</label>
                <input type="text" id="currentOwnerName" name="currentOwnerName" required/>
            </div>
            
            <div className={styles.form_group}>
                <label for="currentOwnerEmail">Current Owner's Email</label>
                <input type="email" id="currentOwnerEmail" name="currentOwnerEmail" required/>
            </div>
            
            <div className={styles.form_group}>
                <label for="currentOwnerPhone">Current Owner's Phone Number</label>
                <input type="text" id="currentOwnerPhone" name="currentOwnerPhone" required/>
            </div>
            
            <div className={styles.form_group}>
                <label for="newOwnerName">New Owner's Name</label>
                <input type="text" id="newOwnerName" name="newOwnerName" required/>
            </div>
            
            <div className={styles.form_group}>
                <label for="newOwnerEmail">New Owner's Email</label>
                <input type="email" id="newOwnerEmail" name="newOwnerEmail" required/>
            </div>
            
            <div className={styles.form_group}>
                <label for="newOwnerPhone">New Owner's Phone Number</label>
                <input type="text" id="newOwnerPhone" name="newOwnerPhone" required/>
            </div>
        
            <div className={styles.form_group}>
                <label for="transferSupportingDocuments">Upload Supporting Documents (optional)</label>
                <input type="file" id="transferSupportingDocuments" name="transferSupportingDocuments" accept=".pdf,.jpg,.png,.docx"/>
            </div>
    
            
                <button type="submit" className={styles.btn}>
                    Submit Transfer Request
                    </button>
                    </div>
         </>
  );
};

export default CertificateTransfer;