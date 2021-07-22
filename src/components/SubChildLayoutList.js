import { isEmergencyLaunch } from 'expo-updates';
import React ,{useState, useEffect}from 'react';
import {Text, View,StyleSheet, TouchableOpacity,SafeAreaView, FlatList, Switch,ImageBackground, Dimensions,TouchableHighlight } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MultipleHexagons from './Common/MultipleHexagon';
import data from '../data/data.json';
import LoadingIndicator from './Common/LoadingIndicator';

const {width, height} = Dimensions.get('window');

const getImage = (image) => {

  switch (image) {
      case "PP":
          return require("../assets/buttonimages/PP.png")
          break;
      case "Fi":
          return require("../assets/buttonimages/Fi.png")
          break;
      case "DOP":
            return require("../assets/screenimages/DOP.png")
            break;
      case "Female":
            return require("../assets/buttonimages/FemaleBtn.png")
            break;
      case "Male":
            return require("../assets/buttonimages/MaleBtn.png")
            break;
      case "AT":
            return require("../assets/screenimages/AT.png")
            break;
      case "IBW":
            return require("../assets/screenimages/ibw.png")
            break;
      case "HeaderIBW":
            return require("../assets/screenimages/HeaderIBW.png")
            break;      
      case "FooterIBW":
            return require("../assets/screenimages/FooterIBW.png")
            break;                  
      default:
          return require("../assets/screenimages/nothing-found.png");
          break;
  }

}

const Item = ({ item, backgroundColor, onPress, textColor , image ,onImageClick, display_img}) => (
 
  <View style={{flex:1 ,alignItems:'center'}}>   
   <TouchableOpacity onPress={onPress} style={[styles.SubmitButtonStyle , backgroundColor = backgroundColor]}>
     <Text style={[styles.title, textColor]}>{item.child_name}</Text>
     <MaterialIcons name={item.vis ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} style={{color:'white'}} />
   </TouchableOpacity>
   
   {item.vis && 
    <View style={styles.TextComponentStyle}>
     
     <Text style={[styles.TextComponentChildStyle, {fontSize : 20}]}>
     {item.child_desc}
     {item.child_desc1 && <Text style={{fontSize:15}}>{"\n"}{item.child_desc1}</Text>}
     </Text>
      {image !== null && 
        <TouchableOpacity onPress={onImageClick}>
        <View style={{justifyContent:'center', alignItems:'center'}}>
        <ImageBackground source={getImage(image)} style={{height:70 , width: 80}} ></ImageBackground>
        </View>
        </TouchableOpacity>
      }
      
    </View>
   }  
   </View>
 );

 const DisplayImage = ({image, backgroundColor}) => ( 
  <View style={styles.imageView}> 
  <ImageBackground source={getImage(image)} style={styles.imageBackgroundView} ></ImageBackground>
  </View>
 );
  
 const DisplayMaleFemaleImage = ({image, backgroundColor ,onFImageClick,onMImageClick, dataArray, hexagonSize,onUserClick}) => ( 
  
  <View style={{height:height, width:width,backgroundColor:'#fff'}}>

  <View style={{flex:0.15,backgroundColor:'#f5d491' , margin:5, borderRadius : 20,alignItems:'center', justifyContent:'space-around'}}>
      <Text style={{ fontSize : 20 , fontWeight: "bold", color: '#fff'}}>Ideal Body Weight ( IBW in Kg )</Text>
      <Text style={{ fontSize : 15 , color: '#fff'}}>Male : 50 + 2.3 * (ht in inches - 60)</Text>
      <Text style={{ fontSize : 15 , color: '#fff'}}>Female : 45.5 + 2.3 * (ht in inches - 60)</Text>
  </View>
  
  <View style={{flex:0.3,backgroundColor:'#fff'}}>
  <MultipleHexagons size={hexagonSize} nameArray={dataArray} onPressHexagon={onUserClick} origin={{ x: 15, y: 15 }} spacing={1} >
  </MultipleHexagons>  
  </View>
  
  <View style={{flex:0.20,backgroundColor:'#f5d491' , margin:5, borderRadius : 20,alignItems:'center', justifyContent:'space-around'}}>
      <Text style={{ fontSize : 20 , fontWeight: "bold", color: '#fff'}}>Oxygenation titration</Text>
      <Text style={{ fontSize : 15 , color: '#fff'}}>Adjust FiO2 and PEEP</Text>
      <Text style={{ fontSize : 20 , fontWeight: "bold", color: '#fff'}}>Ventiation titration</Text>
      <Text style={{ fontSize : 15 , color: '#fff'}}>Adjust RR and Vt</Text>
  </View>

  </View>
 );
 
/*
 <View st
 
 yle={{flexDirection:'row', justifyContent:'space-between'}}>
      
    </View>

<TouchableHighlight onPress={onMImageClick}>
      <ImageBackground source={getImage("Male")} style={{width:200, height:210}}  ></ImageBackground>
      </TouchableHighlight>

      <TouchableHighlight onPress={onFImageClick}>
      <ImageBackground source={getImage("Female")} style={{width:200, height:210}}  ></ImageBackground>
      </TouchableHighlight>
*/

export default function SubChildLayoutList(props) {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIdArr, setSelectedIdArr] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [displaySwitch, setDisplaySwitch] = useState(true);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

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
          obj.child_name = item.child_name !== undefined ? item.child_name : null,
          obj.child_desc = item.child_desc !== undefined ? item.child_desc : null,
          obj.child_desc1 = item.child_desc1 !== undefined ? item.child_desc1 : null,
          obj.button_img = item.button_img !== undefined ? item.button_img : null,
          obj.display_img = item.display_img !== undefined ? item.display_img : null,
          obj.backgroundColor = backgroundColor,
          obj.vis = false
          rawArr.push(obj);
        })
      }
    })
    
    setSelectedIdArr(rawArr);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  },[props])



  const renderItem = ({item, index}) =>{
    const backgroundColor = item.backgroundColor;
    const color = '#fff' ;
    const imageUrl = item.button_img;

    if(item.child_desc !== null)
    {
      
      return (
        <View>
        { index === 0 &&
        (<View style={styles.switchview}>
          <View style={{height:30 }}>
            <Text style={{fontSize: 18}}>* expand all</Text>
          </View>
          <View >
          <Switch
            trackColor={{ false: '#9dcddf', true: '#63a1b0' }}
            thumbColor='#fbfbfb' 
            ios_backgroundColor="#3e3e3e"
            style={{ transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }] }}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          </View>
        </View>
        )}
        <Item
          item={item}
          onPress = { () => addToSelectedList(item.child_id)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
          image = {imageUrl}
          onImageClick = { () => onImageClick(imageUrl)}        
        />
        </View>
      );
    }
    else if(item.display_img !== null)
    {
        const image = item.display_img;
        if(item.display_img === "DOP")
        {
        return(
        <DisplayImage
          image = {image} 
          backgroundColor={{ backgroundColor }}
        /> 
        );
        }
        else if(item.display_img === "MaleFemale")
        {
          const arr = [
            { 
              "id" :1 ,
              "name": "Male",
              "hexvalue" :'#f5d491',
              "q" : 1,
              "r" : 0,
              "s" : 0,
              "onUserClick" : 'onUserClick("Male")' 
            }
            ,
            { 
              "id" :2 , 
              "name": "Female",
              "hexvalue" :'#f5d491',
              "q" : 1,
              "r" : 1,
              "s" : 0,
              "onUserClick": 'onUserClick("Female")'
            }
          ];
          const viewHeight = height - 80;
          const hexagonSize = { x: 13, y: 13 };
          return(
            <DisplayMaleFemaleImage
              image = {image} 
              backgroundColor={{ backgroundColor }}
              height= {{viewHeight}}
              onMImageClick = { () => onMImageClick("Male")}  
              onFImageClick = { () => onFImageClick("Female")}  
              onUserClick = {onUserClick}
              dataArray = {arr} 
              hexagonSize ={hexagonSize}
            /> 
            );
        }
        else{
          return(
            <DisplayImage
              image = {image} 
              backgroundColor={{ backgroundColor }}
            /> 
          )
        }
    }    
  } 

  const onImageClick = (item) => { 
   
    navigation.navigate("ImageScreen",{value : item});
  }

  const onMImageClick = (item) => { 
    navigation.navigate("ImageScreen",{value : item});
  }
  
  const onFImageClick = (item) => { 
    navigation.navigate("ImageScreen",{value : item});
  }

  const onUserClick = (item) =>{
    if( item === 1)
    {
      navigation.navigate("ImageScreen",{value : "Male"});
    }
    else if(item === 2)
    {
      navigation.navigate("ImageScreen",{value : "Female"});
    }
  }
  
  const callParentFunction = (value) =>{
    //props.showSubDetails(value);
    // this function is not called here.
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
      <View style={{flex:1}} ><Text style={styles.title} textAlign='center'>No Data Found</Text></View>
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

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  
  const renderFlatList = () =>{
    if(loading)
    {
      return(
        <LoadingIndicator />
      )
    }
    else if(!loading){
      return(
        <SafeAreaView style={styles.container}>

        <View style ={{ flex:1 , paddingTop : 5 }}>
          <FlatList 
          data={selectedIdArr}        
          renderItem= { ({item , index}) => renderItem({item, index})}
          keyExtractor = { (item, index) => item.child_id.toString() }
          ListEmptyComponent = {EmptyList}
          extraData={selectedIdArr}
          />
        </View>
        </SafeAreaView> 
      )
    }
  }
  return (
    renderFlatList()
  );
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor:'#fff'
    },
    item: {
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      width: 300
    },
    switchview:{ 
      height : 20,
      padding:5, 
      marginBottom :5,
      flexDirection:'row', 
      justifyContent:'space-between',
      alignItems:'flex-start'
    },

    imageView:{
      flex:1,
      flexDirection :'column',
      flexGrow :1,
      marginTop :7
    },
    imageBackgroundView:{
      margin:5,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    },
    title: {
      fontSize: 25,
      margin:'auto',
      textAlign: 'center',
      justifyContent:'center'
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
      shadowOffset: {
        width: 0,
        height: 3,
      },      
      shadowRadius: 10,
      shadowOpacity: 1
    },
    TextComponentChildStyle:{
      padding: 15
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
    },
    ImageItemWrapper:{
      height: '100%',
      width : '100%',
      flex:1,
      backgroundColor: '#000'
    }
    
  });