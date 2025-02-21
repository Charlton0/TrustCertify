import React, { useEffect, useState } from "react";
import styles from "./ApproveCertificate.module.css";
import { web3, contract } from "../utils/web3Utils";

const ApproveCertificate = () => {

      const [certificateID, setCertificateID] = useState("");
      const [certificates, setCertificates] = useState([]);
      const [] = useState("");

      async function view_certificate(certificateId) {
        let displayedData = [];
        const dataCount = await contract.methods.certificateCount(certificateID).call();

        for (let i = 1; i <= dataCount; i++){
            const data = await contract.methods.pendingCertificates(i).call();
            displayedData.push(data);
        }

        console.log(displayedData);
        setCertificates(displayedData);

      }
  return (
    <>
    
<div className={styles.container}>
        <h1>Approve Certificates</h1>
        <table>
            <thead>
                <tr>
                    <th>Certificate ID</th>
                    <th>Student Name</th>
                    <th>Course Name</th>
                    <th>Institution Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="proposedCertificatesList">
            {/* list of proposed certificate goes here */}
            <tr>
                <td>#1</td>
                <td>John Doe</td>
                <td>Animal Husbandry</td>
                <td>Maseno</td>
                <td><button className="w3-button w3-small w3-blue">Approve</button> &nbsp; <button className="w3-button w3-small w3-red">Revoke</button></td>

            </tr>
            </tbody>
        </table>
    </div>
    </>
  )
}

export default ApproveCertificate;