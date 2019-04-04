import React, {Component} from 'react';
import DriveMap from './DriveMap';


export class DriveReport extends Component {

    render() {
        return (
            <div>
                <div>
                    <h1>Your drive from </h1>
                </div>
                <div style={{width:'100%', height:"700px", position:"relative"}}>
                    <DriveMap data={this.props.data}/>
                </div>
            </div>
        );
    }
}

export default DriveReport;
