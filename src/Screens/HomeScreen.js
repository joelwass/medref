import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Button} from 'react-native';
import HomeLayout from '../Components/HomeLayout';
import Svg, { G,Circle, Path, Polygon, Text as SvgText} from 'react-native-svg';

export default function HomeScreen({navigation, route}) {
  const hexagonSize = { x: 13, y: 13 };

  const showDetails =(props) => {
      navigation.navigate("Details",{value : props});
  }

  return (        
          
    <HomeLayout size={hexagonSize} flat={true} spacing={1.0} origin={{ x: 7, y: 7 }} showDetails={showDetails}  >
        
    </HomeLayout>  
    
  );
}


