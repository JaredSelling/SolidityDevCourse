import React, {Component} from 'react';
import {Form, Input, Button, Message} from 'semantic-ui-react';
import getCampaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import {Router} from '../routes';

class ContributeForm extends Component {
  state = {
    value: '',
    loading: false,
    errorMessage: ''
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = getCampaign(this.props.address);
    try {
      this.setState({loading: true, errorMessage: false});
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        value: web3.utils.toWei(this.state.value, 'ether'),
        from: accounts[0]
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch(error) {
      this.setState({errorMessage: error.message});
      console.log(error);
    }
    this.setState({loading: false, value: ''});
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({value: event.target.value})}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Message
          error
          header="There was an error with your submission"
          content={this.state.errorMessage}
        />
        <Button primary loading={this.state.loading}>
          Contribute
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
