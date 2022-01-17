import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import {Container, Table, Grid, Button } from 'semantic-ui-react';
import getCampaign from '../../../ethereum/campaign';
import { Link } from '../../../routes';


class RequestIndex extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    // const requests = campaign.methods.requests().call();
    // console.log(requests);
    return {address: address};
  }

  render() {
    return (
      <Container>
        <Layout>
          <h3>Requests</h3>
          <Link route={`/campaigns/${this.props.address}/requests/new`}>
            <a>
              <Button primary>Add Request</Button>
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
              <Table.Row>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
              </Table.Row>
            </Table.Body>

          </Table>
        </Layout>
      </Container>
    );
  }
}

export default RequestIndex
