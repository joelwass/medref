import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import * as Linking from 'expo-linking'

export default function SettingScreen ({ navigation, props, route }) {
  const goToPage = (page) => {
    navigation.navigate(page)
  }

  const _goToPurchaseCardPage = () => {
    Linking.openURL('https://www.drbenmati.com/bedside-acute-care-medication-reference')
  }

  const NavButton = ({ text, onPress }) => (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity onPress={onPress} style={[styles.SubmitButtonStyle]}>
        <Text style={[styles.title]}>{text}</Text>
        <MaterialIcons name='keyboard-arrow-right' size={30} style={{ color: 'grey' }} />
      </TouchableOpacity>
    </View>
  )

  const HR = () => (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 2,
          width: 320,
          margin: 'auto',
          marginTop: 10,
          textAlign: 'center'
        }}
      />
    </View>
  )

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

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ textAlign: 'center', fontSize: 30, textDecorationLine: 'underline', margin: 10 }}>
          Settings
        </Text>

        <NavButton text='About' onPress={() => goToPage('About')} />
        <HR />
        <NavButton text='Contact' onPress={() => goToPage('Contact')} />
        <HR />
        <NavButton text='Configure Pinned Topics' onPress={() => goToPage('PinnedItems')} />
        <HR />
        <NavButton text='Citations' onPress={() => goToPage('Citations')} />
        <HR />
        <NavButton text='Disclaimer' onPress={() => goToPage('Disclaimer')} />
        <HR />
        <NavButton text='Purchase Reference Card' onPress={() => _goToPurchaseCardPage()} />
        <HR />
        <NavButton text='Terms Of Use' onPress={() => goToPage('TermsOfUse')} />
        <LogoImage />
      </ScrollView>
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
