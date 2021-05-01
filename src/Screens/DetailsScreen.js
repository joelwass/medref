import { NavigationHelpersContext } from '@react-navigation/core';
import React , {Component, useState,useEffect} from 'react';
import {Text, View, TouchableOpacity,StyleSheet, Dimensions} from 'react-native';
import {NavigationContext , useNavigationState} from '@react-navigation/native';

import { HexGrid, Layout, Orientation,Point,Hexagon,HexText}  from '../components/index';
import Constants from 'expo-constants';

import SubLayout from '../components/SubLayout';
import SubLayoutList from '../components/SubLayoutList';

import SubChildLayout from '../components/SubChildLayout';
import SubChildLayoutList from '../components/SubChildLayoutList';

//https://reactnavigation.org/docs/status-bar/#tabs-and-drawer
export default function DetailsScreen({props,route, navigation}) {

    const { value, otherParam } = route.params;
    const hexagonSize = { x: 40, y: 40 };

    const height = Dimensions.get('window').height ;
    const width = Dimensions.get('window').width ;
    const upperViewHeight = height/6;
     
    const [selectedValue, setSelectedValue] = useState();
    const [subSelectedValue, setSubSelectedValue] = useState();

    const navigationState = useNavigationState(state => state)
      let index = navigationState.index ;
      let routes = navigationState.routeNames;

    useEffect( () =>{
      setSelectedValue(route.params.value);
    },[props])

    const showDetails = (props) => { // called from home screen      
      setSelectedValue(props);
      setSubSelectedValue("0"); 
    }

    const showSubDetails = (props) => { // from first level list to second screen
     
      setSubSelectedValue( () => {
        // Object.assign would also work
        return props ;
      });      
      //setSubSelectedValue(props);
    }

    const showChildDetails = (props) => {      
      setSubSelectedValue(props);
    }
   
    const renderChildItems = () => {
      
        return(
          <View style={[styles.container, {
            flexDirection: "column" 
          }]}> 
          <View style={{ flex: 1, backgroundColor: '#e5e5e5' }} >
            <SubChildLayout size={hexagonSize} flat={false} spacing={1.2} origin={{ x:  120, y: 120 }} showText={selectedValue} showChildDetails={showChildDetails} height={upperViewHeight} selectedValue={selectedValue} subSelectedValue={subSelectedValue} />         
          </View>
          <View style={{ flex: 5 , justifyContent :'space-around',  alignItems :'center' }} >         
            <SubChildLayoutList selectedValue={selectedValue} subSelectedValue={subSelectedValue}/>
          </View>
          </View>
        )
    }

    const renderItems = () => {
      
      if(selectedValue === undefined)
      {       
        return(   
          <View style={[styles.container, {
            flexDirection: "column" 
          }]}>          
            <View style={{ flex: 1, backgroundColor: '#e5e5e5' }} >
              <SubLayout size={hexagonSize} flat={false} spacing={1.2} origin={{ x:  120, y: 120 }} showText={route.params.value} showDetails={showDetails} height={upperViewHeight} />
            </View>
            <View style={{ flex: 5 , justifyContent :'space-around',  alignItems :'center' }} >         
              <SubLayoutList selectedValue={route.params.value} showSubDetails={showSubDetails} />
            </View>
          </View>
        )
      }
      else{
        
        return(
          <View style={[styles.container, {
            flexDirection: "column" 
          }]}>
            <View style={{ flex: 1, backgroundColor: '#e5e5e5' }} >
              <SubLayout size={hexagonSize} flat={false} spacing={1.2} origin={{ x:  120, y: 120 }} showText={selectedValue} showDetails={showDetails}  height={upperViewHeight} />
            </View>
            <View style={{ flex: 5 , justifyContent :'space-around',  alignItems :'center'}} >         
              <SubLayoutList selectedValue={selectedValue} showSubDetails={showSubDetails} />
            </View>
          </View>
          ) // return
      }
    }

    return (  
       subSelectedValue === "0" || subSelectedValue === undefined
         ? renderItems()
         : renderChildItems()
    );

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });