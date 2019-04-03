/* Creation Date: Saturday, March 22nd 2019
 * Original Author: Nathan
 * Contents of file: Component to handle displaying graphs
 */

import React, {Component} from 'react';
import {
    FlexibleXYPlot,
    GradientDefs,
    XAxis,
    YAxis,
    LineSeries,
} from 'react-vis';
import moment from 'moment';


class FocusGraph extends Component {
    
    render() {

        let currentDataValue = 0;

        if (this.props.data.length !== 0){
            currentDataValue = this.props.data[this.props.data.length - 1]["y"];
        }

        let title = <h2 style={{width:'100%', color:"white"}}>
           
                {this.props.title}
            
            <span style={{float:"right"}}>
                {currentDataValue} {this.props.unit}
            </span>
        </h2>

        return (
            <div style={{display: "flex", flexFlow: "column", padding: "10px 5px 5px 10px"}}>
                {title}
                <div style={{flexGrow: 1}}>
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
                            data={this.props.data}
                            curve={'curveMonotoneX'}
                            style={{strokeWidth:4}}
                            color={'url(#CoolGradient)'}
                        />
                    </FlexibleXYPlot>
                </div>
            </div>
        );
    }
}

export default FocusGraph;
