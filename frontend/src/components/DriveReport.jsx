/* Creation Date: Saturday, March 31st 2019
 * Original Author: Nathan
 * Contents of file: Component to show drive report text
 */

import React, {Component} from 'react';
import DriveMap from './DriveMap';
import './DriveReport.css'

export class DriveReport extends Component {

    genTitleText = () => {
        const startTime = this.props.startTime;
        // https://stackoverflow.com/questions/9677757/how-to-get-the-day-of-the-week-from-the-day-number-in-javascript
        const dayOfWeek = startTime.toLocaleString('en-us', {  weekday: 'long' });
        const hourOfDay = startTime.getHours();
        var TimeOfDayString = "Early Morning";
        if (hourOfDay < 6){
            TimeOfDayString = "Early Morning";
        } else if (hourOfDay < 12) {
            TimeOfDayString = "Morning";
        } else if (hourOfDay < 5) {
            TimeOfDayString = "Afternoon";
        } else if (hourOfDay < 8) {
            TimeOfDayString = "Evening";
        } else {
            TimeOfDayString = "Night";
        }
        return dayOfWeek + " " + TimeOfDayString;
    }

    render() {
        return (
            <div className="driveReport">
                <div className="reportHeader">
                    <h1 className="reportHeaderText">Your {this.genTitleText()} Drive</h1>
                    <h4 className="reportSubheaderText">
                        {this.props.startTime.toLocaleString('en-us')} - {this.props.endTime.toLocaleString('en-us')}
                    </h4>
                </div>
                <div style={{flex: "1 1 auto", position:"relative", overflowY: "auto"}}>
                    <DriveMap data={this.props.data}/>
                </div>
            </div>
        );
    }
}

export default DriveReport;
