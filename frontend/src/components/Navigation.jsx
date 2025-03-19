import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import { connectWallet, contract } from "../utils/web3Utils";

const Navigation = () => {
  const [authorizedSigners, setAuthorizedSigners] = useState([]);
  const [accounts, setAccounts] = useState("");
  console.log(accounts);

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(function (accounts) {
            console.log("Accounts:", accounts);
            return accounts;
          });

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
      const data = await contract.methods.viewSigners().call();
      const data2 = data.map((e) => e.toLowerCase());
      console.log(data2);
      setAuthorizedSigners(data2);
    } catch (e) {
      console.log("error " + e);
    }
  }

  useEffect(() => {
    if (contract) {
      only_AuthorizedSigner();
    }
  }, [contract]);

  useEffect(() => {
    checkConnection();
  }, []);
  return (
    <div
      className="w3-bar w3-top w3-text-white w3-padding"
      style={{ backgroundColor: "#2c3e50" }}
    >
      <span className="w3-large w3-spaced">Trust Certify</span>

      <div className="w3-right">
        {authorizedSigners.includes(accounts.toLowerCase()) && (
          <Link to="/propose-certificate" className="w3-bar-item">
            Propose Certificate
          </Link>
        )}
        <Link to="/certificate-verification" className="w3-bar-item">
          verify certificate
        </Link>
        <Link to="/certificate-transfer" className="w3-bar-item">
          Transfer certificate
        </Link>
        <Link to="/revocation-appeal" className="w3-bar-item">
          Appeal Revocation
        </Link>
        {console.log(accounts)}
        {authorizedSigners.includes(accounts.toLowerCase()) && (
          <>
            <Link to="/certificate-revocation" className="w3-bar-item">
              Revoke Certificate
            </Link>
            <Link to="/Approve-certificate" className="w3-bar-item">
              Approve Cer tificate
            </Link>
            <Link to="/admin" className="w3-bar-item">
              Admin Panel
            </Link>
          </>
        )}

        {accounts ? (
          <span className="w3-bar-item">
            {accounts.slice(0, 6) + "..." + accounts.slice(accounts.length - 6)}
          </span>
        ) : (
          <button
            onClick={connectWallet}
            className="w3-button w3-grey w3-bar-item w3-round"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
