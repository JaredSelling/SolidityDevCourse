import Web3 from 'web3';
import credentials from '../config/credentials';

let web3;

if(typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running
  window.ethereum.request({method: "eth_requestAccounts"});
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server or user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    credentials.infura_url
  );
  web3 = new Web3(provider);
}

export default web3;
