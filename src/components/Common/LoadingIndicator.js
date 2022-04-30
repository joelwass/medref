import React, { Component, useEffect, useState } from 'react'
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const LoadingIndicator = ({ isLoading }) => {
  const [animating, setAnimating] = useState(true)

  const closeActivityIndicator = () => {
    setTimeout(() => setAnimating(false), 100)
  }

  useEffect(() => {
    // if(!isLoading)
    closeActivityIndicator()
  }, [isLoading])

  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={animating}
        color='#96c9dc'
        size='large'
        style={styles.activityIndicator}
      />
    </View>
  )
}

export default LoadingIndicator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
})
