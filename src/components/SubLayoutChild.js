import React, { Component } from 'react'
import Svg from 'react-native-svg'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native'
import { Layout, Orientation, Point, Hexagon, HexText } from '../components/index'
import { ScrollView } from 'react-native-gesture-handler'
import itemColors from '../data/color.json'

// https://rossbulat.medium.com/react-native-carousels-with-horizontal-scroll-views-60b0587a670c
class SubLayoutChild extends Component {
  static LAYOUT_FLAT = new Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0)
  static LAYOUT_POINTY = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5)

  static width = Dimensions.get('window').width

  constructor (props) {
    super(props)
    const { flat, className, hexname, ...rest } = this.props
    const orientation = (flat) ? Layout.LAYOUT_FLAT : Layout.LAYOUT_POINTY
    const cornerCoords = this.calculateCoordinates(orientation)
    const points1 = cornerCoords.map(point => `${point.x},${point.y}`).join(' ')
    const layout = Object.assign({}, rest, { orientation })

    this.state = {
      flat: this.props.flat,
      points: points1,
      layout,
      x: 40,
      y: 7,
      showDetails: this.props.showDetails,
      selectedValue: this.props.showText
    }
  }

  getPointOffset (corner, orientation, size) {
    const angle = 2.0 * Math.PI * (corner + orientation.startAngle) / 6
    return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle))
  }

  // TODO Refactor
  calculateCoordinates (orientation) {
    const corners = []
    const center = new Point(40, 5)
    const { size } = this.props

    Array.from(new Array(6), (x, i) => {
      const offset = this.getPointOffset(i, orientation, size)
      const point = new Point(center.x + offset.x, center.y + offset.y)
      corners.push(point)
    })
    return corners
  }

  componentDidMount = () => {

  }

  callParentFunction = (value) => {
    this.setState({
      selectedValue: value
    })
    this.props.showDetails(value)
  }

  render () {
    const innerViewHeight = this.props.height
    const innerViewWidth = Dimensions.get('window').width / 5

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} horizontal>
          {itemColors && itemColors.map((item) => {
            return (
              <View
                key={item.id} style={{
                  height: innerViewHeight,
                  width: innerViewWidth,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {item.name === this.state.selectedValue
                  ? (
                      (<Svg>
                        <Hexagon key={item.id} q={-1} r={-1} s={1} points={this.state.points} layout={this.state.layout} fill={item.hexvalue} stroke='#fff' showText={item.name} showDetails={() => this.callParentFunction(item.name)} strokeWidth='2'>
                              <HexText x={this.state.x} y={this.state.y} fontSize='15'>{item.name}</HexText>
                            </Hexagon>
                       </Svg>)
                    )
                  : (
                      (<Svg>
                        <Hexagon key={item.id} q={-1} r={-1} s={1} points={this.state.points} layout={this.state.layout} fill='#fff' stroke={item.hexvalue} showText={item.name} showDetails={() => this.callParentFunction(item.name)} strokeWidth='2'>
                              <HexText x={this.state.x} y={this.state.y} fontSize='15'>{item.name}</HexText>
                            </Hexagon>
                       </Svg>)
                    )}
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
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  paragraph: {
    width: '100%',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  }
})

export default SubLayoutChild
