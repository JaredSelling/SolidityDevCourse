import React, {Component} from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Container } from 'semantic-ui-react';


class CampaignNew extends Component {
  render() {
    return (
      <div>
        <Container>
          <Layout>
            <h3>Create a Campaign</h3>
            <Form>
              <Form.Field>
                <label>Minimum Contribution (in Gwei):</label>
                <input placeholder="0" />
              </Form.Field>
              <Button type='submit' primary>Create</Button>
            </Form>
          </Layout>
        </Container>

      </div>

    );
  }
}

export default CampaignNew
