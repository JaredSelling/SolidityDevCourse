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

  it('Makes caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it('Allows contributers to donate and become approvers', async () => {
    await campaign.methods.contribute().send({from: accounts[1], gas: '3000000', value: '200 '});
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it('enforces minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({from: accounts[1], value: '5'});
      assert(false);
    } catch(err) {
      assert(err);
    }
  });

  it('allows manager to create spending request', async () => {
    await campaign.methods
      .createSpendingRequest('Test spending request', 1000, accounts[1])
      .send({from: accounts[0], gas: 3000000 });

    const request = await campaign.methods.requests(0).call();

    assert.equal('Test spending request', request.description);
  });

  it('processes requests', async() => {

    const originalBalance = await web3.eth.getBalance(accounts[1]);

    await campaign.methods
      .contribute()
      .send({value: web3.utils.toWei('10', 'ether'), from: accounts[0]});

    await campaign.methods
      .createSpendingRequest('Create NFT assets', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({from: accounts[0], gas: 3000000});

    await campaign.methods
      .approveRequest(0)
      .send({from: accounts[0], gas: 3000000});

    await campaign.methods
      .finalizeRequest(0)
      .send({from: accounts[0], gas: 3000000});

    isRequestApproved = await campaign.methods.requests(0).call();

    assert(isRequestApproved);

    const finalBalance = await web3.eth.getBalance(accounts[1]);
    assert.equal((finalBalance - originalBalance), web3.utils.toWei('5', 'ether'));
  });

});
