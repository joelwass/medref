import React, { Component } from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import Svg, { G,Circle, Path, Polygon } from 'react-native-svg';
import Orientation from './models/Orientation';
import Point from './models/Point';
import Hexagon from './Hexagon/hexagon';
import HexText from './Hexagon/HexText';


const pointArr = [
    {q :0 ,r :-1, s :1},
    {q :0 ,r : 0, s :0},
    {q :1 ,r :-1, s :-1},
    {q :1.5 ,r :1, s :1},
    {q :1.5 ,r :0, s :0},
    {q :0.5 ,r :1, s :-1},
    {q :0 ,r :-1, s :1},
    {q :0 ,r :-1, s :1},
    {q :0 ,r :-1, s :1},
]
class Layout extends Component {
    static LAYOUT_FLAT = new Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0),2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);
    static LAYOUT_POINTY = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
    
    static propTypes = {
        //children: PropTypes.node,
        className: PropTypes.string,
        flat: PropTypes.bool,
        origin: PropTypes.object,
        size: PropTypes.object,
        spacing: PropTypes.number,
        points : PropTypes.string,
        layout : PropTypes.object
    };

    static defaultProps = {
        size: new Point(0, 0),
        flat: true,
        spacing: 1.0,
        origin: new Point(0, 0),
    }

    constructor(props){
        super(props); 
        const {  flat, className, ...rest } = this.props;
        const orientation = (flat) ? Layout.LAYOUT_FLAT : Layout.LAYOUT_POINTY;
        const cornerCoords = this.calculateCoordinates(orientation);
        const points1 = cornerCoords.map(point => `${point.x},${point.y}`).join(' ');
        const layout = Object.assign({}, rest, { orientation }); 

        this.state={
            flat : this.props.flat,
            points : points1,
            layout : layout,
            x: 40,
            y:7,
            showDetails : this.props.showDetails
        }
    }

    getPointOffset(corner, orientation, size) {
        let angle = 2.0 * Math.PI * (corner + orientation.startAngle) / 6;
        return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
    }
    
      // TODO Refactor
    calculateCoordinates(orientation) {
        
        const corners = [];
        const center = new Point(40,5);
        const { size } = this.props;
    
        Array.from(new Array(6), (x, i) => {
          const offset = this.getPointOffset(i, orientation, size);
          const point = new Point(center.x + offset.x, center.y + offset.y);
          corners.push(point);
        });
        return corners;
    }

    render() {
        
        return ( 
                          
                <Svg>
                <G> 
                    <Hexagon q={0} r={-1} s={1} points={this.state.points} layout={this.state.layout} fill={"#96c9dc"} stroke={"#96c9dc"} showDetails= {this.props.showDetails} showText={"Csv"} strokeWidth={"5"}> 
                        <HexText x={this.state.x} y={this.state.y}>Csv</HexText>
                    </Hexagon>
                    <Hexagon q={0} r={0} s={0} points={this.state.points} layout={this.state.layout} fill={"#61a0af"} stroke={"#61a0af"} showDetails= {this.props.showDetails} showText={"Vent"} strokeWidth={"5"}>
                          <HexText x={this.state.x} y={this.state.y}>Vent</HexText>
                    </Hexagon> 
                    <Hexagon q={1} r={-1} s={-1} points={this.state.points} layout={this.state.layout} fill={"#f9b9b7"} stroke={"#f9b9b7"} showDetails= {this.props.showDetails} showText={"Rbi"} strokeWidth={"1"}>
                    <HexText x={this.state.x} y={this.state.y}>Rbi</HexText>
                    </Hexagon>
                    
                    <Hexagon q={1.5} r={1} s={1} points={this.state.points} layout={this.state.layout} fill={"#febd38"} showDetails= {this.props.showDetails} showText={"Antidose"} strokeWidth={"1"}>
                    <HexText x={this.state.x} y={this.state.y}>Antidose</HexText>
                    </Hexagon>
                    <Hexagon q={1.5} r={0} s={0} points={this.state.points} layout={this.state.layout} fill={"#f5d491"} stroke={"#f5d491"} showDetails= {this.props.showDetails} showText={"Trauma"} strokeWidth={"1"}>
                    <HexText x={this.state.x} y={this.state.y}>Trauma</HexText>
                    </Hexagon>
                    <Hexagon q={0.5} r={1} s={-1} points={this.state.points} layout={this.state.layout} fill={"#ff6262"} stroke={"#ff6262"} showDetails= {this.props.showDetails} showText={"Blood"} strokeWidth={"1"}>
                    <HexText x={this.state.x} y={this.state.y}>Blood</HexText>
                    </Hexagon>

                    <Hexagon q={0} r={3.5} s={1} points={this.state.points} layout={this.state.layout} fill={"#96c9dc"} showDetails= {this.props.showDetails} showText={"Siezure"} strokeWidth={"1"}>
                    <HexText x={this.state.x} y={this.state.y}>Seizure</HexText>
                    </Hexagon>
                    <Hexagon q={0} r={2.5} s={0} points={this.state.points} layout={this.state.layout} fill={"#b6d377"} showDetails= {this.props.showDetails} showText={"Sedation"} strokeWidth={"1"}>
                    <HexText x={this.state.x} y={this.state.y}>Sedation</HexText>
                    </Hexagon>
                    <Hexagon q={1} r={2.5} s={1} points={this.state.points} layout={this.state.layout} fill={"#e5e5e5"} showDetails= {this.props.showDetails} showText={"More"} strokeWidth={"1"}>
                    <HexText x={this.state.x} y={this.state.y}>More</HexText>
                    </Hexagon>
                </G>
                </Svg>
                
        );
    }
}  

export default Layout;  