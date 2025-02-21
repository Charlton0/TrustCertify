import React, { useEffect, useState } from "react";
import styles from "./certificateVerification.module.css";
import Navigation from "./Navigation";
import { contract, web3, checkConnection } from "../utils/web3Utils";

const CertificateVerification = () => {
  const [certificateID, setCertificateID] = useState("");
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

    const verifyCertificate = async () => {
      console.log({certificateID});

        if (window.ethereum) {
            if (accounts) {
              const gas = await contract.methods
                .verifyCertify(certificateID)
                .estimateGas({ from: accounts });
              const tx = await contract.methods
                .verifyCertificate(certificateID)
                .send({ from: accounts, gas });
              console.log(tx);
            }
          }
    };
  return (
    <>
    <Navigation />
      <div className={styles.container}>
        <h2>Certificate Verification</h2>
        <p>Enter the Certificate ID to verify its authenticity.</p>
        <input 
        type="text" 
        id="certificateId" 
        onChange={(e) => {
          setCertificateID(e.target.value);
        }}
        placeholder="Enter Certificate ID" 
        />
        <button
         onclick={verifyCertificate}>Verify</button>
        <p id="result"></p>
    </div>
    </>
  );
};

export default CertificateVerification;
