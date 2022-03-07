import React, { Component } from 'react';
import {View, StyleSheet , TouchableOpacity, Text , Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { G, Rect, Polygon } from 'react-native-svg';
import Constants from 'expo-constants';
import data from '../data/data.json';
import Orientation from './Orientation';
import Point from './Point';
import Hexagon from './Hexagon';
import HexText from './HexText';


class SubLayout extends Component {
    static LAYOUT_FLAT = new Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0),2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);
    static LAYOUT_POINTY = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, -.35, 1.5, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
    
    static width = Dimensions.get('window').width ;

    constructor(props){
        super(props); 
        const {  flat, className, hexname, ...rest } = this.props;
        const orientation = (flat) ? SubLayout.LAYOUT_FLAT : SubLayout.LAYOUT_POINTY;
        const cornerCoords = this.calculateCoordinates(orientation);
        const points1 = cornerCoords.map(point => `${point.x},${point.y}`).join(' ');
        const layout = Object.assign({}, rest, { orientation }); 

        this.state={
            flat : this.props.flat,
            points : points1,
            layout : layout,
            x: 40,
            y: 7,
            showDetails : this.props.showDetails,
            selectedValue : this.props.showText,
            itemArr : []
        }

        this.state.itemArr = this.updateData(this.props.showText);
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

    updateData = (selectedValue) =>{
        
        const itemArrTemp = [];
        
        let itemSectionArr = [];

        data.map( (obj) => {     
            const ob = {};
            ob.id = obj.id, 
            ob.name = obj.name, 
            ob.hexvalue = obj.hexvalue 

            itemSectionArr = obj.section;
            // if section details are not there then select the color accordingly
            itemSectionArr.map( (objTem) => { 
                if(objTem.section_name !== undefined && objTem.section_name === "")
                    ob.hexvalue = objTem.section_hexvalue    
            })            

            // filter out settings when adding to the item temp array since we dont want that to show
            // up in the sub layout list
            if (ob.name !== "Settings") {
              itemArrTemp.push( 
                ob
              ) 
            }
        })
        let oldIndex = itemArrTemp.findIndex( x => x.id === selectedValue);
        if(oldIndex !== -1)
        {
            itemArrTemp.splice(2, 0, itemArrTemp.splice(oldIndex, 1)[0]);
        }
       
        return itemArrTemp;
    }

    callParentFunction = (value) =>{
        this.setState({
            selectedValue : value
        });
        this.props.showDetails(value);
    }

    
    render(){
        const innerViewHeight = this.props.height;
        const innerViewWidth = Dimensions.get('window').width/5;

        return(
          <View style={styles.container}>
            <ScrollView contentContainerStyle={{justifyContent:'center',alignItems:'center'}} horizontal={true} >
              {this.state.itemArr && this.state.itemArr.map( (item) => {
                  return(
                    <View key={item.id} style={{height:innerViewHeight,width:innerViewWidth,
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        {item.id === this.state.selectedValue ? (
                            (<Svg>               
                                <Hexagon key={item.id} q={-1} r={-1} s={1} points={this.state.points} layout={this.state.layout} fill={item.hexvalue} stroke={'#fff'} showText={item.name} showDetails={() =>this.callParentFunction(item.id)} strokeWidth={"2"}>
                                    <HexText x={this.state.x} y={this.state.y} fontSize={"14"} fill={'#fff'} isStroke={true} showDetails={() => this.callParentFunction(item.id)}>{item.name}</HexText>
                                </Hexagon>  
                            </Svg> )
                        ): (
                            (<Svg>               
                                <Hexagon key={item.id} q={-1} r={-1} s={1} points={this.state.points} layout={this.state.layout} fill={'#fff'} stroke={item.hexvalue} showText={item.name} showDetails={() => this.callParentFunction(item.id)} strokeWidth={"2"}>
                                    <HexText x={this.state.x} y={this.state.y} fill={item.hexvalue} fontSize={"13"} isStroke={true} showDetails={() => this.callParentFunction(item.id)}>{item.name}</HexText>
                                </Hexagon>  
                            </Svg> )
                        ) }
                    </View>  
                  )                       
                })
              }                    
            </ScrollView>
          </View>
        )
    }
}

export default SubLayout;

const styles = StyleSheet.create({
    container: {
        flex :1,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center'
    },
});