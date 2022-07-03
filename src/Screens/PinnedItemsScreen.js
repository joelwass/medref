import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet, Text, FlatList, SafeAreaView, TouchableHighlight, Alert, Dimensions } from 'react-native'
import { ListItem } from 'react-native-elements'
import DataUtils from '../Components/Helper/DataUtils'

import { GlobalContext } from '../context/provider'
import updateContext from '../context/actions/Settings/update'

export default function PinnedItemsScreen ({ route, navigation }) {
  const [Settings, setSettings] = useState([])
  const [ids, setIds] = useState([])
  const hasUnsavedChanges = Boolean(ids)
  const [saveItem, setSaveItem] = useState(false)
  const [numberSelected, setNumberSelected] = useState(8)

  const {
    settingsState: { appSettingsUpdate, itemArray },
    settingDispatch
  } = useContext(GlobalContext)

  useEffect(() => {
    const itemlist = DataUtils.items()
    setSettings(itemlist)

    getCachedPinnedTopics()
      .then((result) => {
        result !== null
          ? (
              setIds(result)
            )
          : (
              setIds([])
            )
      })
  }, [navigation, hasUnsavedChanges])

  const getCachedPinnedTopics = async () => {
    try {
      return DataUtils.getUserSelectedItems()
    } catch (e) {
      console.error(e)
    }
  }

  const isChecked = (itmId) => {
    let isThere = false
    isThere = ids.includes(itmId)
    return isThere
  }

  const toggleChecked = (itemId) => {
    if (isChecked(itemId)) {
      const newids = [...ids, itemId]
      const tempIds = newids.filter((id) => id !== itemId)
      setNumberSelected(numberSelected-1)
      setIds([...tempIds])
    } else {
      const newids = [...ids, itemId]
      setNumberSelected(numberSelected+1)
      setIds([...newids])
    }
  }

  const renderSetting = ({ item, index }) => {
    return (
      <View style={[styles.subtitleView, index % 2 > 0 ? styles.oddItem : styles.evenItem]}>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>
              <Text style={styles.itemStyle}>{item.name}</Text>
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.CheckBox
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={isChecked(item.id)}
            onPress={() => toggleChecked(item.id)}
          />
        </ListItem>
      </View>
    )
  }

  const updatePressed = () => {
    validateAndSubmit()
  }
  const validateAndSubmit = () => {
    try {
      if (ids && ids.length === 8) {
        storeData(ids) // store in async storage
          .then(() => {
            updateContext(ids)(settingDispatch)
            // TODO: show toast saying succesful save or something

            // Nav back to home screen
            navigation.navigate('Home')
          })
          .catch((err) => {
            console.error('Check Data 111 :' + err)
          })
      } else if (ids && ids.length < 8) {
        AlertMessage('Insufficient topics', 'Please select 8 topics to pin.')
      } else {
        AlertMessage('Too many topics', 'Please select only 8 topics to pin.')
      }
    } catch (e) {
      // saving error
      console.error('catch block finally check data')
    }
  }
  const storeData = async (values) => {
    try {
      return DataUtils.setUserSelectedItems(values)
    } catch (e) {
      console.error(e)
    }
  }

  const AlertMessage = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK', onPress: () => { setSaveItem(true) } }]
    )
    return true
  }

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>

      <View style={{ justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 22, color: '#3f3f3f', paddingLeft: 10, margin: 2 }}> Pinned topics: ({numberSelected} selected)</Text>
      </View>

      <FlatList
        data={Settings}
        renderItem={renderSetting}
        keyExtractor={item => item.id.toString()}
        extraData={ids}
        initialNumToRender={9}
      />
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#d3d3d3' }}>
        <TouchableHighlight onPress={updatePressed}>
          <View style={styles.button}>
            <Text style={{ fontSize: 20, color: '#fff', margin: 5 }}>Update</Text>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subtitleView: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#bebebe',
    width: Dimensions.get('window').width
  },
  itemStyle: {
    fontSize: 20,
    color: '#2a2a2a',
    marginHorizontal: 10,
    padding: 10
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#545454',
    color: '#000',
    padding: 5,
    width: 120,
    justifyContent: 'center',
    borderRadius: 5,
    fontWeight: 'bold',
    margin: 5
  },
  oddItem: {
    backgroundColor: '#A0A0A0'
  },
  evenItem: {
    backgroundColor: '#D3D3D3'
  }
})
