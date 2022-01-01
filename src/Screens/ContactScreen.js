import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default function AboutScreen ({ navigation, props, route }) {

  const LogoImage = () => (
    <View style={{
      marginTop: -140,
      marginLeft: -55,
      zIndex: -1
    }}>
      <Image source={require('../assets/Logo.png')} style={{}} />
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={{textAlign: 'center', fontSize: 30, textDecorationLine: 'underline', margin: 10}}>
        Contact
      </Text>

      <Text style={{ textAlign: 'center', fontSize: 20, margin: 10}}>
        If any medical information seems incorrect please reach out to 1benjamin.mati @ gmail.com
      </Text>

      <Text style={{ textAlign: 'center', fontSize: 20, margin: 10}}>
        or open a GitHub issue at https://github.com/joelwass/medref/issues
      </Text>

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
