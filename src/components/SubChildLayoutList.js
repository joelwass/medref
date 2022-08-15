import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Switch, ImageBackground, Dimensions, TouchableHighlight } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import MultipleHexagons from './Common/MultipleHexagon'
import data from '../data/data.json'

const { width, height } = Dimensions.get('window')

const getImage = (image) => {
  switch (image) {
    case 'PP':
      return require('../assets/buttonimages/PP.png')
    case 'Fi':
      return require('../assets/buttonimages/Fi.png')
    case 'DOP':
      return require('../assets/screenimages/DOP.png')
    case 'Female':
      return require('../assets/buttonimages/FemaleBtn.png')
    case 'Male':
      return require('../assets/buttonimages/MaleBtn.png')
    case 'AT':
      return require('../assets/screenimages/AT.png')
    case 'IBW':
      return require('../assets/screenimages/ibw.png')
    case 'HeaderIBW':
      return require('../assets/screenimages/HeaderIBW.png')
    case 'FooterIBW':
      return require('../assets/screenimages/FooterIBW.png')
    case 'Fi02Peep':
      return require('../assets/screenimages/FiO2Peep.png')
    default:
      return require('../assets/screenimages/nothing-found.png')
  }
}

const Item = ({ item, backgroundColor, onPress, textColor, image, onImageClick }) => {
  return (
    <View style={{ flex: 1, width: '100%', flexGrow: 1, alignItems: 'center' }}>
      <TouchableOpacity onPress={onPress} style={[styles.SubmitButtonStyle, backgroundColor = backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.child_name}</Text>
        <MaterialIcons name={item.vis ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} style={{ color: 'white' }} />
      </TouchableOpacity>

      {item.vis &&
        <>
          <View style={styles.TextComponentStyle}>
            {item.child_desc && (
              <Text style={[styles.TextComponentChildStyle, { fontSize: 20 }]}>
                {item.child_desc}
                {item.child_desc1 && <Text style={{ fontSize: 15 }}>{'\n'}{item.child_desc1}</Text>}
              </Text>
            )}
            {item.child_bullets && (
              <View style={{ alignItems: 'left', justifyContent: 'left', paddingLeft: 10, paddingBottom: 10, marginTop: 10 }}>
                {item.child_bullets.map((bullet, idx) => (
                  <View style={{ flexDirection: 'column', justifyContent: 'left' }} key={idx}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left' }}>{bullet.title}</Text>
                    <Text style={{ fontSize: 20, textAlign: 'left' }}>{bullet.subtext}</Text>
                  </View>
                ))}
              </View>
            )}
            {image !== null &&
              <TouchableOpacity onPress={onImageClick}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <ImageBackground source={getImage(image)} style={{ height: 80, width: 85 }} />
                </View>
              </TouchableOpacity>}
          </View>
          {item.subchildren && item.subchildren.map((subchild, idx) => (
            <View style={styles.TextComponentStyle} key={idx}>
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 23,
                  textDecorationLine: 'underline'
                }}
              >
                {subchild.child_name}
              </Text>
              <Text style={[styles.TextComponentChildStyle, { fontSize: 20 }]}>
                {subchild.child_desc}
              </Text>
            </View>
          ))}
        </>}
    </View>
  )
}

const DisplayImage = ({ image }) => {
  const { width, height } = Dimensions.get('window')
  return (
    <View style={styles.imageView}>
      <ImageBackground source={getImage(image)} style={{ width, height: height * 0.65 }} resizeMode='contain' />
    </View>
  )
}

const DisplayMaleFemaleImage = ({ dataArray, hexagonSize, onUserClick, viewHeight }) => (
  <View style={{ height: viewHeight, display: 'flex', width, backgroundColor: '#fff' }}>

    <View style={{ flex: 0.26, backgroundColor: '#f5d491', margin: 5, borderRadius: 20, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Ideal Body Weight ( IBW in Kg )</Text>
      <Text style={{ fontSize: 15, color: '#fff' }}>Male : 50 + 2.3 * (ht in inches - 60)</Text>
      <Text style={{ fontSize: 15, color: '#fff' }}>Female : 45.5 + 2.3 * (ht in inches - 60)</Text>
    </View>

    <View style={{ flex: 0.42, backgroundColor: '#fff' }}>
      <MultipleHexagons size={hexagonSize} nameArray={dataArray} onPressHexagon={onUserClick} origin={{ x: 15, y: 15 }} spacing={1} />
    </View>

    <View style={{ flex: 0.32, backgroundColor: '#f5d491', marginTop: 5, borderRadius: 20, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Oxygenation titration</Text>
      <Text style={{ fontSize: 15, color: '#fff' }}>Adjust FiO2 and PEEP</Text>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Ventiation titration</Text>
      <Text style={{ fontSize: 15, color: '#fff' }}>Adjust RR and Vt</Text>
    </View>

  </View>
)

export default function SubChildLayoutList (props) {
  const [selectedIdArr, setSelectedIdArr] = useState([])
  const [isEnabled, setIsEnabled] = useState(false)
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()

  useEffect(() => {
    const rawArr = []
    let backgroundColor = ''

    data.map((item) => {
      if (item.id === props.selectedValue) {
        const secDet = item.section.find(obj => obj.section_id === props.subSelectedValue)
        backgroundColor = secDet.section_hexvalue
        secDet.children.map((item) => {
          const obj = {}
          obj.child_id = item.child_id,
          obj.child_name = item.child_name !== undefined ? item.child_name : null,
          obj.subchildren = item.subchildren !== undefined ? item.subchildren : null,
          obj.child_warning = item.child_warning !== undefined ? item.child_warning : null,
          obj.child_bullets = item.child_bullets !== undefined ? item.child_bullets : null,
          obj.child_desc = item.child_desc !== undefined ? item.child_desc : null,
          obj.child_desc1 = item.child_desc1 !== undefined ? item.child_desc1 : null,
          obj.button_img = item.button_img !== undefined ? item.button_img : null,
          obj.display_img = item.display_img !== undefined ? item.display_img : null,
          obj.backgroundColor = backgroundColor,
          obj.vis = false
          rawArr.push(obj)
        })
      }
    })

    setSelectedIdArr(rawArr)
    setLoading(false)
  }, [props])

  const renderItem = ({ item, index }) => {
    const backgroundColor = item.backgroundColor
    const color = '#fff'
    const imageUrl = item.button_img

    if (item.child_desc !== null || item.child_bullets !== null) {
      return (
        <View>
          {index === 0 && (
            <View style={{alignItems:'center'}}>
              {item.child_warning && (
                <View style={{ height: 30, padding: 5, paddingTop: 10, width: '90%', height: 'auto' }}>
                  <Text style={{ fontSize: 18 }}>{item.child_warning}</Text>
                </View>
              )}
            </View>
          )}
          <Item
            item={item}
            onPress={() => addToSelectedList(item.child_id)}
            backgroundColor={{ backgroundColor }}
            textColor={{ color }}
            image={imageUrl}
            onImageClick={() => onImageClick(imageUrl)}
          />
        </View>
      )
    } else if (item.display_img !== null) {
      const image = item.display_img
      if (item.display_img === 'DOP') {
        return (
          <DisplayImage
            image={image}
          />
        )
      } else if (item.display_img === 'MaleFemale') {
        const arr = [
          {
            id: 1,
            name: 'Male',
            hexvalue: '#f5d491',
            q: 1,
            r: 0,
            s: 0,
            onUserClick: 'onUserClick("Male")'
          },
          {
            id: 2,
            name: 'Female',
            hexvalue: '#f5d491',
            q: 1,
            r: 1,
            s: 0,
            onUserClick: 'onUserClick("Female")'
          }
        ]
        const viewHeight = height * 0.63
        const hexagonSize = { x: 14, y: 14 }
        return (
          <DisplayMaleFemaleImage
            image={image}
            backgroundColor={{ backgroundColor }}
            viewHeight={viewHeight}
            onUserClick={onUserClick}
            dataArray={arr}
            hexagonSize={hexagonSize}
          />
        )
      } else {
        return (
          <DisplayImage
            image={image}
          />
        )
      }
    }
  }

  const onImageClick = (item) => {
    navigation.navigate('ImageScreen', { value: item })
  }

  const onUserClick = (item) => {
    if (item === 1) {
      navigation.navigate('ImageScreen', { value: 'Male' })
    } else if (item === 2) {
      navigation.navigate('ImageScreen', { value: 'Female' })
    }
  }

  const addToSelectedList = (child_id) => {
    const selectedArray = [...selectedIdArr]
    let result = {}
    result = selectedIdArr.find(obj => obj.child_id === child_id)
    result.vis = !result.vis
    selectedArray.map((item, index) =>
      item.child_id === child_id
        ? {
            item: result
          }
        : item
    )
    setSelectedIdArr(
      selectedArray
    )
  }

  const EmptyList = () => {
    return (
      <View style={{ flex: 1 }}><Text style={styles.title} textAlign='center'>No Data Found</Text></View>
    )
  }

  const toggleSwitch = () => {
    const tempArray = [...selectedIdArr]
    if (isEnabled) {
      tempArray.map((item, index) => {
        item.vis = false
      })
    } else {
      tempArray.map((item, index) => {
        item.vis = true
      })
    }
    setSelectedIdArr(tempArray)
    setIsEnabled(previousState => !previousState)
  }

  return (
    <SafeAreaView style={styles.container}>
      {(selectedIdArr.length > 0 && (selectedIdArr[0].child_desc !== null || selectedIdArr[0].child_bullets !== null)) && (
        <View style={styles.switchview}>
          <View style={{ height: 30, paddingTop: 3 }}>
            <Text style={{ fontSize: 20 }}>* expand all</Text>
          </View>
          <View>
            <Switch
              trackColor={{ false: '#9dcddf', true: '#63a1b0' }}
              thumbColor='#fbfbfb'
              ios_backgroundColor='#3e3e3e'
              style={{ transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }] }}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      )}
      <View style={{ flex: 1, width: '100%' }}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 120 }}
          data={selectedIdArr}
          renderItem={({ item, index }) => renderItem({ item, index })}
          keyExtractor={(item, index) => item.child_id.toString()}
          ListEmptyComponent={EmptyList}
          extraData={selectedIdArr}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '100%'
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    maxWidth: 400,
    width: '90%'
  },
  switchview: {
    marginBottom: 5,
    height: 35,
    marginTop: 25,
    width: '90%',
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  imageView: {
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: 0
  },
  imageBackgroundView: {
    width: Dimensions.get('window').width
  },
  title: {
    fontSize: 23,
    paddingLeft: 10,
    margin: 'auto',
    textAlign: 'center',
    justifyContent: 'center'
  },
  TextComponentStyle: {
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
    maxWidth: 400,
    width: '90%',
    borderTopColor: '#fff',
    borderBottomColor: '#fff',
    borderLeftColor: '#000',
    borderRightColor: '#000',
    color: '#000',
    backgroundColor: '#fff',
    fontSize: 20,
    textAlign: 'left',
    elevation: 50,
    shadowColor: '#A9A9A9',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 10,
    shadowOpacity: 1
  },
  TextComponentChildStyle: {
    padding: 15
  },
  SubmitButtonStyle: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff',
    maxWidth: 400,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  TextStyle: {
    color: '#000',
    textAlign: 'center'
  },
  ImageItemWrapper: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: '#000'
  }

})
