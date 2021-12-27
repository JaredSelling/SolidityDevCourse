import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import web3 from './web3';
import lottery from './lottery';

class App extends React.Component {

  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: '',
    isManager: ''
  };

  async componentDidMount() {

    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    console.log("lottery details, ", lottery);
    this.setState({manager: manager, players: players, balance: balance});

    if(manager.toLowerCase() == web3.currentProvider.selectedAddress) {
      this.setState({isManager: true});
    }
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Sending your eth to the lottery pool...'});

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')

    });
    const players = await lottery.methods.getPlayers().call();
    this.setState({message: 'You have been entered !', players: players});
  };

  onClick = async(event) => {
    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting on transaction success...'});

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({message: 'A winner has been selected!'});
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>Player addresses: {this.state.players}</p>
        <p>There are currently {this.state.players.length} people entered, competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!</p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter: </label>
            <input
              value={this.state.value}
              onChange={event => this.setState({value: event.target.value})}
            />
            <button action="submit">Enter</button>
          </div>
        </form>
        <hr />

        {this.state.isManager ? (
          <div>
            <h4>Time to pick a winner?</h4>
            <button onClick={this.onClick}>Pick Winner</button>
            <hr />
          </div>

      ): null}


        <h1>{this.state.message}</h1>
      </div>

    );
  }
}

export default App;
