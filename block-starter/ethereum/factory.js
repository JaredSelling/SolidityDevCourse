// Create pre-configured factory instance that we can import and use in other files
import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const factoryInstance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x37018a3FA341693E8EDfF6fbfBA8718a6Bc433Bc'
);

export default factoryInstance;
