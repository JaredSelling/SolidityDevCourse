import React, {Component} from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Container, Input, Message } from 'semantic-ui-react';
import factoryInstance from '../../ethereum/factory';
import web3 from '../../ethereum/web3';


class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: ''
  };

  onSubmit = async (event) => {
    event.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      await factoryInstance.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });
    } catch(error) {
      this.setState({errorMessage: error.message});
    }

  };


  render() {
    return (
      <div>
        <Container>
          <Layout>
            <h3>Create a Campaign</h3>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
              <Form.Field>
                <label>Minimum Contribution:</label>
                <Input
                  label="wei"
                  labelPosition="right"
                  value={this.state.minimumContribution}
                  onChange={event => this.setState({minimumContribution: event.target.value})}
                />
              </Form.Field>
              <Message
                error
                header="There was an error with your submission"
                content={this.state.errorMessage}
              />
              <Button type='submit' primary>Create</Button>
            </Form>
          </Layout>
        </Container>

      </div>

    );
  }
}

export default CampaignNew
