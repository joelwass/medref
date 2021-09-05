import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import HomeScreen from './Screens/HomeScreen'
import DetailsScreen from './Screens/DetailsScreen'
import SubDetailsScreen from './Screens/SubDetailsScreen'
import SettingScreen from './Screens/SettingScreen'
import ImageScreen from './Screens/ImageScreen'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function HomeStack () {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={({ navigation, route }) => ({
        title: 'BAMA',
        headerStyle: { backgroundColor: '#fff', height: 100 },
        headerTintColor: '#96c9dc',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 30 },
        headerTitleAlign: 'center',
        headerRightContainerStyle: { paddingRight: 10 },
        headerRight: () => (
          <AntDesign name='setting' size={37} color='grey' onPress={() => navigation.navigate('Settings')} />
        )
      })}
    >
      <Stack.Screen
        name='Home' component={HomeScreen}
      />
      <Stack.Screen
        name='Details' component={DetailsScreen}
      />
      <Stack.Screen
        name='SubDetails' component={SubDetailsScreen}
      />
      <Stack.Screen
        name='Settings' component={SettingScreen}
      />
      <Stack.Screen
        name='ImageScreen' component={ImageScreen}
      />

    </Stack.Navigator>
  )
}

export default function NavigationComponent () {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Home'
        tabBarOptions={{
          activeBackgroundColor: 'black'
        }}
      >
        <Tab.Screen
          name='HomeStack'
          component={HomeStack}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name='home'
                color='#fff'
                size={size * 1.7}
                style={{ marginTop: 10 }}
              />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
