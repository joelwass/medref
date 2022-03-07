import React, { useEffect } from 'react'
import {StyleSheet} from 'react-native'
import HomeLayout from '../Components/HomeLayout'
import DataUtils from '../Components/Helper/DataUtils'
import {SafeAreaView} from 'react-native-safe-area-context'

export default function HomeScreen ({ navigation, route }) {
  const hexagonSize = { x: 15, y: 15 }

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
    // If we're navigating to the "Settings" node, then just go to settings page, otherwise
    // go to the node id's details that were clicked on
    if (targetNodeId == '17') {
      navigation.navigate('Settings', { value: targetNodeId })
      return
    }
    navigation.navigate('Details', { value: targetNodeId })
  }

  const setDefaultItems = async () => {
    try {
      const jsonValue = DataUtils.getDefaultItems()

      const result = await DataUtils.setUserSelectedItems(jsonValue)
      return result
    } catch (e) {
      console.error(e)
    }
  }

  const renderHomeScreen = () => {
    return (
      <SafeAreaView style={styles.container}>
        <HomeLayout size={hexagonSize} flat spacing={1.0} origin={{ x: 7, y: 3 }} showDetails={showDetails} />
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
    paddingTop: 0,
  }
})
