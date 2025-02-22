import React, { useEffect, useState } from "react";
import styles from "./ProposeCertificate.module.css";
import Navigation from "./Navigation";
import { contract, web3, checkConnection } from "../utils/web3Utils";

const CertificateIssuance = () => {
  const [recipientName, setRecipientName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [institutionName, setInstitutionName] = useState("");
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

  const submitIssueData = async () => {
    console.log({ recipientName, courseName, institutionName });

    // const gas = await contract.methods
    //   .setGreeting(inputText)
    //   .estimateGas({ from: accounts });

    // const tx = await contract.methods
    //   .setGreeting(inputText)
    //   .send({ from: accounts, gas });
    if (window.ethereum) {
      if (accounts) {
        const gas = await contract.methods
          .proposeCertificate(recipientName, courseName, institutionName)
          .estimateGas({ from: accounts });
        const tx = await contract.methods
          .proposeCertificate(recipientName, courseName, institutionName)
          .send({ from: accounts, gas });
        console.log(tx);
      }
    }
  };

  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <h1>Propose certificate</h1>
        <form action="#" method="POST">
          <div className={styles.form_group}>
            <label for="recipient-name">Recipient Name</label>
            <input
              type="text"
              id="recipient-name"
              name="recipient_name"
              onChange={(e) => {
                setRecipientName(e.target.value);
              }}
              placeholder="Enter recipient's name"
              required
            />
          </div>
          <div className={styles.form_group}>
            <label for="certificate-type">Course Name</label>
            <select
              id="certificate-type"
              onChange={(e) => {
                setCourseName(e.target.value);
              }}
              name="certificate_type"
              required
            >
              <option value="">Select course name</option>
              <option value="computer science">computer science</option>
              <option value="Medicine">Medicine</option>
              <option value="arts">arts</option>
            </select>
          </div>

          <div className={styles.form_group}>
            <label for="issuing-authority">Institution Name</label>
            <input
              onChange={(e) => {
                setInstitutionName(e.target.value);
              }}
              type="text"
              id="issuing-authority"
              name="issuing_authority"
              placeholder="Enter issuing authority"
              required
            />
          </div>
          <button
            type="button"
            onClick={submitIssueData}
            className={styles.btn}
          >
            Generate Certificate
          </button>
        </form>
      </div>
    </>
  );
};

export default CertificateIssuance;
