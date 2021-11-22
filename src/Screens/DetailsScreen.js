import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Button, Dimensions } from 'react-native'
import SubLayout from '../Components/SubLayout'
import SubLayoutList from '../Components/SubLayoutList'

export default function DetailsScreen ({ navigation, route, props }) {
  const hexagonSize = { x: 40, y: 40 }

  const [selectedValue, setSelectedValue] = useState()

  const height = Dimensions.get('window').height
  const width = Dimensions.get('window').width
  const upperViewHeight = height / 6

  useEffect(() => {
    console.log('here use effect ', route.params)
    const { value, subValue } = route.params
    console.log('here use effect props:', props)
    setSelectedValue(value)
  }, [props])

  const showDetails = (props) => {
    console.log('show details clicked in details screen')
    setSelectedValue(props)
  }

  const showSubDetails = (props) => { // navigate to sub details screen
    console.log('navigating to sub details screen')
    navigation.navigate('SubDetails', { value: selectedValue, subvalue: props })
  }

  const renderItems = () => {
    if (selectedValue === undefined) {
      console.log('details screen selected value undefined')
      return (
        <View 
          style={[styles.container, {
            flexDirection: 'column'
          }]} 
        />
      )
    } else {
      console.log('details screen render')
      console.log({ selectedValue })
      return (
        <View style={[styles.container, {
          flexDirection: 'column'
        }]}>
          <View style={{ flex: 1, backgroundColor: '#e5e5e5' }}>
            <SubLayout size={hexagonSize} flat={false} spacing={1.2} origin={{ x: 120, y: 125 }} showText={selectedValue} showDetails={showDetails} height={upperViewHeight} />
          </View>
          <View style={{ flex: 5, alignItems: 'center' }}>
            <SubLayoutList selectedValue={selectedValue} showSubDetails={showSubDetails} />
          </View>
        </View>
      )
    }
  }

  return (
    renderItems()
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#fff'
  }
})
