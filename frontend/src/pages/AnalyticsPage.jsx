/* Creation Date: Saturday, March 30th 2019
 * Original Author: Nathan
 * Contents of file: Acts as the analytics page for the app.
 */
import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import { Grid, Button, Icon } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
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
        <Navbar />
        <h1
          style = {{
            fontFamily: 'Poppins',
            fontSize:'50px',
            fontWeight:'200',
            color: 'white',
            display: 'flex',
            justifyContent:'center',
            alignContent:'center',
            flexDirection:'row',
            marginTop: '5%',
        }}
        >
          View your drive
        </h1>
        <div
          style = {{
            fontFamily: 'Poppins',
            fontSize:'25px',
            fontWeight:'200',
            color: 'white',
            display: 'flex',
            justifyContent:'center',
            alignContent:'center',
            flexDirection:'row',
            marginTop: '5%',
          }}
        >
          <p style = {{float:'left', marginRight: '2%'}}>Starting Time: </p>
          <DatePicker
            selected={new Date()}
            onChange={this.handleChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="time"
            withPortal
          />
        </div>
        <div
          style = {{
            fontFamily: 'Poppins',
            fontSize:'25px',
            fontWeight:'200',
            color: 'white',
            display: 'flex',
            justifyContent:'center',
            alignContent:'center',
            flexDirection:'row',
          }}
        >
          <p style = {{float:'left', marginRight: '2%'}}>Ending Time: </p>
          <DatePicker
            selected={new Date()}
            onChange={this.handleChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="time"
            withPortal
          />          
        </div>

        <div
          style = {{
            fontFamily: 'Poppins',
            fontSize:'25px',
            fontWeight:'200',
            color: 'white',
            display: 'flex',
            justifyContent:'center',
            alignContent:'center',
            flexDirection:'row',
          }}
        >
          <Button animated style={{color:'white', background:'#7F00FF', clear:'both'}}>
            <Button.Content visible>View Drive</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>        
        </div>
      </div>
    );
  }
}

export default AnalyticsPage;