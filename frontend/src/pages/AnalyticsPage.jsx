/* Creation Date: Saturday, March 30th 2019
 * Original Author: Nathan
 * Contents of file: Acts as the analytics page for the app.
 */
import React, {Component} from 'react';
import { Grid } from 'semantic-ui-react'

import './AnalyticsPage.css';

class AnalyticsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startTime: 0,
      endTime: 0
    };
  }



  render() {

    return (
      <div className="appcontent" style={{background: "#1F1F28"}}>
        <Grid columns={2} centered style={{marginTop: '30vh'}}>
            <Grid.Column>
              <h1 className="homeTitle">Launch Control</h1>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>        
        </Grid>
      </div>
    );
  }
}

export default AnalyticsPage;