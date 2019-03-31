/* Creation Date: Friday, February 15th 2019
 * Original Author: Nathan
 * Modifications by: Akash Patel, Rohan Rao
 * Contents of file: Component for displaying the side pane on the dashboard
 */

import React, {Component} from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import DataListItem from './DataListItem';

class DataList extends Component {

    constructor(props) {
        super(props);
        this.values = [];
        this.speedPoints = [];
        this.rpmPoints = [];
        this.distPoints = [];
        this.fuelPoints = [];
        this.oilTempPoints = [];
        this.calcEngLoadPoints = [];
        this.absEngLoadPoints = [];
        this.engTorquePoints = [];
        this.intakePressurePoints = [];
        this.throttlePosPoints = [];
        this.coolTempPoints = [];
        this.engRefTorquePoints = [];
        this.intakeTempPoints = [];
        this.mafPoints = [];
        this.ctrlModVoltPoints = [];
        this.ambiTempPoints = [];
        this.runtimePoints = [];
        this.barrPoints = [];
    }

    render() {
        this.values = this.props.data[this.props.data.length-1];
        this.speedPoints = this.props.speedPoints;
        this.rpmPoints = this.props.rpmPoints;
        this.distPoints = this.props.distPoints;
        this.fuelPoints = this.props.fuelPoints;
        this.oilTempPoints = this.props.oilTempPoints;
        this.calcEngLoadPoints = this.props.calcEngLoadPoints;
        this.absEngLoadPoints = this.props.absEngLoadPoints;
        this.engTorquePoints = this.props.engTorquePoints;
        this.intakePressurePoints = this.props.intakePressurePoints;
        this.throttlePosPoints = this.props.throttlePosPoints;
        this.coolTempPoints = this.props.coolTempPoints;
        this.engRefTorquePoints = this.props.engRefTorquePoints;
        this.intakeTempPoints = this.props.intakeTempPoints;
        this.mafPoints = this.props.mafPoints;
        this.ctrlModVoltPoints = this.props.ctrlModVoltPoints;
        this.ambiTempPoints = this.props.ambiTempPoints;
        this.runtimePoints = this.props.runtimePoints;
        this.barrPoints = this.props.barrPoints;

        return (
            <Scrollbars>
                <DataListItem name="Speed" unit="KPH" data={this.speedPoints} value={this.values["vehicleSpeed"]}/>
                <DataListItem name="Engine RPM" unit="RPM" data={this.rpmPoints} value={this.values["RPM"]}/>
                <DataListItem name="Distance" unit="KM" data={this.distPoints} value={this.values["vehicleRunningDistance"]}/>
                <DataListItem name="Fuel Level" unit="%" data={this.fuelPoints} value={this.values["fuelLevel"]}/>
                <DataListItem name="Oil Temperature" unit="°C" data={this.oilTempPoints} value={this.values["engineOilTemperature"]}/>
                <DataListItem name="Calculated Engine Load" unit="%" data={this.calcEngLoadPoints} value={this.values["calculatedEngineLoad"]}/>
                <DataListItem name="Absolute Engine Load" unit="%" data={this.absEngLoadPoints} value={this.values["absoluteEngineLoad"]}/>
                <DataListItem name="Engine Torque Percentage" unit="%" data={this.engTorquePoints} value={this.values["torquePercentage"]}/>
                <DataListItem name="Intake Pressure" unit="kPa" data={this.intakeTempPoints} value={this.values["intakePressure"]}/>
                <DataListItem name="Throttle Position" unit="%" data={this.throttlePosPoints} value={this.values["throttlePosition"]}/>
                <DataListItem name="Coolant Temperature" unit="°C" data={this.coolTempPoints} value={this.values["engineCoolantTemperature"]}/>
                <DataListItem name="Engine Reference Torque" unit="Nm" data={this.engRefTorquePoints} value={this.values["referenceTorque"]}/>
                <DataListItem name="Intake Temperature" unit="°C" data={this.intakeTempPoints} value={this.values["intakeTemperature"]}/>
                <DataListItem name="MAF Flow Rate" unit="g/s" data={this.mafPoints} value={this.values["flowPressure"]}/>
                <DataListItem name="Control Module Voltage" unit="V" data={this.ctrlModVoltPoints} value={this.values["controlModuleVoltage"]}/>
                <DataListItem name="Ambient Temperature" unit="°C" data={this.ambiTempPoints} value={this.values["ambientTemperature"]}/>
                <DataListItem name="Runtime" unit="Sec" data={this.runtimePoints} value={this.values["engineRunningTime"]}/>
                <DataListItem name="Barometric Pressure" unit="kPa" data={this.barrPoints} value={this.values["barometricPressure"]}/>
            </Scrollbars>
        );
    }
}

export default DataList;