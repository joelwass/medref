import { NavigationHelpersContext } from '@react-navigation/core';
import React ,{useEffect, useState, useContext} from 'react';
import {View, StyleSheet, Text, FlatList, SafeAreaView,CheckBox, TouchableHighlight, Button, Alert, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, Card } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import DataUtils from '../Components/Helper/DataUtils';

import { GlobalContext }  from '../context/provider';
import settingInitialState from '../context/initialStates/appSettingsInitialState';
import settingDispatch from '../context/reducers';
import updateContext from '../context/actions/Settings/update';

export default function SettingScreen({route, navigation}) {
    let itemId ;
    const [Settings, setSettings] = useState([]);
    const [ids, setIds] = useState([]);
    const hasUnsavedChanges = Boolean(ids);
    const [saveItem, setSaveItem] = useState(false);
    const [clearItem, setClearItem] = useState(false);

    const {
      settingsState:{appSettingsUpdate,itemArray}, 
      settingDispatch, 
    } = useContext(GlobalContext) ;


    useEffect( () =>{
      let arr =[];
      let itemlist = DataUtils.items();
      setSettings(itemlist);
      //clearAsyncStorage().then( (result) => {
      //  //console.log(result);
      //})

      getData()
        .then( (result) => {
            result !== null ? (

                setIds(result)
              ) : (

                setIds([])
              )
        })

        return () => {
           
        }
    },[navigation, hasUnsavedChanges]);

    
    const getData = async() => {
      try {
        
        const jsonValue = await DataUtils.getUserSelectedItems();
        return jsonValue;
 
      } catch(e) {
        console.log(e);
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

    const renderSetting = ({item, index}) => {
           
      return (
        <View style={[styles.subtitleView, index % 2 > 0 ? styles.oddItem : styles.evenItem]}>
        <ListItem>       
          <ListItem.Content>
          <ListItem.Title>
            <Text style={styles.itemStyle}>{item.name}</Text>
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
      </View>
      );
  }; 

  const onPress = () => {   
    checkData();
  }
  const checkData =() =>{
    try {
      if(ids && ids.length > 0){
          
          if(ids.length === 8)
          {
            //const jsonValue = JSON.stringify(ids);
            storeData(ids) // store in async storage
            .then(
              (result) =>{
                  updateContext(ids)(settingDispatch);
                  AlertMessage("Items Saved Successfully");
              }
            )
            .catch( (err) =>{
                console.log('Check Data 111 :'+err)
            })
          }
          else if( ids.length < 8)
          {
            AlertMessage("Action Required !!!","You have to select 8 items from the list");
          }
          else if(ids.length > 8)
          {
                let response = AlertMessage(`Attention !!!","You have selected ${ids.length} items. You can select max 8.`);
                return;
          }
      }
      else{
        console.log("else checkdata");
      }
    } catch (e) {
      // saving error
      console.log("catch block finally check data");
    }
  }
  const storeData = async (values) => {
    try
    {
      let arr = [];
      arr = await DataUtils.setUserSelectedItems(values);
      return arr;
    }
    catch(e)
    {
      console.log(e)
    }
  }

    const clearAsyncStorage = async() => {
      AsyncStorage.clear();
    }

    const onClear=()=>{
       clearAsyncStorage().then(
         (result) =>{
           setClearItem(false);
         }
       )
    }
    const AlertMessage = (title, message) =>
    { 
        Alert.alert(
            title,
            message,
            [
              { text: "OK", onPress: () => { setSaveItem(true)}  }
            ]
        );  
        return true
    }

    return (
      <SafeAreaView style={styles.container} forceInset={{ top : 'always'}}>
      
      <View style={{justifyContent:'flex-start'}}>
        <Text style={{ fontSize:22, color:'#3f3f3f', paddingLeft : 10 , margin : 2}}> Settings :  </Text>
      </View>
      
      <FlatList 
        data = {Settings}
        renderItem = { renderSetting}
        keyExtractor={item => item.id.toString()}
        extraData = {ids}
        initialNumToRender = {9}
      />
      <View style={{alignItems:'center',justifyContent:'center', backgroundColor:'#d3d3d3'}}>
          <TouchableHighlight onPress={onPress}>
          <View style={styles.button}>
            <Text style={{fontSize : 20, color: '#fff', margin : 5}}>Save</Text>
          </View>
        </TouchableHighlight> 
      </View>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subtitleView: {
    flex: 1,
     borderBottomWidth : 1,
     borderBottomColor : '#bebebe',
     width: Dimensions.get('window').width,
  },
  itemStyle:{
    fontSize: 20,
    color: '#2a2a2a',
    marginHorizontal : 10,
    padding : 10,
  },
  titleText: {
      fontSize: 20,
      fontWeight: "bold"
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#545454',
    color:'#000',
    padding:   5,
    width:120,
    justifyContent: 'center',
    borderRadius : 5,
    fontWeight : "bold",
    margin  : 5,
  },
  oddItem :{
    backgroundColor : '#A0A0A0',
  },
  evenItem:{
    backgroundColor : '#D3D3D3',
  }
});  