import React, { useState } from 'react'
import { 
  View, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  Text, 
  ActivityIndicator, 
  SafeAreaView, 
  Dimensions, 
  FlatList 
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import searchData from '../data/searchData'


export default function SettingScreen ({ route, navigation }) {
  const [searchResults, setSearchResults] = useState([])
  const [resultsLoading, setResultsLoading] = useState(false)

  const searchDebounce = () => {
    let timer = undefined
    return function(searchText) {
      if (!searchText) {
        setResultsLoading(false)
        return []
      }
      // console.log('here', timer)
      if (timer !== undefined) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        setResultsLoading(false)
        const results = searchData(searchText)
        setSearchResults(results)
      }, 2000)
      // console.log('timer now', timer)
    }
  }

  const debounce = searchDebounce()

  const onSearchInputChanged = (e) => {
    setResultsLoading(true)
    debounce(e.target.value)
  }

  const showSubDetails = (sectionId, childId) => { // navigate to sub details screen 
    navigation.navigate('SubDetails', { value: sectionId, subValue: undefined })
  }

  const Item = ({ item, backgroundColor, onPress, textColor }) => (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TouchableOpacity onPress={onPress} style={[styles.SubmitButtonStyle, backgroundColor = backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.section_name}</Text>
        <MaterialIcons name='keyboard-arrow-down' size={30} style={{ color: 'white' }} />
      </TouchableOpacity>
    </View>
  )

  const EmptyList = () => {
    return (
      <View><Text style={styles.title}>No Data Found</Text></View>
    )
  }

  const ItemDetailsDesc = ({ childDetailDesc, borderColor, textColor }) => (
    <TouchableWithoutFeedback>
      <View style={[styles.ChildButtonStyle, borderColor = borderColor]}>
        <Text style={[styles.title, textColor]}>{childDetailDesc}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
  
  const ItemDetailHeader = ({ headerText }) => (
    <View><Text>{headerText}</Text></View>
  )
  
  const ItemDetailFooter = ({ footerText }) => (
    <View><Text>{footerText}</Text></View>
  )

  const renderNodes = ({ item, index }) => {
    console.log('wtf here', index)
    const backgroundColor = item.hexvalue || item.section_hexvalue
    const color = '#fff'
    const borderColor = '#36454F'

    // concat the multiple line section names if necessary
    if (item.multiple_lines) {
      let tempText = item.section_name1 ? item.section_name1 : ''
      let tempText1 = item.section_name2 ? item.section_name2 : ''
      item.section_name = item.section_name + ' ' + tempText + ' ' + tempText1
    }

    // if there are no children of the node then render the node so it expands when clicked
    if (!item.children) {
      <View key={index} style={{ justifyContent: 'center' }}>
        {item.special_instruction_header && (
          <ItemDetailHeader headerText={item.special_instruction_header} />
        )}

        {(item.child_detail_name || item.child_name) && (
          <ItemDetailsDesc childDetailDesc={item.child_detail_name || item.child_name} borderColor={{ borderColor }} textColor={{ color }} />
        )}

        {(item.child_detail_desc || item.child_desc) && (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, justifyContent: 'center', marginTop: 5 }}>{item.child_detail_desc || item.child_desc}</Text>
          </View>
        )}    

        {item.child_bullets && (
          <View style={{ alignItems: 'left', justifyContent: 'left', paddingLeft: '0.5em', marginTop: '1em' }}>
            {item.child_bullets.map((bullet, idx) => (
              <View style={{ flexDirection: 'column', justifyContent: 'left' }} key={idx}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left' }}>{bullet.title}</Text>
                <Text style={{ fontSize: 20, textAlign: 'left' }}>{bullet.subtext}</Text>
              </View>
            ))}
          </View>
        )}      

        {item.special_instruction_footer && (
          <ItemDetailFooter footerText={item.special_instruction_footer} />
        )}
      </View>
    } else {
      // if there are children of the node, have the node navigate to the sub layout page for that node
      return (
        <Item
          item={item}
          onPress={() => showSubDetails(item.section_id, item.child_id)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      )
    }
  }

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', bottom: 'never' }}>
      <TextInput
        editable
        style={{ 
          width: '100%',
          borderRadius: '5px', 
          height: '3em', 
          backgroundColor: 'white',
          paddingRight: '8px',
          paddingLeft: '8px'
        }}
        placeholder='Search'
        maxLength={40}
        autoCorrect={false}
        autoFocus={true}
        onChange={onSearchInputChanged}
      />
      
      {resultsLoading && (
        <ActivityIndicator
          animating={resultsLoading}
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

      {searchResults && searchResults.length > 0 && (
        <View style={[styles.container, { flexDirection: 'column '}]}>
          <FlatList
            data={searchResults}
            renderItem={({ item, index }) => renderNodes({ item, index })}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={EmptyList}
            extraData={searchResults}
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
  oddItem: {
    backgroundColor: '#A0A0A0'
  },
  evenItem: {
    backgroundColor: '#D3D3D3'
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
    width: 300,
    // Set border Hex Color Code Here.
    borderTopColor: '#fff',
    borderBottomColor: '#fff',
    borderLeftColor: '#000',
    borderRightColor: '#000',
    // Setting up Text Font Color.
    color: '#000',
    // Setting Up Background Color of Text component.
    backgroundColor: '#fff',
    // Adding padding on Text component.
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
    width: 300,
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
    width: 250,
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
  },
  switchview: {
    marginBottom: 5,
    height: 20,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }
})
