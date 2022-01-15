// Create pre-configured factory instance that we can import and use in other files
import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const factoryInstance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x62C83C7700294178115905faD709f645b1f05131'
);

export default factoryInstance;
