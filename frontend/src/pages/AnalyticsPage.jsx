/* Creation Date: Saturday, March 30th 2019
 * Original Author: Nathan
 * Contents of file: Acts as the analytics page for the app.
 */
import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import DriveReport from '../components/DriveReport';
import { Button, Icon } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import BarLoader from 'react-spinners/BarLoader';
import axios from 'axios';
import User from "../models/User";

import "react-datepicker/dist/react-datepicker.css";
import './AnalyticsPage.css';

class AnalyticsPage extends Component {

  constructor(props) {
    super(props);
    let startTime = new Date();
    startTime.setDate(startTime.getDate() - 1);
    this.state = {
      startTime: startTime,
      endTime: new Date(),
      loading: false,
      results: false,
      dataResults: [],
    };
  }

  handleStartTimeChange = (date) => {
    if (this.state.endTime < date) {
      let newEndTime = new Date();
      newEndTime.setDate(date.getDate() + 1);
      this.setState({
        endTime: newEndTime
      });
    }
    this.setState({
      startTime: date
    });
  }

  handleEndTimeChange = (date) => {
    if (this.state.startTime > date) {
      let newStartTime = new Date();
      newStartTime.setDate(date.getDate() - 1);
      this.setState({
        startTime: newStartTime
      });
    }
    this.setState({
      endTime: date
    });
  }

  resetAnalyticsFlow = () => {
    this.setState({
      loading: false,
      results: false,
      dataResults: []});
  }

  startLoading = () => {
    this.setState({
      loading: true,
      results: false
    });
    let dataUrl;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      dataUrl = 'http://localhost:4000/data';
    } else {
      dataUrl = window.location.protocol + '//' + window.location.host + '/data';
    }
    axios.get(dataUrl, {
      headers: {
        Authorization: "JWT " + User.getToken()
      },
      // Timezone shift to fix timezone issue on app.
      // https://stackoverflow.com/questions/948532/how-do-you-convert-a-javascript-date-to-utc
      params: {
        start: new Date(this.state.startTime.getTime() - this.state.startTime.getTimezoneOffset() * 60000),
        end: new Date(this.state.endTime.getTime() - this.state.endTime.getTimezoneOffset() * 60000)
      }
    }).then((response) => {
      this.setState({
        loading: false,
        results: true,
        dataResults: response.data
      });
    })
  }

  render() {

    if (this.state.loading) {
      return (
        <div className="appcontent" style={{background: "#1F1F28"}}>
          <Navbar />
          <h1 className="headerText">Fetching Data ...</h1>
          <div className="headerText">
            <BarLoader
              widthUnit={"%"}
              width={40}
              color={'#7F00FF'}
              loading={this.state.loading}
            />
          </div>
        </div>
      )
    }

    if (!this.state.loading && this.state.results && this.state.dataResults.length === 0 ){
      return (
        <div className="appcontent" style={{background: "#1F1F28"}}>
          <Navbar />
          <h1 className="headerText">No drive data found!</h1>
          <div className='analyticsInputPageText' style={{marginTop: "20px"}}>
            <Button size='huge' color='red' onClick={this.resetAnalyticsFlow}>
              Go Back
            </Button>
          </div>
        </div>
      )
    }

    if (!this.state.loading && this.state.results){
      return (
        <div className="appcontent" style={{background: "#1F1F28"}}>
          <Navbar />
          <DriveReport 
            data={this.state.dataResults} 
            startTime={this.state.startTime} 
            endTime={this.state.endTime}/>
        </div>
      )
    }

    return (
      <div className="appcontent" style={{background: "#1F1F28"}}>
        <Navbar />
        <h1 className="headerText">View your drive</h1>
        <div className='analyticsInputPageText' style={{marginTop: '60px'}}>
          <p style = {{float:'left', marginRight: '2%'}}>Starting Time: </p>
          <DatePicker
            selected={this.state.startTime}
            onChange={this.handleStartTimeChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="time"
          />
        </div>
        <div className='analyticsInputPageText'>
          <p style = {{float:'left', marginRight: '2%'}}>Ending Time: </p>
          <DatePicker
            selected={this.state.endTime}
            onChange={this.handleEndTimeChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="time"
          />          
        </div>

        <div className='analyticsInputPageText' style={{marginTop: "20px"}}>
          <Button animated size='huge' onClick={this.startLoading} style={{color:'white', background:'#7F00FF', clear:'both'}}>
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