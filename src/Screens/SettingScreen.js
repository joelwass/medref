import { NavigationHelpersContext } from '@react-navigation/core';
import React ,{useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList, SafeAreaView,CheckBox, TouchableHighlight, Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, Card } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';

const settingList = [
  { id : 1, name:"CV" },
  { id : 2, name:"RSI" },
  { id : 3, name:"Antidoes" },
  { id : 4, name:"Trauma" },
  { id : 5, name:"Blood" },
  { id : 6, name:"Inhibitors" },
  { id : 7, name:"Vent" },
  { id : 8, name:"OB" },
  { id : 9, name:"Intranasal" },
  { id : 10, name:"Psych" },
  { id : 11, name:"Anesthetics" },
  { id : 12, name:"Seizure" },
  { id : 13, name:"Anaphylax" },
  { id : 14, name:"Direct Thromblim Inhibators" },
  { id : 15, name:"Factor Xa-Inhibitors" },
  { id : 16, name:"Other" }
]


export default function SettingScreen({route, navigation}) {
  let itemId ;
    const [Settings, setSettings] = useState([]);
    const [ids, setIds] = useState([]);
    const hasUnsavedChanges = Boolean(ids);

    useEffect( () =>{
      let arr =[];
      setSettings(settingList);
      getData()
        .then( (result) => {
            result !== null ? (
                
                setIds(result)
              ) : (
                
                setIds([])
              )
        })
    },[navigation, hasUnsavedChanges]);

    const getData = async() => {
      try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key');
        const temp  = jsonValue != null ? JSON.parse(jsonValue) : null;
        return temp;
      } catch(e) {
        // error reading value
      }
    }

    const isChecked = (itmId) => {
      let isThere = false;
      isThere = ids.includes(itmId) ;
      return isThere;
    };

    const toggleChecked = (itemId) => {
      if (isChecked(itemId)) {  
        const newids = [...ids, itemId];
        const tempIds = newids.filter( (id) => id !== itemId );
        setIds([...tempIds])
      }
      else{
        const newids = [...ids, itemId];
        setIds([...newids])
      }
    };

    const renderSetting = ({item}) => {
           
      return (
        <ListItem>
        <ListItem.Content>
          <ListItem.Title>
            {item.name}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.CheckBox
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked= {isChecked(item.id)}
          onPress={() => toggleChecked(item.id)}
        >
        </ListItem.CheckBox>
      </ListItem>
      );
  }; 

  const onPress = () => {  
    storeData();
  }
  
  const storeData = async () => {
    try {
      if(ids && ids.length > 0){
          console.log(ids.length);
          if(ids.length === 8)
          {
            const jsonValue = JSON.stringify(ids);
            await AsyncStorage.setItem('@storage_Key', jsonValue)
          }
          else if( ids.length < 8)
          {
              minimumNumberofSelectionAlert("Action Required !!!","You have to select 8 items from the list");
          }
          else if(ids.length > 8)
          {
              minimumNumberofSelectionAlert("Attention !!!","First 8 items will only be saved.");
          }
      }
      else{
        console.log("else storedata");
      }
    } catch (e) {
      // saving error
      console.log("catch block store data");
    }
  }

    const clearAsyncStorage = async() => {
      AsyncStorage.clear();
    }

    const minimumNumberofSelectionAlert = (title, message) =>
      Alert.alert(
        title,
        message,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    );

    return (
      <SafeAreaView style={styles.container} forceInset={{ top : 'always'}}>
      <View style={{alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontSize:30}}> Settings </Text>
      </View>
      
      <FlatList 
        data = {Settings}
        renderItem = { renderSetting}
        keyExtractor={item => item.id.toString()}
        extraData = {ids}
      />
      <View style={{alignItems:'center',justifyContent:'center'}}>
          <TouchableHighlight onPress={onPress}>
          <View style={styles.button}>
            <Text>Save</Text>
          </View>
        </TouchableHighlight> 
      </View>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  baseText: {
      fontFamily: "Cochin"
  },
  titleText: {
      fontSize: 20,
      fontWeight: "bold"
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width:100,
    justifyContent: 'center'
  }
});  