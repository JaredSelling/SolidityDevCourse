// Create pre-configured factory instance that we can import and use in other files
import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const factoryInstance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x35A34F030333b892970Bb2FEa4C3Cf04eF48C004'
);

export default factoryInstance;
