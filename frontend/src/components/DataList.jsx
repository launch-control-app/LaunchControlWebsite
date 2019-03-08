/* Creation Date: Friday, February 15th 2019
 * Original Author: Nathan
 * Modifications by: Akash Patel, Rohan Rao
 * Contents of file: Component for displaying the side pane on the dashboard
 */

import React, {Component} from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {
    GradientDefs,
    XYPlot,
    LineSeries,
} from 'react-vis';

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
});

const listStyle = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    maxWidth: 250,
};

const divStyle = {
    display: 'flex',
};

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
                <div style={divStyle}>
                    <List style = {listStyle}>
                            <ListItem style = {{width: 105}}>    
                                <ListItemText primary = { <p style={{color: "#ffffff"}}>{"Speed"}</p>}    />
                            </ListItem>
                            <ListItem style = {{width: 40}}>    
                                <ListItemText primary = {<p style={{color: "#ffffff"}}>{this.values["vehicleSpeed"]}</p>}  />
                            </ListItem>
                            <ListItem style = {{width: 80}}>    
                                <ListItemText primary = {<p style={{color: "#ffffff"}}>{"KPH"}</p>}  />
                            </ListItem>
                    </List>  
                    <XYPlot height = {70} width = {130} style={{marginTop: "10px", marginLeft: "-50px"}}>
                        <GradientDefs>
                            <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                            </linearGradient>
                        </GradientDefs>
                        
                        <LineSeries
                            className="first-series"
                            animation
                            data={this.speedPoints}
                            curve={'curveMonotoneX'}
                            style={{strokeWidth:2}}
                            color={'url(#CoolGradient)'}
                            />
                    </XYPlot>
                </div>

                <div style={divStyle}>
                    <List style = {listStyle}>
                        <ListItem style = {{width: 105}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"Engine RPM"}</p>}    />
                        </ListItem>
                        <ListItem style = {{width: 40}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{this.values["RPM"]}</p>}  />
                        </ListItem>
                        <ListItem style = {{width: 80}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"RPM"}</p>}  />
                        </ListItem>
                    </List>
                    
                    <XYPlot height = {70} width = {130} style={{marginTop: "10px", marginLeft: "-50px"}}>
                        <GradientDefs>
                            <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                            </linearGradient>
                        </GradientDefs>
                        
                        <LineSeries
                            className="first-series"
                            animation
                            data={this.rpmPoints}
                            curve={'curveMonotoneX'}
                            style={{strokeWidth:2}}
                            color={'url(#CoolGradient)'}
                            />
                    </XYPlot>

                </div>

                <div style={divStyle}>
                    <List style = {listStyle}>
                        <ListItem style = {{width: 105}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"Distance"}</p>}    />
                        </ListItem>
                        <ListItem style = {{width: 40}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{this.values["vehicleRunningDistance"]}</p>}  />
                        </ListItem>
                        <ListItem style = {{width: 80}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"KM"}</p>}  />
                        </ListItem>
                    </List>
                    <XYPlot height = {70} width = {130} style={{marginTop: "10px", marginLeft: "-50px"}}>
                        <GradientDefs>
                            <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                            </linearGradient>
                        </GradientDefs>
                        
                        <LineSeries
                            className="first-series"
                            animation
                            data={this.distPoints}
                            curve={'curveMonotoneX'}
                            style={{strokeWidth:2}}
                            color={'url(#CoolGradient)'}
                            />
                    </XYPlot>
                </div>

                <div style={divStyle}>
                    <List style = {listStyle}>
                        <ListItem style = {{width: 105}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"Fuel Level"}</p>}    />
                        </ListItem>
                        <ListItem style = {{width: 40}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{this.values["fuelLevel"]}</p>}  />
                        </ListItem>
                        <ListItem style = {{width: 80}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"%"}</p>}  />
                        </ListItem>
                    </List>
                    <XYPlot height = {70} width = {130} style={{marginTop: "10px", marginLeft: "-50px"}}>
                        <GradientDefs>
                            <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                            </linearGradient>
                        </GradientDefs>
                        
                        <LineSeries
                            className="first-series"
                            animation
                            data={this.fuelPoints}
                            curve={'curveMonotoneX'}
                            style={{strokeWidth:2}}
                            color={'url(#CoolGradient)'}
                            />
                    </XYPlot>
                </div>

                <div style={divStyle}>
                    <List style = {listStyle}>
                        <ListItem style = {{width: 105}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"Oil Temperature"}</p>}    />
                        </ListItem>
                        <ListItem style = {{width: 40}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{this.values["engineOilTemperature"]}</p>}  />
                        </ListItem>
                        <ListItem style = {{width: 80}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"°C"}</p>}  />
                        </ListItem>
                    </List>
                    <XYPlot height = {70} width = {130} style={{marginTop: "10px", marginLeft: "-50px"}}>
                        <GradientDefs>
                            <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                            </linearGradient>
                        </GradientDefs>
                        
                        <LineSeries
                            className="first-series"
                            animation
                            data={this.oilTempPoints}
                            curve={'curveMonotoneX'}
                            style={{strokeWidth:2}}
                            color={'url(#CoolGradient)'}
                            />
                    </XYPlot>
                </div>

                <div style={divStyle}>
                    <List style = {listStyle}>
                        <ListItem style = {{width: 105}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"Calculated Engine Load"}</p>}    />
                        </ListItem>
                        <ListItem style = {{width: 40}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{this.values["calculatedEngineLoad"]}</p>}  />
                        </ListItem>
                        <ListItem style = {{width: 80}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"%"}</p>}  />
                        </ListItem>
                    </List>
                    <XYPlot height = {70} width = {130} style={{marginTop: "10px", marginLeft: "-50px"}}>
                        <GradientDefs>
                            <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                            </linearGradient>
                        </GradientDefs>
                        
                        <LineSeries
                            className="first-series"
                            animation
                            data={this.calcEngLoadPoints}
                            curve={'curveMonotoneX'}
                            style={{strokeWidth:2}}
                            color={'url(#CoolGradient)'}
                            />
                    </XYPlot>
                </div>

                <div style={divStyle}>
                    <List style = {listStyle}>
                        <ListItem style = {{width: 105}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"Absolute Engine Load"}</p>}    />
                        </ListItem>
                        <ListItem style = {{width: 40}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{this.values["absoluteEngineLoad"]}</p>}  />
                        </ListItem>
                        <ListItem style = {{width: 80}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"%"}</p>}  />
                        </ListItem>
                    </List>
                    <XYPlot height = {70} width = {130} style={{marginTop: "10px", marginLeft: "-50px"}}>
                        <GradientDefs>
                            <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                            </linearGradient>
                        </GradientDefs>
                        
                        <LineSeries
                            className="first-series"
                            animation
                            data={this.absEngLoadPoints}
                            curve={'curveMonotoneX'}
                            style={{strokeWidth:2}}
                            color={'url(#CoolGradient)'}
                            />
                    </XYPlot>
                </div>

                <div style={divStyle}>
                    <List style = {listStyle}>
                        <ListItem style = {{width: 105}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"Engine Torque Percentage"}</p>}    />
                        </ListItem>
                        <ListItem style = {{width: 40}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{this.values["torquePercentage"]}</p>}  />
                        </ListItem>
                        <ListItem style = {{width: 80}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"%"}</p>}  />
                        </ListItem>
                    </List>
                    <XYPlot height = {70} width = {130} style={{marginTop: "10px", marginLeft: "-50px"}}>
                        <GradientDefs>
                            <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                            </linearGradient>
                        </GradientDefs>
                        
                        <LineSeries
                            className="first-series"
                            animation
                            data={this.engTorquePoints}
                            curve={'curveMonotoneX'}
                            style={{strokeWidth:2}}
                            color={'url(#CoolGradient)'}
                            />
                    </XYPlot>
                </div>

                <div style={divStyle}>
                    <List style = {listStyle}>
                        <ListItem style = {{width: 105}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"Intake Pressure"}</p>}    />
                        </ListItem>
                        <ListItem style = {{width: 40}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{this.values["intakePressure"]}</p>}  />
                        </ListItem>
                        <ListItem style = {{width: 80}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"kPa"}</p>}  />
                        </ListItem>
                    </List>
                    <XYPlot height = {70} width = {130} style={{marginTop: "10px", marginLeft: "-50px"}}>
                        <GradientDefs>
                            <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                            </linearGradient>
                        </GradientDefs>
                        
                        <LineSeries
                            className="first-series"
                            animation
                            data={this.intakeTempPoints}
                            curve={'curveMonotoneX'}
                            style={{strokeWidth:2}}
                            color={'url(#CoolGradient)'}
                            />
                    </XYPlot>
                </div>

                <div style={divStyle}>
                    <List style = {listStyle}>
                        <ListItem style = {{width: 105}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"Throttle Position"}</p>}    />
                        </ListItem>
                        <ListItem style = {{width: 40}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{this.values["throttlePosition"]}</p>}  />
                        </ListItem>
                        <ListItem style = {{width: 80}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"%"}</p>}  />
                        </ListItem>
                    </List>
                    <XYPlot height = {70} width = {130} style={{marginTop: "10px", marginLeft: "-50px"}}>
                        <GradientDefs>
                            <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                            </linearGradient>
                        </GradientDefs>
                        
                        <LineSeries
                            className="first-series"
                            animation
                            data={this.throttlePosPoints}
                            curve={'curveMonotoneX'}
                            style={{strokeWidth:2}}
                            color={'url(#CoolGradient)'}
                            />
                    </XYPlot>
                </div>

                <div style={divStyle}>
                    <List style = {listStyle}>
                        <ListItem style = {{width: 105}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"Coolant Temperature"}</p>}    />
                        </ListItem>
                        <ListItem style = {{width: 40}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{this.values["engineCoolantTemperature"]}</p>}  />
                        </ListItem>
                        <ListItem style = {{width: 80}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"°C"}</p>}  />
                        </ListItem>
                    </List>
                    <XYPlot height = {70} width = {130} style={{marginTop: "10px", marginLeft: "-50px"}}>
                        <GradientDefs>
                            <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                            </linearGradient>
                        </GradientDefs>
                        
                        <LineSeries
                            className="first-series"
                            animation
                            data={this.coolTempPoints}
                            curve={'curveMonotoneX'}
                            style={{strokeWidth:2}}
                            color={'url(#CoolGradient)'}
                            />
                    </XYPlot>
                </div>

                <div style={divStyle}>
                    <List style = {listStyle}>
                        <ListItem style = {{width: 105}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"Engine Reference Torque"}</p>}    />
                        </ListItem>
                        <ListItem style = {{width: 40}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{this.values["referenceTorque"]}</p>}  />
                        </ListItem>
                        <ListItem style = {{width: 80}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"Nm"}</p>}  />
                        </ListItem>
                    </List>
                    <XYPlot height = {70} width = {130} style={{marginTop: "10px", marginLeft: "-50px"}}>
                        <GradientDefs>
                            <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                            </linearGradient>
                        </GradientDefs>
                        
                        <LineSeries
                            className="first-series"
                            animation
                            data={this.engRefTorquePoints}
                            curve={'curveMonotoneX'}
                            style={{strokeWidth:2}}
                            color={'url(#CoolGradient)'}
                            />
                    </XYPlot>
                </div>

                <div style={divStyle}>
                    <List style = {listStyle}>
                        <ListItem style = {{width: 105}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"Intake Temperature"}</p>}    />
                        </ListItem>
                        <ListItem style = {{width: 40}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{this.values["intakeTemperature"]}</p>}  />
                        </ListItem>
                        <ListItem style = {{width: 80}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"°C"}</p>}  />
                        </ListItem>
                    </List>
                    <XYPlot height = {70} width = {130} style={{marginTop: "10px", marginLeft: "-50px"}}>
                        <GradientDefs>
                            <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                            </linearGradient>
                        </GradientDefs>
                        
                        <LineSeries
                            className="first-series"
                            animation
                            data={this.intakeTempPoints}
                            curve={'curveMonotoneX'}
                            style={{strokeWidth:2}}
                            color={'url(#CoolGradient)'}
                            />
                    </XYPlot>
                </div>

                <div style={divStyle}>
                    <List style = {listStyle}>
                        <ListItem style = {{width: 105}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"MAF Flow Rate"}</p>}    />
                        </ListItem>
                        <ListItem style = {{width: 40}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{this.values["flowPressure"]}</p>}  />
                        </ListItem>
                        <ListItem style = {{width: 80}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"g/s"}</p>}  />
                        </ListItem>
                    </List>
                    <XYPlot height = {70} width = {130} style={{marginTop: "10px", marginLeft: "-50px"}}>
                        <GradientDefs>
                            <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                            </linearGradient>
                        </GradientDefs>
                        
                        <LineSeries
                            className="first-series"
                            animation
                            data={this.mafPoints}
                            curve={'curveMonotoneX'}
                            style={{strokeWidth:2}}
                            color={'url(#CoolGradient)'}
                            />
                    </XYPlot>
                </div>

                <div style={divStyle}>
                    <List style = {listStyle}>
                        <ListItem style = {{width: 105}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"Control Module Voltage"}</p>}    />
                        </ListItem>
                        <ListItem style = {{width: 40}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{this.values["controlModuleVoltage"]}</p>}  />
                        </ListItem>
                        <ListItem style = {{width: 80}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"V"}</p>}  />
                        </ListItem>
                    </List>
                    <XYPlot height = {70} width = {130} style={{marginTop: "10px", marginLeft: "-50px"}}>
                        <GradientDefs>
                            <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                            </linearGradient>
                        </GradientDefs>
                        
                        <LineSeries
                            className="first-series"
                            animation
                            data={this.ctrlModVoltPoints}
                            curve={'curveMonotoneX'}
                            style={{strokeWidth:2}}
                            color={'url(#CoolGradient)'}
                            />
                    </XYPlot>
                </div>

                <div style={divStyle}>
                    <List style = {listStyle}>
                        <ListItem style = {{width: 105}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"Ambient Temperature"}</p>}    />
                        </ListItem>
                        <ListItem style = {{width: 40}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{this.values["ambientTemperature"]}</p>}  />
                        </ListItem>
                        <ListItem style = {{width: 80}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"°C"}</p>}  />
                        </ListItem>
                    </List>
                    <XYPlot height = {70} width = {130} style={{marginTop: "10px", marginLeft: "-50px"}}>
                        <GradientDefs>
                            <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                            </linearGradient>
                        </GradientDefs>
                        
                        <LineSeries
                            className="first-series"
                            animation
                            data={this.ambiTempPoints}
                            curve={'curveMonotoneX'}
                            style={{strokeWidth:2}}
                            color={'url(#CoolGradient)'}
                            />
                    </XYPlot>
                </div>

                <div style={divStyle}>
                    <List style = {listStyle}>
                        <ListItem style = {{width: 105}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"Runtime"}</p>}    />
                        </ListItem>
                        <ListItem style = {{width: 40}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{this.values["engineRunningTime"]}</p>}  />
                        </ListItem>
                        <ListItem style = {{width: 80}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"Seconds"}</p>}  />
                        </ListItem>
                    </List>
                    <XYPlot height = {70} width = {130} style={{marginTop: "10px", marginLeft: "-50px"}}>
                        <GradientDefs>
                            <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                            </linearGradient>
                        </GradientDefs>
                        
                        <LineSeries
                            className="first-series"
                            animation
                            data={this.runtimePoints}
                            curve={'curveMonotoneX'}
                            style={{strokeWidth:2}}
                            color={'url(#CoolGradient)'}
                            />
                    </XYPlot>
                </div>

                <div style={divStyle}>
                    <List style = {listStyle}>
                        <ListItem style = {{width: 105}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"Barometric Pressure"}</p>}    />
                        </ListItem>
                        <ListItem style = {{width: 40}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{this.values["barometricPressure"]}</p>}  />
                        </ListItem>
                        <ListItem style = {{width: 80}}>    
                            <ListItemText primary = {<p style={{color: "#ffffff"}}>{"kPa"}</p>}  />
                        </ListItem>
                    </List>
                    <XYPlot height = {70} width = {130} style={{marginTop: "10px", marginLeft: "-50px"}}>
                        <GradientDefs>
                            <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                            </linearGradient>
                        </GradientDefs>
                        
                        <LineSeries
                            className="first-series"
                            animation
                            data={this.barrPoints}
                            curve={'curveMonotoneX'}
                            style={{strokeWidth:2}}
                            color={'url(#CoolGradient)'}
                            />
                    </XYPlot>
                </div>

            </Scrollbars>
        );
    }
}

export default withStyles(styles) (DataList);

