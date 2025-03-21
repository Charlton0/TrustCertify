import React, { useEffect, useState } from "react";
import styles from "./ApproveCertificate.module.css";
import { web3, contract } from "../utils/web3Utils";
import Navigation from "./Navigation";

const ApproveCertificate = () => {
  const [certificateID, setCertificateID] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [accounts, setAccounts] = useState(null);
  const [] = useState("");

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

  const handleApproveCertificate = async (id) => {
    console.log(id);
    try {
      if (window.ethereum) {
        if (accounts) {
          const gas = await contract.methods
            .approveCertificate(id)
            .estimateGas({ from: accounts });

          const tx = await contract.methods
            .approveCertificate(id)
            .send({ from: accounts, gas });

          console.log(tx);
        } else {
          alert("please connect metamask");
        }
      } else {
        alert("please install metamask");
      }
    } catch (e) {
      console.log("error: " + e);
    }
  };

  const handleRevokeCertificate = (id) => {
    console.log(id);
  };

  async function view_certificate(certificateId) {
    try {
      let displayedData = [];
      const dataCount = await contract.methods.certificateCount().call();
      console.log(dataCount);
      for (let i = 0; i < dataCount.toString(); i++) {
        const data = await contract.methods.pendingCertificates(i).call();
        displayedData.push({ ...data, id: i });
      }

      console.log(displayedData);
      setCertificates(displayedData);
    } catch (e) {
      console.log("error " + e);
    }
  }

  console.log(certificates);

  useEffect(() => {
    checkConnection();
  }, []);

  useEffect(() => {
    if (contract) {
      view_certificate();
    }
  }, []);
  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <h1>Approve Certificates</h1>
        <table>
          <thead>
            <tr>
              <th>Certificate ID</th>
              <th>Student Name</th>
              <th>Institution name</th>
              <th>Approvals</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="proposedCertificatesList">
            {
              /* list of proposed certificate goes here */

              certificates
                ? certificates.map((certificate) => {
                    return (
                      <tr>
                        <td>{certificate.id}</td>
                        <td>{certificate.studentName}</td>
                        <td>{certificate.institutionName}</td>
                        <td>{certificate.approvals.toString()}</td>
                        <td>
                          <button
                            onClick={() => {
                              handleApproveCertificate(certificate.id);
                            }}
                            className="w3-button w3-small w3-blue"
                          >
                            Approve
                          </button>{" "}
                          &nbsp;{" "}
                        </td>
                      </tr>
                    );
                  })
                : "no certificates found"
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ApproveCertificate;
