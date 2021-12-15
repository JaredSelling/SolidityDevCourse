const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
  'expire hunt snap hen loop kite pupil company spoil miracle company sort',
  'https://rinkeby.infura.io/v3/1aa00cced7c9455bb079a438127ad427'
);

const web3 = new Web3(provider);

const deploy = async () => {
   // Get list of accounts
   const accounts = await web3.eth.getAccounts();

   console.log('Attempting to deploy from account', accounts[0]);

   const result = await new web3.eth.Contract(abi)
     .deploy({data: evm.bytecode.object})
     .send({from: accounts[0], gas: '1000000'});

   console.log('Contract deployed to ', result.options.address);
   provider.engine.stop();
};

deploy();
