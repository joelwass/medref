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

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', fontSize: 30, textDecorationLine: 'underline', margin: 10 }}>
        About
      </Text>

      <Text style={{ textAlign: 'center', fontSize: 16, margin: 10 }}>
        Bedside Acute care Medication App (BAMA) was developed by Benjamin Mati, MD and Florence Jung, PharmD.
      </Text>

      <Text style={{ textAlign: 'center', fontSize: 16, margin: 10 }}>
        Florence lives in the beautiful coastal town of Ventura, California where she started work as a critical care pharmacist.
        She is passionate about the world of pharmacy and passing on the knowledge to next generation of clinicians.  Otherwise, being a mother to two sons and a wife is not that bad either ;)
      </Text>

      <Text style={{ textAlign: 'center', fontSize: 16, margin: 10 }}>
        Before graduating from Jefferson Medical College, Benjamin Mati studied anthropology at New York University and lived and traveled in Europe,
        Asia and South and Central America. He completed his family medicine residency followed by an acute care and point of care ultrasound fellowship at Ventura County Medical Center (VCMC). He has been working in the emergency department and intensive care unit at VCMC since. While not working, he enjoys surfing, rock climbing, yoga, reading and cooking.
      </Text>

      <Text style={{ textAlign: 'center', fontSize: 16, margin: 10, color: 'blue', textDecorationLine: 'underline' }} onPress={_goToAboutPage}>
        https://www.drbenmati.com/bedside-acute-care-medication-reference
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
