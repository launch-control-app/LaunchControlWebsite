import React from 'react';
import DeckGL, {ScatterplotLayer, PathLayer} from 'deck.gl';
import {StaticMap} from 'react-map-gl';
import map from 'lodash/map'

import './DriveMap.css'

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWV0YWxsaWN0b2FzdCIsImEiOiJjanNzanVvdWExdTQ1NDRtcnZqNGkwNjAzIn0._KU_UdRE9swRQPc7W2cNlg';

class DriveMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hoveredDataPoint: null,
    };
  }

  _renderTooltip = () => {
    const {x, y, hoveredDataPoint} = this.state;
    return (
      hoveredDataPoint && (
        <div className="tooltip" style={{left: x, top: y}}>
          <p>{hoveredDataPoint.recordedAt}</p>
          <p>Speed: {hoveredDataPoint.vehicleSpeed} KPH</p>
          <p>Engine RPM: {hoveredDataPoint.rpm} RPM</p>
          <p>Distance: {hoveredDataPoint.vehicleRunningDistance} KM</p>
          <p>Fuel Level: {hoveredDataPoint.fuelLevel} %</p>
          <p>Oil Temperature: {hoveredDataPoint.engineOilTemperature} °C</p>
          <p>Calculated Engine Load: {hoveredDataPoint.calculatedEngineLoad} %</p>
          <p>Absolute Engine Load: {hoveredDataPoint.absoluteEngineLoad} %</p>
          <p>Engine Torque Percentage: {hoveredDataPoint.torquePercentage} %</p>
          <p>Intake Pressure: {hoveredDataPoint.intakePressure} kPa</p>
          <p>Throttle Position: {hoveredDataPoint.throttlePosition} %</p>
          <p>Coolant Temperature: {hoveredDataPoint.engineCoolantTemperature} °C</p>
          <p>Engine Reference Torque: {hoveredDataPoint.referenceTorque} Nm</p>
          <p>Intake Temperature: {hoveredDataPoint.intakeTemperature} °C</p>
          <p>MAF Flow Rate: {hoveredDataPoint.flowPressure} g/s</p>
          <p>Control Module Voltage: {hoveredDataPoint.controlModuleVoltage} V</p>
          <p>Ambient Temperature: {hoveredDataPoint.ambientTemperature} °C</p>
          <p>Runtime: {hoveredDataPoint.engineRunningTime} Sec</p>
          <p>Barometric Pressure: {hoveredDataPoint.barometricPressure} kPa</p>
        </div>
      )
    );
  }

  _onHoverDataPoint = ({x, y, object}) => {
    this.setState({x, y, hoveredDataPoint: object});
  }

    _onMapLoad = () => {
        const map = this._map;
    
        var layers = map.getStyle().layers;
     
        var labelLayerId;
        for (var i = 0; i < layers.length; i++) {
          if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
          }
        }
        map.addLayer({
          'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 1,
          'paint': {
          'fill-extrusion-color': '#495057',
           
          'fill-extrusion-height': [
            "interpolate", ["linear"], ["zoom"],
            10, 0,
            10.05, ["get", "height"]
          ],
          'fill-extrusion-base': [
            "interpolate", ["linear"], ["zoom"],
            10, 0,
            10.05, ["get", "min_height"]
          ],
          'fill-extrusion-opacity': .8
        }} , labelLayerId);
    }

    findPath = (d) => {
        return [d.geoLng, d.geoLat]
    }

    _renderLayers() {
        const data = this.props.data;
        const pathData = map(data, this.findPath);

        return [
            new PathLayer({
                id: 'drive-path',
                pickable: false,
                widthScale: 10,
                widthMinPixels: 2,
                getPath: pathData,
                getColor: [127, 0, 255],
                getWidth: 1
            }),
            new ScatterplotLayer({
                id: 'scatter-plot',
                data,
                radiusScale: 10,
                radiusMinPixels: 0.25,
                getPosition: d => [d.geoLng, d.geoLat],
                getFillColor: [225, 0, 255],
                getRadius: 1,
                onHover: this._onHoverDataPoint,
                pickable: true
            })
        ];
      }
    
      render() {
        const {viewState, controller = true, baseMap = true} = this.props;

        const INITIAL_VIEW_STATE = {
            latitude: this.props.data[0].geoLat,
            longitude: this.props.data[0].geoLng,
            zoom: 15,
            pitch: 45,
            bearing: 0
        };
    
        return (
          <DeckGL
            layers={this._renderLayers()}
            initialViewState={INITIAL_VIEW_STATE}
            viewState={viewState}
            controller={controller}
          >
            {baseMap && (
              <StaticMap
                reuseMaps
                mapStyle="mapbox://styles/mapbox/dark-v9"
                preventStyleDiffing={true}
                ref={ref => {
                    this._map = ref && ref.getMap();
                }}
                onLoad={this._onMapLoad}
                mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
              />
            )}
            {this._renderTooltip}
          </DeckGL>
        );
      }
    }

export default DriveMap;