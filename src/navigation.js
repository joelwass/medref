import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailsScreen';
import SubDetailsScreen from './Screens/SubDetailsScreen';
import SettingScreen from './Screens/SettingScreen';


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
          name="Home" component={HomeScreen}  />
        <Stack.Screen
          name="Details" component={DetailsScreen} />
        <Stack.Screen
          name="SubDetails" component={SubDetailsScreen} />  
        <Stack.Screen
          name="Settings" component={SettingScreen} />    
        
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
      </Stack.Navigator>
    );
}


export default function NavigationComponent() {
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

