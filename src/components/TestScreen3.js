import React, { Component ,useState,useEffect} from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, View, Text, TouchableOpacity, Dimensions, TabBarIOSItem } from "react-native";
import Svg , {G, Rect} from 'react-native-svg';
//import { Constants } from 'expo';
const { width } = Dimensions.get('window');
import color from '../data/color.json';
import itemdetails from '../data/itemDetails.json';
  
  const Item = ({ item, onPress, backgroundColor, textColor }) => (  
    <TouchableOpacity key={item.secton_id} onPress={onPress} style={[styles.SubLayoutButtonStyle , backgroundColor ]}>
      <Text style={[styles.title, textColor]}>{item.section_name}</Text>
    </TouchableOpacity>
  );



export default function SubLayoutSelectionExample(props) {

    const [selectedIdArr, setSelectedIdArr] = useState([]);
    const [backgroundColor, setBackgroundColor] = useState();
    /*const arr =[];
  
    useEffect(() => {    
      itemdetails.map( (item) => {
        if(item.name === props.selectedValue){
          item.section.map( (secDet) => {           
              arr.push({section_id : secDet.section_id, vis:false})
              //setSelectedIdArr([...selectedIdArr,{ section_id : secDet.section_id , vis: false}])             
          })
          const initialState = arr;
          setSelectedIdArr(initialState);
        }
      })
    }, []);*/

    const addToSelectedIdArr = (sec_id) => {
      const selectedArray = selectedIdArr;
      selectedArray.push(sec_id);
      const mySortedList = selectedArray.sort();
      const sortedNoDupes = Array.from(new Set(mySortedList));
      //setSelectedGuests(sortedNoDupes);
      setSelectedIdArr(sortedNoDupes);
    }

   /* const addToSelectedIdArr = (sec_id) => {    
      let matchingIndex;
      //let vis = false;
      if ( selectedIdArr && selectedIdArr.length > 0 ){
        //matchingIndex = selectedIdArr.findIndex( ( secDet ) => {return secDet.section_id === sec_id } );
        
        setSelectedIdArr(
          selectedIdArr.map(item => 
              item.id === sec_id 
              ? {...item, vis : !item.vis} 
              : item 
          ))                      
      }
       else{
         
         //const obj = {section_id : sec_id, vis : true};
         setSelectedIdArr([{
          section_id : sec_id, vis : true
         }]) 
       }
    }*/
     
    const renderItem = ({ item , backgroundColor}) => {
      const color = 'black';
      //const bkColor = backgroundColor;
      
      //if ( selectedIdArr && selectedIdArr.length > 0)
      //{
           //const result = selectedIdArr.find(k => k === item.section_id)  ;
      //}
      
        return (
            <Item
            key = {item.secton_id}
            item={item}
            onPress={() => addToSelectedIdArr(item.section_id)}
            backgroundColor={{ backgroundColor }}
            textColor={{ color }}
            />
        );
    };
                  
    return (
      <SafeAreaView style={styles.container}>
      {
        itemdetails.map( (item) =>{
            if(item.name === props.selectedValue){
              let sectionData = item.section;
              let backgroundColor = item.hexvalue;
              return(
                <FlatList
                    data={ sectionData }
                    renderItem={({item}) => renderItem({item, backgroundColor})}
                    keyExtractor={ item =>  item.id .toString }
                    
                    //extraData = {selectedIdArr}
                />
              )
            }
        }) // main loop
      }
      </SafeAreaView>
    );        
  
}
const styles = StyleSheet.create({
  container: {
    flex :1,
    backgroundColor: '#fff',
    height: Dimensions.get('window').height,
    justifyContent :'space-between',
    alignItems :'center',
    marginTop : 30
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  },
  subcontainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 16,
    marginHorizontal: 32
  },
  title: {
    fontSize: 20,
  },
  SubLayoutButtonStyle: {
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:30,
    marginRight:30,
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#fff',
    width:300,
    alignItems:'center'
  },
});
