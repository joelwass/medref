import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View , Button} from 'react-native';
import HomeLayout from '../Components/HomeLayout';
import Svg, { G,Circle, Path, Polygon, Text as SvgText} from 'react-native-svg';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import DataUtils from '../Components/Helper/DataUtils';
import { GlobalContext }  from '../context/provider';
import LoadingIndicator from '../Components/Common/LoadingIndicator';

export default function HomeScreen({navigation, route}) {
  const hexagonSize = { x: 13, y: 13 };
  const [ isChanged, setChanged ] = useState(true);
  
  const isFocused = useIsFocused();

  const { appSettingsUpdate } = useContext(GlobalContext);
  
  
  useEffect(() => {
    let mounted = true;
    setChanged(true);
    
    DataUtils.getUserSelectedItems().then(
      (result) => {
        if(result === null)
        { 
          //console.log(result);
          if(mounted)
          {
            setDefaultItems().then(
              (result) =>{
                //console.log("default items updated");
              }
            );
          }
        }
      }
    )
    return () =>{
     mounted = false; 
    }
  }, [isFocused]);

  const showDetails =(props) => {
    navigation.navigate("Details",{value : props});
  }
 
  const setDefaultItems = async() =>{
    try{
        const jsonValue = DataUtils.getDefaultItems();
        //console.log(jsonValue);

        const result = await DataUtils.setUserSelectedItems(jsonValue);
        //console.log(result);
        return result;
    }
    catch(e)
    {
      console.log(e);
    }
  }

  const renderHomeScreen = () => {
    
      if(isChanged)
      {
        setTimeout(() =>{setChanged(false)},1000)
        return(<LoadingIndicator />)
      }
      else{
        return(
          <HomeLayout size={hexagonSize} flat={true} spacing={1.0} origin={{ x: 7, y: 7 }} showDetails={showDetails} >
          </HomeLayout> 
        )
      }
  }
  
  return(
    renderHomeScreen()
  )

}




