import { isEmergencyLaunch } from 'expo-updates';
import React ,{useState, useEffect}from 'react';
import {Text, View,StyleSheet, TouchableOpacity,SafeAreaView, FlatList} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import itemdetails from '../data/itemDetails.json';
import data from '../data/data.json';


const Item = ({ item, backgroundColor, onPress, textColor }) => (
  <View>   
   <TouchableOpacity onPress={onPress} style={[styles.SubmitButtonStyle, backgroundColor = backgroundColor ]}>
     <Text style={[styles.title, textColor]}>{item.section_name}</Text>
   </TouchableOpacity>
  </View>
 );

export default function SubLayoutList(props) {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIdArr, setSelectedIdArr] = useState([]);
  let arr = [];
    
  useEffect( () =>{
    
    let arrRaw =[] ;
    let arrTemp = [];
    
    let temp = [];

    data.map( obj => {
      if( obj.id === props.selectedValue)
      {
        //temp = obj.section;
        
        obj.section.map ( (item) => {
          var ob = {}
          ob.section_id = item.section_id,
          ob.section_name = item.section_name
          var tempText = ""
          var tempText1 = ""
          if( item.multiple_lines)
          {
            tempText = item.section_name1 ? item.section_name1 : "",
            tempText1 = item.section_name2 ? item.section_name2 : ""
            ob.section_name = item.section_name + " " + tempText + " " + tempText1
          }
          ob.section_hexvalue = obj.hexvalue,
          ob.vis = false,
          temp.push(ob);
        })
      }
    })
    setSelectedIdArr(temp);
    /*itemdetails.map( (item) => {
        item.id === props.selectedValue ?  ( arrRaw = item.section ) : null;
     } 
    )

    if( arrRaw && arrRaw.length > 0)
    {
      var obj = {};
      arrRaw.map( (item) =>{
        obj = {}
        obj.section_id = item.section_id,
        obj.section_name = item.section_name,
        obj.section_desc = item.section_desc,
        obj.vis = false;
        arrTemp.push(obj);
      })
    }*/
    
  },[props])

  const renderItem1 = ({item}) =>{

    const backgroundColor = item.section_hexvalue;
    const color = 'black' ;
    
    return (
      <Item
        item={item}
        onPress = { () => callParentFunction(item.section_id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );    
  } 

  callParentFunction = (value) =>{
    props.showSubDetails(value);
 }

  const addToSelectedList = (sec_id) =>{

    let selectedArray = [...selectedIdArr];
    var obj;
    var result = {}
    result = selectedIdArr.find( obj => obj.section_id === sec_id);
    result.vis = !result.vis;
    selectedArray.map( (item , index) => 
      item.section_id === sec_id 
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
        renderItem= { ({item , index}) => renderItem1({item})}
        keyExtractor = { (item, index) => item.section_id.toString() }
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
      borderColor: '#FF5722',
  
      // Setting up Text Font Color.
      color: '#fff',
  
      // Setting Up Background Color of Text component.
      backgroundColor : '#CDDC39',
      
      // Adding padding on Text component.
      padding : 2,
  
      fontSize: 20,
  
      textAlign: 'center',
  
      margin: 10,
      height:200,
      width:300
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