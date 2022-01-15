import React, {Component} from 'react';
import factoryInstance from '../ethereum/factory';
import Layout from '../components/Layout';
import { Card, Icon, Image, Button, Container } from 'semantic-ui-react';
import {Link} from '../routes';



class CampaignIndex extends Component {

  static async getInitialProps() {
    const campaigns = await factoryInstance.methods.getDeployedCampaigns().call();
    return {campaigns: campaigns};
  }

  renderCampaigns() {
    const campaignList = this.props.campaigns.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a className="item">View Campaign</a>
          </Link>
        ),
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
            <Link route="/campaigns/new">
              <a className="item">
                <Button
                  content='Create Campaign'
                  icon="add circle"
                  floated="right"
                  primary
                />
              </a>
            </Link>

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
