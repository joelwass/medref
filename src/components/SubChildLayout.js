import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Svg, { G, Rect, Polygon } from 'react-native-svg';
import {View, StyleSheet , TouchableOpacity, Text , Dimensions} from 'react-native';
import { HexGrid, Layout, Orientation,Point,Hexagon,HexText}  from './index';
import { ScrollView } from 'react-native-gesture-handler';
import { AsyncStorage } from '@react-native-community/async-storage';
import Constants from 'expo-constants';
import data from '../data/data.json';

import itemlist from '../data/itemDetails.json';

//https://rossbulat.medium.com/react-native-carousels-with-horizontal-scroll-views-60b0587a670c
class SubChildLayout extends Component {
    static LAYOUT_FLAT = new Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0),2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);
    static LAYOUT_POINTY = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
    
    static width = Dimensions.get('window').width ;

    constructor(props){
        super(props); 
        const {  flat, className, hexname, ...rest } = this.props;
        const orientation = (flat) ? Layout.LAYOUT_FLAT : Layout.LAYOUT_POINTY;
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
            subSelectedValue : this.props.subSelectedValue,
            itemArray : []
        }
    }

    componentDidMount = () =>{

        const reqArr = [];
        const reqIt = data.find( obj => obj.id === this.props.selectedValue );
        const detl = reqIt.section;

        detl.map( (obj) => {
            const ob = {};
            ob.section_id = obj.section_id;
            ob.section_name = obj.section_name;
            ob.section_name1 = obj.section_name1;
            ob.section_hexvalue = obj.section_hexvalue;
            ob.multiple_lines = obj.multiple_lines;
            reqArr.push(ob);            
        })
        this.setState({itemArray : reqArr});

        //const requiredItemArry = [];
        //const requiredItems = itemlist.find( obj => obj.id === this.props.selectedValue);        
        //const det = requiredItems.section;
        //det.map( (obj) => {
        //    requiredItemArry.push(obj);
        //})
        //this.setState({itemArray : requiredItemArry});
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

    
    callParentFunction = (value) =>{
        this.setState({
            subSelectedValue : value
        });
        this.props.showChildDetails(value);
    }

    render(){
        const innerViewHeight = this.props.height;
        const innerViewWidth = Dimensions.get('window').width/5;
        let fillcolor;
        let strokecolor;
        let arr= [];

       
        return (
            <View style={styles.container}>
            <ScrollView contentContainerStyle={{justifyContent:'center',alignItems:'center'}} horizontal={true} >
            {this.state.itemArray && this.state.itemArray.map( (item) => {                
                return(
                    <View key={item.section_id} style={{height:innerViewHeight,width:innerViewWidth,
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        { item.section_id === this.state.subSelectedValue
                            ?(
                                <Svg>              
                                <Hexagon  q={-1} r={-1} s={1} points={this.state.points} layout={this.state.layout} fill={item.section_hexvalue} stroke={'#fff'} showText={item.section_name} showDetails={() =>this.callParentFunction(item.section_id)} strokeWidth={"2"}>
                                    <HexText x={this.state.x} y={ item.multiple_lines ? this.state.y-10 : this.state.y} fontSize={"12"}>{item.section_name}</HexText>
                                    <HexText x={this.state.x} y={this.state.y+5} fontSize={"12"}>{item.section_name1}</HexText>
                                    <HexText x={this.state.x} y={this.state.y+15} fontSize={"12"}>{item.section_name2}</HexText>
                                </Hexagon>  
                            </Svg>
                             ) 
                            :(
                                <Svg>               
                                <Hexagon  q={-1} r={-1} s={1} points={this.state.points} layout={this.state.layout} fill={'#fff'} stroke={item.section_hexvalue} showText={item.section_name} showDetails={() =>this.callParentFunction(item.section_id)} strokeWidth={"2"}>
                                    <HexText x={this.state.x} y={ item.multiple_lines ? this.state.y-10 : this.state.y} fontSize={"12"}>{item.section_name}</HexText>
                                    <HexText x={this.state.x} y={this.state.y+5} fontSize={"12"}>{item.section_name1}</HexText>
                                    <HexText x={this.state.x} y={this.state.y+15} fontSize={"12"}>{item.section_name2}</HexText>
                                </Hexagon>  
                            </Svg>
                             )
                        }
                    </View>
                )
            })}
            </ScrollView>
            </View>
          );   
    }
} 

  const styles = StyleSheet.create({
    container: {
        flex :1,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    paragraph: {
      width:"100%",
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#34495e',
    },
  });

export default SubChildLayout;