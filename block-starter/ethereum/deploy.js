const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const credentials = require('../config/credentials');
const compiledFactory = require('./build/CampaignFactory.json');


const provider = new HDWalletProvider(
  credentials.infura_key,
  credentials.infura_url
);

const web3 = new Web3(provider);

const deploy = async () => {
   // Get list of accounts
   const accounts = await web3.eth.getAccounts();

   console.log('Attempting to deploy from account', accounts[0]);

   const result = await new web3.eth.Contract(compiledFactory.abi)
     .deploy({data: compiledFactory.evm.bytecode.object})
     .send({from: accounts[0], gas: '3000000'});


   console.log('Contract deployed to ', result.options.address);

   provider.engine.stop();
};

deploy();

// Deployed to:  0x35A34F030333b892970Bb2FEa4C3Cf04eF48C004
