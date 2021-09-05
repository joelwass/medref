import React, { useEffect, useState, useContext } from 'react'
import HomeLayout from '../Components/HomeLayout'
import { useIsFocused } from '@react-navigation/native'
import DataUtils from '../Components/Helper/DataUtils'
import { GlobalContext } from '../context/provider'

export default function HomeScreen ({ navigation, route }) {
  const hexagonSize = { x: 13, y: 13 }
  const [isChanged, setChanged] = useState(true)

  const isFocused = useIsFocused()

  useEffect(() => {
    let mounted = true
    setChanged(true)

    DataUtils.getUserSelectedItems().then((result) => {
      if (result === null && mounted) {
        setDefaultItems()
      }
    })
    return () => {
      mounted = false
    }
  }, [isFocused])

  const showDetails = (props) => {
    navigation.navigate('Details', { value: props })
  }

  const setDefaultItems = async () => {
    try {
      const jsonValue = DataUtils.getDefaultItems()
      // console.log(jsonValue);

      const result = await DataUtils.setUserSelectedItems(jsonValue)
      // console.log(result);
      return result
    } catch (e) {
      console.log(e)
    }
  }

  const renderHomeScreen = () => {
    return (
      <HomeLayout size={hexagonSize} flat spacing={1.0} origin={{ x: 7, y: 7 }} showDetails={showDetails} />
    )
  }

  return (
    renderHomeScreen()
  )
}
