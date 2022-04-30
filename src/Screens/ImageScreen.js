import React from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'

const getImage = (image) => {
  switch (image) {
    case 'PP':
      return require('../assets/screenimages/pleateau.png')
    case 'Fi':
    case 'Fi02Peep':
      return require('../assets/screenimages/FiO2Peep.png')
    case 'DOP':
      return require('../assets/screenimages/DOP.png')
    case 'Female':
      return require('../assets/screenimages/Female.png')
    case 'Male':
      return require('../assets/screenimages/Male.png')
    case 'AT':
      return require('../assets/screenimages/AT.png')
    default:
      return require('../assets/screenimages/nothing-found.png')
  }
}

export default function ImageScreen ({ navigation, props, route }) {
  const { value } = route.params

  return (
    <View style={styles.container}>
      <ImageBackground source={getImage(route.params.value)} style={{ height: '80%', width: '100%', marginTop: 30 }} />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    marginTop: 0,
    flex: 1
  }
})
