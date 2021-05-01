import { NavigationHelpersContext } from '@react-navigation/core';
import React , {Component, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {HexGrid, Layout} from '../components/index';
import data from '../data/data.json';
import HomeLayout from '../components/HomeLayout';

const pointArr = [
  {id : 1 ,q :0 ,r :-1, s :1},
  {id : 2 ,q :0 ,r : 0, s :0},
  {id : 3 ,q :1 ,r :-1, s :-1},
  {id : 4 ,q :1.5 ,r :1, s :1},
  {id : 5 ,q :1.5 ,r :0, s :0},
  {id : 6 ,q :0.5 ,r :1, s :-1},
  {id : 7 ,q :0 ,r :-1, s :1},
  {id : 8 ,q :0 ,r :-1, s :1},
  {id : 9 ,q :0 ,r :-1, s :1},
]

export default function HomeScreen({route, navigation}) {
    const hexagonSize = { x: 12, y: 12 };

    const [ selectedArr, setSelectedArr ] = useState([]);

    const showDetails = (props) => {
      navigation.navigate("Details", {value: props});
    }

    useEffect( () => {
      
    },[])

    
    return (
      <View>
      <HexGrid className="grid" width='100%' height='100%' viewBox='0 0 100 100'>
        <HomeLayout size={hexagonSize} flat={true} spacing={1.0} origin={{ x: 1, y: 20 }} showDetails={showDetails}  >
        
        </HomeLayout>          
      </HexGrid>     
      </View>
    );
  }

const styles = StyleSheet.create({
  constainer:{
    flex:1,
    backgroundColor:'#fff',
    alignItems : 'center',
    justifyContent : 'center'
  }
});