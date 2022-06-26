import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import * as Linking from 'expo-linking'

export default function AboutScreen ({ navigation, props, route }) {
  const LogoImage = () => (
    <View style={{
      marginTop: -140,
      marginLeft: -55,
      zIndex: -1
    }}
    >
      <Image source={require('../assets/Logo.png')} style={{}} />
    </View>
  )

  const _goToAboutPage = () => {
    Linking.openURL('https://www.drbenmati.com/bedside-acute-care-medication-reference')
  }

  const _goToGitHub = () => {
    Linking.openURL('https://github.com/joelwass/medref/issues')
  }

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', fontSize: 30, textDecorationLine: 'underline', margin: 10 }}>
        Contact
      </Text>

      <Text style={{ textAlign: 'center', fontSize: 20, margin: 10 }}>
        If any medical information seems incorrect please reach out to 1benjamin.mati @ gmail.com
      </Text>

      <View style={{ textAlign: 'center', margin: 10, display: 'inline' }}>
        <Text style={{ textAlign: 'center', fontSize: 16 }}>or open a GitHub issue at: </Text>
        <Text style={{ textAlign: 'center', color: 'blue', fontSize: 16, textDecorationLine: 'underline' }} onPress={_goToGitHub}>
          https://github.com/joelwass/medref/issues
        </Text>
      </View>

      <View style={{ textAlign: 'center', margin: 10, display: 'inline' }}>
        <Text style={{ textAlign: 'center', fontSize: 16 }}>More info can be found at </Text>
        <Text style={{ textAlign: 'center', color: 'blue', fontSize: 16, textDecorationLine: 'underline' }} onPress={_goToAboutPage}>
          https://www.drbenmati.com/bedside-acute-care-medication-reference
        </Text>
      </View>

      <LogoImage />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginTop: 0,
    flex: 1
  },
  title: {
    fontSize: 20,
    marginLeft: 20,
    marginRight: 10
  },
  SubmitButtonStyle: {
    marginTop: 10,
    backgroundColor: 'white',
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
  }
})
