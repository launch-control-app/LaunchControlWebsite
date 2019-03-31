

import React, {Component} from 'react';
import {
    GradientDefs,
    XYPlot,
    LineSeries,
} from 'react-vis';
import './DataListItem.css';

class DataListItem extends Component {


    render() {
        return(
            <div className='dataListItemBox'>
                <div className='dataListCenter' style={{color: 'white', width: '150px', opacity: 0.75}}>
                    <p style={{paddingLeft: '25px',textAlign: "center", fontSize: 'initial', lineHeight: 1.1}}>{this.props.name}</p>
                </div>
                <div className='dataListCenter' style={{color: 'white', width: '170px'}}>
                    <p style={{textAlign: "center"}}><span style={{fontSize: "30px"}}>{this.props.value}</span> <span style={{fontSize: "18px", opacity: 0.75}}>{this.props.unit}</span></p>
                </div>
                <div className='dataListCenter'>
                    <XYPlot height={70} width={145} style={{marginTop: "10px", marginLeft: "-20px"}}>
                        <GradientDefs>
                            <linearGradient id="CoolGradient" x1="0" x2="1" y1="0" y2="0">
                                <stop offset="50%" stopColor="#7F00FF" stopOpacity={1}/>
                                <stop offset="100%" stopColor="#E100FF" stopOpacity={1} />
                            </linearGradient>
                        </GradientDefs>
                        
                        <LineSeries
                            className="first-series"
                            animation
                            data={this.props.data}
                            curve={'curveMonotoneX'}
                            style={{strokeWidth:2}}
                            color={'url(#CoolGradient)'} />
                    </XYPlot>
                </div>
            </div> 
        )
    }
}

export default DataListItem;