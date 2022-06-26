import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import Svg, { G, Rect } from 'react-native-svg'
import color from '../data/color.json'
// import { Constants } from 'expo';
const { width } = Dimensions.get('window')

const array = [1, 2, 3, 4, 5, 6]
export default class TestScreen2 extends Component {
  componentDidMount () {
    // setTimeout(() => {
    // this.scrollView.scrollTo({ x: -30 });
    // }, 1); // scroll view position fix
  }

  /*
  <ScrollView horizontal={true}>
              {array.map(item => {
                return (
                  <View style={item % 2 === 0 ? styles.view : styles.view2} />
                );
              })}
            </ScrollView>
  */
  render () {
    return (
      <View style={styles.container}>
        <ScrollView horizontal>
          {array.map(item => {
            return (
              <View key={item} style={item % 2 === 0 ? styles.view : styles.view2}>
                <Svg>
                  <G>
                    <Rect
                      x={15}
                      y={15}
                      width={80}
                      height={70}
                      strokeWidth={2}
                      stroke='#9b59b6'
                      fill='#3498db'
                    />
                  </G>
                </Svg>
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    height: Dimensions.get('window').height
  },
  scrollcontainer: {
    backgroundColor: 'pink',
    height: Dimensions.get('window').height / 4,
    width: Dimensions.get('window').width
  },
  view: {
    marginTop: 100,
    backgroundColor: 'blue',
    width: 100,
    margin: 10,
    height: 200,
    borderRadius: 10
    // paddingHorizontal : 30
  },
  view2: {
    marginTop: 100,
    backgroundColor: 'red',
    width: 100,
    margin: 10,
    height: 200,
    borderRadius: 10
    // paddingHorizontal : 30
  },

  view3: {
    marginTop: 100,
    backgroundColor: 'purple',
    width: 80,
    margin: 10,
    height: 200,
    borderRadius: 10
    // paddingHorizontal : 30
  }
})
