/* Creation Date: Saturday, March 2nd 2019
 * Original Author: Nathan
 * Modifications by: Akash Patel, Rohan Rao
 * Contents of file: Main dashboard page that displays graphs, maps and lists of values
 */

import React, {Component} from 'react';
import io from 'socket.io-client';
import {Grid, Menu} from 'semantic-ui-react'
import DataList from '../components/DataList'
import User from "../models/User";
import { Redirect } from "react-router-dom";
import './DashboardPage.css';
import {
  FlexibleXYPlot,
  GradientDefs,
  XAxis,
  YAxis,
  LineSeries,
} from 'react-vis';
import "../../node_modules/react-vis/dist/style.css"
import MapContainer from '../components/MapContainer';
import moment from 'moment';

class DashboardPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [{"vehicleSpeed" : "0"}, {"latLng" : {"latitude": 0, "longitude": 0}}],
      userToken: User.getToken(),
      shouldLogout: false,
      
      speedPoints: [],
      rpmPoints:[],
      distPoints:[],
      fuelPoints:[],
      oilTempPoints:[],
      calcEngLoadPoints:[],
      absEngLoadPoints:[],
      engTorquePoints:[],
      intakePressurePoints:[],
      throttlePosPoints:[],
      coolTempPoints:[],
      engRefTorquePoints:[],
      intakeTempPoints:[],
      mafPoints:[],
      ctrlModVoltPoints:[],
      ambiTempPoints:[],
      runtimePoints:[],
      barrPoints:[],
    };
    this.dataUpdate = this
      .dataUpdate
      .bind(this);
  }

  // https://stackoverflow.com/questions/35469836/detecting-production-vs-development-react-at-runtime
  componentDidMount() {
    let socketUrl;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      socketUrl = 'http://localhost:4000/';
    } else {
      socketUrl = window.location.protocol + '//' + window.location.host + '/';
    }

    console.log(this.state.userToken);
    let socket = io(socketUrl);
    socket.on('connect', () => {
      socket
        .emit('authenticate', {token: this.state.userToken}) //send the jwt
        .on('authenticated', () => {
          //do other things
          console.log("AUTHED!");
          socket.on('data', this.dataUpdate);
        })
        .on('unauthorized', (msg) => {
          console.log("unauthorized: " + JSON.stringify(msg.data));
          this.logout();
        })
    });
    //socket.on('data', this.dataUpdate);
  }

  dataUpdate(data) {
    var tempData = this.state.data;
    tempData.push(JSON.parse(data));

    var tempSpeedPointsData = this.state.speedPoints;
    var tempRPMPointsData = this.state.rpmPoints;
    var tempDistPoints = this.state.distPoints;
    var tempFuelPoints = this.state.fuelPoints;
    var tempOilTempPoints = this.state.oilTempPoints;
    var tempCalcEngLoadPoints = this.state.calcEngLoadPoints;
    var tempAbsEngLoadPoints = this.state.absEngLoadPoints;
    var tempEngTorquePoints = this.state.engTorquePoints;
    var tempIntakePressurePoints = this.state.intakePressurePoints;
    var tempThrottlePosPoints = this.state.throttlePosPoints;
    var tempCoolTempPoints = this.state.coolTempPoints;
    var tempEngRefTorquePoints = this.state.engRefTorquePoints;
    var tempIntakeTempPoints = this.state.intakeTempPoints;
    var tempMafPoints = this.state.mafPoints;
    var tempCtrlModVoltPoints = this.state.ctrlModVoltPoints;
    var tempAmbiTempPoints = this.state.ambiTempPoints;
    var tempRuntimePoints = this.state.runtimePoints;
    var tempBarrPoints = this.state.barrPoints;

    let dateTimeStamp = new Date(tempData[tempData.length - 1]["dateTimeStamp"]);
    console.log(dateTimeStamp)

    tempSpeedPointsData.push({x: dateTimeStamp, y: Number(tempData[tempData.length - 1]["vehicleSpeed"])});
    tempRPMPointsData.push({x: dateTimeStamp, y: Number(tempData[tempData.length - 1]["RPM"])});
    tempDistPoints.push({x: dateTimeStamp, y: Number(tempData[tempData.length - 1]["vehicleRunningDistance"])});
    tempFuelPoints.push({x: dateTimeStamp, y: Number(tempData[tempData.length - 1]["fuelLevel"])});
    tempOilTempPoints.push({x: dateTimeStamp, y: Number(tempData[tempData.length - 1]["engineOilTemperature"])});
    tempCalcEngLoadPoints.push({x: dateTimeStamp, y: Number(tempData[tempData.length - 1]["calculatedEngineLoad"])});
    tempAbsEngLoadPoints.push({x: dateTimeStamp, y: Number(tempData[tempData.length - 1]["absoluteEngineLoad"])});
    tempEngTorquePoints.push({x: dateTimeStamp, y: Number(tempData[tempData.length - 1]["torquePercentage"])});
    tempIntakePressurePoints.push({x: dateTimeStamp, y: Number(tempData[tempData.length - 1]["intakePressure"])});
    tempThrottlePosPoints.push({x: dateTimeStamp, y: Number(tempData[tempData.length - 1]["throttlePosition"])});
    tempCoolTempPoints.push({x: dateTimeStamp, y: Number(tempData[tempData.length - 1]["engineCoolantTemperature"])});
    tempEngRefTorquePoints.push({x: dateTimeStamp, y: Number(tempData[tempData.length - 1]["referenceTorque"])});
    tempIntakeTempPoints.push({x: dateTimeStamp, y: Number(tempData[tempData.length - 1]["intakeTemperature"])});
    tempMafPoints.push({x: dateTimeStamp, y: Number(tempData[tempData.length - 1]["flowPressure"])});
    tempCtrlModVoltPoints.push({x: dateTimeStamp, y: Number(tempData[tempData.length - 1]["controlModuleVoltage"])});
    tempAmbiTempPoints.push({x: dateTimeStamp, y: Number(tempData[tempData.length - 1]["ambientTemperature"])});
    tempRuntimePoints.push({x: dateTimeStamp, y: Number(tempData[tempData.length - 1]["engineRunningTime"]) });
    tempBarrPoints.push({x: dateTimeStamp, y: Number(tempData[tempData.length - 1]["barometricPressure"])});

    this.setState({
      data: tempData,
      speedPoints: tempSpeedPointsData,
      rpmPoints: tempRPMPointsData,
      distPoints:tempDistPoints,
      fuelPoints: tempFuelPoints,
      oilTempPoints: tempOilTempPoints,
      calcEngLoadPoints: tempCalcEngLoadPoints,
      absEngLoadPoints: tempAbsEngLoadPoints,
      engTorquePoints: tempEngTorquePoints,
      intakePressurePoints: tempIntakePressurePoints,
      throttlePosPoints: tempThrottlePosPoints,
      coolTempPoints: tempCoolTempPoints,
      engRefTorquePoints: tempEngRefTorquePoints,
      intakeTempPoints: tempIntakeTempPoints,
      mafPoints: tempMafPoints,
      ctrlModVoltPoints: tempCtrlModVoltPoints,
      ambiTempPoints: tempAmbiTempPoints,
      runtimePoints: tempRuntimePoints,
      barrPoints: tempBarrPoints
    })
  }

  logout = () => {
    User.deauthenticate();
    this.setState({
      shouldLogout: true
    });
  }

  connect() {
    console.log("connected");
  }

  render() {
    if (this.state.shouldLogout){
      return <Redirect to='/' />
    }

    if (this.state.speedPoints.length > 10)
    {
      this.state.speedPoints.shift();
      this.state.rpmPoints.shift();
      this.state.distPoints.shift();
      this.state.fuelPoints.shift();
      this.state.oilTempPoints.shift();
      this.state.calcEngLoadPoints.shift();
      this.state.absEngLoadPoints.shift();
      this.state.engTorquePoints.shift();
      this.state.intakePressurePoints.shift();
      this.state.throttlePosPoints.shift();
      this.state.coolTempPoints.shift();
      this.state.engRefTorquePoints.shift();
      this.state.intakeTempPoints.shift();
      this.state.mafPoints.shift();
      this.state.ctrlModVoltPoints.shift();
      this.state.ambiTempPoints.shift();
      this.state.runtimePoints.shift();
      this.state.barrPoints.shift();
    }

    return (
      <div className="App">
        <Menu className="navbar" stackable inverted>
          <Menu.Item>
            Launch Control
          </Menu.Item>
          <Menu.Item 
            onClick={this.logout}>
            Log Out
          </Menu.Item>
        </Menu>
        <div className="appcontent">
          <Grid columns={2} className="fillScreen">
            <Grid.Row style={{margin:"0", padding: "0 0 0 0"}}>

              <Grid.Column computer={4} tablet={4} mobile={16} style={{padding: "0 0 0 0", background: "#181820"}}>
                <DataList
                  data={this.state.data} 
                  speedPoints = {this.state.speedPoints}
                  rpmPoints = {this.state.rpmPoints}
                  distPoints = {this.state.distPoints}
                  fuelPoints = {this.state.fuelPoints}
                  oilTempPoints = {this.state.oilTempPoints}
                  calcEngLoadPoints = {this.state.calcEngLoadPoints}
                  absEngLoadPoints = {this.state.absEngLoadPoints}
                  engTorquePoints = {this.state.engTorquePoints}
                  intakePressurePoints = {this.state.intakePressurePoints}
                  throttlePosPoints = {this.state.throttlePosPoints}
                  coolTempPoints = {this.state.coolTempPoints}
                  engRefTorquePoints = {this.state.engRefTorquePoints}
                  intakeTempPoints = {this.state.intakeTempPoints}
                  mafPoints = {this.state.mafPoints}
                  ctrlModVoltPoints = {this.state.ctrlModVoltPoints}
                  ambiTempPoints = {this.state.ambiTempPoints}
                  runtimePoints = {this.state.runtimePoints}
                  barrPoints = {this.state.barrPoints}
                />
              </Grid.Column>

              <Grid.Column computer={12} tablet={12} mobile={16} style={{padding: "0 0 0 0", background: "#1F1F28"}}>
                <Grid columns={2} style={{height: '100%', padding: "0 0 0 0", margin: "0 0 0 0"}}>

                    <Grid.Column computer={8} tablet={8} mobile={16} style={{padding: "0 0 0 0"}}>
                      <Grid rows={2} style={{height: '100%', padding: "0 0 0 0", margin: "0 0 0 0"}}>
                        <h2 style={{width:'100%', color:"white"}}><span style={{float:"left"}}>Speed</span><span style={{float:"right"}}>
                          {String(this.state.data[this.state.data.length - 1].vehicleSpeed)} KPH
                        </span></h2>
                        <Grid.Row computer={8} tablet={8} mobile={16} style={{padding: "0 0 0 0", background: "#1F1F28"}}>
                          <FlexibleXYPlot>
                            <GradientDefs>
                              <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                                <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                                <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                              </linearGradient>
                            </GradientDefs>
                            <XAxis
                             style={{
                               line: {stroke: '#ADDDE1', strokeWidth: 0},
                               ticks: {stroke: '#ADDDE1'},
                               text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                             }}
                             xType='time'
                             tickFormat = {v => moment(v).format('hh:mm:ss')}
                             tickTotal = {10}
                           />

                          <YAxis
                            style={{
                              line: {stroke: '#ADDDE1', strokeWidth: 0},
                              ticks: {stroke: '#ADDDE1'},
                              text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                            }}
                          />
                                <LineSeries
                                className="first-series"
                                animation
                                data={this.state.speedPoints}
                                curve={'curveMonotoneX'}
                                style={{strokeWidth:4}}
                                color={'url(#CoolGradient)'}
                              />
                          </FlexibleXYPlot>
                          
                        </Grid.Row>
                        <h2 style={{width:'100%', color:"white"}}><span style={{float:"left"}}>RPM</span><span style={{float:"right"}}>
                          {String(this.state.data[this.state.data.length - 1]["RPM"])} RPM
                        </span></h2>
                        <Grid.Row computer={8} tablet={8} mobile={16} style={{padding: "0 0 0 0", background: "#1F1F28"}}>
                        <FlexibleXYPlot>
                            <GradientDefs>
                              <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                                <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                                <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                              </linearGradient>
                            </GradientDefs>
                            <XAxis
                             style={{
                               line: {stroke: '#ADDDE1', strokeWidth: 0},
                               ticks: {stroke: '#ADDDE1'},
                               text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                             }}
                             xType='time'
                             tickFormat = {v => moment(v).format('hh:mm:ss')}
                             tickTotal = {10}
                           />

                          <YAxis
                            style={{
                              line: {stroke: '#ADDDE1', strokeWidth: 0},
                              ticks: {stroke: '#ADDDE1'},
                              text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                            }}
                          />
                                <LineSeries
                                className="first-series"
                                animation
                                data={this.state.rpmPoints}
                                curve={'curveMonotoneX'}
                                style={{strokeWidth:4}}
                                color={'url(#CoolGradient)'}
                              />
                          </FlexibleXYPlot>
                        </Grid.Row>
                      </Grid>
                    </Grid.Column>

                    <Grid.Column computer={8} tablet={8} mobile={16} style={{padding: "0 0 0 0"}}>
                      <Grid rows={2} style={{height: '100%', padding: "0 0 0 0", margin: "0 0 0 0"}}>
                            <h2 style={{width:'100%', color:"white"}}><span style={{float:"left"}}>Throttle Position</span><span style={{float:"right"}}>
                              {String(this.state.data[this.state.data.length - 1]["throttlePosition"])} %
                            </span></h2>
                          <Grid.Row computer={8} tablet={8} mobile={16} style={{padding: "0 0 0 0", background: "#1F1F28"}}>
                          <FlexibleXYPlot>
                            <GradientDefs>
                              <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                                <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                                <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                              </linearGradient>
                            </GradientDefs>
                            <XAxis
                             style={{
                               line: {stroke: '#ADDDE1', strokeWidth: 0},
                               ticks: {stroke: '#ADDDE1'},
                               text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                             }}
                             xType='time'
                             tickFormat = {v => moment(v).format('hh:mm:ss')}
                             tickTotal = {10}
                           />

                          <YAxis
                            style={{
                              line: {stroke: '#ADDDE1', strokeWidth: 0},
                              ticks: {stroke: '#ADDDE1'},
                              text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                            }}
                          />
                                <LineSeries
                                className="first-series"
                                animation
                                data={this.state.throttlePosPoints}
                                curve={'curveMonotoneX'}
                                style={{strokeWidth:4}}
                                color={'url(#CoolGradient)'}
                              />
                          </FlexibleXYPlot>
                          </Grid.Row>

                          <Grid.Row computer={8} tablet={8} mobile={16} style={{padding: "0 0 0 0", background: "#1F1F28"}}>
                            <MapContainer
                              latitude = {this.state.data[this.state.data.length-1]["latLng"].latitude}
                              longitude = {this.state.data[this.state.data.length-1]["latLng"].longitude}
                              />                
                          </Grid.Row>
                        </Grid>
                    </Grid.Column>

                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default DashboardPage;