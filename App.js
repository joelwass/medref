import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavigationComponent from './src/navigation';
//import {CountProvider, useCount} from './src/context/provider';
import GlobalProvider from './src/context/provider';

export default function App() {
  return (
     <GlobalProvider>
        <NavigationComponent />
     </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
