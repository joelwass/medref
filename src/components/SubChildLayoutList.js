import { isEmergencyLaunch } from 'expo-updates';
import React ,{useState, useEffect}from 'react';
import {Text, View,StyleSheet, TouchableOpacity,SafeAreaView, FlatList, Switch} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import data from '../data/data.json';


const Item = ({ item, backgroundColor, onPress, textColor }) => (
  <View style={{alignItems:'center'}}>   
   <TouchableOpacity onPress={onPress} style={[styles.SubmitButtonStyle , backgroundColor = backgroundColor]}>
     <Text style={[styles.title, textColor]}>{item.child_name}</Text>
     <MaterialIcons name={item.vis ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} style={{color:'white'}} />
   </TouchableOpacity>
   {item.vis && <Text style={styles.TextComponentStyle}>{item.child_desc}</Text>}  
   </View> 
 );

export default function SubChildLayoutList(props) {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIdArr, setSelectedIdArr] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  let arr = [];
    
  useEffect( () =>{
   
    let rawArr = [];
    let tempArr = [];
    let backgroundColor ="";

    let arrRaw =[] ;
    let arrTemp = [];

    data.map( (item) => {      
      if(item.id === props.selectedValue  )
      {
        const secDet = item.section.find( obj => obj.section_id === props.subSelectedValue);
        backgroundColor = secDet.section_hexvalue;
        secDet.children.map( (item) => {
          const obj = {}
          obj.child_id = item.child_id,
          obj.child_name = item.child_name,
          obj.child_desc = item.child_desc,
          obj.backgroundColor = backgroundColor,
          obj.vis = false
          rawArr.push(obj);
        })
      }
    })
    
    setSelectedIdArr(rawArr);
  },[props])

  const renderItem = ({item}) =>{
    const backgroundColor = item.backgroundColor;
    const color = '#fff' ;
    return (
      <Item
        item={item}
        onPress = { () => addToSelectedList(item.child_id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );    
  } 

  const callParentFunction = (value) =>{
    //props.showSubDetails(value);
    // this function is not called here.
    console.log('call parent function');
   }

  const addToSelectedList = (child_id) =>{

    let selectedArray = [...selectedIdArr];
    var obj;
    var result = {}
    result = selectedIdArr.find( obj => obj.child_id === child_id);
    result.vis = !result.vis;
    selectedArray.map( (item , index) => 
      item.child_id === child_id 
      ? 
      {
        item : result
      }
      : item
    ) 
    setSelectedIdArr(
      selectedArray
    ) 
  }

  const EmptyList = () =>{
    
    return(
      <View ><Text style={styles.title}>No Data Found</Text></View>
    )
  }

  const toggleSwitch = () => {
    let tempArray = [...selectedIdArr];
    if(isEnabled)
    {
      tempArray.map( (item , index) => {
        item.vis = false
      })      
    }
    else
    {
      tempArray.map( (item , index) => {
        item.vis = true
      }) 
    }
    setSelectedIdArr(tempArray);
    setIsEnabled(previousState => !previousState);
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={{marginRight:30, paddingTop:30, flexDirection:'row', justifyContent:'space-between'}}>
      <View>
        <Text>*potential starting doses</Text>
      </View>
      <View >
      <Switch
        trackColor={{ false: '#9dcddf', true: '#63a1b0' }}
        thumbColor='#fbfbfb' 
        ios_backgroundColor="#3e3e3e"
        style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </View>
    </View>
    <View>
      { 
        <FlatList 
        data={selectedIdArr}
        renderItem= { ({item , index}) => renderItem({item})}
        keyExtractor = { (item, index) => item.child_id.toString() }
        ListEmptyComponent = {EmptyList}
        extraData={selectedIdArr}
        />
      }
      </View>
    </SafeAreaView> 
  );
}



const styles = StyleSheet.create({

    MainContainer: {
      flex: 1,
      alignItems : 'center',
      justifyContent:'space-evenly',
      backgroundColor:'#fff'
    },
    item: {
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      width: 300
    },
    title: {
      fontSize: 25,
      marginRight : 15,
      marginLeft : 15
    },
    TextComponentStyle: {
      marginLeft:30,
      marginRight:30,
      borderRadius:25,
      borderWidth: 2,
      borderColor: '#fff',
      width: 300,
      // Set border Hex Color Code Here.
      borderTopColor : '#fff',
      borderBottomColor : '#fff',
      borderLeftColor :'#000',
      borderRightColor : '#000',
      // Setting up Text Font Color.
      color: '#000',
      // Setting Up Background Color of Text component.
      backgroundColor : '#fff',
      // Adding padding on Text component.
      fontSize: 20,
      textAlign: 'center',
      elevation : 50,
     
      shadowColor: '#A9A9A9',
      shadowRadius: 10,
      shadowOpacity: 1
    },
    SubmitButtonStyle: {
      marginTop:10,
      paddingTop:15,
      paddingBottom:15,
      marginLeft:30,
      marginRight:30,
      borderRadius:25,
      borderWidth: 1,
      borderColor: '#fff',
      width: 300,
      alignItems:'center',
      flexDirection: 'row',
      justifyContent:'space-between'
    },
    TextStyle:{
      color:'#000',
      textAlign:'center',
    }
    
  });