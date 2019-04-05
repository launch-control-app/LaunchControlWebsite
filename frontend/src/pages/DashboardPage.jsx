/* Creation Date: Saturday, March 2nd 2019
 * Original Author: Nathan
 * Modifications by: Akash Patel, Rohan Rao
 * Contents of file: Main dashboard page that displays graphs, maps and lists of values
 */

import React, {Component} from 'react';
import io from 'socket.io-client';
import {Grid} from 'semantic-ui-react';
import DataList from '../components/DataList';
import User from "../models/User";
import { Redirect } from "react-router-dom";
import './DashboardPage.css';
import "../../node_modules/react-vis/dist/style.css";
import MapContainer from '../components/MapContainer';
import FocusGraph from '../components/FocusGraph';
import Navbar from '../components/Navbar';
import find from 'lodash/find';

const GRAPH_STATE_OPTIONS = [
  {key: "Speed", text: "Speed", value: "Speed", unit: "KPH", datasetname: "speedPoints"},
  {key: "Engine RPM", text: "Engine RPM", value: "Engine RPM", unit: "RPM", datasetname: "rpmPoints"},
  {key: "Distance", text: "Distance", value: "Distance", unit: "KM", datasetname: "distPoints"},
  {key: "Fuel Level", text: "Fuel Level", value: "Fuel Level", unit: "%", datasetname: "fuelPoints"},
  {key: "Oil Temperature", text: "Oil Temperature", value: "Oil Temperature", unit: "°C", datasetname: "oilTempPoints"},
  {key: "Calculated Engine Load", text: "Calculated Engine Load", value: "Calculated Engine Load", unit: "%", datasetname: "calcEngLoadPoints"},
  {key: "Absolute Engine Load", text: "Absolute Engine Load", value: "Absolute Engine Load", unit: "%", datasetname: "absEngLoadPoints"},
  {key: "Engine Torque Percentage", text: "Engine Torque Percentage", value: "Engine Torque Percentage", unit: "%", datasetname: "engTorquePoints"},
  {key: "Intake Pressure", text: "Intake Pressure", value: "Intake Pressure", unit: "kPa", datasetname: "intakeTempPoints"},
  {key: "Throttle Position", text: "Throttle Position", value: "Throttle Position", unit: "%", datasetname: "throttlePosPoints"},
  {key: "Coolant Temperature", text: "Coolant Temperature", value: "Coolant Temperature", unit: "°C", datasetname: "coolTempPoints"},
  {key: "Engine Reference Torque", text: "Engine Reference Torque", value: "Engine Reference Torque", unit: "Nm", datasetname: "engRefTorquePoints"},
  {key: "Intake Temperature", text: "Intake Temperature", value: "Intake Temperature", unit: "°C", datasetname: "intakeTempPoints"},
  {key: "MAF Flow Rate", text: "MAF Flow Rate", value: "MAF Flow Rate", unit: "g/s", datasetname: "mafPoints"},
  {key: "Control Module Voltage", text: "Control Module Voltage", value: "Control Module Voltage", unit: "V", datasetname: "ctrlModVoltPoints"},
  {key: "Ambient Temperatur", text: "Ambient Temperatur", value: "Ambient Temperatur", unit: "°C", datasetname: "ambiTempPoints"},
  {key: "Runtime", text: "Runtime", value: "Runtime", unit: "Sec", datasetname: "runtimePoints"},
  {key: "Barometric Pressure", text: "Barometric Pressure", value: "Barometric Pressure", unit: "kPa", datasetname: "barrPoints"},
]

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
      graph1: GRAPH_STATE_OPTIONS[0],
      graph2: GRAPH_STATE_OPTIONS[9],
      graph3: GRAPH_STATE_OPTIONS[1]
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

    let socket = io(socketUrl);
    socket.on('connect', () => {
      socket
        .emit('authenticate', {token: this.state.userToken}) //send the jwt
        .on('authenticated', () => {
          //do other things
          socket.on('data', this.dataUpdate);
        })
        .on('unauthorized', (msg) => {
          console.log("unauthorized: " + JSON.stringify(msg.data));
          this.logout();
        })
    });
  }

  updateGraphState = (id, updatedValue) => {
    //console.log(id);
    const newGraphState = find(GRAPH_STATE_OPTIONS, { 'value': updatedValue });
    //console.log(newGraphState);
    if (id === 1){
      this.setState({
        graph1: newGraphState
      });
    } else if (id === 2){
      this.setState({
        graph2: newGraphState
      });
    } else {
      this.setState({
        graph3: newGraphState
      });
    }
  }

  dataUpdate(data) {
    var tempData = this.state.data;
    tempData.push(data);

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

  connect() {
    console.log("connected");
  }

  render() {
    if (this.state.shouldLogout){
      return <Redirect to='/' />
    }

    if (this.state.speedPoints.length > 10) {
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

    const graph1Data = this.state[this.state.graph1.datasetname];
    const graph2Data = this.state[this.state.graph2.datasetname];
    const graph3Data = this.state[this.state.graph3.datasetname];

    return (
      <div className="App">
        <Navbar />
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
                  <Grid.Row stretched style={{ padding: "0 0 0 0"}}>
                    <Grid.Column computer={8} tablet={8} mobile={16} style={{padding: "0 0 0 0"}}>
                      <FocusGraph 
                        options={GRAPH_STATE_OPTIONS} 
                        selected={this.state.graph1} 
                        graphID={1}
                        changeGraph={this.updateGraphState}
                        unit={this.state.graph1.unit} 
                        data={graph1Data}/>
                    </Grid.Column>
                    <Grid.Column computer={8} tablet={8} mobile={16} style={{padding: "0 0 0 0"}}>
                      <FocusGraph 
                        options={GRAPH_STATE_OPTIONS} 
                        selected={this.state.graph2} 
                        graphID={2}
                        changeGraph={this.updateGraphState}
                        unit={this.state.graph2.unit} 
                        data={graph2Data}/>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row stretched style={{padding: "0 0 0 0"}}>
                    <Grid.Column computer={8} tablet={8} mobile={16} style={{padding: "0 0 0 0"}}>
                      <FocusGraph 
                        options={GRAPH_STATE_OPTIONS} 
                        selected={this.state.graph3} 
                        graphID={3}
                        changeGraph={this.updateGraphState}
                        unit={this.state.graph3.unit} 
                        data={graph3Data}/>
                    </Grid.Column>
                    <Grid.Column computer={8} tablet={8} mobile={16} style={{padding: "0 0 0 0"}}>
                      <MapContainer
                        latitude = {this.state.data[this.state.data.length-1]["latLng"].latitude}
                        longitude = {this.state.data[this.state.data.length-1]["latLng"].longitude}
                        />
                    </Grid.Column>
                  </Grid.Row>
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