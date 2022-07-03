import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

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

export default function ImageScreen ({ route }) {
  return (
    <View style={styles.container}>
      <Image source={getImage(route.params.value)} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    marginTop: 0,
    flex: 1,
    width: '100%',
    height: '100%'
  }
})
