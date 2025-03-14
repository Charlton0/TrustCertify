import React, { useEffect, useState } from "react";
import styles from "./CertificateTransfer.module.css";
import Navigation from "./Navigation";
import { contract, web3, checkConnection } from "../utils/web3Utils";

const CertificateTransfer = () => {
  const [certificateID, setCertificateID] = useState("");
  const [newOwnersAddress, setNewOwnersAddress] = useState("");
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

  const certificateTransfer = async () => {
    console.log({ certificateID, newOwnersAddress });
    if (window.ethereum) {
      if (accounts) {
        const gas = await contract.methods
          .certificateTransfer(certificateID, newOwnersAddress)
          .estimateGas({ from: accounts });
        const tx = await contract.methods
          .certificateTransfer(certificateID, newOwnersAddress)
          .send({ from: accounts, gas });
        console.log(tx);
      }
    }
  };

  return (
    <>
      <Navigation />
      <div className={StyleSheet.container}>
        <h1>Certificate Ownership Transfer</h1>
        <form
          action="/submit-transfer-request"
          method="post"
          enctype="multipart/form-data"
        />

        <div className={styles.form_group}>
          <label for="certificateId">Certificate ID</label>
          <input
            type="text"
            id="certificateId"
            name="certificateId"
            required
            onChange={(e) => {
              setCertificateID(e.target.value);
            }}
          />
        </div>

        <div className={styles.form_group}>
          <label for="newOwnersAddress">New Owner's Address</label>
          <input
            type="text"
            id="newOwnerAddress"
            address="newOwnerAddress"
            required
            onChange={(e) => {
              setNewOwnersAddress(e.target.value);
            }}
          />
        </div>

        <button
          type="button"
          onClick={CertificateTransfer}
          className={styles.btn}
        >
          Submit Transfer Request
        </button>
      </div>
    </>
  );
};

export default CertificateTransfer;
