import React, { Component } from 'react';
import {View , Text, StyleSheet, Dimensions , FlatList} from 'react-native';
import Svg, { G,Circle, Path, Polygon, Text as SvgText} from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import Orientation from './Orientation';
import Point from './Point';
import Hexagon from './Hexagon';
import HexText from './HexText';
import { GlobalContext }  from '../context/provider';
import settingInitialState from '../context/initialStates/appSettingsInitialState';
import data from '../data/data.json';
import DataUtils from './Helper/DataUtils';



const pointArr = [
    {id : 1 ,q :1.2 ,r :-1, s :1},
    {id : 2 ,q :1.2 ,r : 0, s :0},
    {id : 3 ,q :2.2 ,r :-1, s :-1},
    {id : 4 ,q :2.8 ,r :1, s :1},
    {id : 5 ,q :2.8 ,r :0, s :0},
    {id : 6 ,q :1.8 ,r :1, s :-1},
    {id : 7 ,q :1.2 ,r :3.5, s :1},
    {id : 8 ,q :1.2 ,r :2.5, s :0},
    {id : 9 ,q :2.2 ,r :2.5, s :1},
]


class HomeLayout extends Component {
   
    static LAYOUT_FLAT = new Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0),2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);
    static LAYOUT_POINTY = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 /2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
    static contextType = GlobalContext;

    constructor(props){
        super(props); 
        const {  flat, className, ...rest } = this.props;
        const orientation = (flat) ? HomeLayout.LAYOUT_FLAT : HomeLayout.LAYOUT_POINTY;
        const cornerCoords = this.calculateCoordinates(orientation);
        const points1 = cornerCoords.map(point => `${point.x},${point.y}`).join(' ');
        const layout = Object.assign({}, rest, { orientation }); 
        this.state={
            flat : this.props.flat,
            points : points1,
            layout : layout,
            x: 0,
            y:0,
            showDetails : this.props.showDetails,
            itemArr : [],
            settingIds : []
        }
    }

    getPointOffset(corner, orientation, size) {
        let angle = 2.0 * Math.PI * (corner + orientation.startAngle) / 6;
        return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
    }

    calculateCoordinates(orientation) {
        
        const corners = [];
        const center = new Point(0,0);
        const { size } = this.props;
    
        Array.from(new Array(6), (x, i) => {
          const offset = this.getPointOffset(i, orientation, size);
          const point = new Point(center.x + offset.x, center.y + offset.y);
          corners.push(point);
        });
        return corners;
    }
  
    render() { 
      const {
        settingsState:{itemArray},
      } = this.context;

          return ( 
            
            <View style={styles.container}>
            <Svg  width={'100%'} height={'100%'} viewBox={"0 0 100 100"} version="1.1" xmlns="http://www.w3.org/2000/svg">
              {itemArray.map( (obj) => {  
                  return( 
                    <Hexagon key={obj.id} q={obj.q} r={obj.r} s={obj.s} points={this.state.points} layout={this.state.layout} fill={obj.hexvalue} stroke={obj.hexvalue} showDetails= {this.props.showDetails} showText={obj.id} strokeWidth={"5"} > 
                      <HexText x={this.state.x} y={obj.multiple_lines ? this.state.y-4 : this.state.y} fill={obj.fill} showDetails= {this.props.showDetails} >{obj.name}
                      </HexText>
                      <HexText x={this.state.x} y={this.state.y+1} fill={obj.fill} showDetails= {this.props.showDetails} >{obj.name1}
                      </HexText>
                      <HexText x={this.state.x} y={this.state.y+5} fill={obj.fill} showDetails= {this.props.showDetails} >{obj.name2}
                      </HexText>           
                  </Hexagon> 
                  )
              })}
            </Svg> 
            </View>
            
          )

    }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems :'center',
    paddingTop: Constants.statusBarHeight,
  }
})

export default HomeLayout;

