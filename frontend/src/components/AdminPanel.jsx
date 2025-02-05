import React from 'react'
import styles from "./AdminPanel.module.css";
const AdminPanel = () => {
  return (
    <>
        <div className={styles.container}>
        <h1>Admin and Authorized Signer's Panel</h1>

        <nav>
            <a href="#manage-certificates">Manage Certificates</a>
            <a href="#manage-requests">Manage Requests</a>
            <a href="#view-users">View Users</a>
        </nav>

        <div className={styles.panel}>
            
            <div className={styles.panel_section}>
                <h2>Manage Certificates</h2>
                <ul>
                    <li>Certificate ID: 12345 - <button className={styles.btn}>
                        View Details</button></li>
                    <li>Certificate ID: 67890 - <button className={styles.btn}>
                        View Details</button></li>
                    <li>Certificate ID: 11223 - <button className={styles.btn}>
                        View Details</button></li>
                </ul>
                <button className={styles.btn}>
                    Issue New Certificate</button>
            </div>

            <div className={styles.panel_section}>
                <h2>Manage Requests</h2>
                <ul>
  <li>Transfer Request (ID: 101) - <button className={styles.btn}>Approve</button> <button className={styles.btn}>Reject</button></li>
  <li>Revocation Request (ID: 202) - <button className={styles.btn}>Approve</button> <button className={styles.btn}>Reject</button></li>
  <li>Appeal Request (ID: 303) - <button className={styles.btn}>Approve</button> <button className={styles.btn}>Reject</button></li>
          </ul>
       </div>
     </div>

        <div className={styles.panel_section}>
            <h2>View Users</h2>
            <ul>
     <li>User: Billy Juma (Admin) - <button className={styles.btn}>
        View Profile</button></li>
     <li>User: Jane Wangari (Signer) - <button className={styles.btn}>
        View Profile</button></li>
     <li>User: Stephen Mwendwa (Signer) - <button className={styles.btn}>
        View Profile</button></li>
            </ul>
        </div>
    </div>
    </>
  )
}

export default AdminPanel;