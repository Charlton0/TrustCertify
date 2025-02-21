import Web3 from "web3";
import { abi } from "./abi";

export const web3 = new Web3(window.ethereum);
const contractAddress = "0xB3D708E2E1c09Bec1Cb11f9d906eB61BA88dA4B1";

export const contract = new web3.eth.Contract(abi, contractAddress);

export async function connectWallet() {
  await window.web3.currentProvider.enable();
  window.web3 = new Web3(window.web3.currentProvider);
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
