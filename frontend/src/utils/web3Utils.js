import Web3 from "web3";
import { abi } from "./abi";

export const web3 = new Web3(window.ethereum);
const contractAddress = "0xfA7F54Eae68C97c078a733aaC48d01EF4466935A";
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
