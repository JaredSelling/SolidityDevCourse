import React, {Component} from 'react';
import { Form, Button, Message, Container, Input } from 'semantic-ui-react';
import getCampaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import {Link, Router} from '../../../routes';
import Layout from '../../../components/Layout';

class NewRequest extends Component {
  state = {
    description: '',
    value: '',
    recipient: '',
    errorMessage: '',
    loading: false
  };

  static async getInitialProps(props) {
    const address = props.query.address;

    return {address: address};
  }

onSubmit = async (event) => {
  event.preventDefault();
  const campaign = getCampaign(this.props.address);
  const {description, value, recipient} = this.state;
  try {
    const accounts = await web3.eth.getAccounts();
    this.setState({loading: true, errorMessage: ''});
    await campaign.methods
      .createSpendingRequest(
        description,
        web3.utils.toWei(value, 'ether'),
        recipient
      )
      .send({from: accounts[0]});
    console.log(campaign);
    Router.pushRoute(`/campaigns/${this.props.address}/requests`);
  } catch (error) {
    this.setState({errorMessage: error.message});
  }
  this.setState({loading: false});
};

  render() {
    return (
      <Container>
        <Layout>
          <Link route={`/campaigns/${this.props.address}/requests`}>
            <a>
              <Button primary>Back</Button>
            </a>
          </Link>
          <h3>Create a Spending Request</h3>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>Description</label>
              <Input
                value={this.state.description}
                onChange={event => this.setState({description: event.target.value})}
              />
            </Form.Field>
            <Form.Field>
              <label>Value in Ether</label>
              <Input
                value={this.state.value}
                onChange={event => this.setState({value: event.target.value})}
              />
            </Form.Field>
            <Form.Field>
              <label>Recipient</label>
              <Input
                value={this.state.recipient}
                onChange={event => this.setState({recipient: event.target.value})}
              />
            </Form.Field>

            <Message
              error
              header="There was an error with your submission"
              content={this.state.errorMessage}
            />

            <Button loading={this.state.loading} primary>Create</Button>
          </Form>
        </Layout>
      </Container>
    );
  }
}

export default NewRequest;
