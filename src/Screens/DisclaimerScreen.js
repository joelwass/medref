import React from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native'

export default function DisclaimerScreen ({ navigation, props, route }) {
  return (

    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={{ textAlign: 'center', fontSize: 30, textDecorationLine: 'underline', margin: 10 }}>
          Disclaimer
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, margin: 10 }}>
          Reminder! Users should seek a doctor’s advice in addition to using this app and before making any medical decisions.
        </Text>

        <Text style={{ textAlign: 'left', fontSize: 16, margin: 10 }}>
          This app's content content is provided for informational purposes only, and does not intend to substitute professional medical advice, diagnosis, or treatment.
        </Text>
      </ScrollView>
    </SafeAreaView>
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
  scrollView: {
    marginHorizontal: 20
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
