import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Button, ImageBackground} from 'react-native';

const getImage = (image) => {

    switch (image) {
        case "PP":
            return require("../assets/screenimages/pleateau.png")
            break;
        case "Fi":
            return require("../assets/screenimages/nothing-found.png")
            break;
        case "DOP":
              return require("../assets/screenimages/DOP.png")
              break;
        case "Female":
              return require("../assets/screenimages/Female.png")
              break;
        case "Male":
              return require("../assets/screenimages/Male.png")
              break;
        case "AT":
              return require("../assets/screenimages/AT.png")
              break;
        case "AT":
              return require("../assets/screenimages/ibw.png")
              break;  
        default:
            return require("../assets/screenimages/nothing-found.png");
            break;
    }
  }

export default function ImageScreen({navigation,props, route}) {

  const {value} = route.params; 
  
  return (        
    <View style={styles.container}>
    <ImageBackground source={getImage(route.params.value)} style={{height:'90%' , width:'100%', marginTop:30}} ></ImageBackground>
    </View>      
    
  );
}

const styles = StyleSheet.create({
    container :{
        paddingTop:0,
        marginTop:0,
        flex:1
    }
})

