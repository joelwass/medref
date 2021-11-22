import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native'
import SubChildLayout from '../Components/SubChildLayout'
import SubChildLayoutList from '../Components/SubChildLayoutList'

export default function SubDetailsScreen ({ navigation, route, props }) {
  const { value, subValue } = route.params
  const hexagonSize = { x: 40, y: 40 }
  const [selectedValue, setSelectedValue] = useState()
  const [subSelectedValue, setSubSelectedValue] = useState()

  const height = Dimensions.get('window').height
  const width = Dimensions.get('window').width
  const upperViewHeight = height / 6

  useEffect(() => {
    setSelectedValue(value)
    setSubSelectedValue(subValue)
  }, [props])

  const showChildDetails = (props) => {
    setSubSelectedValue(props)
  }

  const renderChildItems = () => {
    if (selectedValue === undefined || subSelectedValue === undefined) {
      console.log({ selectedValue })
      console.log({ subSelectedValue })
      return (
        <View style={[styles.container, {
          flexDirection: 'column'
        }]}>
          <View style={{ flex: 1, backgroundColor: '#e5e5e5' }}>
            <SubChildLayout size={hexagonSize} flat={false} spacing={1.2} origin={{ x: 120, y: 120 }} showText={selectedValue} showChildDetails={showChildDetails} height={upperViewHeight} selectedValue={route.params.value} subSelectedValue={route.params.subvalue} />
          </View>
          <View style={{ flex: 5, justifyContent: 'space-around', alignItems: 'center' }}>
            <SubChildLayoutList selectedValue={route.params.value} subSelectedValue={route.params.subvalue} />
          </View>
        </View>
      )
    } else {
      console.log('in else statement')
      console.log({ selectedValue })
      console.log({ subSelectedValue })
      return (
        <View style={[styles.container, {
          flexDirection: 'column'
        }]}>
          <View style={{ flex: 1, backgroundColor: '#e5e5e5' }}>
            <SubChildLayout size={hexagonSize} flat={false} spacing={1.2} origin={{ x: 120, y: 130 }} showText={selectedValue} showChildDetails={showChildDetails} height={upperViewHeight} selectedValue={selectedValue} subSelectedValue={subSelectedValue} />
          </View>
          <View style={{ flex: 5 }}>
            <SubChildLayoutList selectedValue={selectedValue} subSelectedValue={subSelectedValue} />
          </View>
        </View>
      )
    }
  }

  return (
    renderChildItems()
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
