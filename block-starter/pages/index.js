import React, {Component} from 'react';
import factoryInstance from '../ethereum/factory';
import Layout from '../components/Layout';
import { Card, Icon, Image, Button, Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


class CampaignIndex extends Component {

  static async getInitialProps() {
    const campaigns = await factoryInstance.methods.getDeployedCampaigns().call();
    return {campaigns: campaigns};
  }

  renderCampaigns() {
    const campaignList = this.props.campaigns.map(address => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true
      };
    });
    return <Card.Group items = {campaignList} />;
  }

  render() {
    return (
      <Container>
        <Layout>
          <div>
            <h3>Open Campaigns</h3>
            <Button
              content='Create Campaign'
              icon="add circle"
              floated="right"
              primary
            />
            {this.renderCampaigns()}
          </div>
        </Layout>

      </Container>
    );
  }
};

export default CampaignIndex;

// export default () => {
//   return (
//     <h1>This is the campaign list page!</h1>
//   );
// }
