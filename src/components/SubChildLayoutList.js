import { isEmergencyLaunch } from 'expo-updates';
import React ,{useState, useEffect}from 'react';
import {Text, View,StyleSheet, TouchableOpacity,SafeAreaView, FlatList} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import data from '../data/data.json';

import itemDetailsList from '../data/itemSubDetails.json';

const Item = ({ item, backgroundColor, onPress, textColor }) => (
  <View style={{alignItems:'center'}}>   
   <TouchableOpacity onPress={onPress} style={[styles.SubmitButtonStyle , backgroundColor = backgroundColor]}>
     <Text style={[styles.title, textColor]}>{item.child_name}</Text>
   </TouchableOpacity>
   {item.vis && <Text style={styles.TextComponentStyle}>{item.child_desc}</Text>}  
   </View> 
 );

export default function SubChildLayoutList(props) {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIdArr, setSelectedIdArr] = useState([]);
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
  
    /*itemDetailsList.map( (item) => {
         if(item.parent_id === props.selectedValue && item.section_id === props.subSelectedValue )
          {
              arrRaw = item.children 
          }
     } 
    )
   
    // To put the visibility option into the array
    if( arrRaw && arrRaw.length > 0)
    {
      var obj = {};
      arrRaw.map( (item) =>{
        obj = {}
        obj.child_id = item.child_id,
        obj.child_name = item.child_name,
        obj.child_desc = item.child_desc,
        obj.backgroundColor = backgroundColor,
        obj.vis = false;
        arrTemp.push(obj);
      })
    }
    setSelectedIdArr(arrTemp);
    */
  },[props])

  const renderItem = ({item}) =>{
    const backgroundColor = item.backgroundColor;
    const color = 'black' ;
    return (
      <Item
        item={item}
        onPress = { () => addToSelectedList(item.child_id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );    
  } 

  callParentFunction = (value) =>{
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
    //const selectedArray = selectedIdArr;
    //const mySortedList = selectedArray.sort();
    //const sortedNoDupes = Array.from(new Set(mySortedList));
    //setSelectedIdArr(sortedNoDupes);   
  }

  const EmptyList = () =>{
    
    return(
      <View ><Text style={styles.title}>No Data Found</Text></View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      { 
        <FlatList 
        data={selectedIdArr}
        renderItem= { ({item , index}) => renderItem({item})}
        keyExtractor = { (item, index) => item.child_id.toString() }
        ListEmptyComponent = {EmptyList}
        extraData={selectedIdArr}
        />
      }
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
      fontSize: 20
    },
    TextComponentStyle: {
  
      borderRadius: 5,
  
      // Set border width.
      borderWidth: 2,
   
      // Set border Hex Color Code Here.
      borderColor: '#000',
  
      // Setting up Text Font Color.
      color: '#000',
  
      // Setting Up Background Color of Text component.
      backgroundColor : '#fff',
      
      // Adding padding on Text component.
      padding : 2,
  
      fontSize: 20,
  
      textAlign: 'center',
  
      margin: 10,
      height:100,
      width:280
    },
    SubmitButtonStyle: {
 
      marginTop:10,
      paddingTop:15,
      paddingBottom:15,
      marginLeft:30,
      marginRight:30,
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff',
      width: 300,
      alignItems:'center'
    },
    TextStyle:{
      color:'#000',
      textAlign:'center',
    }
    
  });