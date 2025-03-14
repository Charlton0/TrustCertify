import React, { useEffect, useState } from "react";
import styles from "./RevocationAppeal.module.css";
import Navigation from "./Navigation";
import { contract, web3, checkConnection } from "../utils/web3Utils";

const RevocationAppeal = () => {
  const [certificateID, setCertificateID] = useState("");
  const [appealReason, setAppealReason] = useState("");
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

  const appealRevocation = async () => {
    console.log({ certificateID, appealReason });

    if (window.ethereum) {
      if (accounts) {
        const gas = await contract.methods
          .appealRevocation(certificateID)
          .estimateGas({ from: accounts });
        const tx = await contract.methods
          .appealRevocation(certificateID)
          .send({ from: accounts, gas });
        console.log(tx);
      }
    }
  };
  return (
    <>
      <Navigation />
      <br />
      <br />
      <div className={styles.container}>
        <h1>Appeal Certificate Revocation</h1>
        <form
          action="/submit-appeal"
          method="post"
          enctype="multipart/form-data"
        >
          <div className={styles.form_section}>
            <label for="certificateId">Certificate ID</label>
            <input
              type="text"
              id="certificateId"
              name="certificateId"
              onChange={(e) => {
                setCertificateID(e.target.value);
              }}
              placeholder="Enter certificateId"
              required
            />
          </div>

          <div className={styles.form_section}>
            <label for="appealReason">Reason for Appeal</label>
            <textarea
              id="appealReason"
              name="appealReason"
              onChange={(e) => {
                setAppealReason(e.target.value);
              }}
              placeholder="Enter appealReason"
              required
            ></textarea>
          </div>

          {/* <div className={styles.upload_section}>
                <label for="supportingDocuments">Upload Supporting Documents (optional)</label>
                <input type="file" id="supportingDocuments" name="supportingDocuments" accept=".pdf,.jpg,.png,.docx"/>
            </div> */}

          <div className={styles.btn}>
            <button type="button" onClick={appealRevocation}>
              Submit Appeal
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RevocationAppeal;
