import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  SafeAreaView,
  Dimensions,
  FlatList
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import searchData from '../data/searchData'

const searchDebounce = () => {
  let timer
  return async function (searchText) {
    if (!searchText) {
      return []
    }
    if (timer !== undefined) {
      clearTimeout(timer)
    }
    const promise = new Promise((resolve) => {
      timer = setTimeout(() => {
        const results = searchData(searchText)
        resolve(results)
      }, 2000)
    })
    return promise
  }
}

const debounce = searchDebounce()

const kDefaultSearchResults = { loading: false, results: [] }

export default function SearchScreen ({ route, navigation }) {
  const [searchState, setSearchState] = useState(kDefaultSearchResults)

  const onSearchInputChanged = async (newSearchText) => {
    if (!newSearchText) {
      setSearchState(kDefaultSearchResults)
      return
    }
    if (!searchState.loading) {
      setSearchState({ loading: true, results: [] })
    }
    const results = await debounce(newSearchText)
    setSearchState({ results, loading: false })
  }

  const showSubDetails = (node) => {
    // if there is no section id or section hex value, we know this is a top level (top top level hexagon)
    // item, so we need to navigate to Details instead.
    if (!node.section_id || !node.section_hexvalue) {
      navigation.navigate('Details', { value: node.id })
      return
    }
    // or navigate to sub details screen
    const parentId = parseInt(node.id.toString().substring(0, 1))
    navigation.navigate('SubDetails', { value: parentId, subvalue: node.id })
  }

  const expandItem = (value) => {
    const updatedArr = searchState.results.map((item) => {
      if (item.id === value) {
        return {
          ...item,
          expanded: !item.expanded
        }
      }
      return item
    })
    setSearchState({ loading: false, results: updatedArr })
  }

  const ExpandedContent = ({ child, sectionColor, showName }) => (
    <View style={{ justifyContent: 'center' }}>
      {child.special_instruction_header && (
        <ItemDetailHeader headerText={child.special_instruction_header} />
      )}

      {showName && (child.child_detail_name || child.child_name) && (
        <ItemDetailsName childDetailName={child.child_detail_name || child.child_name} borderColor={{ borderColor: sectionColor }} textColor={{ color: sectionColor }} />
      )}

      {(child.child_detail_desc || child.child_desc) && (
        <View style={{ textAlign: 'left', paddingLeft: 10, paddingBottom: 10, marginTop: 5 }}>
          <Text style={{ fontSize: 20 }}>{child.child_detail_desc || child.child_desc}</Text>
        </View>
      )}

      {child.child_bullets && (
        <View style={{ textAlign: 'left', paddingLeft: 10, paddingBottom: 10, marginTop: 5 }}>
          {child.child_bullets.map((bullet, idx) => (
            <View style={{ flexDirection: 'column', justifyContent: 'left' }} key={idx.toString()}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left' }}>{bullet.title}</Text>
              <Text style={{ fontSize: 20, textAlign: 'left' }}>{bullet.subtext}</Text>
            </View>
          ))}
        </View>
      )}

      {child.special_instruction_footer && (
        <ItemDetailFooter footerText={child.special_instruction_footer} />
      )}
    </View>
  )

  const ItemDetails = ({ item, backgroundColor, onPress, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.SubmitButtonStyle, backgroundColor = backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.child_name}</Text>
      <MaterialIcons name={item.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} style={{ color: 'white' }} />
    </TouchableOpacity>
  )

  const Item = ({ item, backgroundColor, onPress, textColor }) => (
    <View>
      <TouchableOpacity onPress={onPress} style={[styles.SubmitButtonStyle, backgroundColor = backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.name || item.section_name}</Text>
        <MaterialIcons name='keyboard-arrow-down' size={30} style={{ color: 'white' }} />
      </TouchableOpacity>
    </View>
  )

  const EmptyList = () => {
    return (
      <View><Text style={styles.title}>No Data Found</Text></View>
    )
  }

  const ItemDetailsName = ({ childDetailName, borderColor, textColor }) => (
    <TouchableWithoutFeedback>
      <View style={[styles.ChildButtonStyle, borderColor = borderColor]}>
        <Text style={[styles.title, textColor]}>{childDetailName}</Text>
      </View>
    </TouchableWithoutFeedback>
  )

  const ItemDetailHeader = ({ headerText }) => (
    <View style={{ paddingLeft: 16, paddingRight: 8 }}><Text>{headerText}</Text></View>
  )

  const ItemDetailFooter = ({ footerText }) => (
    <View style={{ paddingLeft: 16, paddingRight: 8 }}><Text>{footerText}</Text></View>
  )

  const renderNodes = ({ item, index }) => {
    const backgroundColor = item.hexvalue || item.section_hexvalue
    const color = '#fff'
    // if it's a child node (has a childId), show the node so it will expand when clicked
    // within this - if there are sub children, then add those to the expandable content
    if (item.child_id) {
      let expandableContents = []

      if (item.children) {
        expandableContents = item.children.map((child, index) => {
          return (
            <ExpandedContent child={child} key={(child.child_id + index).toString()} sectionColor={backgroundColor} showName />
          )
        })
      } else {
        expandableContents = [<ExpandedContent child={item} key={(item.child_id + index).toString()} sectionColor={backgroundColor} showName={false} />]
      }

      return (
        <View key={item.child_id.toString()}>
          <ItemDetails
            item={item}
            onPress={() => expandItem(item.child_id)}
            backgroundColor={{ backgroundColor }}
            textColor={{ color }}
          />
          {!!item.expanded && (
            <View style={styles.TextComponentStyle}>{expandableContents}</View>
          )}
        </View>
      )
    // if it's a top level node, show the node so that it will nav to sections when clicked
    // Or if it's a section node, show the node so that it will nav to children when clicked
    } else {
      // if there are children of the node, have the node navigate to the sub layout page for that node
      return (
        <Item
          item={item}
          onPress={() => showSubDetails(item)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      )
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        editable
        style={{
          width: '100%',
          borderRadius: 5,
          height: 70,
          backgroundColor: 'white',
          paddingRight: 8,
          fontSize: 20,
          paddingLeft: 8
        }}
        placeholder='Search'
        maxLength={40}
        autoCorrect={false}
        autoFocus
        onChangeText={onSearchInputChanged}
      />

      {searchState.loading && (
        <ActivityIndicator
          animating
          color='#96c9dc'
          size='large'
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 80
          }}
        />
      )}

      {searchState.results.length > 0 && !searchState.loading && (
        <View style={[styles.container, { flexDirection: 'column ' }]}>
          <FlatList
            data={searchState.results}
            renderItem={({ item, index }) => renderNodes({ item, index })}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={EmptyList}
          />
        </View>
      )}

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
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 300
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10
  },
  TextComponentStyle: {
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
    maxWidth: 400,
    width: 'auto',
    borderTopColor: '#fff',
    borderBottomColor: '#fff',
    borderLeftColor: '#000',
    borderRightColor: '#000',
    color: '#000',
    backgroundColor: '#fff',
    fontSize: 20,
    textAlign: 'center',
    elevation: 50,
    shadowColor: '#A9A9A9',
    shadowRadius: 10,
    shadowOpacity: 1
  },
  SubmitButtonStyle: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    borderColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    width: 'auto',
    maxWidth: 400,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  TextComponentChildStyle: {
    padding: 15
  },
  ChildButtonStyle: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#fff',
    borderRadius: 25,
    fontWeight: '200',
    borderWidth: 3,
    maxWidth: 350,
    width: 'auto',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ChildTextStyle: {

    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25
  },
  TextStyle: {
    color: '#000',
    textAlign: 'center'
  }
})
