import React from 'react'
import styles from "./RevocationAppeal.module.css"
import Navigation from './Navigation';
const RevocationAppeal = () => {
  return (
    <>
    <Navigation />
     <div className={styles.container}>
        <h1>Appeal Certificate Revocation</h1>
        <form action="/submit-appeal" method="post" enctype="multipart/form-data">
            
            <div className={styles.form_section}>
                <label for="certificateId">Certificate ID</label>
                <input type="text" id="certificateId" name="certificateId" required/>
            </div>
            
            <div className={styles.form_section}>
                <label for="appealReason">Reason for Appeal</label>
                <textarea id="appealReason" name="appealReason" required></textarea>
            </div>
            
            <div className={styles.upload_section}>
                <label for="supportingDocuments">Upload Supporting Documents (optional)</label>
                <input type="file" id="supportingDocuments" name="supportingDocuments" accept=".pdf,.jpg,.png,.docx"/>
            </div>
            
            <div className={styles.btn}>
                <button type="submit">Submit Appeal</button>
            </div>
        </form>
    </div> 
    
    
    
    </>
  )
}

export default RevocationAppeal;