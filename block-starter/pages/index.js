import React, {Component} from 'react';
import factoryInstance from '../ethereum/factory';

class CampaignIndex extends Component {

  static async getInitialProps() {
    const campaigns = await factoryInstance.methods.getDeployedCampaigns().call();
    console.log(campaigns);
    return {campaigns: campaigns};
  }

  render() {
    return (
      <div><h4>{this.props.campaigns[0]}</h4></div>
    );
  }
};

export default CampaignIndex;

// export default () => {
//   return (
//     <h1>This is the campaign list page!</h1>
//   );
// }
