import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import {Container, Table, Grid, Button } from 'semantic-ui-react';
import getCampaign from '../../../ethereum/campaign';
import { Link } from '../../../routes';
import RequestRow from '../../../components/RequestRow';


class RequestIndex extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    const campaign = getCampaign(address);
    const requestsCount = await campaign.methods.getRequestsCount().call();
    const numApprovers = await campaign.methods.numApprovers().call();

    const requests = await Promise.all(
      Array(parseInt(requestsCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call()
        })
    );
    return {address, requests, requestsCount, numApprovers};
  }

  renderRow() {
    return this.props.requests.map((request, index) => {
      return <RequestRow
        request={request}
        id={index}
        key={index}
        address={this.props.address}
        numApprovers={this.props.numApprovers}
      />;
    });
  }

  render() {
    return (
      <Container>
        <Layout>
          <h3>Requests</h3>
          <Link route={`/campaigns/${this.props.address}/requests/new`}>
            <a>
              <Button primary floated="right" style={{marginBottom: 10}}>Add Request</Button>
            </a>
          </Link>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>Recipient</Table.HeaderCell>
                <Table.HeaderCell>Approval Count</Table.HeaderCell>
                <Table.HeaderCell>Approve</Table.HeaderCell>
                <Table.HeaderCell>Finalize</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.renderRow()}
            </Table.Body>

          </Table>
          <div>Found {this.props.requestsCount} requests.</div>
        </Layout>
      </Container>
    );
  }
}

export default RequestIndex
