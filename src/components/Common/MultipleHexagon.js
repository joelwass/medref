import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native'
import Svg, { Text as SvgText } from 'react-native-svg'
import Orientation from '../Orientation'
import Point from '../Point'
import Hexagon from '../Hexagon'
import HexText from '../HexText'
import LoadingIndicator from './LoadingIndicator'

const MultipleHexagons = ({
  nameArray,
  size,
  spacing,
  origin,
  onPressHexagon
}) => {
  const [itemArr, setItemArr] = useState([])
  const [corners, setCorners] = useState([])
  const [points, setPoints] = useState({})
  const [layout, setLayout] = useState({})
  const LAYOUT_FLAT = new Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt)
  const LAYOUT_POINTY = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const orientation = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5)
    const cornerCoords = calculateCoordinates(orientation)
    const pts = cornerCoords.map(point => `${point.x},${point.y}`).join(' ')
    const lyt = Object.assign({}, { origin }, { onPressHexagon }, { size }, { spacing }, { orientation })
    setPoints(pts)
    setLayout(lyt)
    computeData()
  }, [nameArray])

  const computeData = () => {
    const tempArr = []
    nameArray.map((obj) => {
      const ob = {}
      ob.id = obj.id,
      ob.name = obj.name,
      ob.hexvalue = obj.hexvalue,
      ob.q = obj.q,
      ob.r = obj.r,
      ob.s = obj.s,
      ob.onUserClick = obj.onUserClick
      tempArr.push(ob)
    })
    setItemArr(tempArr)
  }

  const getPointOffset = (corner, orientation, size) => {
    const angle = 2.0 * Math.PI * (corner + orientation.startAngle) / 6
    return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle))
  }

  const calculateCoordinates = (orientation) => {
    const corners = []
    const center = new Point(0, 0)
    Array.from(new Array(6), (x, i) => {
      const offset = getPointOffset(i, orientation, size)
      const point = new Point(center.x + offset.x, center.y + offset.y)
      corners.push(point)
    })
    return corners
  }

  const onHexagonClick = (item) => {
    onPressHexagon(item)
  }

  const renderHexagons = () => {
    if (loading) {
      setLoading(false)
      return (<LoadingIndicator />)
    } else {
      return (
        <View style={[styles.container]}>
          <Svg height='100%' width='100%' viewBox='10 0 70 50'>
            {itemArr.map((item) => {
              return (
                <Hexagon key={item.id} q={item.q} r={item.r} s={item.s} points={points} layout={layout} showDetails={onHexagonClick} fill='#fff' stroke={item.hexvalue} showText={item.id} strokeWidth='2'>
                  <HexText x={0} y={0} fill={item.hexvalue} showDetails={onHexagonClick} showText={item.id}>{item.name} </HexText>
                </Hexagon>
              )
            })}
          </Svg>
        </View>
      )
    }
  }
  return (
    renderHexagons()
  )
}

export default MultipleHexagons

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
