import React, {Component} from 'react';
import DeckGL, {PathLayer} from 'deck.gl';
import {StaticMap} from 'react-map-gl';
import map from "lodash/map";

import './Navbar.css';



export class DriveReport extends Component {

    pathMap = (dataPoint) => {
        return [];
    }

    render() {
        const {viewState, controller = true, baseMap = true} = this.props;

        let path = map(this.props.data)
        let driveLayer = new PathLayer({
            id: 'drive-path',
            pickable: false,
            widthScale: 20,
            widthMinPixels: 2,
            getPath: d => path,
            getColor: d => [127, 0, 255],
            getWidth: d => 2
        });

        return (
            <div>
                <div>
                    <h1>Your drive from </h1>
                </div>
                <div style={{width:'100%', height:"500px", position:"relative"}}>
                    <DeckGL
                        layers={[driveLayer]}
                        controller={controller} >
                        
                            <StaticMap
                            reuseMaps
                            mapStyle="mapbox://styles/mapbox/dark-v9"
                            preventStyleDiffing={true}
                            mapboxApiAccessToken="pk.eyJ1IjoibWV0YWxsaWN0b2FzdCIsImEiOiJjanNzanVvdWExdTQ1NDRtcnZqNGkwNjAzIn0._KU_UdRE9swRQPc7W2cNlg"
                            />
                        
                    </DeckGL>
                </div>
            </div>
        );
    }
}

export default DriveReport;
