import React, { useEffect, useState } from "react";
import styles from "./AdminPanel.module.css";
import Navigation from "./Navigation";
import { contract, web3, checkConnection } from "../utils/web3Utils";

const AdminPanel = () => {
   const [viewDetails, setViewDetails] = useState("");
    const [issuenewCertificate, setIssuenewCertificate] = useState("");
    const [Approve, setApprove] = useState("");
    const [Reject, setReject] = useState("");
    const [viewProfile, setViewProfile] = useState("");
    const [authorizedSigners, setAuthorizedSigners] = useState("");
    const [accounts, setAccounts] = useState(null);

    const checkConnection = async () => {
        if (window.ethereum) {
          try {
            const accounts = await web3.eth.getAccounts();
            if (accounts.length > 0) {
              setAccounts(accounts[0]);
    
              return accounts[0];
            } else {
              console.log("no accounts were found");
              return null;
            }
          } catch (e) {
            console.error("error connecting to wallet " + e);
            return null;
          }
        } else {
          console.log("you need to install your metamask");
        }
      };

       async function only_AuthorizedSigner() {
        // console.log(contract.methods)
          try {
            
            const data = await contract.methods.authorizedSigners("0").call()
            console.log(data)


          } catch (e) {
            console.log("error " + e);
          }
        }

      useEffect(() => {
        checkConnection();
      }, []);

       useEffect(() => {
          if (contract) {
            only_AuthorizedSigner();
          }
        }, []);
  return (
    <>
    <Navigation />
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
                    <li>Certificate ID: 12345 - 
                        <button
                        type="button"
                        onClick={viewDetails} 
                        className={styles.btn}>
                        View Details</button></li>
                    <li>Certificate ID: 67890 - 
                        <button
                        type="button"
                        onClick={viewDetails}
                         className={styles.btn}>
                        View Details</button></li>
                    <li>Certificate ID: 11223 - 
                        <button
                        type="button"
                        onClick={viewDetails}
                         className={styles.btn}>
                        View Details</button></li>
                </ul>
                <button
                type="button"
                onClick={issuenewCertificate}
                 className={styles.btn}>
                    Issue New Certificate</button>
            </div>

            <div className={styles.panel_section}>
                <h2>Manage Requests</h2>
                <ul>
  <li>Transfer Request (ID: 101) - 
    <button
    type="button"
    onClick={Approve}
     className={styles.btn}>Approve</button>
     <button
     type="button"
     onClick={Reject}
      className={styles.btn}>Reject</button></li>
  <li>Revocation Request (ID: 202) - 
    <button
    type="button"
    onClick={Approve}
     className={styles.btn}>Approve</button>
     <button
     type="button"
     onClick={Reject}
      className={styles.btn}>Reject</button></li>
  <li>Appeal Request (ID: 303) - 
    <button
    type="button"
    onClick={Approve}
     className={styles.btn}>Approve</button>
     <button
     type="button"
     onClick={Reject}
      className={styles.btn}>Reject</button></li>
          </ul>
       </div>
     </div>

        <div className={styles.panel_section}>
            <h2>View Users</h2>
            <ul>
     <li>User: Billy Juma (Admin) -
         <button
         type="button"
         onClick={viewProfile}
          className={styles.btn}>
        View Profile</button></li>
     <li>User: Jane Wangari (Signer) -
         <button
         type="button"
         onClick={viewProfile}
          className={styles.btn}>
        View Profile</button></li>
     <li>User: Stephen Mwendwa (Signer) - 
        <button
        type="button"
        onClick={viewProfile}
         className={styles.btn}>
        View Profile</button></li>
            </ul>
        </div>
    </div>
    </>
  )
}

export default AdminPanel;