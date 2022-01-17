import React, {Component} from 'react';
import {Form, Input, Button, Message} from 'semantic-ui-react';
import getCampaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

class ContributeForm extends Component {
  state = {
    value: '',
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const campaign = getCampaign(this.props.address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        value: web3.utils.toWei(this.state.value, 'ether'),
        from: accounts[0]
      });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({value: event.target.value})}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Button primary>
          Contribute
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
