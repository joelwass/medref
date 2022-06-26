import React, { Component, useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native'
import Svg, { G, Circle, Path, Polygon, Text as SvgText } from 'react-native-svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import Orientation from './Orientation'
import Point from './Point'
import Hexagon from './Hexagon'
import HexText from './HexText'
import { GlobalContext } from '../context/provider'
import { SafeAreaView } from 'react-native-safe-area-context'

const pointArr = [
  { id: 1, q: 1.2, r: -1, s: 1 },
  { id: 2, q: 1.2, r: 0, s: 0 },
  { id: 3, q: 2.2, r: -1, s: -1 },
  { id: 4, q: 2.8, r: 1, s: 1 },
  { id: 5, q: 2.8, r: 0, s: 0 },
  { id: 6, q: 1.8, r: 1, s: -1 },
  { id: 7, q: 1.2, r: 3.5, s: 1 },
  { id: 8, q: 1.2, r: 2.5, s: 0 },
  { id: 9, q: 2.2, r: 2.5, s: 1 }
]

export default function HomeLayout (props) {
  const LAYOUT_FLAT = new Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0)
  const LAYOUT_POINTY = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5)

  const [state, setState] = useState({})

  useEffect(() => {
    const { flat, className, ...rest } = props
    const orientation = (flat) ? LAYOUT_FLAT : LAYOUT_POINTY
    const cornerCoords = calculateCoordinates(orientation)
    const points1 = cornerCoords.map(point => `${point.x},${point.y}`).join(' ')
    const layout = Object.assign({}, rest, { orientation })

    setState({
      flat: props.flat,
      points: points1,
      layout,
      x: 0,
      y: 0,
      showDetails: props.showDetails
    })
  }, [])

  const {
    settingsState: { itemArray }
  } = useContext(GlobalContext)

  function getPointOffset (corner, orientation, size) {
    const angle = 2.0 * Math.PI * (corner + orientation.startAngle) / 6
    return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle))
  }

  function calculateCoordinates (orientation) {
    const corners = []
    const center = new Point(0, 0)
    const { size } = props

    Array.from(new Array(6), (x, i) => {
      const offset = getPointOffset(i, orientation, size)
      const point = new Point(center.x + offset.x, center.y + offset.y)
      corners.push(point)
    })
    return corners
  }

  return (
    <>
      {state && state.layout && (
        <Svg width='100%' height='100%' viewBox='0 0 100 100' version='1.1' xmlns='http://www.w3.org/2000/svg'>
          {itemArray.map((obj) => {
            return (
              <Hexagon key={obj.name} q={obj.q} r={obj.r} s={obj.s} points={state.points} layout={state.layout} fill={obj.hexvalue} stroke={obj.hexvalue} showDetails={state.showDetails} showText={obj.id} strokeWidth='5'>
                <HexText x={state.x} y={obj.multiple_lines ? state.y - 4 : state.y} fill={obj.fill} showDetails={state.showDetails} showText={obj.id}>
                  {obj.name}
                </HexText>
                {obj.name1 && ( // if there is a second line to the name
                  <HexText x={state.x} y={state.y + 1} fill={obj.fill} showDetails={state.showDetails} showText={obj.id}>
                    {obj.name1}
                  </HexText>
                )}
                {obj.name2 && ( // if there is a third line to the name
                  <HexText x={state.x} y={state.y + 5} fill={obj.fill} showDetails={state.showDetails} showText={obj.id}>
                    {obj.name2}
                  </HexText>
                )}
              </Hexagon>
            )
          })}
        </Svg>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight
  }
})
