import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import web3 from '../ethereum/web3';

class RequestRow extends Component {
  render() {
    const {id, request, numApprovers} = this.props;
    return (
      <Table.Row>
        <Table.Cell>{id}</Table.Cell>
        <Table.Cell>{request.description}</Table.Cell>
        <Table.Cell>{web3.utils.fromWei(request.requestAmnt, 'ether')}</Table.Cell>
        <Table.Cell>{request.recipient}</Table.Cell>
        <Table.Cell>{request.approvalCount}/{numApprovers}</Table.Cell>

      </Table.Row>
    )
  }
}

export default RequestRow;
