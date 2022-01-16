import web3 from './web3';
import Campaign from './build/Campaign.json';

const getCampaign = (address) => {
  const campaignInstance = new web3.eth.Contract(Campaign.abi, address);
  return campaignInstance;
}

export default getCampaign;
