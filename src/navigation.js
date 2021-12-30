import 'react-native-gesture-handler'
import * as React from 'react'
import {TouchableOpacity, View, Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import HomeScreen from './Screens/HomeScreen'
import DetailsScreen from './Screens/DetailsScreen'
import SubDetailsScreen from './Screens/SubDetailsScreen'
import SettingScreen from './Screens/SettingScreen'
import SearchScreen from './Screens/SearchScreen'
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
        headerLeftContainerStyle: { paddingLeft: 10 },
        headerRight: () => (
          <AntDesign name='search1' size={37} color='grey' onPress={() => navigation.navigate('Search')} />
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
        name='Search' component={SearchScreen}
      />
      <Stack.Screen
        name='ImageScreen' component={ImageScreen}
      />

    </Stack.Navigator>
  )
}

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onPress}
            style={{ flex: 1, height: 75, alignItems: 'center', backgroundColor: 'black' }}
          >
            <MaterialCommunityIcons
              name='home'
              color='white'
              size={40}
              style={{ marginTop: 10, height: 'auto' }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function NavigationComponent () {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          style={{flex: 1}}
          initialRouteName='Home'
          tabBarOptions={{
            activeBackgroundColor: 'black',
          }}
          screenOptions={{
            tabBarStyle:{ height: '100'},
          }}
          tabBar={props => <MyTabBar {...props} />}
        >
          <Tab.Screen
            name='HomeStack'
            component={HomeStack}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
