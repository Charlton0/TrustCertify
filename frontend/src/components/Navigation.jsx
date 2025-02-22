import React from "react";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import { connectWallet } from "../utils/web3Utils";

const Navigation = () => {
  return (
    <div
      className="w3-bar w3-top w3-text-white w3-padding"
      style={{ backgroundColor: "#2c3e50" }}
    >
      <span className="w3-large w3-spaced">Trust Certify</span>
      <div className="w3-right">
        <Link to="/propose-certificate" className="w3-bar-item">
          Propose Certificate
        </Link>
        <Link to="/certificate-verification" className="w3-bar-item">
          verify certificate
        </Link>
        <Link to="/certificate-transfer" className="w3-bar-item">
          Transfer certificate
        </Link>
        <Link to="/revocation-appeal" className="w3-bar-item">
          Appeal Revocation
        </Link>
        <Link to="/certificate-revocation" className="w3-bar-item">
          Revoke Certificate
        </Link>
        <Link to="/Approve-certificate" className="w3-bar-item">
          Approve Cerrtificate
        </Link>
        <button
          onClick={connectWallet}
          className="w3-button w3-grey w3-bar-item w3-round"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default Navigation;
