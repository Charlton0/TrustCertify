import Web3 from "web3";
import { abi } from "./abi";
import { useState, createContext } from "react";

const UserContext = createContext();

export const web3 = new Web3("HTTP://127.0.0.1:7545");
const contractAddress = "0xA9000e1F0b9e8ABbc04ec8e89655eB4c257dF656";
export const contract = new web3.eth.Contract(abi, contractAddress);
// console.log(abi);

export async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    // Request account access
    const accounts = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(function (accounts) {
        console.log("Accounts:", accounts);
        return accounts;
      })
      .catch(function (error) {
        console.error("User  denied account access:", error);
      });
  } else {
    console.log("MetaMask is not installed!");
  }
}

export const checkConnection = async () => {
  if (window.ethereum) {
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
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
    console.log(data);
  
  } catch (e) {
    console.log("error " + e);
  }

  return <UserContext.Provider>
    
  </UserContext.Provider>
}
