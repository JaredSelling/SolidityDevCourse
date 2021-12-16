const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');

let accounts;
let lottery;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  lottery = await new web3.eth.Contract(abi)
    .deploy({data: evm.bytecode.object})
    .send({from: accounts[0], gas: '1000000'});
});


describe('Lottery contract', async() => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address);
  });

  it('allows one account to enter', async() => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether')
    });
    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(players.length, 1)
  });

  it('allows multiple accounts to enter', async() => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether')
    });
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.02', 'ether')
    });
    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei('0.02', 'ether')
    });
    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(players.length, 3)
  });

  it('requires a minimum amnt of ether to enter', async() => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 0
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('enforces only manager can pick winner', async() => {
    // console.log('manager: ', await lottery.methods.manager().call());
    // console.log('account picking winner: ', accounts[0]);
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('sends money to winner and resets the players array', async() => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('1', 'ether')
    });

    const initialBalance = await web3.eth.getBalance(lottery.options.address);
    console.log('Initial balance: ', web3.utils.fromWei(initialBalance), 'ether');
    await lottery.methods.pickWinner().send({from: accounts[0]});
    const playersArray = await lottery.methods.getPlayers().call();
    const lotteryBalanceAfterReset = await web3.eth.getBalance(lottery.options.address);
    console.log('Balance after reset: ', web3.utils.fromWei(lotteryBalanceAfterReset, 'ether'));
    assert(playersArray.length == 0);
    assert(lotteryBalanceAfterReset == 0);
  });


});
