const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;


beforeEach(async() => {
  accounts = await web3.eth.getAccounts();
  web3.eth.getBalance(accounts[0]).then(console.log);

  const estimatedGas = await web3.eth.estimateGas({from: accounts[0]});
  const accountBalance = await web3.eth.getBalance(accounts[0]);

  // Create factory to generate campaigns
  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({data: compiledFactory.evm.bytecode.object})
    .send({from: accounts[0], gas: '3000000'});

  // Create campaign from our factory
  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  });

  // Store the address of our deployed campaign
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  // Create a contract instance from our deployed campaign on the blockchain
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);

});

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });
});
