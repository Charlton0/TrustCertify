import React, { useEffect, useState } from "react";
import styles from "./CertificateRevocation.module.css";
import Navigation from './Navigation';
import { contract, web3, checkConnection } from "../utils/web3Utils";

const CertificateRevocation = () => {

  const [certificateID, setCertificateID] = useState("");
  const [revocationReason, setRevocationResason] = useState("");
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
    
      useEffect(() => {
        checkConnection();
      }, []);
  
      const revokeCertificate = async () => {
        console.log({certificateID,revocationReason});
  
          if (window.ethereum) {
              if (accounts) {
                const gas = await contract.methods
                  .revokeCertificate(certificateID)
                  .estimateGas({ from: accounts });
                const tx = await contract.methods
                  .revokeCertificate(certificateID)
                  .send({ from: accounts, gas });
                console.log(tx);
              }
            }
      };
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