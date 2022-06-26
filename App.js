import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import NavigationComponent from './src/navigation'
import * as SplashScreen from 'expo-splash-screen'
import GlobalProvider from './src/context/provider'

export default function App () {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare () {
      try {
        // Keep the splash screen visible for a few seconds so it's not too fast of a flash
        await SplashScreen.preventAutoHideAsync()
        await new Promise(resolve => setTimeout(resolve, 3000))
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        await SplashScreen.hideAsync()
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  if (!appIsReady) {
    return null
  }

  return (
    <GlobalProvider>
      <NavigationComponent />
    </GlobalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
