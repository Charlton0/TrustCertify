import React from "react";
import styles from "./certificatesIssuance.module.css";
import Navigation from "./Navigation";

const CertificateIssuance = () => {
  return (
    <>
    <Navigation />
      <div className={styles.container}>
        <h1>Certificate Issuance</h1>
        <form action="#" method="POST">
          <div className={styles.form_group}>
            <label for="recipient-name">Recipient Name</label>
            <input
              type="text"
              id="recipient-name"
              name="recipient_name"
              placeholder="Enter recipient's name"
              required
            />
          </div>
          <div className={styles.form_group}>
            <label for="certificate-type">Certificate Type</label>
            <select id="certificate-type" name="certificate_type" required>
              <option value="">Select Certificate Type</option>
              <option value="Diploma">Diploma</option>
              <option value="Degree">Degree</option>
              <option value="Certificate">Certificate</option>
            </select>
          </div>
          <div className={styles.form_group}>
            <label for="issue-date">Date of Issue</label>
            <input type="date" id="issue-date" name="issue_date" required />
          </div>
          <div className={styles.form_group}>
            <label for="issuing-authority">Issuing Authority</label>
            <input
              type="text"
              id="issuing-authority"
              name="issuing_authority"
              placeholder="Enter issuing authority"
              required
            />
          </div>
          <button type="submit" className={styles.btn}>
            Generate Certificate
          </button>
        </form>
      </div>
    </>
  );
};

export default CertificateIssuance;
