import React, { useEffect, useState, useContext } from 'react'
import {StyleSheet} from 'react-native'
import Constants from 'expo-constants'
import HomeLayout from '../Components/HomeLayout'
import DataUtils from '../Components/Helper/DataUtils'
import {SafeAreaView} from 'react-native-safe-area-context'

export default function HomeScreen ({ navigation, route }) {
  const hexagonSize = { x: 13, y: 13 }

  useEffect(() => {
    let mounted = true

    DataUtils.getUserSelectedItems().then((result) => {
      if (result === null && mounted) {
        setDefaultItems()
      }
    })
    return () => {
      mounted = false
    }
  }, [])

  const showDetails = (targetNodeId) => {
    navigation.navigate('Details', { value: targetNodeId })
  }

  const setDefaultItems = async () => {
    try {
      const jsonValue = DataUtils.getDefaultItems()

      const result = await DataUtils.setUserSelectedItems(jsonValue)
      return result
    } catch (e) {
      console.log(e)
    }
  }

  const renderHomeScreen = () => {
    return (
      <SafeAreaView style={styles.container}>
        <HomeLayout size={hexagonSize} flat spacing={1.0} origin={{ x: 7, y: 7 }} showDetails={showDetails} />
      </SafeAreaView>
    )
  }

  return (
    renderHomeScreen()
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems :'center',
    paddingTop: Constants.statusBarHeight,
  }
})
