import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import getCampaign from '../ethereum/campaign';
import {Router} from '../routes';

class RequestRow extends Component {

  onApprove = async() => {
    const campaign = getCampaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    console.log(campaign);
    await campaign.methods.approveRequest(this.props.id).send({from: accounts[0]});
    // Router.pushRoute(``)
  }

  onFinalize = async() => {
    const campaign = getCampaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(this.props.id).send({from: accounts[0]});
  }

  render() {
    const {id, request, numApprovers} = this.props;
    const readyToFinalize = request.approvalCount > numApprovers / 2;
    return (
      <Table.Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
        <Table.Cell>{id}</Table.Cell>
        <Table.Cell>{request.description}</Table.Cell>
        <Table.Cell>{web3.utils.fromWei(request.requestAmnt, 'ether')}</Table.Cell>
        <Table.Cell>{request.recipient}</Table.Cell>
        <Table.Cell>{request.approvalCount}/{numApprovers}</Table.Cell>

        <Table.Cell>
          {request.complete ? null : (
            <Button color="green" basic onClick={this.onApprove}>Approve</Button>
          )}
        </Table.Cell>
        <Table.Cell>
          {request.complete ? null : (
            <Button color="teal" basic onClick={this.onFinalize}>Finalize</Button>
          )}
        </Table.Cell>
    </Table.Row>
    )
  }
}

export default RequestRow;
