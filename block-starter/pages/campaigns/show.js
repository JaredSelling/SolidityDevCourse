import React, {Component} from 'react';
import Layout from '../../components/Layout';
import { Card, Container, Form, Input, Button, Grid } from 'semantic-ui-react';
import routes from '../../routes';
import web3 from '../../ethereum/web3';
import getCampaign from '../../ethereum/campaign';
import ContributeForm from '../../components/ContributeForm';


class CampaignShow extends Component {

  static async getInitialProps(props) {
    const campaign = getCampaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    return {
      address: props.query.address,
      minContribution: summary[0],
      balance: summary[1],
      numRequests: summary[2],
      numApprovers: summary[3],
      manager: summary[4]
    };
  }

  renderCards() {
    const items = [
      {
        header: this.props.minContribution,
        meta: 'Minimum Contribution (wei)',
        description: 'You must contribute at least this much wei to become an approver'
      },
      {
        header:  web3.utils.fromWei(this.props.balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description: 'The balance is how much ether this campaign has left to spend'

      },
      {
        header: this.props.numRequests,
        meta: 'Number of Requests',
        description: 'Number of spending requests proposed by the campaign manager',
      },
      {
        header: this.props.numApprovers,
        meta: 'Number of Approvers',
        description: 'Number of accounts with the ability to vote on spending requests'

      },
      {
        header: this.props.manager,
        meta: 'Address of Manager',
        description: 'The manager created this campaign and can create requests to withdraw money',
        style: {overflowWrap: 'break-word'}
      }
    ];
    return items;
  }

  render() {

    return (
      <Container>
        <Layout>
          <h3>Campaign Details</h3>
          <Grid>
            <Grid.Column width={10}>
              <Card.Group items={this.renderCards()} />
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address}></ContributeForm>
            </Grid.Column>
          </Grid>



        </Layout>
      </Container>
    );
  }
}

export default CampaignShow;
