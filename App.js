import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons ,AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/Screens/HomeScreen';
import DetailsScreen from './src/Screens/DetailsScreen';
import SettingsScreen from './src/Screens/SettingsScreen';
import Constants from 'expo-constants';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation, route }) => ({
        title:'BAMA',
        headerStyle: { backgroundColor: '#fff', height : 80 },
        headerTintColor: '#96c9dc',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',
        headerRight : () => (
          <AntDesign name="setting" size={32} color="grey" onPress={() => navigation.navigate("Settings")}
          />
          ),
      })}
      >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Details"
      screenOptions={({ navigation, route }) => ({
        title:'BAMA',
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#96c9dc',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',
        headerRight : () => (
          <AntDesign name="setting" size={32} color="grey" onPress={() => navigation.navigate("Settings")}
          />
          ),
      })}
      >
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
      />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
              activeTintColor: '#eeeffe',
              activeBackgroundColor: '#000',
            }}>
            <Tab.Screen
              name="HomeStack"
              component={HomeStack}
              options={{
               
                backgroundColor:'#343c44',
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="home"
                    color={'#fff'}
                    size={size}                    
                  />
                ),
              }}
            />
          </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
